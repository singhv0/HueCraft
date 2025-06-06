"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

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
            flex items-center justify-center  
            ${hovered 
              ? "bg-gradient-to-r from-[#ffbe0b] via-[#fb5607] via-[#ff006e] via-[#8338ec] to-[#3a86ff] animate-gradient-move saturate-150 scale-100 w-45"
              : "bg-black w-40"
            }
          `}
          style={{
            backgroundSize: hovered ? "200% 200%" : undefined,
            backgroundPosition: hovered ? "right center" : undefined,
          }}
          onClick={() => router.push("/gallery")}
        >
          {/* Centered Explore text */}
          <span className="relative z-10 w-full text-center transition-all duration-300">
            Explore
          </span>
          {/* Animated Arrow appears only on hover, slides in from center to right */}
          <span
            className={`
              absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-300
              ${hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}
              flex items-center
            `}
          >
            <ArrowRight size={22} className="text-white" />
          </span>
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
      <p className="text-sm text-black max-w-md mt-20">
        Design your vibe with hues that inspire and palettes that impress.
      </p>
    </section>
  );
}

// Add this to your globals.css or a CSS file for the fade-in animation if you want:
// .animate-fade-in { animation: fadeIn 0.2s ease; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(8px);} to { opacity: 1; transform: translateY(0);} }