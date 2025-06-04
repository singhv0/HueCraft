"use client";

import { useState } from "react";
import Logo3D from "./Logo3D"; // Add this import

export default function Header() {
  const [hovered, setHovered] = useState(false);
  const [signupHovered, setSignupHovered] = useState(false); // Add this line

  return (
    <header className="w-full py-10 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Logo3D />
        <h1
          className={`
            text-2xl font-semibold transition-all duration-300
            ${hovered
              ? "bg-gradient-to-r from-[#ffbe0b] via-[#fb5607] via-[#ff006e] via-[#8338ec] to-[#3a86ff] bg-clip-text text-transparent animate-gradient-move"
              : "text-black"
            }
          `}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            backgroundSize: hovered ? "200% 200%" : undefined,
            backgroundPosition: hovered ? "right center" : undefined,
          }}
        >
          HueCraft
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 rounded-2xl text-black hover:bg-gray-100 transition">Tools</button>
        <span className="h-6 w-px bg-gray-300"></span>
        <button className="px-4 py-2 rounded-2xl text-black hover:bg-gray-100 transition">Sign in</button>
        <button
          className={`
            px-4 py-2 rounded-2xl font-light transition-all duration-450 outline-none overflow-hidden relative z-10
            text-white
            ${signupHovered
              ? "bg-gradient-to-r from-[#ffbe0b] via-[#fb5607] via-[#ff006e] via-[#8338ec] to-[#3a86ff] animate-gradient-move saturate-150 scale-110"
              : "bg-black"
            }
          `}
          style={{
            backgroundSize: signupHovered ? "200% 200%" : undefined,
            backgroundPosition: signupHovered ? "right center" : undefined,
          }}
          onMouseEnter={() => setSignupHovered(true)}
          onMouseLeave={() => setSignupHovered(false)}
        >
          Sign up
        </button>
      </div>
    </header>
  );
}