import { LoadingScreen } from "./components/LoadingScreen";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Plans } from "./components/Plans";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-brand-light font-sans selection:bg-brand-orange/20 selection:text-brand-dark">
      <LoadingScreen />
      <Header />
      <main>
        <Hero />
        <Features />
        <Plans />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
