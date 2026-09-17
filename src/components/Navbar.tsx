import React, { useState, useEffect } from 'react';
import { PopoLogo } from './PopoLogo';
import { Volume2, VolumeX, Menu, X, ShoppingBag } from 'lucide-react';
import { sounds } from '../utils/sound';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenOrder: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onOpenOrder,
  activeSection = 'hero'
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(sounds.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  const navItems = [
    { label: 'FLAVOURS', id: 'flavours' },
    { label: 'POPO WORLD', id: 'popo-world' },
    { label: 'POPO TIME', id: 'popo-time' },
    { label: 'OUR STORY', id: 'moments' },
    { label: 'FIND POPO', id: 'find-popo' }
  ];

  return (
    <>
      <header
        className={`fixed top-4 left-0 right-0 z-40 flex justify-center px-4 transition-all duration-300 pointer-events-none`}
      >
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-4 md:gap-8 rounded-full border transition-all duration-300 ${
            isScrolled
              ? 'py-2.5 px-5 md:px-7 bg-[#FFFDF8]/85 backdrop-blur-xl shadow-xl shadow-orange-950/5 border-orange-200/60 scale-[0.98]'
              : 'py-3.5 px-6 md:px-8 bg-[#FFFDF8]/95 backdrop-blur-md shadow-lg shadow-orange-950/5 border-orange-200/40 scale-100'
          } max-w-5xl w-full`}
        >
          {/* Logo */}
          <div
            onClick={() => {
              sounds.playBubble();
              onNavigate('hero');
            }}
          >
            <PopoLogo size={isScrolled ? 'sm' : 'md'} />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sounds.playBubble();
                    onNavigate(item.id);
                  }}
                  className={`text-xs font-black tracking-wider transition-colors uppercase relative py-1 ${
                    isActive
                      ? 'text-[#FF5500]'
                      : 'text-[#241A14]/80 hover:text-[#FF5500]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF5500] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            {/* Audio Toggle */}
            <button
              onClick={handleSoundToggle}
              aria-label={isMuted ? 'Unmute game sounds' : 'Mute game sounds'}
              title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-orange-100/70 hover:bg-orange-200/80 text-[#241A14] transition-colors"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            {/* Primary Action Button: GET POPO */}
            <button
              onClick={() => {
                sounds.playCatch(3);
                onOpenOrder();
              }}
              className="relative group overflow-hidden bg-gradient-to-r from-[#FF5500] to-[#FF3B66] text-white px-5 py-2.5 rounded-full font-black text-xs md:text-sm tracking-wider uppercase shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/40 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <ShoppingBag size={15} />
              <span>GET POPO</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center bg-stone-100 hover:bg-stone-200 text-[#241A14] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#FFFDF8]/95 backdrop-blur-2xl flex flex-col p-6 lg:hidden animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-6 border-b border-orange-100">
            <PopoLogo size="md" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-800"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-5 py-8 flex-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  sounds.playBubble();
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className="text-left font-black text-2xl font-['Outfit',sans-serif] tracking-tight text-[#241A14] hover:text-[#FF5500] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-orange-100 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrder();
              }}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FF5500] to-[#FF3B66] text-white font-black text-center tracking-wider text-sm shadow-lg shadow-orange-500/25"
            >
              GET YOUR POPO SCOOP
            </button>
            <div className="text-center text-xs text-stone-500 font-medium">
              7 Flavours • 7 Worlds • Infinite Masti
            </div>
          </div>
        </div>
      )}
    </>
  );
};
