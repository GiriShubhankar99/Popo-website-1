import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PRODUCTS } from '../data/products';
import { FLAVOUR_MAP } from '../data/flavours';
import { ProductItem } from '../types';
import { ShoppingBag, Star, Sparkles, Plus } from 'lucide-react';
import { sounds } from '../utils/sound';

interface ProductShowcaseProps {
  onOrderProduct: (product: ProductItem) => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onOrderProduct }) => {
  const [filterFormat, setFilterFormat] = useState<string>('All');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const formats = ['All', 'Tub (500ml)', 'Waffle Cone', 'Gourmet Stick', 'Kulfi Bar'];

  const filteredProducts =
    filterFormat === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.format.includes(filterFormat.split(' ')[0]));

  return (
    <section
      id="products"
      className="relative w-full py-24 px-4 bg-gradient-to-b from-[#FFFBF2] via-[#FFF6E9] to-[#FFFBF2] select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-orange-200 shadow-sm text-xs font-black uppercase tracking-wider text-[#FF5500] mb-3">
            <Sparkles size={14} className="text-amber-500" />
            <span>Retail & Home Delivery</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-['Outfit',sans-serif] tracking-tight text-[#1A1412] mb-3">
            The Scoop Line-Up.
          </h2>

          <p className="text-base sm:text-lg font-medium text-[#5C4533] max-w-2xl mx-auto">
            Crafted with 100% pure milk, zero trans fats, and authentic Indian terroir ingredients. Experience real gourmet indulgence.
          </p>

          {/* Format Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {formats.map((fmt) => (
              <button
                key={fmt}
                onClick={() => {
                  sounds.playBubble();
                  setFilterFormat(fmt);
                }}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                  filterFormat === fmt
                    ? 'bg-[#1A1412] text-white shadow-md scale-105'
                    : 'bg-white/80 hover:bg-white text-stone-700 border border-orange-100'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Floating Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const flavour = FLAVOUR_MAP[product.flavourId];
            const isHovered = hoveredCardId === product.id;

            return (
              <motion.div
                key={product.id}
                onMouseEnter={() => {
                  setHoveredCardId(product.id);
                  sounds.playBubble();
                }}
                onMouseLeave={() => setHoveredCardId(null)}
                whileHover={{ y: -10, rotateZ: (product.id.charCodeAt(2) % 2 === 0 ? 1 : -1) }}
                className="relative rounded-3xl p-5 border-2 border-white shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                style={{
                  backgroundColor: flavour.colour,
                  minHeight: '400px'
                }}
              >
                {/* Flavour Ambient Glow */}
                <div
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-60 pointer-events-none"
                  style={{ backgroundColor: flavour.secondaryColour }}
                />

                {/* Top Badge & Rating */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span
                    className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full text-white shadow-xs"
                    style={{ backgroundColor: flavour.darkColour }}
                  >
                    {product.badge || flavour.name}
                  </span>

                  <div className="flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded-full text-[11px] font-bold text-stone-800">
                    <Star size={11} className="text-amber-500 fill-amber-500" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                {/* 3D Pack Shot Floating Placeholder */}
                <div className="relative z-10 my-6 flex items-center justify-center">
                  <motion.div
                    animate={isHovered ? { rotateY: 20, scale: 1.08 } : { rotateY: 0, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="w-36 h-40 rounded-2xl p-3 shadow-xl border-2 border-white/90 flex flex-col items-center justify-between text-center"
                    style={{
                      background: `linear-gradient(135deg, #ffffff 0%, ${flavour.secondaryColour} 100%)`
                    }}
                  >
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#1A1412]">
                      POPO
                    </span>

                    {/* Scoop swirl */}
                    <div
                      className="w-16 h-16 rounded-full shadow-inner flex items-center justify-center"
                      style={{ backgroundColor: flavour.darkColour }}
                    >
                      <div className="w-10 h-10 rounded-full bg-white/50 blur-[1px]" />
                    </div>

                    <div className="w-full">
                      <span className="text-[10px] font-extrabold text-white block truncate drop-shadow">
                        {flavour.name}
                      </span>
                      <span className="text-[8px] font-bold text-white/90 uppercase">
                        {product.format}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Bottom Details & CTA */}
                <div className="relative z-10 pt-3 border-t border-black/5">
                  <div className="mb-2">
                    <h3 className="text-lg font-black font-['Outfit',sans-serif] text-[#1A1412] leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-[11px] font-medium text-stone-700 mt-1 line-clamp-2">
                      {product.tagline}
                    </p>
                  </div>

                  <div className="text-[10px] font-bold text-stone-500 mb-3">
                    {product.highlight}
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-stone-500">M.R.P.</span>
                      <div className="text-xl font-black font-['Outfit',sans-serif] text-[#1A1412] leading-none">
                        {product.price}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        sounds.playCatch(2);
                        onOrderProduct(product);
                      }}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FF5500] to-[#FF3B66] text-white text-xs font-black uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      <Plus size={14} />
                      <span>ORDER</span>
                    </button>
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
