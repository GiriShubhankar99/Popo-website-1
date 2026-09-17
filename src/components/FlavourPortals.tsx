import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FLAVOURS } from '../data/flavours';
import { FlavourConfig } from '../types';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { sounds } from '../utils/sound';

interface FlavourPortalsProps {
  onSelectFlavour: (flavour: FlavourConfig) => void;
  onOpenWorldMap: () => void;
}

export const FlavourPortals: React.FC<FlavourPortalsProps> = ({
  onSelectFlavour,
  onOpenWorldMap
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(2); // Mango default

  const handleNext = () => {
    sounds.playBubble();
    setActiveIndex((prev) => (prev + 1) % FLAVOURS.length);
  };

  const handlePrev = () => {
    sounds.playBubble();
    setActiveIndex((prev) => (prev - 1 + FLAVOURS.length) % FLAVOURS.length);
  };

  return (
    <section
      id="flavours"
      className="relative w-full py-24 px-4 bg-gradient-to-b from-[#FFFBF2] via-[#FFF5E6] to-[#FFFBF2] overflow-hidden select-none"
    >
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-orange-200/20 via-pink-200/20 to-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header Container */}
      <div className="relative z-10 max-w-6xl mx-auto text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-orange-200 shadow-sm text-xs font-black uppercase tracking-wider text-[#FF5500] mb-3">
          <Sparkles size={14} className="text-amber-500" />
          <span>7 Magical Dimensions</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-['Outfit',sans-serif] tracking-tight text-[#1A1412] mb-4">
          Pick Your POPO.
        </h2>

        <p className="text-base sm:text-lg font-medium text-[#5C4533] max-w-2xl mx-auto">
          Hover a portal to awaken its universe. Click to journey inside the flavour world and explore ingredients, scoops, and secret tasting notes.
        </p>
      </div>

      {/* 3D Curved Carousel / Grid of 7 Portals */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Navigation Arrows (Desktop & Tablet) */}
        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={handlePrev}
            aria-label="Previous Flavour Portal"
            className="w-12 h-12 rounded-full bg-white border border-orange-200 shadow-md hover:bg-orange-50 hover:border-[#FF5500] text-[#1A1412] flex items-center justify-center transition-all"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Flavour Portal"
            className="w-12 h-12 rounded-full bg-white border border-orange-200 shadow-md hover:bg-orange-50 hover:border-[#FF5500] text-[#1A1412] flex items-center justify-center transition-all"
          >
            <ChevronRight size={22} />
          </button>
          <button
            onClick={onOpenWorldMap}
            className="px-5 h-12 rounded-full bg-white border border-orange-200 shadow-md hover:border-[#FF5500] text-xs font-black tracking-wider uppercase text-[#FF5500] flex items-center gap-2 transition-all ml-2"
          >
            <Compass size={16} />
            <span>Open 3D World Map</span>
          </button>
        </div>

        {/* Portal Cards Carousel / Horizontal Track */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 lg:gap-3">
          {FLAVOURS.map((flavour, idx) => {
            const isHovered = hoveredId === flavour.id;
            const isCenter = activeIndex === idx;

            return (
              <motion.div
                key={flavour.id}
                onMouseEnter={() => {
                  setHoveredId(flavour.id);
                  sounds.playBubble();
                }}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => {
                  sounds.playPortal();
                  onSelectFlavour(flavour);
                }}
                whileHover={{ y: -8, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`relative rounded-3xl p-5 cursor-pointer transition-all duration-300 border-2 overflow-hidden flex flex-col justify-between ${
                  isHovered || isCenter
                    ? 'shadow-2xl shadow-orange-950/15 border-transparent'
                    : 'bg-white/80 border-orange-100 shadow-md'
                }`}
                style={{
                  backgroundColor: isHovered ? flavour.colour : undefined,
                  minHeight: '340px'
                }}
              >
                {/* Flavour Ambient Aura */}
                <div
                  className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-2xl opacity-60 pointer-events-none transition-opacity duration-300"
                  style={{ backgroundColor: flavour.secondaryColour }}
                />

                {/* Top Info */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/80 text-[#241A14]">
                      World #{idx + 1}
                    </span>
                    <span className="text-xs font-bold opacity-60">
                      {flavour.hindiName}
                    </span>
                  </div>

                  <h3 className="text-xl font-black font-['Outfit',sans-serif] tracking-tight text-[#1A1412] leading-tight">
                    {flavour.name}
                  </h3>

                  <p className="text-[11px] font-medium text-[#543B2B] mt-1 line-clamp-2">
                    {flavour.tagline}
                  </p>
                </div>

                {/* Center 3D-styled Interactive Portal Visual */}
                <div className="relative my-4 flex items-center justify-center">
                  {/* Outer Portal Ring with Pulse */}
                  <motion.div
                    animate={
                      isHovered
                        ? { scale: [1, 1.15, 1], rotate: 360 }
                        : { scale: 1, rotate: 0 }
                    }
                    transition={{
                      scale: { duration: 1.5, repeat: Infinity },
                      rotate: { duration: 10, repeat: Infinity, ease: 'linear' }
                    }}
                    className="w-28 h-28 rounded-full border-4 border-dashed flex items-center justify-center"
                    style={{ borderColor: flavour.secondaryColour }}
                  >
                    {/* Inner 3D Scoop Representation */}
                    <div
                      className="w-20 h-20 rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${flavour.secondaryColour} 65%, ${flavour.darkColour} 100%)`
                      }}
                    >
                      {/* Swirl / Scoop Texture Highlights */}
                      <div className="w-12 h-12 rounded-full border-t-2 border-white/60 opacity-80 rotate-45" />
                    </div>
                  </motion.div>

                  {/* Sparkle Eruption on Hover */}
                  {isHovered && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 pointer-events-none flex items-center justify-center"
                    >
                      <span className="absolute -top-2 text-xs">✨</span>
                      <span className="absolute -bottom-2 text-xs">⭐</span>
                      <span className="absolute -left-2 text-xs">✨</span>
                      <span className="absolute -right-2 text-xs">🍨</span>
                    </motion.div>
                  )}
                </div>

                {/* Bottom Footer: Mood & Portal Action */}
                <div className="relative z-10 pt-2 border-t border-black/5">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {flavour.mood.slice(0, 2).map((m) => (
                      <span
                        key={m}
                        className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/70 text-[#241A14]"
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-black text-[#1A1412] group">
                    <span className="uppercase tracking-wider">ENTER WORLD</span>
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:translate-x-1"
                      style={{ backgroundColor: flavour.darkColour }}
                    >
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
