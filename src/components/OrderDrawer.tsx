import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Check, ArrowRight, Sparkles } from 'lucide-react';
import { FLAVOURS } from '../data/flavours';
import { sounds } from '../utils/sound';
import confetti from 'canvas-confetti';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedFlavourId?: string;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  preselectedFlavourId
}) => {
  const [selectedFlavourId, setSelectedFlavourId] = useState<string>(
    preselectedFlavourId || 'mango'
  );
  const [selectedFormat, setSelectedFormat] = useState<string>('Tub (500ml)');
  const [quantity, setQuantity] = useState<number>(1);
  const [isOrdered, setIsOrdered] = useState<boolean>(false);
  const [deliveryPartner, setDeliveryPartner] = useState<string>('Blinkit');

  if (!isOpen) return null;

  const currentFlavour =
    FLAVOURS.find((f) => f.id === selectedFlavourId) || FLAVOURS[2];

  const prices: Record<string, number> = {
    'Tub (500ml)': 249,
    'Waffle Cone': 99,
    'Gourmet Stick': 85,
    'Kulfi Bar': 75,
    'Scoop Cup': 65
  };

  const itemPrice = prices[selectedFormat] || 249;
  const totalPrice = itemPrice * quantity;

  const handlePlaceOrder = () => {
    sounds.playVictory();
    setIsOrdered(true);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.7 }
      });
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end select-none">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col justify-between overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-[#FF5500]">
              <ShoppingBag size={18} />
            </div>
            <div>
              <h3 className="text-xl font-black font-['Outfit',sans-serif] text-[#1A1412]">
                Order POPO
              </h3>
              <span className="text-[11px] font-bold text-stone-500">
                10-Minute Rapid Chill Delivery
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1">
          {isOrdered ? (
            <div className="text-center py-12 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <Check size={40} />
              </div>
              <h4 className="text-2xl font-black font-['Outfit',sans-serif] text-[#1A1412] mb-1">
                SCOOP INCOMING!
              </h4>
              <p className="text-sm text-stone-600 max-w-xs mb-6 font-medium">
                Your order for {quantity}x {currentFlavour.name} ({selectedFormat}) has been dispatched via {deliveryPartner}! Estimated chill time: 8-10 mins.
              </p>
              <button
                onClick={() => {
                  setIsOrdered(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-full bg-[#1A1412] text-white font-black text-xs uppercase tracking-wider"
              >
                Done
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Select Flavour */}
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-stone-700 block mb-2">
                  1. Select Flavour
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {FLAVOURS.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => {
                        sounds.playBubble();
                        setSelectedFlavourId(f.id);
                      }}
                      className={`p-2.5 rounded-2xl text-left border-2 transition-all flex items-center gap-2 ${
                        selectedFlavourId === f.id
                          ? 'border-[#FF5500] bg-orange-50/70 shadow-sm'
                          : 'border-stone-100 hover:border-orange-200 bg-stone-50'
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: f.colour }}
                      />
                      <span className="text-xs font-black text-[#1A1412] truncate">
                        {f.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Format */}
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-stone-700 block mb-2">
                  2. Choose Format
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Tub (500ml)', 'Waffle Cone', 'Gourmet Stick', 'Kulfi Bar'].map(
                    (fmt) => (
                      <button
                        key={fmt}
                        onClick={() => {
                          sounds.playBubble();
                          setSelectedFormat(fmt);
                        }}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                          selectedFormat === fmt
                            ? 'bg-[#1A1412] text-white shadow-sm'
                            : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                        }`}
                      >
                        {fmt} (₹{prices[fmt]})
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-stone-700 block mb-2">
                  3. Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-stone-200 rounded-full p-1 bg-stone-50">
                    <button
                      onClick={() => {
                        sounds.playBubble();
                        setQuantity((q) => Math.max(1, q - 1));
                      }}
                      className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center hover:bg-stone-100"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center font-black text-sm text-[#1A1412]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => {
                        sounds.playBubble();
                        setQuantity((q) => q + 1);
                      }}
                      className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center hover:bg-stone-100"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="text-xs font-semibold text-stone-500">
                    Subtotal: ₹{totalPrice}
                  </span>
                </div>
              </div>

              {/* Delivery Partner */}
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-stone-700 block mb-2">
                  4. Delivery Via
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Blinkit', 'Swiggy Instamart', 'Zepto', 'Zomato'].map(
                    (partner) => (
                      <button
                        key={partner}
                        onClick={() => {
                          sounds.playBubble();
                          setDeliveryPartner(partner);
                        }}
                        className={`p-2 rounded-xl text-xs font-bold border transition-all text-center ${
                          deliveryPartner === partner
                            ? 'border-[#FF5500] bg-orange-50 text-[#FF5500]'
                            : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        🛵 {partner}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isOrdered && (
          <div className="p-6 border-t border-stone-100 bg-stone-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-stone-600">Total Bill</span>
              <span className="text-2xl font-black font-['Outfit',sans-serif] text-[#1A1412]">
                ₹{totalPrice}
              </span>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#FF5500] to-[#FF3B66] text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>CONFIRM & CHILL NOW</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
