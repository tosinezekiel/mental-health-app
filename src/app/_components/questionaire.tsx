import React from "react";
import { Input } from "@nextui-org/input";
import { Listbox, ListboxItem, Textarea } from "@nextui-org/react";

interface Question {
  questionId: string;
  question: string;
  answerType: string;
  options: string[];
}

interface QuestionWrapper {
  questionContent: Question;
  onChange: (questionId: string, response: string | string[]) => void;
  value: string | string[] | undefined;
}

const Questionaire: React.FC<QuestionWrapper> = ({
  questionContent,
  onChange,
  value,
}) => {
  const { questionId, question, answerType, options } = questionContent;

  const handleChange = (selectedOption: string | string[]) => {
    onChange(questionId, selectedOption);
  };

  let result;

  switch (answerType) {
    case "SingleLineInput":
      result = (
        <Input
          key="outside"
          type="text"
          placeholder="Write here..."
          className="no-border col-span-12 mb-6 md:col-span-6 md:mb-0"
          value={value as string}
          onValueChange={handleChange}
          variant="underlined"
        />
      );
      break;
    case "MultiSelect":
      result = (
        <Listbox
          variant="faded"
          disallowEmptySelection
          selectionMode="multiple"
          selectedKeys={value}
          onSelectionChange={(keys) => {
            const newKeys: Set<string> = keys as Set<string>;
            handleChange([...newKeys]);
          }}
        >
          {options.map((option) => {
            return <ListboxItem key={option}>{option}</ListboxItem>;
          })}
        </Listbox>
      );

      break;
    case "SingleSelect":
      result = (
        <Listbox
          variant="faded"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={value}
          onSelectionChange={(keys) => {
            const newKeys: Set<string> = keys as Set<string>;
            handleChange([...newKeys]);
          }}
        >
          {options.map((option) => {
            return <ListboxItem key={option}>{option}</ListboxItem>;
          })}
        </Listbox>
      );
      break;
    default:
      result = (
        <Textarea
          key="flat"
          variant="underlined"
          placeholder="Write here..."
          className="no-border col-span-12 mb-6 md:col-span-6 md:mb-0"
          value={value as string}
          onValueChange={handleChange}
        />
      );
  }

  return (
    <div className="w-full py-3 lg:w-1/2">
      <div className="py-2">
        <span className="text-gray-800 font-semibold text-3xl">{question}</span>
      </div>

      <div>{result}</div>
    </div>
  );
};

export default Questionaire;
