'use client';

import { nanoid } from 'nanoid';
import { useMemo, useState } from 'react';

import { IQuestionOption } from '@/types/question.types';

import { safeParseJson } from '@/utils/safeParseJson';

import { TransparentGlass } from '../ui/div/TransparentGlass';
import Checkbox from '../ui/input/Checkbox';

export const QuestionOptions = ({ options }: { options: string }) => {
  const optionsArray = safeParseJson<IQuestionOption[]>(options);

  const optionsWithIds = useMemo(() => {
    if (!optionsArray || !Array.isArray(optionsArray)) return [];
    return optionsArray.map(option => ({
      ...option,
      id: nanoid(),
    }));
  }, [options]);

  if (!optionsWithIds.length)
    return <h1 className="text-white">No valid options available.</h1>;

  const isMultipleAnswer =
    optionsWithIds.filter(option => option.isCorrect).length > 1; //checks if the question has multiple answers
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSelectOptions = (optionId: string) => {
    if (isMultipleAnswer) {
      //if there is already the option - removes it, otherwise, adds it to selectedOptions
      setSelectedOptions(prev =>
        prev.includes(optionId)
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId],
      );
    } else {
      setSelectedOptions([optionId]);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      {optionsWithIds.map(option => (
        <TransparentGlass key={option.id}>
          <Checkbox
            id={option.id}
            label={option.optionText}
            shape={isMultipleAnswer ? 'square' : 'circle'}
            checked={selectedOptions.includes(option.id)}
            onChange={() => handleSelectOptions(option.id)}
          />
        </TransparentGlass>
      ))}
    </div>
  );
};
