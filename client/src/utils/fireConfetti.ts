import confetti from 'canvas-confetti';

export const fireConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 150,
    origin: { y: 0.6 },
  });
};
