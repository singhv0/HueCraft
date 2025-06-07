"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import PaletteBox from "@/components/PaletteBox";
import { CATEGORIZED_PALETTES } from "@/data/categorized-palettes";
import { Stars, Eye, Bookmark, MoreHorizontal } from "lucide-react";
import { Dialog } from "@headlessui/react";

export default function PaletteEditPage() {
  const searchParams = useSearchParams();
  const colorsParam = searchParams.get("colors");
  const initialColors = colorsParam ? colorsParam.split(",") : [];

  // Local state for palette editing/generation
  const [palette, setPalette] = useState<string[]>(initialColors);
  const [generateHovered, setGenerateHovered] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copiedTailwind, setCopiedTailwind] = useState(false);
  const [bookmarkPopping, setBookmarkPopping] = useState(false);

  // Generate a random palette from all palettes
  const handleGenerate = () => {
    const allPalettes = CATEGORIZED_PALETTES.flatMap((cat) => cat.palettes);
    const randomPalette = allPalettes[Math.floor(Math.random() * allPalettes.length)];
    setPalette(randomPalette);
  };

  return (
    <div className="flex flex-col min-h-screen px-4 md:px-16 bg-gray-50">
      <Header />
      <main className="flex-0 flex flex-col items-center justify-center h-full">
        <div className="w-full max-w-8xl flex flex-col items-center">
          {/* Horizontal bar with centered icons */}
          <div className="w-full max-w-xl flex justify-center mb-4">
            <div className="bg-gray-200 rounded-2xl flex flex-row items-center justify-center gap-2 px-6 py-2 w-full">
              {/* Eye icon for view */}
              <button
                className="transition hover:bg-gray-100 rounded-full p-1.5"
                title="View Palette Details"
                onClick={() => setDialogOpen(true)}
              >
                <Eye size={18} className="text-black" />
              </button>
              {/* Bookmark icon */}
              <button
                className={`transition hover:bg-gray-100 rounded-full p-1.5 ${bookmarked ? "bg-gray-200" : ""}`}
                title="Bookmark Palette"
                onClick={() => {
                  setBookmarked((b) => !b);
                  setBookmarkPopping(true);
                  setTimeout(() => setBookmarkPopping(false), 350);
                }}
              >
                <Bookmark
                  size={18}
                  className={`text-black transition-all duration-300 ${bookmarked ? "scale-125" : "scale-100"}`}
                  fill={bookmarked ? "#000" : "none"}
                  style={{ transitionTimingFunction: "cubic-bezier(.4,2,.6,1)" }}
                />
              </button>
              {/* 3-dot icon */}
              <button
                className="transition hover:bg-gray-100 rounded-full p-1.5"
                title="Copy Tailwind CSS classes"
                onClick={async () => {
                  const tailwind = palette.map((c) => `bg-[${c}]`).join(" ");
                  try {
                    await navigator.clipboard.writeText(tailwind);
                    setCopiedTailwind(true);
                    setTimeout(() => setCopiedTailwind(false), 1200);
                  } catch {}
                }}
              >
                <MoreHorizontal size={18} className="text-black" />
              </button>
            </div>
          </div>
          <PaletteBox
            colors={palette}
            height="24rem"
            showLayoutPanelLeft={false}
          />
          <button
            onClick={handleGenerate}
            className={`
              mt-8 px-6 py-2 rounded-2xl font-light bg-black text-white transition-all duration-300
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
            <span className="relative z-10 transition-all duration-300">Generate</span>
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
        </div>
        {/* Dialog for color details */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} className="fixed z-50 inset-0 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
          <Dialog.Panel className="relative bg-white rounded-4xl shadow-xl p-6 max-w-lg w-full z-50">
            <div className="flex flex-col gap-6">
              {palette.map((color, idx) => {
                // Convert to RGB/HSL
                const rgb = hexToRgb(color);
                const hsl = rgbToHsl(rgb);
                return (
                  <div key={color + idx} className="flex items-center gap-4">
                    <span className="block w-8 h-8 rounded-full" style={{ background: color }} />
                    <span className="font-mono">{color.toUpperCase()}</span>
                    <span className="text-gray-500 text-xs">RGB: {rgb.join(", ")}</span>
                    <span className="text-gray-500 text-xs">HSL: {hsl.map(n => Math.round(n)).join(", ")}</span>
                  </div>
                );
              })}
            </div>
          </Dialog.Panel>
        </Dialog>
      </main>
    </div>
  );
}

// Helper functions (copy from PalettePreview if needed)
function hexToRgb(hex: string) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) hex = hex.split("").map(x => x + x).join("");
  const num = parseInt(hex, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}
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
  return [h * 360, s * 100, l * 100];
}