'use client';

import { IQuestionOption } from '@/types/question.types';

import { TransparentGlass } from '../ui/div/TransparentGlass';
import Checkbox from '../ui/input/Checkbox';

type TQuestionOptions = {
  questionId: string;
  options: IQuestionOption[];
};

export const QuestionOptions = ({ questionId, options }: TQuestionOptions) => {
  const isMultipleAnswer =
    options.filter(option => option.isCorrect).length > 1;

  // const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  if (!options.length)
    return <h1 className="text-white">No valid options available.</h1>;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {options.map(option => (
        <TransparentGlass key={option.id}>
          <Checkbox
            id={option.id}
            label={option.optionText}
            shape={isMultipleAnswer ? 'square' : 'circle'}
            // checked={selectedOptions.includes(option.id)}
            // onChange={() => handleSelectOptions(option.id)}
          />
        </TransparentGlass>
      ))}
    </div>
  );
};
