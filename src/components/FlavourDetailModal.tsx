import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FlavourConfig } from '../types';
import { FLAVOURS } from '../data/flavours';
import { X, Sparkles, ShoppingBag, ArrowLeft, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { sounds } from '../utils/sound';

interface FlavourDetailModalProps {
  flavour: FlavourConfig | null;
  onClose: () => void;
  onSelectFlavour: (flavour: FlavourConfig) => void;
  onOrder: (flavour: FlavourConfig) => void;
}

export const FlavourDetailModal: React.FC<FlavourDetailModalProps> = ({
  flavour,
  onClose,
  onSelectFlavour,
  onOrder
}) => {
  const [selectedFormat, setSelectedFormat] = useState<string>('Tub (500ml)');

  if (!flavour) return null;

  const currentIndex = FLAVOURS.findIndex((f) => f.id === flavour.id);

  const handleNextFlavour = () => {
    sounds.playBubble();
    const nextIdx = (currentIndex + 1) % FLAVOURS.length;
    onSelectFlavour(FLAVOURS[nextIdx]);
  };

  const handlePrevFlavour = () => {
    sounds.playBubble();
    const prevIdx = (currentIndex - 1 + FLAVOURS.length) % FLAVOURS.length;
    onSelectFlavour(FLAVOURS[prevIdx]);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35 }}
          className="relative w-full max-w-5xl rounded-[36px] overflow-hidden shadow-2xl border-4 border-white/80"
          style={{ backgroundColor: flavour.colour }}
        >
          {/* Top Quick Flavour Switcher Strip */}
          <div className="bg-white/90 backdrop-blur-md px-4 py-3 border-b border-black/5 flex items-center justify-between gap-3 overflow-x-auto">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#241A14]/70">
                Jump World:
              </span>
              <div className="flex gap-1.5">
                {FLAVOURS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      sounds.playBubble();
                      onSelectFlavour(f);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                      f.id === flavour.id
                        ? 'bg-[#1A1412] text-white shadow-md'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
            {/* Left 3D Rotating Pack & Ingredients Visual */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              {/* Flavour Ambient Glow */}
              <div
                className="absolute w-64 h-64 rounded-full blur-3xl opacity-50"
                style={{ backgroundColor: flavour.secondaryColour }}
              />

              {/* 3D Pack / Scoop Representation with Floating Ingredients */}
              <div className="relative w-64 h-72 flex items-center justify-center">
                {/* 3D Tub / Cone Product Placeholder */}
                <motion.div
                  animate={{ rotateY: [0, 15, -15, 0], y: [0, -8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-10 w-48 h-56 rounded-3xl p-4 shadow-2xl flex flex-col justify-between items-center text-center border-4 border-white/90"
                  style={{
                    background: `linear-gradient(145deg, #ffffff 0%, ${flavour.secondaryColour} 100%)`
                  }}
                >
                  <div className="w-full flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80">
                      POPO
                    </span>
                    <span className="text-[10px] font-bold text-stone-800">
                      {selectedFormat}
                    </span>
                  </div>

                  {/* Scoop swirl circle */}
                  <div
                    className="w-24 h-24 rounded-full shadow-inner border-2 border-white/80 flex items-center justify-center"
                    style={{ backgroundColor: flavour.darkColour }}
                  >
                    <div className="w-16 h-16 rounded-full bg-white/40 blur-[1px]" />
                  </div>

                  <div className="w-full">
                    <h4 className="font-black text-sm tracking-tight text-white drop-shadow">
                      {flavour.name}
                    </h4>
                    <p className="text-[9px] font-bold text-white/90">
                      100% Pure Masti
                    </p>
                  </div>
                </motion.div>

                {/* Floating Ingredient pieces in slow motion */}
                {flavour.keyIngredients.slice(0, 3).map((ing, i) => (
                  <motion.div
                    key={ing}
                    animate={{
                      y: [0, -12 - i * 6, 0],
                      x: [0, (i % 2 === 0 ? 8 : -8), 0],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                      duration: 3 + i * 0.8,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    className="absolute z-20 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-orange-200 text-[10px] font-black text-[#1A1412] whitespace-nowrap"
                    style={{
                      top: `${20 + i * 28}%`,
                      left: i % 2 === 0 ? '-10%' : '75%'
                    }}
                  >
                    <span>✨ {ing}</span>
                  </motion.div>
                ))}
              </div>

              {/* Texture Closeup Notes */}
              <div className="mt-4 px-4 py-2.5 rounded-2xl bg-white/80 backdrop-blur-sm border border-black/5 text-center max-w-xs">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#FF5500] block mb-0.5">
                  Mouthfeel & Texture
                </span>
                <p className="text-xs font-semibold text-stone-700">
                  {flavour.textureNotes}
                </p>
              </div>
            </div>

            {/* Right Details & Fun Microcopy */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* World Tag */}
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white"
                    style={{ backgroundColor: flavour.darkColour }}
                  >
                    {flavour.worldName}
                  </span>
                  <span className="text-xs font-bold text-stone-600 flex items-center gap-1">
                    <Flame size={13} className="text-orange-500" />
                    {flavour.calories}
                  </span>
                </div>

                {/* Cinematic Headline & Subheading */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Outfit',sans-serif] tracking-tight text-[#1A1412] leading-none mb-2">
                  {flavour.headline}
                </h2>
                <p className="text-lg sm:text-xl font-bold font-['Fredoka',sans-serif] text-[#FF5500] mb-4">
                  {flavour.subheading}
                </p>

                {/* World Lore / Description */}
                <p className="text-sm text-stone-800 font-medium leading-relaxed mb-6 bg-white/60 p-3.5 rounded-2xl border border-black/5">
                  {flavour.description}
                </p>

                {/* Personality-Based Microcopy Grid */}
                <div className="mb-6">
                  <span className="text-[10px] font-black uppercase tracking-wider text-stone-500 mb-2 block">
                    Flavour Personality
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {flavour.microcopy.map((copy, i) => (
                      <div
                        key={i}
                        className="px-3.5 py-2 rounded-xl bg-white/90 border border-black/5 text-xs font-bold text-[#1A1412] flex items-center gap-2 shadow-sm"
                      >
                        <span className="text-[#FF5500]">“</span>
                        <span className="flex-1">{copy}</span>
                        <span className="text-[#FF5500]">”</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Format Selector */}
                <div className="mb-6">
                  <span className="text-[10px] font-black uppercase tracking-wider text-stone-500 mb-2 block">
                    Choose Format
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {flavour.formats.map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => {
                          sounds.playBubble();
                          setSelectedFormat(fmt);
                        }}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                          selectedFormat === fmt
                            ? 'bg-[#1A1412] text-white shadow-md scale-105'
                            : 'bg-white/80 hover:bg-white text-stone-700 border border-black/5'
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-black/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevFlavour}
                    className="w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-stone-800 transition-colors shadow-sm"
                    aria-label="Previous world"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <button
                    onClick={handleNextFlavour}
                    className="w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-stone-800 transition-colors shadow-sm"
                    aria-label="Next world"
                  >
                    <ArrowRight size={16} />
                  </button>
                  <span className="text-xs font-bold text-stone-600">
                    World {currentIndex + 1} of {FLAVOURS.length}
                  </span>
                </div>

                <button
                  onClick={() => {
                    sounds.playCatch(3);
                    onOrder(flavour);
                  }}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF5500] to-[#FF3B66] text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <ShoppingBag size={17} />
                  <span>GET YOUR POPO</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
