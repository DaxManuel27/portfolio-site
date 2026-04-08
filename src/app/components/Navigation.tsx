import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, MotionValue, useTransform } from "motion/react";

interface NavigationProps {
  scrollYProgress: MotionValue<number>;
  sectionCount: number;
}

export function Navigation({ scrollYProgress, sectionCount }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", index: 0 },
    { label: "About", index: 1 },
    { label: "Projects", index: 2 },
  ];

  const scrollToSection = (index: number) => {
    const sectionHeight = (document.body.scrollHeight - window.innerHeight) / (sectionCount - 1);
    window.scrollTo({ top: index * sectionHeight, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  // Active dot indicator tracks scroll progress across sections
  const activeIndex = useTransform(scrollYProgress, [0, 1], [0, sectionCount - 1]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`absolute top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-lg border-b border-white/10" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => scrollToSection(0)}
              className="text-xl font-semibold text-white tracking-tight cursor-pointer"
              style={{ fontFamily: "var(--font-display)", background: "none", border: "none" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Dax Manuel
            </motion.button>

            {/* Desktop nav with active indicators */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = useTransform(
                  activeIndex,
                  (v) => Math.round(v) === link.index
                );
                return (
                  <motion.button
                    key={link.label}
                    onClick={() => scrollToSection(link.index)}
                    className="text-gray-300 hover:text-white transition-colors relative cursor-pointer"
                    style={{ background: "none", border: "none", fontFamily: "var(--font-body)" }}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    {link.label}
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-px bg-white"
                      style={{ scaleX: useTransform(isActive, (v) => v ? 1 : 0), originX: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.button>
                );
              })}
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-40 bg-black md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => scrollToSection(link.index)}
                  className="text-2xl text-gray-300 hover:text-white transition-colors cursor-pointer"
                  style={{ background: "none", border: "none", fontFamily: "var(--font-display)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
