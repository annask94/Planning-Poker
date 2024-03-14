import Hero from "@/components/Hero";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="hero flex flex-col min-h-screen justify-between">
      <Header />
      <Hero />
      <Footer />
    </main>
  );
}
