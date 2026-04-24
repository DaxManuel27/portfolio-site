import { motion } from "motion/react";
import { Github, Linkedin, ArrowDown } from "lucide-react";
import { GitHubHeatmap } from "./GitHubHeatmap";
import GlobeScene from "./GlobeScene";

export function Hero() {
  const scrollToNext = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">

      {/* Globe — full-height background element on the right half */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
        className="hidden lg:block absolute inset-y-0 right-0 w-[38%] pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <GlobeScene />
      </motion.div>

      <div className="relative z-10 w-full pl-[8vw] pr-4">
        <div className="w-full lg:w-[58vw]">

          {/* Text content */}
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
              className="text-6xl md:text-8xl mb-6 font-semibold tracking-tight bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent"
              style={{ fontFamily: "var(--font-display)", lineHeight: 1.05 }}
            >
              Dax Manuel
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-base md:text-lg text-gray-400 mb-10 max-w-lg font-light tracking-wide"
            >
              SWE + Math @ University of New Brunswick
            </motion.p>

<motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-4 mb-12"
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95 }}
              className="mb-10"
            >
              <GitHubHeatmap username="DaxManuel27" />
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
      </div>
    </section>
  );
}
