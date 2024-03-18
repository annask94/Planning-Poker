import Header from "@/components/Header";
import MainPick from "@/components/MainPick";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="hero flex flex-col min-h-screen justify-between">
      <Header />
      <MainPick />
      <Footer />
    </main>
  );
}
