import React, { useState } from 'react'
import { Spinner } from "@nextui-org/react";
import QuestionContainer from './question-container';
import { useQuestionResponseContext } from '../context/question-context';
import { getQuestion, getReport } from '~/server/gemini/getQuestion';
import { Question } from '../models/Question';
import { useReportDataContext } from '../context/report-content';
import { useRouter } from 'next/navigation';


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

  const router = useRouter()

  const [questionaire, updateQuestionaire] = useState(defaultQuestions)
  const [isLoading, setLoading] = useState(false);
  // This data will have the responses from 
  // the users for current step
  const { data } = useQuestionResponseContext();
  const { reportData, updateReportData } = useReportDataContext();

  // let questionList
  const generateNewQuestions = () => {
    setLoading(true);

    getQuestion(data).then((response: Question[]|undefined) => {
      if( response == undefined) {
        return;
      }
      console.log("response: " + response);
      updateQuestionaire(response);
    }).catch((err)=> {
      console.error(err);
  }).finally( () => {
      setLoading(false)
    }
    )
  };

  const generateReport = () => {
    setLoading(true);

    getReport(data).then((response) => {
      if( response == undefined) {
        return;
      }
      router.push({
        pathname: '/auth/patient/report',
        query: {
          data: JSON.stringify(response)
        }
      });
      console.log("response: " + response);
      // updateReportData(response);
      // window.location.href = '/auth/patient/report';
    }).catch((err)=> {
        console.error(err);
    }).finally( () => {
      setLoading(false)
    }
    )
  };

  return (
    <div className={`flex-1 ${isLoading ? `flex justify-center` : ``}`}>
      {
        isLoading ?
          <Spinner color="primary" size="lg" label='Loading...' /> :
          <QuestionContainer questionaire={questionaire} nextButtonHandler={data.currentStep <= 1 ? generateNewQuestions : generateReport}></QuestionContainer>
      }
    </div>
  )
}

export default MainPanel
