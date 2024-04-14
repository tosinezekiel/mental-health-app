import React from 'react'
import QuestionContainer from './question-container';


interface Question {
  questionId: string;
  question: string;
  answerType: string;
  options: string[];
}




const MainPanel = () => {

  //Mock List
  const questionaire: Question[] = [
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

  return (
    <div className='flex-1'>
      <QuestionContainer questionaire={questionaire}></QuestionContainer>
    </div>
  )
}

export default MainPanel
