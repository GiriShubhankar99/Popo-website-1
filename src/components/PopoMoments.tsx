import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MOMENTS } from '../data/moments';
import { PopoMoment } from '../types';
import { Sparkles, Heart, Trophy, Users, Backpack, Moon, ChevronRight, X } from 'lucide-react';
import { sounds } from '../utils/sound';

export const PopoMoments: React.FC = () => {
  const [selectedMoment, setSelectedMoment] = useState<PopoMoment | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Backpack':
        return <Backpack size={22} className="text-orange-600" />;
      case 'Users':
        return <Users size={22} className="text-amber-600" />;
      case 'Trophy':
        return <Trophy size={22} className="text-yellow-600" />;
      case 'Sparkles':
        return <Sparkles size={22} className="text-rose-600" />;
      case 'Heart':
        return <Heart size={22} className="text-pink-600" />;
      case 'Moon':
        return <Moon size={22} className="text-stone-700" />;
      default:
        return <Sparkles size={22} className="text-orange-600" />;
    }
  };

  return (
    <section
      id="moments"
      className="relative w-full py-24 px-4 bg-gradient-to-b from-[#FFFBF2] via-[#FFF3E4] to-[#FFFBF2] select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-orange-200 shadow-sm text-xs font-black uppercase tracking-wider text-[#FF5500] mb-3">
            <Heart size={14} className="text-rose-500 fill-rose-500" />
            <span>Real Everyday Stories</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-['Outfit',sans-serif] tracking-tight text-[#1A1412] mb-3">
            There’s always a POPO moment.
          </h2>

          <p className="text-base sm:text-lg font-medium text-[#5C4533] max-w-2xl mx-auto">
            From the post-school sprint to 2 AM secret fridge raids, every chapter of life in India has an official scoop soundtrack.
          </p>
        </div>

        {/* Moments Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOMENTS.map((moment) => (
            <motion.div
              key={moment.id}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => {
                sounds.playBubble();
                setSelectedMoment(moment);
              }}
              className="relative rounded-3xl p-6 bg-white border-2 border-orange-100/80 shadow-lg hover:shadow-2xl hover:border-[#FF5500]/50 transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
              style={{ minHeight: '260px' }}
            >
              {/* Background gradient hint */}
              <div
                className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${moment.bgGradient} rounded-full blur-2xl opacity-50 pointer-events-none`}
              />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/60 flex items-center justify-center mb-4 shadow-xs">
                  {getIcon(moment.iconName)}
                </div>

                <h3 className="text-2xl font-black font-['Outfit',sans-serif] text-[#1A1412] tracking-tight mb-1">
                  {moment.title}
                </h3>

                <p className="text-xs font-bold text-[#FF5500] mb-3">
                  {moment.tagline}
                </p>

                <p className="text-xs font-medium text-stone-600 line-clamp-3 leading-relaxed">
                  {moment.story}
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-stone-100 flex items-center justify-between mt-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-stone-500">
                  Read Moment Story
                </span>
                <div className="w-8 h-8 rounded-full bg-orange-100 hover:bg-[#FF5500] hover:text-white text-stone-800 flex items-center justify-center transition-colors">
                  <ChevronRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Story Modal */}
      <AnimatePresence>
        {selectedMoment && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl border-4 border-orange-100 overflow-hidden"
            >
              <button
                onClick={() => setSelectedMoment(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>

              <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mb-4">
                {getIcon(selectedMoment.iconName)}
              </div>

              <span className="text-xs font-black uppercase tracking-wider text-[#FF5500]">
                POPO Moment
              </span>

              <h3 className="text-3xl font-black font-['Outfit',sans-serif] text-[#1A1412] mt-1 mb-2">
                {selectedMoment.title}
              </h3>

              <p className="text-sm font-bold text-stone-800 mb-4">
                "{selectedMoment.tagline}"
              </p>

              <p className="text-sm text-stone-700 leading-relaxed bg-orange-50/60 p-4 rounded-2xl border border-orange-100 mb-6">
                {selectedMoment.story}
              </p>

              <div className="p-4 rounded-2xl bg-[#FFF5E6] border border-orange-200 flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-stone-500">
                  Ideal Flavour Pairing
                </span>
                <span className="text-sm font-black text-[#1A1412]">
                  🍨 {selectedMoment.flavourRecommendation}
                </span>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedMoment(null)}
                  className="px-6 py-2.5 rounded-full bg-[#1A1412] text-white font-black text-xs uppercase tracking-wider shadow-md hover:bg-stone-800"
                >
                  Close Story
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
