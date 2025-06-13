"use client";
import React, { useState } from "react";
import { Copy, MoreHorizontal, Bookmark, LayoutPanelLeft, Pencil, Plus, Minus, GripVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps {
  color: string;
  idx: number;
  showDragHandle: boolean;
  pendingIdx?: number;
  staticAnimation?: boolean;
  hoveredIdx: number | string | null;
  setHoveredIdx: (value: number | string | null) => void;
  onRemoveColor?: (idx: number) => void;
  onAddColorBetween?: (idx: number) => void;
  colors: string[];
  iconColor: string;
  textClass: string;
  copiedIdx: number | null;
  handleCopy: (color: string, idx: number) => void;
}

function SortableItem({ 
  color, 
  idx, 
  showDragHandle,
  pendingIdx,
  staticAnimation,
  hoveredIdx,
  setHoveredIdx,
  onRemoveColor,
  onAddColorBetween,
  colors,
  iconColor,
  textClass,
  copiedIdx,
  handleCopy
}: SortableItemProps) {
  const sortable = showDragHandle 
    ? useSortable({
        id: color + idx,
        animateLayoutChanges: defaultAnimateLayoutChanges,
      })
    : {
        attributes: {},
        listeners: {},
        setNodeRef: () => {},
        transform: null,
        transition: undefined,
        isDragging: false
      };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = sortable;

  return (
    <React.Fragment key={color + idx}>
      <div
        ref={showDragHandle ? setNodeRef : undefined}
        className={`
          group relative
          transition-[flex-grow] duration-200
          ${idx === 0 ? "rounded-l-3xl" : ""}
          ${idx === colors.length - 1 ? "rounded-r-3xl" : ""}
          flex-1
        `}
        style={{
          flexGrow:
            typeof pendingIdx === "number" && pendingIdx === idx
              ? 0
              : staticAnimation
              ? 1
              : hoveredIdx === idx
              ? 2
              : 1,
          transition: showDragHandle && transform
            ? (transition || "transform 350ms cubic-bezier(.22,1,.36,1)")
            : "flex-grow 350ms cubic-bezier(.4,2,.6,1)",
          height: "100%",
          marginRight: 0,
          ...(showDragHandle && transform
            ? {
                transform: CSS.Transform.toString(transform),
              }
            : {}),
          zIndex: isDragging ? 50 : "auto",
        }}
        onMouseEnter={() => setHoveredIdx(idx)}
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {/* --- Drag Handle: Sibling, not inside button --- */}
        {showDragHandle && (
          <button
            type="button"
            tabIndex={-1}
            className={`
              absolute left-1/2 top-35 -translate-x-1/2 z-50 p-0 m-0 cursor-grab
              transition-opacity duration-200
              ${hoveredIdx === idx ? "opacity-100" : "opacity-0"}
            `}
            title="Drag to reorder"
            style={{ background: "none", pointerEvents: "auto" }}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            {...attributes}
            {...listeners}
          >
            <GripVertical size={18} className="text-white" />
          </button>
        )}

        {/* --- Main Color Button --- */}
        <button
          className={`
            h-full w-full transition-all duration-300
            ${idx === 0 ? "rounded-l-3xl" : ""}
            ${idx === colors.length - 1 ? "rounded-r-3xl" : ""}
            shadow-none
            relative flex items-center justify-center outline-none
          `}
          style={{ background: color }}
          tabIndex={0}
          title="Copy HEX"
          onClick={() => handleCopy(color, idx)}
        >
          {/* Minus icon at the center of the color bar */}
          {onRemoveColor && colors.length > 2 && (
            <span
              className={`
                absolute z-40 top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2
                transition-opacity duration-200
                ${hoveredIdx === idx ? "opacity-100" : "opacity-0"}
              `}
            >
              <div
                className="p-1 transition flex items-center justify-center cursor-pointer"
                title="Remove color"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveColor(idx);
                }}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.stopPropagation();
                    onRemoveColor(idx);
                  }
                }}
                role="button"
                aria-label="Remove color"
              >
                <Minus size={18} className="text-white" />
              </div>
            </span>
          )}
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
                color={iconColor}
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
                stroke={iconColor}
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
              ${textClass}
            `}
          >
            {color.toUpperCase()}
          </span>
        </button>
      </div>
      {/* Plus icon between bars */}
      {onAddColorBetween && idx < colors.length - 1 && colors.length < 10 && (
        <div
          className="z-30 absolute group"
          style={{
            left: `calc(${((idx + 1) / colors.length) * 100}%)`,
            top: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "auto",
          }}
          onMouseEnter={() => setHoveredIdx(`plus-${idx}`)}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <button
            className={`
              p-1 rounded-full bg-white transition flex items-center justify-center
              ${hoveredIdx === `plus-${idx}` ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
              transition-opacity duration-200
            `}
            title="Add color between"
            onClick={() => onAddColorBetween(idx)}
            tabIndex={0}
            style={{
              pointerEvents: "auto",
            }}
            onFocus={() => setHoveredIdx(`plus-${idx}`)}
            onBlur={() => setHoveredIdx(null)}
          >
            <Plus size={18} />
          </button>
        </div>
      )}
    </React.Fragment>
  );
}

export default function PaletteBox({
  colors,
  height = "20rem", // Increased height for preview editor
  onApply,
  showLayoutPanelLeft = true,
  isShowcaseOpen = false,
  isActive = false,
  textColor,
  onEdit,
  onView,
  staticAnimation = false,
  onAddColorBetween,
  onRemoveColor, // <-- new prop
  animatedIdx, // <-- new prop
  pendingIdx,
  showDragHandle = false, // <-- add this
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
  staticAnimation?: boolean;
  onAddColorBetween?: (idx: number) => void;
  onRemoveColor?: (idx: number) => void; // <-- new prop type
  animatedIdx?: number; // <-- new prop type
  pendingIdx?: number;
  showDragHandle?: boolean; // <-- add this
}) {
  const router = useRouter();
  const [hoveredIdx, setHoveredIdx] = useState<number | string | null>(null);
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
      <div className="flex flex-row w-full rounded-3xl bg-gray-100 items-stretch relative" style={{ height, boxShadow: "0 0 24px 0 rgba(0,0,0,0.10)" }}>
  {colors.map((color, idx) => (
    <SortableItem
      key={color + idx}
      color={color}
      idx={idx}
      showDragHandle={showDragHandle}
      pendingIdx={pendingIdx}
      staticAnimation={staticAnimation}
      hoveredIdx={hoveredIdx}
      setHoveredIdx={setHoveredIdx}
      onRemoveColor={onRemoveColor}
      onAddColorBetween={onAddColorBetween}
      colors={colors}
      iconColor={iconColor}
      textClass={textClass}
      copiedIdx={copiedIdx}
      handleCopy={handleCopy}
    />
  ))}
</div>{/* Icon bar below the palette box (now only rendered if showLayoutPanelLeft is true) */}
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
            onClick={handleBookmarkClick}
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
      <svg
        width={20}
        height={20}
        viewBox="0 0 18 18"
        fill="none"
        className="text-white"
      >
        {[4, 9, 14].map((y) => (
          <React.Fragment key={y}>
            <circle cx={6} cy={y} r={1} fill="currentColor" />
            <circle cx={12} cy={y} r={1} fill="currentColor" />
          </React.Fragment>
        ))}
      </svg>
    </div>
  );
}