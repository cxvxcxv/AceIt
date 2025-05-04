'use client';

import { useEffect, useState } from 'react';

import { IQuestionOption } from '@/types/question.types';

import { TransparentGlass } from '../ui/div/TransparentGlass';
import Checkbox from '../ui/input/Checkbox';

type TQuestionOptions = {
  questionId: string;
  options: IQuestionOption[];
  savedOptionIds?: string[];
  onChangeAnswer: (questionId: string, options: string[]) => void;
};

export const QuestionOptions = ({
  questionId,
  options,
  savedOptionIds,
  onChangeAnswer,
}: TQuestionOptions) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    savedOptionIds || [],
  );

  const isMultipleAnswer =
    options.filter(option => option.isCorrect).length > 1;

  const handleSelectOption = (optionId: string) => {
    setSelectedOptions(prev => {
      if (prev.includes(optionId)) {
        return prev.filter(id => id !== optionId);
      } else {
        return isMultipleAnswer ? [...prev, optionId] : [optionId];
      }
    });
  };

  useEffect(() => {
    onChangeAnswer(questionId, selectedOptions);
  }, [selectedOptions, questionId]);

  if (!options.length)
    return <h1 className="text-white">No valid options available.</h1>;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {options.map(option => (
        <TransparentGlass key={option.id} className="flex items-center">
          <Checkbox
            id={option.id}
            label={option.optionText}
            shape={isMultipleAnswer ? 'square' : 'circle'}
            checked={selectedOptions.includes(option.id)}
            onChange={() => handleSelectOption(option.id)}
          />
        </TransparentGlass>
      ))}
    </div>
  );
};
