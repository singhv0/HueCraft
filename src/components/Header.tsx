"use client";

import { useState } from "react";

export default function Header() {
  const [hovered, setHovered] = useState(false);

  return (
    <header className="w-full py-10 flex items-center justify-between">
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
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 rounded-2xl text-black hover:bg-gray-100 transition">Tools</button>
        <span className="h-6 w-px bg-gray-300"></span>
        <button className="px-4 py-2 rounded-2xl text-black hover:bg-gray-100 transition">Sign in</button>
        <button className="px-4 py-2 rounded-2xl bg-black text-white font-light hover:bg-gray-800 transition">Sign up</button>
      </div>
    </header>
  );
}