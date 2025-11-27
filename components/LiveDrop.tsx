import React, { useState, useRef, useEffect } from 'react';
import { Check, ArrowRight, Lock, Loader2 } from 'lucide-react';

interface Slot {
  id: number;
  status: 'sold' | 'open';
  price: number;
  brand?: string;
}

const getNextFriday = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sun) - 6 (Sat)
  const daysUntilFriday = (5 - dayOfWeek + 7) % 7;
  const nextFriday = new Date(today);
  nextFriday.setDate(today.getDate() + (daysUntilFriday === 0 ? 0 : daysUntilFriday));
  return nextFriday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Static single drop data
const WEEKLY_DROP = {
  id: 1,
  title: "The Weekly Mix (Generic)",
  badge: "🟢 Boarding Now",
  badgeColor: "bg-brand-green/10 text-brand-green-dark border-brand-green/20",
  buttonText: "Claim Slot ($99)",
  slots: [
    { id: 1, status: 'sold', price: 99, brand: 'Reserved' },
    { id: 2, status: 'open', price: 99 },
    { id: 3, status: 'open', price: 99 },
    { id: 4, status: 'open', price: 99 },
  ] as Slot[]
};

export const LiveDrop: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [nextFridayDate, setNextFridayDate] = useState("");

  useEffect(() => {
    setNextFridayDate(getNextFriday());
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;

    setIsLoading(true);

    // Simulate processing
    setTimeout(() => {
      setIsLoading(false);
      window.open('https://book.stripe.com/aFafZadjE3050Wh4Bq5Vu00', '_blank');
    }, 800);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-10 perspective-1000 font-sans">
      {/* Main Card with Spotlight */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="spotlight-card w-full bg-white rounded-xl border border-neutral-lighter shadow-2xl shadow-neutral-darkest/5 overflow-hidden transition-all duration-500 group"
      >
        <div className="animate-[slideUpFade_0.5s_ease-out]">
          {/* Card Header */}
          <div className="bg-neutral-lightest/30 border-b border-neutral-lighter px-6 py-5 flex flex-col gap-4 relative overflow-hidden">

            {/* Top Row: Badge */}
            <div className="flex items-center justify-between relative z-10">
              <div className={`flex items-center gap-2 px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wide ${WEEKLY_DROP.badgeColor}`}>
                <span className="relative flex h-2 w-2 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
                </span>
                {WEEKLY_DROP.badge}
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="font-bold text-neutral-darkest text-xl tracking-tight leading-tight">{WEEKLY_DROP.title}</h3>
              <p className="text-sm text-neutral-dark mt-1 font-medium">
                Next Dispatch: Friday, {nextFridayDate}
              </p>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 bg-white relative min-h-[300px] flex flex-col justify-between">

            {/* Slots */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {WEEKLY_DROP.slots.map((slot, idx) => {
                const isSold = slot.status === 'sold';
                const isSelected = selectedSlot === slot.id;

                return (
                  <button
                    key={slot.id}
                    disabled={isSold || isLoading}
                    onClick={() => setSelectedSlot(slot.id)}
                    style={{ animationDelay: `${idx * 50}ms` }}
                    aria-label={`Slot ${slot.id}, ${isSold ? 'Sold' : 'Open, price $' + slot.price}`}
                    className={`
                    relative flex flex-col p-4 rounded-lg border-2 text-left transition-all duration-200 overflow-hidden
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                    animate-[slideUpFade_0.5s_ease-out_backwards]
                    ${isSold
                        ? 'border-neutral-lightest bg-neutral-lightest/30 border-dashed cursor-not-allowed opacity-60'
                        : isSelected
                          ? 'border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20'
                          : 'border-neutral-lighter bg-white hover:border-neutral-dark hover:bg-neutral-lightest/30'
                      }
                    `}
                  >
                    {isSelected && (
                      <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                    )}

                    <div className="flex justify-between items-start w-full mb-3">
                      <span className={`
                        text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full
                        ${isSold ? 'text-neutral-500 bg-neutral-100' : 'text-brand-green-dark bg-brand-green/10'}
                    `}>
                        {isSold ? 'Filled' : 'Available'}
                      </span>
                      {isSold ? (
                        <Lock size={14} className="text-neutral-light" aria-hidden="true" />
                      ) : (
                        <div className={`
                            w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-300
                            ${isSelected ? 'bg-primary border-primary scale-110' : 'border-neutral-300'}
                        `}>
                          {isSelected && <Check size={10} className="text-white" />}
                        </div>
                      )}
                    </div>

                    <div className="mt-auto pl-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold tracking-tight ${isSold ? "text-neutral-light line-through" : "text-neutral-darkest"}`}>
                          Slot {slot.id}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-neutral-dark truncate">
                        {isSold ? `Reserved` : `$${slot.price} Flat Rate`}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-lighter">
              <div className="text-sm text-neutral-dark w-full sm:w-auto">
                <div className="flex gap-3 items-center justify-center sm:justify-start">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full bg-neutral-lighter border-2 border-white overflow-hidden shadow-sm relative z-0 hover:z-10 transition-all hover:scale-110">
                        <img src={`https://picsum.photos/32/32?random=${WEEKLY_DROP.id * 10 + i}`} alt="" className="w-full h-full object-cover grayscale opacity-90" />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-medium text-neutral-dark">
                    {selectedSlot ? "Slot Selected" : "Limited Availability"}
                  </span>
                </div>
              </div>

              <div className="w-full sm:w-auto">
                <button
                  onClick={handleActionClick}
                  disabled={isLoading || !selectedSlot}
                  className={`
                            relative overflow-hidden group flex items-center justify-center gap-2 px-8 py-3 rounded-md font-bold text-sm tracking-wide transition-all duration-300 w-full sm:w-auto
                            bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                            disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
                        `}
                >
                  {isLoading ? (
                    <span className="relative z-10 flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Processing</span>
                  ) : (
                    <>
                      <span className="relative z-10">
                        {selectedSlot
                          ? `Confirm Slot ${selectedSlot}`
                          : WEEKLY_DROP.buttonText}
                      </span>
                      <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
