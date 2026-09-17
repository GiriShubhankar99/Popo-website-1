import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Search, Navigation, Clock, Phone, Sparkles, ExternalLink } from 'lucide-react';
import { sounds } from '../utils/sound';

interface StoreSectionProps {
  onOpenOrderModal: () => void;
}

interface ParlourLocation {
  id: string;
  name: string;
  city: string;
  area: string;
  address: string;
  timings: string;
  phone: string;
  distance: string;
  specialty: string;
}

const PARLOURS: ParlourLocation[] = [
  {
    id: 'loc-1',
    name: 'POPO Flavourverse Flagship',
    city: 'Mumbai',
    area: 'Bandra West',
    address: 'Shop 4, Pali Hill Junction, Bandra West, Mumbai 400050',
    timings: '11:00 AM – 1:30 AM (Midnight scoops!)',
    phone: '+91 98200 12345',
    distance: '1.2 km away',
    specialty: 'Live Waffle Cone Station & 3D Flavour Wall'
  },
  {
    id: 'loc-2',
    name: 'POPO Cloud Parlour',
    city: 'Bengaluru',
    area: 'Indiranagar',
    address: '100ft Road, Near 12th Main, Indiranagar, Bengaluru 560038',
    timings: '12:00 PM – 1:00 AM',
    phone: '+91 98800 67890',
    distance: '2.4 km away',
    specialty: 'Ratnagiri Alphonso Sundae Bar'
  },
  {
    id: 'loc-3',
    name: 'POPO Kesar Haven',
    city: 'Delhi NCR',
    area: 'CyberHub, Gurugram',
    address: 'DLF CyberHub, Ground Floor Promenade, Gurugram 122002',
    timings: '11:30 AM – 12:30 AM',
    phone: '+91 98110 54321',
    distance: '3.1 km away',
    specialty: 'Royal Kashmiri Saffron Matka Pots'
  },
  {
    id: 'loc-4',
    name: 'POPO Scoop Town',
    city: 'Ahmedabad',
    area: 'Sindhu Bhavan Road',
    address: 'SBR Food Promenade, Bodakdev, Ahmedabad 380054',
    timings: '2:00 PM – 2:00 AM (Late night special)',
    phone: '+91 97240 11223',
    distance: '0.8 km away',
    specialty: 'Crunchy Butterscotch Praline Mountains'
  }
];

export const StoreSection: React.FC<StoreSectionProps> = ({ onOpenOrderModal }) => {
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const cities = ['All', 'Mumbai', 'Delhi NCR', 'Bengaluru', 'Ahmedabad', 'Pune'];

  const filteredParlours = PARLOURS.filter((p) => {
    const matchesCity = selectedCity === 'All' || p.city === selectedCity;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <section
      id="stores"
      className="relative w-full py-24 px-4 bg-gradient-to-b from-[#FFFBF2] via-[#FFF3DF] to-[#FFFBF2] select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-orange-200 shadow-sm text-xs font-black uppercase tracking-wider text-[#FF5500] mb-3">
            <Sparkles size={14} className="text-amber-500" />
            <span>Parlours & Quick Delivery</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-['Outfit',sans-serif] tracking-tight text-[#1A1412] mb-3">
            POPO chahiye?
          </h2>

          <p className="text-base sm:text-lg font-medium text-[#5C4533] max-w-xl mx-auto">
            Order online in 10 minutes via our quick-commerce partners or visit a nearby POPO Flavourverse parlour for warm freshly baked waffle cones.
          </p>

          {/* Dual Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <button
              onClick={() => {
                sounds.playCatch(3);
                onOpenOrderModal();
              }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#FF5500] to-[#FF3B66] text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-orange-500/25 hover:scale-105 active:scale-95 transition-all"
            >
              ORDER ONLINE NOW
            </button>

            <a
              href="#store-locator"
              onClick={() => sounds.playBubble()}
              className="px-8 py-4 rounded-full bg-white border-2 border-orange-200 text-[#1A1412] font-black text-sm uppercase tracking-wider shadow-md hover:border-[#FF5500] hover:text-[#FF5500] hover:scale-105 active:scale-95 transition-all"
            >
              FIND A STORE
            </a>
          </div>

          {/* Quick-Commerce Delivery Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-stone-600">
            <span className="text-[11px] uppercase tracking-wider text-[#FF5500] font-black">
              Instant 10-Min Delivery on:
            </span>
            {['Blinkit', 'Swiggy Instamart', 'Zepto', 'Zomato'].map((partner) => (
              <span
                key={partner}
                className="px-3.5 py-1.5 rounded-full bg-white border border-orange-100 shadow-xs text-stone-800 flex items-center gap-1.5"
              >
                <span>🛵</span>
                <span>{partner}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Store Locator Container */}
        <div
          id="store-locator"
          className="rounded-[36px] bg-white border-4 border-orange-100 p-6 sm:p-8 shadow-2xl shadow-orange-950/10"
        >
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-orange-100">
            {/* City Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    sounds.playBubble();
                    setSelectedCity(city);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                    selectedCity === city
                      ? 'bg-[#1A1412] text-white shadow-md'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative max-w-xs w-full">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search area, pin code, parlour..."
                className="w-full pl-9 pr-4 py-2 rounded-full border border-orange-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF5500]"
              />
            </div>
          </div>

          {/* Parlour Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {filteredParlours.map((parlour) => (
              <div
                key={parlour.id}
                className="p-5 rounded-2xl bg-orange-50/50 border border-orange-100 hover:border-orange-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#FF5500] block">
                        {parlour.city} • {parlour.area}
                      </span>
                      <h4 className="text-xl font-black font-['Outfit',sans-serif] text-[#1A1412]">
                        {parlour.name}
                      </h4>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Open Now
                    </span>
                  </div>

                  <p className="text-xs font-medium text-stone-600 mb-3 flex items-start gap-1.5">
                    <MapPin size={14} className="text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>{parlour.address}</span>
                  </p>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 mb-2">
                    <Clock size={13} className="text-stone-400" />
                    <span>{parlour.timings}</span>
                  </div>

                  <div className="text-[11px] font-bold text-amber-900 bg-amber-100/60 px-3 py-1.5 rounded-xl mb-3">
                    ✨ Specialty: {parlour.specialty}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-orange-100">
                  <span className="text-xs font-bold text-stone-500">
                    {parlour.distance}
                  </span>

                  <button
                    onClick={() => {
                      sounds.playBubble();
                      alert(`Opening map directions to ${parlour.name}!`);
                    }}
                    className="px-4 py-1.5 rounded-full bg-white hover:bg-stone-50 border border-orange-200 text-xs font-black uppercase tracking-wider text-[#1A1412] flex items-center gap-1.5 shadow-xs"
                  >
                    <Navigation size={12} className="text-[#FF5500]" />
                    <span>Get Directions</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
