"use client";

import { useState } from "react";

export default function Hero() {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="w-full py-2 mt-8 flex flex-col items-start text-left">
      <h2 className="text-6xl font-semibold mb-8 max-w-lg">
        Color Suggestions That Just Make Sense
      </h2>
      <div
        className="relative mb-8"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <button
          className={`
            px-6 py-2 rounded-2xl antialiased relative z-10
            text-white font-light
            transition-all duration-450
            outline-none
            overflow-hidden
            ${hovered 
              ? "bg-gradient-to-r from-[#ffbe0b] via-[#fb5607] via-[#ff006e] via-[#8338ec] to-[#3a86ff] animate-gradient-move saturate-150 scale-110"
              : "bg-black"
            }
          `}
          style={{
            backgroundSize: hovered ? "200% 200%" : undefined,
            backgroundPosition: hovered ? "right center" : undefined,
          }}
        >
          Explore
        </button>
        {hovered && (
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-6 flex flex-col items-center gap-3 bg-white/0 backdrop-blur-md border border-gray-400 rounded-2xl shadow-lg px-8 py-6 z-20 animate-fade-in">
            <span className="text-black text-lg font-medium mb-2">Finding palette</span>
            <div className="flex items-end gap-1 h-8">
              <span className="bar-animation block w-2 h-4 bg-black rounded-sm animate-bar1"></span>
              <span className="bar-animation block w-2 h-7 bg-black rounded-sm animate-bar2"></span>
              <span className="bar-animation block w-2 h-6 bg-black rounded-sm animate-bar3"></span>
              <span className="bar-animation block w-2 h-5 bg-black rounded-sm animate-bar4"></span>
              <span className="bar-animation block w-2 h-8 bg-black rounded-sm animate-bar5"></span>
            </div>
          </div>
        )}
      </div>
      <p className="text-sm text-black max-w-md mt-24">
        Design your vibe with hues that inspire and palettes that impress.
      </p>
    </section>
  );
}

// Add this to your globals.css or a CSS file for the fade-in animation if you want:
// .animate-fade-in { animation: fadeIn 0.2s ease; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(8px);} to { opacity: 1; transform: translateY(0);} }