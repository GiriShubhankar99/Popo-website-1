import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ_DATA } from '../data/moments';
import { FLAVOUR_MAP } from '../data/flavours';
import { FlavourConfig } from '../types';
import { Sparkles, RotateCcw, ShoppingBag, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/sound';

interface FindYourPopoQuizProps {
  onSelectFlavour: (flavour: FlavourConfig) => void;
  onOrderFlavour: (flavour: FlavourConfig) => void;
}

export const FindYourPopoQuiz: React.FC<FindYourPopoQuizProps> = ({
  onSelectFlavour,
  onOrderFlavour
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [revealedFlavour, setRevealedFlavour] = useState<FlavourConfig | null>(null);

  const handleChoose = (opt: typeof QUIZ_DATA.options[0]) => {
    sounds.playCatch(3);
    setSelectedOptionId(opt.id);

    // After brief portal wind-up, reveal flavour with victory sound
    setTimeout(() => {
      sounds.playGolden();
      const flavour = FLAVOUR_MAP[opt.flavourId];
      setRevealedFlavour(flavour);
    }, 450);
  };

  const handleReset = () => {
    sounds.playBubble();
    setSelectedOptionId(null);
    setRevealedFlavour(null);
  };

  return (
    <section
      id="find-popo"
      className="relative w-full py-24 px-4 bg-gradient-to-b from-[#FFFBF2] via-[#FFF5E6] to-[#FFFBF2] select-none"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-orange-200 shadow-sm text-xs font-black uppercase tracking-wider text-[#FF5500] mb-3">
            <Sparkles size={14} className="text-amber-500" />
            <span>Personality Matcher</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-['Outfit',sans-serif] tracking-tight text-[#1A1412] mb-3">
            Find Your POPO.
          </h2>

          <p className="text-base sm:text-lg font-medium text-[#5C4533] max-w-xl mx-auto">
            {QUIZ_DATA.subtitle}
          </p>
        </div>

        {/* Quiz Body */}
        <div className="relative rounded-[36px] bg-white border-4 border-orange-100/80 p-6 sm:p-10 shadow-2xl shadow-orange-950/10 overflow-hidden">
          <AnimatePresence mode="wait">
            {!revealedFlavour ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <span className="text-xs font-black uppercase tracking-widest text-[#FF5500] block mb-1">
                    Question 1 of 1
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black font-['Outfit',sans-serif] text-[#1A1412]">
                    "{QUIZ_DATA.prompt}"
                  </h3>
                </div>

                {/* 7 Mood Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {QUIZ_DATA.options.map((opt) => {
                    const isSelected = selectedOptionId === opt.id;

                    return (
                      <motion.button
                        key={opt.id}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleChoose(opt)}
                        className={`relative p-4 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#FF5500] bg-orange-50 shadow-md ring-2 ring-[#FF5500]'
                            : 'border-stone-100 hover:border-orange-200 bg-stone-50/70 hover:bg-white'
                        }`}
                        style={{ minHeight: '110px' }}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-base font-black font-['Outfit',sans-serif] text-[#1A1412]">
                            {opt.label}
                          </span>
                          <div
                            className="w-3.5 h-3.5 rounded-full"
                            style={{ backgroundColor: opt.color }}
                          />
                        </div>

                        <p className="text-xs font-semibold text-stone-600">
                          {opt.description}
                        </p>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              /* Portal Emergence Animation & Recommendation Screen */
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                className="flex flex-col items-center text-center p-4 sm:p-6"
              >
                <div className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-[#FF5500] mb-2">
                  <span>Portal Destination Unlocked</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-black font-['Outfit',sans-serif] text-[#1A1412] mb-1">
                  You Belong in {revealedFlavour.worldName}!
                </h3>

                <p className="text-sm font-semibold text-stone-600 max-w-md mb-6">
                  {revealedFlavour.subheading}
                </p>

                {/* Portal Frame with Emerging 3D Scoop */}
                <div className="relative my-4 flex items-center justify-center">
                  {/* Glowing Portal Vortex Rings */}
                  <motion.div
                    animate={{ rotate: 360, scale: [1, 1.08, 1] }}
                    transition={{
                      rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                      scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                    }}
                    className="w-44 h-44 rounded-full border-4 border-dashed flex items-center justify-center"
                    style={{ borderColor: revealedFlavour.secondaryColour }}
                  />

                  {/* 3D Scoop Emerging From Portal */}
                  <motion.div
                    initial={{ scale: 0, y: 30 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 220 }}
                    className="absolute w-32 h-32 rounded-full shadow-2xl flex items-center justify-center border-4 border-white"
                    style={{
                      background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${revealedFlavour.secondaryColour} 70%, ${revealedFlavour.darkColour} 100%)`
                    }}
                  >
                    <span className="text-xs font-black uppercase text-white drop-shadow">
                      {revealedFlavour.name}
                    </span>
                  </motion.div>
                </div>

                {/* Flavour Details Card */}
                <div
                  className="mt-6 p-5 rounded-2xl max-w-md w-full text-center border-2 border-white shadow-lg"
                  style={{ backgroundColor: revealedFlavour.colour }}
                >
                  <p className="text-xs font-bold text-stone-800 mb-2">
                    "{revealedFlavour.microcopy[0]}"
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-1.5">
                    {revealedFlavour.keyIngredients.slice(0, 3).map((ing) => (
                      <span
                        key={ing}
                        className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-white/90 text-[#1A1412]"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      sounds.playCatch(3);
                      onOrderFlavour(revealedFlavour);
                    }}
                    className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FF5500] to-[#FF3B66] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <ShoppingBag size={16} />
                    <span>GET THIS SCOOP</span>
                  </button>

                  <button
                    onClick={() => {
                      sounds.playPortal();
                      onSelectFlavour(revealedFlavour);
                    }}
                    className="px-6 py-3.5 rounded-full bg-stone-900 text-white font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-stone-800 transition-all flex items-center gap-2"
                  >
                    <span>EXPLORE WORLD</span>
                    <ArrowRight size={15} />
                  </button>

                  <button
                    onClick={handleReset}
                    className="px-4 py-3.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs uppercase transition-all flex items-center gap-1.5"
                  >
                    <RotateCcw size={14} />
                    <span>RETAKE QUIZ</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
