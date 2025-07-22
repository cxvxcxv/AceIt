import { z } from 'zod';

export const optionSchema = z.object({
  optionText: z.string().min(1, 'Option text is required'),
  isCorrect: z.boolean(),
});

export const questionSchema = z
  .object({
    content: z.string().min(1, 'Question content is required'),
    options: z
      .array(optionSchema)
      .min(2, 'At least 2 options are required')
      .max(4, 'Maximum 4 options are allowed'),
  })
  .refine(data => data.options.some(o => o.isCorrect), {
    message: 'At least 1 option must be marked as correct',
    path: ['options'],
  });

export const quizSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  isPublic: z.boolean('Privacy is not set'),
  questions: z.array(questionSchema).min(1, 'At least 1 question is required'),
});

export type TQuizFormSchema = z.infer<typeof quizSchema>;
