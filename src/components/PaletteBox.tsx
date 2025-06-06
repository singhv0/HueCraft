"use client";
import { useState } from "react";
import { Copy } from "lucide-react";

export default function PaletteBox({ colors, height = "4rem" }: { colors: string[], height?: string }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
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
      className="flex flex-row w-full rounded-3xl bg-gray-100"
      style={{
        height,
        boxShadow: "0 0 24px 0 rgba(0,0,0,0.10)",
      }}
    >
      {colors.map((color, idx) => {
        let rounded = "";
        if (idx === 0) rounded = "rounded-l-3xl";
        else if (idx === colors.length - 1) rounded = "rounded-r-3xl";
        return (
          <div
            key={color + idx}
            className={`
              group relative transition-all duration-300
              ${rounded}
              ${hoveredIdx === idx ? "z-10" : ""}
              flex-1
            `}
            style={{
              flexGrow: hoveredIdx === idx ? 2 : 1,
              transition: "flex-grow 0.3s cubic-bezier(.4,2,.6,1), z-index 0s",
              height: "100%",
            }}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <button
              className={`
                h-full w-full transition-all duration-300
                ${rounded}
                shadow-none
                relative flex items-center justify-center outline-none
              `}
              style={{ background: color }}
              tabIndex={0}
              title="Copy HEX"
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
                    size={14}
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
                  absolute inset-0 flex items-center justify-center font-lexend text-white text-xs font-light drop-shadow
                  transition-opacity duration-200
                  ${hoveredIdx === idx ? "opacity-100" : "opacity-0"}
                `}
              >
                {color.toUpperCase()}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}