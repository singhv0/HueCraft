export default function Hero() {
  return (
    <section className="w-full py-2 mt-8 flex flex-col items-start text-left">
      <h2 className="text-6xl font-semibold mb-8 max-w-lg">
        Color Suggestions That Just Make Sense
      </h2>
      <button className="mb-8 px-6 py-2 bg-black text-white rounded-2xl antialiased hover:bg-gray-800 transition">
        Explore
      </button>
      <p className="text-sm text-black max-w-md mt-24">
        Design your vibe with hues that inspire and palettes that impress.
      </p>
      {/* Add call-to-action buttons or images here */}
    </section>
  );
}