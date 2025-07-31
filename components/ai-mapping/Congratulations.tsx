import React from 'react';
import * as confetti from 'canvas-confetti';

export default function Congratulations({ onFinish }: { onFinish: () => void }) {
  React.useEffect(() => {
    // Center burst (outward)
    confetti.default({
      particleCount: 250,
      spread: 90,
      origin: { x: 0.5, y: 0.5 },
      startVelocity: 60,
      scalar: 1.2,
      ticks: 90,
      zIndex: 9999,
    });
    // Left side: 4 bursts towards center
    [0.3, 0.4, 0.6, 0.7].forEach((y, idx) => {
      confetti.default({
        particleCount: 120,
        angle: 30 + idx * 10, // 30, 40, 50, 60
        spread: 40,
        origin: { x: 0, y },
        startVelocity: 70,
        scalar: 1.1,
        ticks: 120,
        zIndex: 9999,
      });
    });
    // Right side: 4 bursts towards center
    [0.3, 0.4, 0.6, 0.7].forEach((y, idx) => {
      confetti.default({
        particleCount: 120,
        angle: 150 - idx * 10, // 150, 140, 130, 120
        spread: 40,
        origin: { x: 1, y },
        startVelocity: 70,
        scalar: 1.1,
        ticks: 120,
        zIndex: 9999,
      });
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] w-full relative">
      {/* Centered card */}
      <div className="bg-white rounded-2xl shadow-xl px-12 py-16 flex flex-col items-center z-10 max-w-xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <span className="inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-[#232B44]">
            <svg className="w-16 h-16 text-[#232B44]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" stroke="#232B44" strokeWidth="2.5" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12l3 3.5 5-6" />
            </svg>
          </span>
        </div>
        <h1 className="text-4xl font-bold text-center mb-2 text-[#232B44]">Congratulations</h1>
        <p className="text-lg text-gray-500 mb-8 text-center">All set! Push to GemText API to finish.</p>
        <button
          className="bg-[#232B44] hover:bg-blue-900 text-white rounded-lg px-10 py-3 text-lg font-semibold shadow transition"
          onClick={onFinish}
        >
          Finish
        </button>
      </div>
    </div>
  );
} 