import { motion } from "motion/react";
import { Github, Linkedin, ArrowDown } from "lucide-react";

export function Hero() {
  const scrollToNext = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 mb-5 tracking-[0.3em] uppercase text-xs font-medium"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Welcome to my portfolio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-7xl md:text-9xl mb-6 font-semibold tracking-tight bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent"
            style={{ fontFamily: "var(--font-display)", lineHeight: 1.05 }}
          >
            Dax Manuel
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-base md:text-lg text-gray-400 mb-10 max-w-xl mx-auto font-light tracking-wide"
          >
            SWE + Math @ University of New Brunswick
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-10 max-w-sm mx-auto"
          >
            <p className="text-gray-600 text-xs uppercase tracking-[0.2em] mb-3 font-medium" style={{ fontFamily: "var(--font-display)" }}>Currently</p>
            <ul className="text-gray-400 space-y-1.5 text-sm font-light">
              <li>Powertrain @ UNB Formula Electric</li>
              <li>#19 @ UNB Men's Varsity Soccer</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <motion.a
              href="https://github.com/DaxManuel27"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-white/20 rounded-lg hover:bg-white/10 hover:border-white/40 transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Github className="w-6 h-6 text-white" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/nikolasdaxmanuel"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-white/20 rounded-lg hover:bg-white/10 hover:border-white/40 transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Linkedin className="w-6 h-6 text-white" />
            </motion.a>
          </motion.div>

          <motion.button
            onClick={scrollToNext}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            whileHover={{ y: 5 }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowDown className="w-8 h-8 animate-bounce" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
