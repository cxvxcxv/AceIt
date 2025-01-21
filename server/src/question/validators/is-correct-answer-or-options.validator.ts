import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { QuestionOptionDto } from '../dto/question-option.dto';

export function IsCorrectAnswerOrOptions(
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCorrectAnswerOrOptions',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(_, args: ValidationArguments) {
          const object = args.object as {
            correctAnswer?: string;
            options?: QuestionOptionDto[];
          };

          return !(object.correctAnswer && object.options.length);
        },
        defaultMessage() {
          return 'correct answer and options cannot be provided at the same time';
        },
      },
    });
  };
}
