import { GoogleGenerativeAI } from "@google/generative-ai";

import * as prompts from "../resources/prompts.json";
import { Question, Response } from "~/app/models/Question";

const API_KEY = "AIzaSyDD04XF2bG1tHko17QAWVTadS9CS5SAFqM";

let lastQuestionNumber = 0;

export async function getQuestion(data: {currentStep: number; questions: Question[]; responses: Response[] }): Promise<Question[] | undefined>{
    try {

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});

        let usrCurrResponse = data.responses; 
        let currQuestions = data.questions;
        let prompt = '';


        const modifiedResponses = processResponse(currQuestions, usrCurrResponse);
      
        // const prompt = prompts.introduction;
        if(lastQuestionNumber === 0) {
            prompt = prompts.formatPrompt;
        } else {
            lastQuestionNumber = 1;
            prompt = prompts.newQuestionSet;
            prompt += JSON.stringify(modifiedResponses);
        }
      
        const result = await model.generateContent(prompt);
    
        const response = await result.response;
        let text = response.text();
        let trimmedJsonString = text.trim().replace(/^```json/, '').replace(/^```JSON/, '').replace(/```$/, '').replace(/`/g, '');
        let questions: Question[] = [] as Question[];
        const jsonObject = JSON.parse(trimmedJsonString);
        questions = jsonObject.questions;

        questions.forEach((question) => {
            question.questionId = String(`Q${lastQuestionNumber++}`);
        })

        console.log("Questions: ", questions);
        console.log('Parsed JSON object:', jsonObject);
        return questions;

      } catch (error) {
          console.error(error);
      }
}

export const getReport = async (data: {currentStep: number; questions: Question[]; responses: Response[] }) => {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const usrCurrResponse = data.responses; 
    const currQuestions = data.questions;


    const modifiedResponses = processResponse(currQuestions, usrCurrResponse);

    const prompt = prompts.generateReport + '\n' + JSON.stringify(modifiedResponses);
  
    const result = await model.generateContent(prompt);

    const response = await result.response;
    const text = response.text();
    const trimmedJsonString = text.trim().replace(/^```json/, '').replace(/^```JSON/, '').replace(/```$/, '').replace(/`/g, '');

    const report = JSON.parse(trimmedJsonString);

    return report;
}


const processResponse = (questions: Question[], responses: Response[]) => {
    // Create a map of responses with questionId as key
    const responseMap: Record<string, string[]|string> = responses.reduce((acc, response) => {
        acc[response.questionId as string] = response.answers;
        return acc;
    }, {});

    const modifiedResponses: Question[] = [];

    // Iterate through each question and update the response
    questions.forEach(question => {
        const answers = responseMap[question.questionId] || []; // Use empty array if response not found
        const modifiedResponse = { ...question, answers }; // Copy the question object and add answers
        delete modifiedResponse.questionId; // Remove questionId from modifiedResponse
        modifiedResponses.push(modifiedResponse); // Push modifiedResponse to the array
    });

    return modifiedResponses;
};