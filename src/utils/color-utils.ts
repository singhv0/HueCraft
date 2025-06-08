// Utility to generate a random color near a given hex color
export function randomColorNear(hex: string): string {
  // Convert hex to RGB
  let c = hex.replace(/^#/, "");
  if (c.length === 3) c = c.split("").map(x => x + x).join("");
  let r = parseInt(c.slice(0, 2), 16);
  let g = parseInt(c.slice(2, 4), 16);
  let b = parseInt(c.slice(4, 6), 16);

  // Randomly vary each channel by -32 to +32, clamp to 0-255
  const vary = (v: number) => Math.max(0, Math.min(255, v + Math.floor(Math.random() * 65) - 32));
  r = vary(r);
  g = vary(g);
  b = vary(b);

  // Convert back to hex
  return (
    "#" +
    r.toString(16).padStart(2, "0") +
    g.toString(16).padStart(2, "0") +
    b.toString(16).padStart(2, "0")
  );
}