"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

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

  const handleGenerate = () => {
    setPalette([...palette].sort(() => Math.random() - 0.5));
  };

  return (
    <aside className="fixed top-32 right-4 md:right-16 flex flex-col items-end z-30">
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
  `}
                style={{ background: color }}
                title={color}
                tabIndex={0}
                onClick={() => handleCopy(color, idx)}
              >
                {/* Copy icon appears on hover, now on the left */}
                <span
                  className={`
      absolute left-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-2
      ${hoveredIdx === idx ? "opacity-100" : ""}
    `}
                >
                  {copiedIdx === idx ? (
                    <span className="text-xs text-white px-2">Copied!</span>
                  ) : (
                    <Copy size={18} className="text-white" />
                  )}
                </span>
                {/* HEX code centered on the bar */}
                <span
                  className={`
    absolute inset-0 flex items-center justify-center font-lexend text-white text-sm font-light drop-shadow
    transition-opacity duration-200
    ${hoveredIdx === idx ? "opacity-100" : "opacity-0"}
  `}
                  style={{ pointerEvents: "none" }}
                >
                  {color.toUpperCase()}
                </span>
              </button>
              {hoveredIdx === idx && (
                <div
                  className="fixed flex flex-col items-center gap-2 bg-black/95 backdrop-blur-md rounded-4xl shadow-lg px-10 py-6 z-50 animate-fade-in transition-all duration-300"
                  style={{
                    left: popupPos.x,
                    top: popupPos.y,
                    minWidth: '15.5rem',
                    pointerEvents: 'none',
                  }}
                >
                  <span className="text-white text-sm font-lexend font-semibold mb-1">Color Details</span>
                  <div className="text-xs text-white font-lexend text-left select-all space-y-3">
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
      <button
        onClick={handleGenerate}
        className="px-6 py-2 rounded-2xl font-light bg-black text-white hover:bg-gray-800 transition"
      >
        Generate
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