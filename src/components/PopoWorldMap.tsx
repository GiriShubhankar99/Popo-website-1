import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FLAVOURS } from '../data/flavours';
import { FlavourConfig } from '../types';
import { PopoMascot } from './PopoMascot';
import { Compass, Sparkles, ArrowRight, Eye, MapPin } from 'lucide-react';
import { sounds } from '../utils/sound';

interface PopoWorldMapProps {
  onExploreLand: (flavour: FlavourConfig) => void;
}

export const PopoWorldMap: React.FC<PopoWorldMapProps> = ({ onExploreLand }) => {
  const [selectedLand, setSelectedLand] = useState<FlavourConfig>(FLAVOURS[2]); // Mango default
  const [hoveredLand, setHoveredLand] = useState<FlavourConfig | null>(null);

  const activeLand = hoveredLand || selectedLand;

  const handleSelect = (flavour: FlavourConfig) => {
    sounds.playBubble();
    setSelectedLand(flavour);
  };

  return (
    <section
      id="popo-world"
      className="relative w-full py-24 px-4 bg-gradient-to-b from-[#FFFBF2] via-[#F4E9DC] to-[#FFFBF2] overflow-hidden select-none"
    >
      {/* Section Header */}
      <div className="relative z-10 max-w-6xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-orange-200 shadow-sm text-xs font-black uppercase tracking-wider text-[#FF5500] mb-3">
          <Compass size={14} className="text-[#FF5500]" />
          <span>Interactive Archipelago</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-['Outfit',sans-serif] tracking-tight text-[#1A1412] mb-3">
          The POPO Flavourverse Map.
        </h2>

        <p className="text-base sm:text-lg font-medium text-[#5C4533] max-w-2xl mx-auto">
          Seven enchanted islands floating high in the golden creamosphere. Tap any realm to dispatch the POPO explorer mascot across the caramel skyways!
        </p>
      </div>

      {/* Main 3D Panoramic Map Container */}
      <div className="relative z-10 max-w-6xl mx-auto rounded-[40px] overflow-hidden bg-gradient-to-b from-[#87CEEB]/40 via-[#FFE2B8]/70 to-[#FFD194]/80 p-4 sm:p-8 border-4 border-white shadow-2xl shadow-orange-950/15">
        {/* Sky / Cloudscape Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Drifting Clouds */}
          <div className="absolute -top-10 -left-10 w-96 h-36 bg-white/70 rounded-full blur-2xl" />
          <div className="absolute top-1/3 -right-20 w-[450px] h-48 bg-white/80 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 left-1/4 w-[600px] h-44 bg-white/90 rounded-full blur-2xl" />

          {/* POPO Hot Air Balloons in the Distance */}
          <motion.div
            animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-8 right-16 flex flex-col items-center opacity-85"
          >
            <div className="w-12 h-14 rounded-full bg-gradient-to-b from-[#FF5500] to-[#FF8800] border border-white shadow-md flex items-center justify-center">
              <span className="text-[7px] font-black text-white uppercase tracking-tighter">
                popo
              </span>
            </div>
            <div className="w-2 h-2.5 bg-[#6D4C2B] rounded-sm mt-0.5" />
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0], x: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-24 left-12 flex flex-col items-center opacity-75 scale-75"
          >
            <div className="w-12 h-14 rounded-full bg-gradient-to-b from-[#FF3B66] to-[#FFA812] border border-white shadow-md flex items-center justify-center">
              <span className="text-[7px] font-black text-white uppercase tracking-tighter">
                popo
              </span>
            </div>
            <div className="w-2 h-2.5 bg-[#6D4C2B] rounded-sm mt-0.5" />
          </motion.div>
        </div>

        {/* The 7 Islands Interactive Board */}
        <div className="relative w-full h-[480px] sm:h-[540px] md:h-[600px] rounded-3xl bg-white/20 backdrop-blur-sm border border-white/40 overflow-hidden">
          {/* Caramel Bridges Connecting the Islands (SVG Network) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {/* Bridge: Vanilla (50, 18) to Strawberry (26, 32) */}
            <path
              d="M 50% 18% Q 38% 22% 26% 32%"
              stroke="#DDA15E"
              strokeWidth="4"
              strokeDasharray="6 4"
              fill="none"
              opacity="0.75"
            />
            {/* Bridge: Vanilla (50, 18) to Mango (74, 34) */}
            <path
              d="M 50% 18% Q 64% 24% 74% 34%"
              stroke="#DDA15E"
              strokeWidth="4"
              strokeDasharray="6 4"
              fill="none"
              opacity="0.75"
            />
            {/* Bridge: Mango (74, 34) to Orange (84, 64) */}
            <path
              d="M 74% 34% Q 82% 48% 84% 64%"
              stroke="#DDA15E"
              strokeWidth="4"
              strokeDasharray="6 4"
              fill="none"
              opacity="0.75"
            />
            {/* Bridge: Strawberry (26, 32) to Butterscotch (16, 62) */}
            <path
              d="M 26% 32% Q 18% 46% 16% 62%"
              stroke="#DDA15E"
              strokeWidth="4"
              strokeDasharray="6 4"
              fill="none"
              opacity="0.75"
            />
            {/* Bridge: Butterscotch (16, 62) to Chocolate (38, 78) */}
            <path
              d="M 16% 62% Q 25% 72% 38% 78%"
              stroke="#DDA15E"
              strokeWidth="4"
              strokeDasharray="6 4"
              fill="none"
              opacity="0.75"
            />
            {/* Bridge: Chocolate (38, 78) to Kesar (62, 82) */}
            <path
              d="M 38% 78% Q 50% 84% 62% 82%"
              stroke="#DDA15E"
              strokeWidth="4"
              strokeDasharray="6 4"
              fill="none"
              opacity="0.75"
            />
            {/* Bridge: Kesar (62, 82) to Orange (84, 64) */}
            <path
              d="M 62% 82% Q 75% 76% 84% 64%"
              stroke="#DDA15E"
              strokeWidth="4"
              strokeDasharray="6 4"
              fill="none"
              opacity="0.75"
            />
          </svg>

          {/* Traveling Mascot Marker (Moves to selected island) */}
          <motion.div
            animate={{
              left: `${selectedLand.mapCoordinates.x}%`,
              top: `${selectedLand.mapCoordinates.y - 10}%`
            }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            className="absolute z-30 pointer-events-none -translate-x-1/2 -translate-y-full"
          >
            <PopoMascot
              size="sm"
              reaction="wave"
              holdingFlavour={selectedLand.colour}
              bubbleMessage={selectedLand.name}
            />
          </motion.div>

          {/* The 7 Interactive Floating Island Nodes */}
          {FLAVOURS.map((flavour) => {
            const isSelected = selectedLand.id === flavour.id;
            const isHovered = hoveredLand?.id === flavour.id;

            return (
              <div
                key={flavour.id}
                style={{
                  left: `${flavour.mapCoordinates.x}%`,
                  top: `${flavour.mapCoordinates.y}%`
                }}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                onMouseEnter={() => setHoveredLand(flavour)}
                onMouseLeave={() => setHoveredLand(null)}
                onClick={() => handleSelect(flavour)}
              >
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative p-3 rounded-3xl cursor-pointer flex flex-col items-center transition-all ${
                    isSelected
                      ? 'ring-4 ring-[#FF5500] ring-offset-4 ring-offset-white shadow-2xl scale-110'
                      : 'hover:shadow-xl'
                  }`}
                  style={{ backgroundColor: flavour.colour }}
                >
                  {/* Floating Island Top Landmark Icon / Mini 3D Structure */}
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl shadow-md border-2 border-white flex items-center justify-center relative overflow-hidden"
                    style={{
                      background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${flavour.secondaryColour} 70%, ${flavour.darkColour} 100%)`
                    }}
                  >
                    <span className="text-xl sm:text-2xl drop-shadow">
                      {flavour.id === 'vanilla' && '☁️'}
                      {flavour.id === 'strawberry' && '🍓'}
                      {flavour.id === 'mango' && '🥭'}
                      {flavour.id === 'orange' && '🍊'}
                      {flavour.id === 'chocolate' && '🍫'}
                      {flavour.id === 'butterscotch' && '🍯'}
                      {flavour.id === 'kesar-kulfi' && '👑'}
                    </span>
                  </div>

                  {/* Island Name Badge */}
                  <span
                    className="mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider text-white shadow"
                    style={{ backgroundColor: flavour.darkColour }}
                  >
                    {flavour.name}
                  </span>
                </motion.div>
              </div>
            );
          })}

          {/* Floating World Preview Card (Bottom Left or Center) */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-40 bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border-2 border-orange-200">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#FF5500]">
                  <MapPin size={14} />
                  <span>{activeLand.worldName}</span>
                </div>
                <h3 className="text-xl font-black font-['Outfit',sans-serif] tracking-tight text-[#1A1412]">
                  {activeLand.name}
                </h3>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-orange-100 text-[#FF5500]">
                {activeLand.mood[0]}
              </span>
            </div>

            <p className="text-xs font-medium text-stone-700 mb-4 line-clamp-2">
              {activeLand.description}
            </p>

            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-bold text-stone-500">
                Tap island to dispatch mascot
              </span>

              <button
                onClick={() => {
                  sounds.playPortal();
                  onExploreLand(activeLand);
                }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FF5500] to-[#FF3B66] text-white text-xs font-black uppercase tracking-wider shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <span>Explore Land</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
