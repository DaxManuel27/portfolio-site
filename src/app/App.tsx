import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { motion } from "motion/react";

const STARS = Array.from({ length: 120 }, (_, i) => {
  const seed = i * 7919;
  return {
    x: ((seed * 9301 + 49297) % 233280) / 233280 * 100,
    y: ((seed * 4357 + 12345) % 233280) / 233280 * 100,
    size: ((seed * 1723) % 100) / 100 * 2 + 0.5,
    opacity: ((seed * 3137) % 100) / 100 * 0.6 + 0.2,
    delay: ((seed * 2741) % 100) / 100 * 4,
    duration: ((seed * 1571) % 100) / 100 * 3 + 2,
  };
});

export default function App() {
  return (
    <div className="dark min-h-screen bg-black text-white relative">

      {/* ── Fixed space background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">

        {/* Star field */}
        {STARS.map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            animate={{ opacity: [star.opacity, star.opacity * 0.2, star.opacity] }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Outer diffuse nebula */}
        <div
          style={{
            position: "absolute",
            width: "900px",
            height: "900px",
            left: "50%",
            top: "42%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(200,210,255,0.04) 30%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Mid pulsing glow */}
        <motion.div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            left: "50%",
            top: "42%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(220,230,255,0.10) 0%, rgba(180,200,255,0.06) 40%, transparent 70%)",
            filter: "blur(24px)",
          }}
          animate={{ scale: [1, 1.06, 1], opacity: [1, 0.85, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Inner hot core */}
        <motion.div
          style={{
            position: "absolute",
            width: "320px",
            height: "220px",
            left: "50%",
            top: "42%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(ellipse, rgba(255,255,255,0.18) 0%, rgba(240,245,255,0.08) 50%, transparent 75%)",
            filter: "blur(12px)",
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [1, 0.75, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Lens flare streak */}
        <div
          style={{
            position: "absolute",
            width: "700px",
            height: "1px",
            left: "50%",
            top: "42%",
            transform: "translate(-50%, -50%)",
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.20) 50%, rgba(255,255,255,0.12) 70%, transparent)",
            filter: "blur(1px)",
          }}
        />

        {/* Film grain overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>

      {/* ── Page content ── */}
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <About />
        <Projects />
      </div>
    </div>
  );
}
