import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sounds } from '../utils/sound';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState<'eyes' | 'blink' | 'scoop' | 'wordmark' | 'done'>('eyes');

  useEffect(() => {
    // Step sequence
    const t1 = setTimeout(() => {
      setStep('blink');
      sounds.playBubble();
    }, 600);

    const t2 = setTimeout(() => {
      setStep('scoop');
      sounds.playCatch(2);
    }, 1200);

    const t3 = setTimeout(() => {
      setStep('wordmark');
      sounds.playGolden();
    }, 1800);

    // Progress counter
    const startTime = Date.now();
    const duration = 2200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          if (onComplete) {
            onComplete();
          }
        }, 200);
      }
    }, 30);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFF8ED] overflow-hidden select-none"
    >
      {/* Background magical ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#FFA000]/15 via-[#FF6B35]/20 to-[#FF4365]/15 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Center animation container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Visual Mark */}
        <div className="relative w-48 h-44 flex items-center justify-center">
          {/* Falling Scoop */}
          <AnimatePresence>
            {(step === 'scoop' || step === 'wordmark') && (
              <motion.div
                initial={{ y: -90, scale: 0.2, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 18
                }}
                className="absolute top-2 z-20"
              >
                {/* 3D Mango-Strawberry Scoop with cherry on top */}
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-b from-[#FFA812] to-[#FF5500] shadow-xl flex items-center justify-center border-2 border-white/60">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF6B8B] to-[#FFE3EA] opacity-90" />
                  {/* Sprinkles */}
                  <span className="absolute top-3 left-4 w-1.5 h-3 bg-white rotate-12 rounded-full" />
                  <span className="absolute bottom-3 right-4 w-1.5 h-3 bg-yellow-200 -rotate-45 rounded-full" />
                  <span className="absolute top-4 right-3 w-1.5 h-3 bg-emerald-400 rotate-45 rounded-full" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* POPO Eyes (P and O with drip) */}
          <svg
            width="160"
            height="110"
            viewBox="0 0 160 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-300"
          >
            {/* Panda Ears */}
            <path
              d="M24 35 C18 20 32 6 46 14 C48 16 48 24 44 28 Z"
              fill="#221813"
            />
            <path
              d="M136 35 C142 20 128 6 114 14 C112 16 112 24 116 28 Z"
              fill="#221813"
            />

            {/* Eyes Group with Blink scale */}
            <motion.g
              animate={{
                scaleY: step === 'blink' ? 0.08 : 1
              }}
              transition={{ duration: 0.12 }}
              style={{ transformOrigin: '80px 58px' }}
            >
              {/* Left Eye: 'P' with drip */}
              <path
                d="M 50 30
                   C 66 30, 72 42, 72 54
                   C 72 66, 64 76, 50 76
                   L 42 76
                   C 42 82, 40 90, 38 96
                   C 36 102, 30 104, 26 99
                   C 22 94, 23 86, 26 78
                   C 28 73, 29 60, 29 46
                   C 29 35, 38 30, 50 30 Z
                   M 48 44
                   C 44 44, 42 47, 42 54
                   C 42 61, 44 64, 48 64
                   C 54 64, 58 60, 58 54
                   C 58 48, 54 44, 48 44 Z"
                fill="#221813"
              />

              {/* Right Eye: 'O' */}
              <path
                d="M 110 30
                   C 128 30, 134 42, 134 54
                   C 134 66, 128 78, 110 78
                   C 92 78, 86 66, 86 54
                   C 86 42, 92 30, 110 30 Z
                   M 110 44
                   C 104 44, 102 48, 102 54
                   C 102 60, 104 64, 110 64
                   C 116 64, 118 60, 118 54
                   C 118 48, 116 44, 110 44 Z"
                fill="#221813"
              />
            </motion.g>

            {/* Panda Nose & Smile */}
            <ellipse cx="80" cy="74" rx="7" ry="5.5" fill="#221813" />
            <path
              d="M 67 86 C 72 94, 78 96, 80 90 C 82 96, 88 94, 93 86"
              stroke="#221813"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Wordmark POPO */}
        <AnimatePresence>
          {step === 'wordmark' && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className="text-center mt-3"
            >
              <h1 className="text-5xl md:text-6xl font-black font-['Outfit',sans-serif] tracking-tight text-[#1A1412] leading-none">
                POPO
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Entering the Flavourverse tagline */}
        <div className="mt-4 flex flex-col items-center gap-3">
          <p className="text-sm md:text-base font-bold tracking-wider text-[#FF5500] uppercase">
            Entering the Flavourverse...
          </p>

          {/* Progress Bar & Percentage */}
          <div className="w-56 h-2 bg-stone-200/80 rounded-full overflow-hidden relative shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-[#FFA812] via-[#FF5500] to-[#FF3B66] rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
          <span className="text-xs font-black tracking-widest text-[#221813]/60">
            {progress}%
          </span>
        </div>
      </div>

      {/* Skip Button for quick testing & accessibility */}
      <button
        onClick={() => onComplete?.()}
        className="absolute bottom-6 right-6 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-stone-300 hover:bg-stone-100 transition-colors text-stone-600"
      >
        Skip Intro →
      </button>
    </motion.div>
  );
};
