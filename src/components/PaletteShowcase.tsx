import React from "react";

export default function PaletteShowcase({ colors }: { colors: string[] }) {
  // Fallbacks in case palette has fewer than 5 colors
  const [c1, c2, c3, c4, c5] = [
    colors[0] || "#eee",
    colors[1] || "#ccc",
    colors[2] || "#aaa",
    colors[3] || "#888",
    colors[4] || "#666",
  ];

  return (
    <svg
      viewBox="0 0 320 180"
      width={320}
      height={180}
      className="rounded-3xl shadow-lg"
      style={{ background: c1 }}
    >
      {/* Sky */}
      <rect x="0" y="0" width="320" height="100" fill={c1} />
      {/* Sun */}
      <circle cx="260" cy="40" r="24" fill={c2} />
      {/* Mountain */}
      <polygon points="40,180 120,80 200,180" fill={c3} />
      {/* Foreground hill */}
      <ellipse cx="160" cy="170" rx="120" ry="30" fill={c4} />
      {/* Water or road */}
      <rect x="0" y="150" width="320" height="30" fill={c5} />
    </svg>
  );
}