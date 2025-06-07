"use client";
import { useState } from "react";
import { Copy, MoreHorizontal, Bookmark, LayoutPanelLeft, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PaletteBox({
  colors,
  height = "4rem",
  onApply,
  showLayoutPanelLeft = true,
  isShowcaseOpen = false,
  isActive = false,
  textColor,
  onEdit,
  onView,
}: {
  colors: string[];
  height?: string;
  onApply?: () => void;
  showLayoutPanelLeft?: boolean;
  isShowcaseOpen?: boolean;
  isActive?: boolean;
  textColor?: "black";
  onEdit?: () => void;
  onView?: () => void;
}) {
  const router = useRouter();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedTailwind, setCopiedTailwind] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkPopping, setBookmarkPopping] = useState(false);
  const [layoutPopping, setLayoutPopping] = useState(false);

  const handleCopy = async (color: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(color.toUpperCase());
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1000);
    } catch {}
  };

  // Copy Tailwind CSS palette as a string like: "bg-[#ffbe0b] bg-[#fb5607] ..."
  const handleCopyTailwind = async () => {
    const tailwind = colors.map((c) => `bg-[${c}]`).join(" ");
    try {
      await navigator.clipboard.writeText(tailwind);
      setCopiedTailwind(true);
      setTimeout(() => setCopiedTailwind(false), 1200);
    } catch {}
  };

  const handleBookmarkClick = () => {
    setBookmarked((b) => !b);
    setBookmarkPopping(true);
    setTimeout(() => setBookmarkPopping(false), 350); // match duration-300
  };

  const handleLayoutClick = () => {
    if (isShowcaseOpen && isActive) {
      // If open and this palette is active, hide the showcase
      if (onApply) onApply(); // onApply should handle toggling showcase off
    } else {
      // Otherwise, open and apply this palette
      if (onApply) onApply();
    }
    setLayoutPopping(true);
    setTimeout(() => setLayoutPopping(false), 350);
  };

  const handleEditClick = () => {
    router.push(`/palette-edit?colors=${colors.join(",")}`);
  };

  // Use black or white for text and icons
  const iconColor = textColor === "black" ? "#000" : "#fff";
  const textClass = textColor === "black" ? "text-black" : "text-white";

  return (
    <div className="relative w-full flex flex-col items-center" style={{ minHeight: height }}>
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
                onClick={() => handleCopy(color, idx)} // <-- Only copy, not apply
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
                      className={`absolute inset-0 transition-transform duration-300`}
                      color={iconColor} // <-- use black if needed
                      style={{
                        ...(copiedIdx === idx
                          ? { transform: "scale(0) rotate(45deg)", opacity: 0 }
                          : { transform: "scale(1)", opacity: 1 }),
                      }}
                    />
                    {/* Animated checkmark */}
                    <svg
                      className={`
                        absolute inset-0 w-6 h-6 transition-all duration-300
                        ${copiedIdx === idx ? "opacity-100 scale-100" : "opacity-0 scale-50"}
                      `}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={iconColor} // <-- use black if needed
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                </span>
                {/* HEX code centered on the bar */}
                <span
                  className={`
                    absolute inset-0 flex items-center justify-center font-lexend text-xs font-light drop-shadow
                    transition-opacity duration-200
                    ${hoveredIdx === idx ? "opacity-100" : "opacity-0"}
                    ${textClass} // <-- use black if needed
                  `}
                >
                  {color.toUpperCase()}
                </span>
              </button>
            </div>
          );
        })}
      </div>
      {/* Icon bar below the palette box (now only rendered if showLayoutPanelLeft is true) */}
      {showLayoutPanelLeft && (
        <div className="flex flex-row items-center justify-center gap-4 mt-2 w-full px-2">
          {/* Showcase icon */}
          <button
            className="p-2 rounded-xl transition"
            onClick={handleLayoutClick}
            title={isShowcaseOpen && isActive ? "Hide Showcase" : "Showcase this palette"}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <LayoutPanelLeft
              size={16}
              strokeWidth={2.1}
              fill={isShowcaseOpen && isActive ? "#000" : "none"}
              className={`
                transition-all
                duration-300
                ${isShowcaseOpen && isActive ? "text-black" : "text-black"}
                ${layoutPopping ? "scale-125" : "scale-100"}
              `}
              style={{
                transitionTimingFunction: "cubic-bezier(.4,2,.6,1)",
              }}
            />
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
          {/* Edit (pencil) icon */}
          {onEdit && (
            <button
              className="transition hover:bg-gray-100 rounded-full p-1.5"
              title="Edit Palette"
              onClick={handleEditClick}
            >
              <Pencil size={18} className="text-black" />
            </button>
          )}
          {/* 3-dot icon */}
          <button
            className="transition hover:bg-gray-100 rounded-full p-1.5"
            title="Copy Tailwind CSS classes"
            onClick={handleCopyTailwind}
          >
            <MoreHorizontal size={18} className="text-black" />
          </button>
        </div>
      )}
      {/* Feedback */}
      {copiedTailwind && (
        <span className="absolute bottom-0 right-69 text-zinc-500 text-xs px-4 py-1 z-50 fade-in-out">
          Tailwindcss Copied!
        </span>
      )}
    </div>
  );
}