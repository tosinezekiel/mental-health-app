import React, { useState } from 'react'
import Questionaire from './questionaire';
import { Button, Input } from '@nextui-org/react';

interface Question {
    questionId: string;
    question: string;
    answerType: string;
    options: string[];
}

interface QuestionWrapper {
    questionaire : Question[];
}


const QuestionContainer : React.FC<QuestionWrapper> = ( {questionaire} ) => {

    const [responses, setResponses] = useState<Record<string, string | string[]>>({});

    const handleResponseChange = (questionId: string, response: string | string[]) => {
        setResponses(prevResponses => ({
        ...prevResponses,
        [questionId]: response
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Responses:', responses);
        // Handle form submission here, such as sending responses to a server or updating state
    };


  return (
    <div>
        <form className='flex flex-col items-center px-8 py-4' onSubmit={handleSubmit}>
            {
                questionaire.map((question : Question) => {
                return (
                    <Questionaire key={question.questionId} questionContent={question} value={responses[question.questionId]} onChange={handleResponseChange}></Questionaire>
                )
                })
            }
            <Button color="primary" variant="bordered" type="submit" value="Next">Next</Button>  
        </form>
    </div>
  )
}

export default QuestionContainer
