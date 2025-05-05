import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { ANSWERS } from '@/constants/storage.constants';

import { safeParseJson } from '@/utils/safeParseJson';

export function useStoredAnswers() {
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const toastShownRef = useRef(false);

  useEffect(() => {
    const storedAnswers = localStorage.getItem(ANSWERS);
    const parsedAnswers = storedAnswers
      ? safeParseJson<Record<string, string[]>>(storedAnswers)
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
  }, []);

  const updateAnswers = (questionId: string, optionIds: string[]) => {
    setAnswers(prev => {
      const updated = { ...prev, [questionId]: optionIds };
      localStorage.setItem(ANSWERS, JSON.stringify(updated));
      return updated;
    });
  };

  return { answers, updateAnswers };
}
