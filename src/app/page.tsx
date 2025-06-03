import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PalettePreview from "@/components/PalettePreview";
// import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen px-4 md:px-16" style={{ background: "transparent" }}>
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        <Hero />
        <PalettePreview />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
