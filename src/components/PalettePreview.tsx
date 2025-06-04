"use client";

import { useState } from "react";
import { Copy, Stars } from "lucide-react";

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

  const handleGenerate = () => {
    setPalette([...palette].sort(() => Math.random() - 0.5));
  };

  return (
    <aside className="relative z-30">
      {/* Wrap bars in a div */}
      <div>
        <div className="flex flex-row mb-10">
          {palette.map((color, idx) => {
            const rgb = hexToRgb(color);
            const hsl = rgbToHsl(rgb);
            const hsv = rgbToHsv(rgb);
            const cmyk = rgbToCmyk(rgb);

            // Track copy state for feedback (optional)
            const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

            const handleCopy = async (color: string, idx: number) => {
              try {
                await navigator.clipboard.writeText(color.toUpperCase());
                setCopiedIdx(idx);
                setTimeout(() => setCopiedIdx(null), 1000);
              } catch {}
            };

            return (
              <div
                key={color + idx}
                className="flex flex-col items-center relative group"
                onMouseEnter={e => {
                  setHoveredIdx(idx);
                  setPopupPos({ x: e.clientX + 24, y: e.clientY - 40 });
                }}
                onMouseLeave={() => setHoveredIdx(null)}
                onMouseMove={() => {}}
              >
                <button
                  className={`h-92 rounded-3xl shadow-xl transition-all duration-300 relative flex items-center justify-center outline-none
    w-32 ${hoveredIdx === idx ? "scale-105 w-40 z-10 shadow-gray-800/80" : ""}
    ${copiedIdx === idx ? "ring-4 ring-white ring-opacity-80 animate-glow" : ""}
  `}
                  style={{ background: color }}
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
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-3 -translate-y-16 flex flex-col items-center gap-2 bg-black backdrop-blur-md rounded-4xl shadow-lg px-10 py-6 z-50 animate-fade-in transition-all duration-300"
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