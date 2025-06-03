import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "transparent" }}>
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
