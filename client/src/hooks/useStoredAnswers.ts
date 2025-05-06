import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { IAnswers } from '@/types/storage.types';

import { safeParseJson } from '@/utils/safeParseJson';

export function useStoredAnswers(quizId?: string, showToast: boolean = false) {
  const [answers, setAnswers] = useState<IAnswers>({});
  const toastShownRef = useRef(showToast);

  useEffect(() => {
    if (!quizId) return;
    const storedAnswers = localStorage.getItem(quizId);
    const parsedAnswers = storedAnswers
      ? safeParseJson<IAnswers>(storedAnswers)
      : null;

    if (parsedAnswers && typeof parsedAnswers === 'object') {
      setAnswers(parsedAnswers);
      if (!toastShownRef.current) {
        toast.success('Loaded saved answers');
        toastShownRef.current = true;
      } else if (storedAnswers && !toastShownRef.current) {
        toast.error('Failed to load saved answers');
        toastShownRef.current = true;
      }
    }
  }, [quizId]);

  const updateAnswers = (questionId: string, optionIds: string[]) => {
    if (!quizId) return;
    setAnswers(prev => {
      const updated = { ...prev, [questionId]: optionIds };
      localStorage.setItem(quizId, JSON.stringify(updated));
      return updated;
    });
  };

  return { answers, updateAnswers };
}
