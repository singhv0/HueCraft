"use client";

import { useState } from "react";
import Logo3D from "./Logo3D";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [hovered, setHovered] = useState(false);
  const [signupHovered, setSignupHovered] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="w-full py-8 flex items-center justify-between relative">
      <div className="flex items-center gap-3">
        <Logo3D />
        <Link
          href="/"
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
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          HueCraft
        </Link>
      </div>
      <div className="flex items-center gap-4 relative">
        {/* Tools Dropdown */}
        <div className="relative">
          <button
            className="px-4 py-2 rounded-2xl text-black hover:bg-gray-100 transition flex items-center gap-1"
            onClick={() => setToolsOpen((open) => !open)}
            onBlur={() => setTimeout(() => setToolsOpen(false), 150)}
          >
            Tools
            <ChevronDown size={18} className="ml-1" />
          </button>
          {toolsOpen && (
            <div className="absolute left-0 mt-4 w-48 rounded-3xl shadow-lg z-50 flex flex-col px-2 py-2 gap-2 bg-white/30 backdrop-blur-md">
              <button
                className="text-left px-4 py-2 rounded-2xl hover:bg-white/40 transition"
                onClick={() => {
                  setToolsOpen(false);
                  router.push("/gallery");
                }}
              >
                Category
              </button>
              <button
                className="text-left px-4 py-2 rounded-2xl hover:bg-white/40 transition"
                onClick={() => {
                  setToolsOpen(false);
                  router.push("/palette-edit");
                }}
              >
                Edit Palette
              </button>
            </div>
          )}
        </div>
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