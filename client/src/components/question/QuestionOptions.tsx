'use client';

import { useEffect, useState } from 'react';

import { IQuestionOption } from '@/types/question.types';

import { TransparentGlass } from '../ui/div/TransparentGlass';
import Checkbox from '../ui/input/Checkbox';

type TQuestionOptions = {
  questionId: string;
  options: IQuestionOption[];
  storedOptionIds?: string[];
  onChangeAnswer: (questionId: string, options: string[]) => void;
};

export const QuestionOptions = ({
  questionId,
  options,
  storedOptionIds,
  onChangeAnswer,
}: TQuestionOptions) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    storedOptionIds || [],
  );

  const isMultipleAnswer =
    options.filter(option => option.isCorrect).length > 1;

  const handleSelectOption = (optionId: string) => {
    const updated = selectedOptions.includes(optionId)
      ? selectedOptions.filter(id => id !== optionId)
      : isMultipleAnswer
        ? [...selectedOptions, optionId]
        : [optionId];

    setSelectedOptions(updated);
    onChangeAnswer(questionId, updated);
  };

  useEffect(() => {
    setSelectedOptions(storedOptionIds || []);
  }, [storedOptionIds]);

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
