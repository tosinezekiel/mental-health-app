import React, { useState } from 'react'
import { Spinner } from "@nextui-org/react";
import QuestionContainer from './question-container';
import { useQuestionResponseContext } from '../context/question-context';


interface Question {
  questionId: string;
  question: string;
  answerType: string;
  options: string[];
}

//Mock list

const defaultQuestions: Question[] = [
  {
    questionId: 'Q101',
    question: 'How are you feeling today?',
    answerType: 'SingleSelect',
    options: [
      "I'm feeling a bit anxious today.",
      "I'm feeling pretty good, actually!",
      "I'm feeling sad and not sure why.",
      "I'm feeling a mix of emotions right now."
    ]
  },
  {
    questionId: 'Q102',
    question: 'What are your favorite colors?',
    answerType: 'MultiSelect',
    options: [
      'Red',
      'Blue',
      'Green',
      'Yellow',
      'Orange',
      'Purple'
    ]
  },
  {
    questionId: 'Q103',
    question: 'What is your age?',
    answerType: 'SingleLineInput',
    options: []
  },
  {
    questionId: 'Q104',
    question: 'Describe your day in a few sentences.',
    answerType: 'MultiLineInput',
    options: []
  }
];


const MainPanel = () => {

  const [questionaire, updateQuestionaire] = useState(defaultQuestions)
  const [isLoading, setLoading] = useState(false);
  // This data will have the responses from 
  // the users for current step
  const { data } = useQuestionResponseContext();

  //TODO: Add an function for API call to send the 'data' and generate next set of question and set it to 'questionaire'

  const generateNewQuestions = () => {
    setLoading(true);
    //TODO: Call the above API function

    // Below is the mock response from API
    const nextSetQuestions: Question[] = [
      {
        questionId: 'Q105',
        question: 'Do you sleep well?',
        answerType: 'SingleSelect',
        options: [
          "Yes",
          "No"
        ]
      },
      {
        questionId: 'Q106',
        question: 'What are your favorite colors?',
        answerType: 'MultiSelect',
        options: [
          'Red',
          'Blue',
          'Green',
          'Yellow',
          'Orange',
          'Purple'
        ]
      },
      {
        questionId: 'Q107',
        question: 'What is your age?',
        answerType: 'SingleLineInput',
        options: []
      },
      {
        questionId: 'Q108',
        question: 'Describe your day in a few sentences.',
        answerType: 'MultiLineInput',
        options: []
      }
    ];

    updateQuestionaire(nextSetQuestions);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  return (
    <div className={`flex-1 ${isLoading ? `flex justify-center` : ``}`}>
      {
        isLoading ?
          <Spinner color="primary" size="lg" label='Loading...' /> :
          <QuestionContainer questionaire={questionaire} nextButtonHandler={generateNewQuestions}></QuestionContainer>
      }
    </div>
  )
}

export default MainPanel
