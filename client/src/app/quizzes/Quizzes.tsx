'use client';

export const Quizzes = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#D84B16] via-[#C44614] to-[#8A2F10] p-8">
      <div className="w-full max-w-sm space-y-6">
        <div className="bg-white/10 border-white/20 rounded-2xl border p-6 shadow-lg backdrop-blur-lg">
          <h3 className="text-white text-xl font-semibold">Quiz Question</h3>
          <p className="text-white/80 mt-2">
            What is the capital of Kazakhstan?
          </p>
        </div>
      </div>
    </div>
  );
};
