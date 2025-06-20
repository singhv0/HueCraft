"use client";

import { useState } from "react";
import { Copy, Stars } from "lucide-react";
import { CATEGORIZED_PALETTES } from "../data/categorized-palettes";

const DEFAULT_COLORS = [
  "#ffbe0b", // amber
  "#fb5607", // orange-pantone
  "#ff006e", // rose
  "#8338ec", // blue-violet
  "#3a86ff", // azure
];

export default function PalettePreview({ colors = DEFAULT_COLORS }: { colors?: string[] }) {
  const [palette, setPalette] = useState(colors);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [popupPos, setPopupPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [generateHovered, setGenerateHovered] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null); // <-- Move here

  const handleGenerate = () => {
    // Flatten all palettes into one array
    const allPalettes = CATEGORIZED_PALETTES.flatMap(cat => cat.palettes);
    // Pick a random palette
    const randomPalette = allPalettes[Math.floor(Math.random() * allPalettes.length)];
    setPalette(randomPalette);
  };

  const handleCopy = async (color: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(color.toUpperCase());
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1000);
    } catch {}
  };

  return (
    <aside className="relative z-30">
      <div>
        <div
          className="flex flex-row mb-6 pr-6 mx-auto rounded-3xl"
          style={{
            height: "21rem",
            width: "45rem",
            boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.2)" // right & down
          }}
        >
          {palette.map((color, idx) => {
            const rgb = hexToRgb(color);
            const hsl = rgbToHsl(rgb);
            const hsv = rgbToHsv(rgb);
            const cmyk = rgbToCmyk(rgb);

            // Determine border radius
            let rounded = "";
            if (idx === 0) rounded = "rounded-l-3xl";
            else if (idx === palette.length - 1) rounded = "rounded-r-3xl";

            return (
              <div
                key={color + idx}
                className={`
                  group relative transition-all duration-300
                  ${rounded}
                  ${hoveredIdx === idx ? "z-15" : ""}
                  flex-1
                `}
                style={{
                  flexGrow: hoveredIdx === idx ? 2 : 1,
                  transition: "flex-grow 0.3s cubic-bezier(.4,2,.6,1), z-index 0s",
                  height: "100%",
                }}
                onMouseEnter={e => {
                  setHoveredIdx(idx);
                  setPopupPos({ x: e.clientX + 24, y: e.clientY - 40 });
                }}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <button
                  className={`
                  h-full w-full transition-all duration-300
                  ${rounded}
                  shadow-none
                  relative flex items-center justify-center outline-none
                  ${copiedIdx === idx ? "ring-20 ring-opacity-50 animate-glow" : ""}
                `}
                  style={{
                    background: color,
                    // Dynamically set ring color when copied
                    ...(copiedIdx === idx ? { boxShadow: `0 0 0 4px ${color}CC` } : {})
                  }}
                  title={color}
                  tabIndex={0}
                  onClick={() => handleCopy(color, idx)}
                >
                  {/* Copy icon appears on hover, now on the left */}
                  <span
                    className={`
    absolute left-2 top-2 transition-opacity p-2
    ${hoveredIdx === idx ? "opacity-100" : "opacity-0"}
    pointer-events-none
  `}
                  >
                    <span className="relative block w-6 h-6">
                      <Copy
                        size={18}
                        className={`text-white absolute inset-0 transition-transform duration-300
        ${copiedIdx === idx ? "scale-0 rotate-45 opacity-0" : "scale-100 opacity-100"}
      `}
                      />
                      {/* Animated checkmark */}
                      <svg
                        className={`
        absolute inset-0 w-6 h-6 text-white transition-all duration-300
        ${copiedIdx === idx ? "opacity-100 scale-100" : "opacity-0 scale-50"}
      `}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </span>
                  {/* HEX code centered on the bar */}
                  <span
                    className={`
    absolute inset-0 flex items-center justify-center font-lexend text-white text-sm font-light drop-shadow
    transition-opacity duration-200
    ${hoveredIdx === idx ? "opacity-100" : "opacity-0"}
  `}
                  >
                    {color.toUpperCase()}
                  </span>
                </button>
                {/* Color details window below the bar */}
                {hoveredIdx === idx && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-3 -translate-y-16 flex flex-col items-center gap-2 bg-black backdrop-blur-md rounded-4xl shadow-lg px-10 py-6 z-[100] animate-fade-in transition-all duration-300"
                    style={{
                      minWidth: '15.5rem',
                      pointerEvents: 'none',
                    }}
                  >
                    {/* <span className="text-white text-sm font-lexend font-semibold mb-1">Color Details</span> */}
                    <div className="text-xs text-white font-lexend text-left select-all space-y-3 ml-2">
                      <div>HEX: {color.toUpperCase()}</div>
                      <div>RGB: {`rgb(${rgb.join(", ")})`}</div>
                      <div>CMYK: {`cmyk(${cmyk.join(", ")})`}</div>
                      <div>HSV: {`hsv(${hsv.join(", ")})`}</div>
                      <div>HSL: {`hsl(${hsl.join(", ")})`}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={handleGenerate}
        className={`
          px-6 py-2 rounded-2xl font-light bg-black text-white transition-all duration-300
          flex items-center justify-center gap-2 relative overflow-hidden
          ${generateHovered ? "scale-105 shadow-lg w-40" : "w-32"}
        `}
        onMouseEnter={() => setGenerateHovered(true)}
        onMouseLeave={() => setGenerateHovered(false)}
      >
        {/* Left star */}
        <span
          className={`
            absolute left-5 top-1/2 -translate-y-1/2 transition-all duration-300
            ${generateHovered ? "opacity-100 -translate-x-1" : "opacity-0 translate-x-0"}
          `}
        >
          <Stars size={18} className="text-white drop-shadow" />
        </span>
        {/* Generate text */}
        <span className="relative z-10 transition-all duration-300">
          Generate
        </span>
        {/* Right star */}
        <span
          className={`
            absolute right-5 top-1/2 -translate-y-1/2 transition-all duration-300
            ${generateHovered ? "opacity-100 translate-x-1" : "opacity-0 translate-x-0"}
          `}
        >
          <Stars size={18} className="text-white drop-shadow" />
        </span>
      </button>
    </aside>
  );
}

// Simple HEX to RGB
function hexToRgb(hex: string) {
  const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.replace('#', ''));
  return res ? [
    parseInt(res[1], 16),
    parseInt(res[2], 16),
    parseInt(res[3], 16)
  ] : [0, 0, 0];
}

// RGB to HSL
function rgbToHsl([r, g, b]: number[]) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [
    Math.round(h * 360),
    Math.round(s * 100),
    Math.round(l * 100)
  ];
}

// RGB to HSV
function rgbToHsv([r, g, b]: number[]) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0, s = max === 0 ? 0 : d / max, v = max;
  if (max !== min) {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [
    Math.round(h * 360),
    Math.round(s * 100),
    Math.round(v * 100)
  ];
}

// RGB to CMYK
function rgbToCmyk([r, g, b]: number[]) {
  r /= 255; g /= 255; b /= 255;
  const k = 1 - Math.max(r, g, b);
  if (k === 1) return [0, 0, 0, 100];
  const c = ((1 - r - k) / (1 - k)) * 100;
  const m = ((1 - g - k) / (1 - k)) * 100;
  const y = ((1 - b - k) / (1 - k)) * 100;
  return [
    Math.round(c),
    Math.round(m),
    Math.round(y),
    Math.round(k * 100)
  ];
}