import React from 'react'
import { Input } from "@nextui-org/input";
import { Listbox, ListboxItem, Textarea } from "@nextui-org/react";

interface Question {
  questionId: string;
  question: string;
  answerType: string;
  options: string[];
}

interface QuestionWrapper {
  questionContent : Question;
  onChange :  (questionId: string, response: string | string[]) => void;
  value : string | string[] | undefined;
}


const Questionaire : React.FC<QuestionWrapper> = ({ questionContent, onChange, value  }) => {

  const {questionId, question , answerType, options} = questionContent;

  const handleChange = (selectedOption: string | string[]) => {
    console.log('Value Change :', selectedOption)
    onChange(questionId, selectedOption);
  }

  let result;

  switch (answerType) {
    case 'SingleLineInput':
      result = <Input key='outside'
                      type='text'
                      placeholder='Write here...'
                      className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                      value={value as string}
                      onValueChange={handleChange}
              />
      break;
    case 'MultiSelect':
      result = <Listbox variant="faded"
                        disallowEmptySelection
                        selectionMode="multiple"
                        selectedKeys={value}
                        onSelectionChange={(keys) =>  {
                          const newKeys : Set<string> = keys as Set<string>;
                          handleChange([...newKeys]);
                        }}
              >
                {options.map((option) => {
                  return  (
                    <ListboxItem key={option}>{option}</ListboxItem>
                  )
                })}
              </Listbox>

      break;
    case 'SingleSelect':
      result = <Listbox variant="faded"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={value}
                        onSelectionChange={(keys) =>  {
                          const newKeys : Set<string> = keys as Set<string>;
                          handleChange([...newKeys]);
                        }}
                      >
                        {options.map((option) => {
                          return (
                            <ListboxItem key={option}>{option}</ListboxItem>
                          )
                        })}
                </Listbox>
      break;
    default:
      result = <Textarea  key='flat'
                          variant='flat'
                          placeholder="Write here..."
                          className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                          value={value as string}
                          onValueChange={handleChange}
                />
    }


  return (
    <div className="w-full lg:w-1/2 py-3">
      <div className='py-2'>
        <span className='text-gray-800 text-base'>{question}</span>
      </div>

      <div>{result}</div>
    </div>
  )    
}

export default Questionaire
