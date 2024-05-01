import React, { useState } from "react";
import Questionaire from "./questionaire";
import { Button } from "@nextui-org/react";
import { useQuestionResponseContext } from "../context/question-context";

interface Question {
  questionId: string;
  question: string;
  answerType: string;
  options: string[];
}

interface QuestionWrapper {
  questionaire: Question[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  nextButtonHandler: () => void;
}

const QuestionContainer: React.FC<QuestionWrapper> = ({
  questionaire,
  nextButtonHandler,
}) => {
  const [responses, setResponses] = useState<Record<string, string | string[]>>(
    {},
  );

  const { data, updateQuestionaire } = useQuestionResponseContext();

  const handleResponseChange = (
    questionId: string,
    response: string | string[],
  ) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: response,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const responseArray = Object.entries(responses).map(
      ([questionId, answer]) => {
        return {
          questionId: questionId,
          answers: answer,
        };
      },
    );
    const currentStep = data.currentStep + 1;

    updateQuestionaire({
      currentStep: currentStep,
      questions: questionaire,
      responses: responseArray,
    });
    nextButtonHandler();
  };

  return (
    <div>
      <form className="flex flex-col px-8" onSubmit={handleSubmit}>
        {questionaire.map((question: Question) => {
          return (
            <Questionaire
              key={question.questionId}
              questionContent={question}
              value={responses[question.questionId]}
              onChange={handleResponseChange}
            ></Questionaire>
          );
        })}
        <Button
          color="primary"
          size="md"
          type="submit"
          radius="sm"
          className="mt-10 w-48"
        >
          Next
        </Button>
      </form>
    </div>
  );
};

export default QuestionContainer;
