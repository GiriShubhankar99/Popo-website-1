import React from 'react';
import { PopoMascot } from './PopoMascot';
import { PopoLogo } from './PopoLogo';
import { Heart, Instagram, Twitter, Youtube, ArrowUp } from 'lucide-react';
import { sounds } from '../utils/sound';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sounds.playBubble();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#1A1412] text-white pt-20 pb-12 px-4 select-none overflow-hidden">
      {/* Ambient Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-gradient-to-b from-[#FF5500]/20 to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Giant Headline */}
        <div className="text-center mb-16">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-[#FF5500] block mb-2">
            The Never-Ending Scoop
          </span>
          <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-['Outfit',sans-serif] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-orange-100 to-orange-400 leading-none">
            STAY POPO.
          </h2>
        </div>

        {/* Middle Links & Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <PopoLogo variant="white" size="md" />
            </div>
            <p className="text-xs text-stone-400 font-medium max-w-sm leading-relaxed mb-6">
              POPO is an Indian ice cream universe blending playful Gen-Z aesthetics, 100% pure milk terroir, and legendary desi joy.
            </p>
            <div className="flex items-center gap-3 text-stone-400">
              <a
                href="#instagram"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FF5500] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href="#twitter"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FF5500] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={15} />
              </a>
              <a
                href="#youtube"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FF5500] hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={15} />
              </a>
            </div>
          </div>

          {/* Links Col 1: Flavourverse */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#FF5500] mb-4">
              Flavourverse
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-stone-300">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="#flavours" className="hover:text-white transition-colors">
                  The 7 Worlds
                </a>
              </li>
              <li>
                <a href="#popo-world" className="hover:text-white transition-colors">
                  Archipelago Map
                </a>
              </li>
              <li>
                <a href="#popo-time" className="hover:text-white transition-colors">
                  Arcade Mini-Game
                </a>
              </li>
            </ul>
          </div>

          {/* Links Col 2: Brand */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#FF5500] mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-stone-300">
              <li>
                <a href="#moments" className="hover:text-white transition-colors">
                  POPO Moments
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About POPO
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Careers</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-orange-500 text-white font-black">
                    WE'RE HIRING
                  </span>
                </a>
              </li>
              <li>
                <a href="#stores" className="hover:text-white transition-colors">
                  Find a Scoop
                </a>
              </li>
            </ul>
          </div>

          {/* Mascot Animation Corner */}
          <div className="flex flex-col items-center justify-center">
            <PopoMascot
              size="sm"
              reaction="wave"
              holdingFlavour="#FF5500"
              bubbleMessage="See you in the Flavourverse!"
            />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FF5500] mt-1">
              POPO Explorer
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-stone-500">
          <p>© {new Date().getFullYear()} POPO Ice Creams Pvt. Ltd. Crafted with pure milk & masti.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 text-xs font-bold transition-all"
          >
            <span>Back to Top</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
};
