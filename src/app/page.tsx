import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PalettePreview from "@/components/PalettePreview";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen px-4 md:px-16" style={{ background: "transparent" }}>
      <Header />
      <main className="flex-1 flex flex-col md:flex-row items-center md:items-start justify-center gap-8">
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <Hero />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <PalettePreview />
        </div>
      </main>
      <div className="fixed bottom-0 left-0 w-full h-2 overflow-hidden flex shadow-md z-50">
        <div className="flex-2 bg-[#2D3142]" />
        <div className="flex-3 bg-[#5BC0BE]" />
      </div>
    </div>
  );
}
