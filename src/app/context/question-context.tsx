import React, { createContext, useContext, useState } from 'react';


type Question = {
    questionId: string;
    question: string;
    answerType: string;
    options: string[];
}

type Response = {
    questionId: string,
    answers: string | string[],
}

const defaultContext = {
    currentStep: 1,
    questions: [] as Question[],
    responses: [] as Response[]
}

interface ContextType {
    data: typeof defaultContext;
    updateQuestionaire: (value: {currentStep: number; questions: Question[]; responses: Response[] }) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const QuestionResponseContext = createContext<ContextType>({data: defaultContext, updateQuestionaire: () => {}});

export const QuestionResponseProvider = ({ children } : {
    children: React.ReactNode;
  }) => {

  const [data, setData] = useState(defaultContext);

  const updateQuestionaire = (value : {currentStep: number, questions : Question[], responses : Response[]}) => {
    console.log('Inside context :', value);
    setData(value);
  };

  return (
    <QuestionResponseContext.Provider value={{ data, updateQuestionaire }}>
      {children}
    </QuestionResponseContext.Provider>
  );
};

export const useQuestionResponseContext = () => useContext(QuestionResponseContext);