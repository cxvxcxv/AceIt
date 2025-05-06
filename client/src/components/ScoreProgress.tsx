'use client';

import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const ScoreProgress = ({ percentage }: { percentage: number }) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);

  useEffect(() => {
    const step = percentage / 50;
    const interval = setInterval(() => {
      setCurrentPercentage(prev => {
        const next = prev + step;
        if (next >= percentage) {
          clearInterval(interval);
          return percentage;
        }
        return next;
      });
    }, 20);
  }, [percentage]);

  return (
    <div className="h-48 w-48">
      <CircularProgressbar
        value={currentPercentage}
        text={`${Math.round(currentPercentage)}%`}
        styles={buildStyles({
          pathColor: 'white',
          textColor: '#fff',
          trailColor: '#444',
        })}
        className="rounded-full shadow-2xl"
      />
    </div>
  );
};
