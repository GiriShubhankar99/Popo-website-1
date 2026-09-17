/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FlavourPortals } from './components/FlavourPortals';
import { FlavourDetailModal } from './components/FlavourDetailModal';
import { PopoWorldMap } from './components/PopoWorldMap';
import { PopoTimeGame } from './components/PopoTimeGame';
import { ProductShowcase } from './components/ProductShowcase';
import { PopoMoments } from './components/PopoMoments';
import { FindYourPopoQuiz } from './components/FindYourPopoQuiz';
import { StoreSection } from './components/StoreSection';
import { OrderDrawer } from './components/OrderDrawer';
import { Footer } from './components/Footer';
import { FlavourConfig, ProductItem } from './types';
import { FLAVOUR_MAP } from './data/flavours';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFlavour, setSelectedFlavour] = useState<FlavourConfig | null>(null);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const [preselectedFlavourId, setPreselectedFlavourId] = useState<string>('mango');

  // Scroll helpers
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenOrder = (flavour?: FlavourConfig | ProductItem) => {
    if (flavour) {
      if ('flavourId' in flavour) {
        setPreselectedFlavourId(flavour.flavourId);
      } else {
        setPreselectedFlavourId(flavour.id);
      }
    }
    setIsOrderDrawerOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#FFFBF2] text-[#1A1412] font-sans selection:bg-[#FF5500] selection:text-white">
      {/* 2.5s Branded Loading Entrance Sequence */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Floating Pill Navigation */}
      <Navbar onOpenOrder={() => handleOpenOrder()} />

      <main>
        {/* 1. 3D Hero Section */}
        <HeroSection
          onExploreFlavours={() => scrollToSection('flavours')}
          onPlayGame={() => scrollToSection('popo-time')}
        />

        {/* 2. 7 Flavour Portals */}
        <FlavourPortals
          onSelectFlavour={(flavour) => setSelectedFlavour(flavour)}
          onOpenWorldMap={() => scrollToSection('popo-world')}
        />

        {/* 3. POPO World Interactive 3D Map */}
        <PopoWorldMap
          onExploreLand={(flavour) => setSelectedFlavour(flavour)}
        />

        {/* 4. POPO Time Functional Arcade Game */}
        <PopoTimeGame
          onExploreFlavours={() => scrollToSection('flavours')}
        />

        {/* 5. Product Showcase ("The Scoop Line-Up") */}
        <ProductShowcase
          onOrderProduct={(product) => handleOpenOrder(product)}
        />

        {/* 6. POPO Moments Storytelling */}
        <PopoMoments />

        {/* 7. Find Your POPO Personality Quiz */}
        <FindYourPopoQuiz
          onSelectFlavour={(flavour) => setSelectedFlavour(flavour)}
          onOrderFlavour={(flavour) => handleOpenOrder(flavour)}
        />

        {/* 8. Order / Store Section ("POPO chahiye?") */}
        <StoreSection
          onOpenOrderModal={() => handleOpenOrder()}
        />
      </main>

      {/* 9. Footer ("STAY POPO.") */}
      <Footer />

      {/* Cinematic Flavour Experience Modal */}
      <FlavourDetailModal
        flavour={selectedFlavour}
        onClose={() => setSelectedFlavour(null)}
        onSelectFlavour={(flavour) => setSelectedFlavour(flavour)}
        onOrder={(flavour) => {
          setSelectedFlavour(null);
          handleOpenOrder(flavour);
        }}
      />

      {/* Order / Quick-Commerce Drawer */}
      <OrderDrawer
        isOpen={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
        preselectedFlavourId={preselectedFlavourId}
      />
    </div>
  );
}

