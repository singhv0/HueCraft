"use client";
import { useState } from "react";

export default function PaletteBox({ colors, height = "4rem" }: { colors: string[], height?: string }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

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
            >
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