import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", href: "#inicio" },
    { name: "Benefícios", href: "#beneficios" },
    { name: "Planos", href: "#planos" },
    { name: "Contato", href: "#contato" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 shadow-md backdrop-blur-lg border-b border-slate-200/50 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="flex items-center">
            <span className="text-3xl font-bold tracking-tight text-brand-orange group-hover:text-brand-orange/90 transition-colors">
              Dr.Bim
            </span>
            <span className="text-3xl font-bold tracking-tight text-brand-blue ml-1 group-hover:text-brand-blue/90 transition-colors">
              Benefícios
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-brand-orange transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#planos"
            className="rounded-full bg-brand-orange px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-orange/90 hover:shadow-md transition-all active:scale-95"
          >
            Peça seu Cartão
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-slate-600 hover:text-brand-orange transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-base font-medium text-slate-700 hover:text-brand-orange py-2"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#planos"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 text-center rounded-full bg-brand-orange px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-brand-orange/90 transition-colors"
              >
                Peça seu Cartão
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
