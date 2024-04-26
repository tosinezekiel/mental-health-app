import { GoogleGenerativeAI } from "@google/generative-ai";

import * as prompts from "../resources/prompts.json";
import { Question } from "~/app/models/Question";

const API_KEY = "AIzaSyDD04XF2bG1tHko17QAWVTadS9CS5SAFqM";

class CustomData {
    text: string;

    constructor(text: string) {
        this.text = text;
        // You can initialize other properties here if needed
    }

    // You can define methods on this class as well
    display() {
        console.log(this.text);
    }
}

export async function getQuestion(data: any): Promise<Question[] | undefined>{
    try {
    
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
      
        const prompt = prompts.introduction;
        const formatPrompt = prompts.formatPrompt;
      
        const result = await model.generateContent(formatPrompt);
    
        const response = await result.response;
        let text = response.text();
        let trimmedJsonString = text.trim().replace(/^```json/, '').replace(/^```JSON/, '').replace(/```$/, '').replace(/`/g, '');
        let questions: Question[] = [] as Question[];
        const jsonObject = JSON.parse(trimmedJsonString);
        questions = jsonObject.questions;
        console.log("Questions: ", questions);
        console.log('Parsed JSON object:', jsonObject);
        return questions;
      } catch (error) {
          console.error(error);
      }
}
