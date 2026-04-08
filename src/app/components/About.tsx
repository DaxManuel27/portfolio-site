import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const x = useTransform(scrollYProgress, [0, 0.7], ["60%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 0.5, 1]);

  const skills = [
    "Python", "C", "TypeScript", "Java",
    "PyTorch", "React", "Next.js", "Spring Boot",
    "Node.js", "PostgreSQL", "AWS", "Tailwind CSS",
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen flex items-center py-20 overflow-hidden snap-start"
    >
      <motion.div
        style={{ x, opacity }}
        className="max-w-7xl mx-auto px-6 w-full"
      >
        <div className="mb-14">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-gray-600 mb-4 font-medium" style={{ fontFamily: "var(--font-display)" }}>Who I am</p>
          <h2 className="text-5xl md:text-6xl text-center font-semibold tracking-tight bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent" style={{ fontFamily: "var(--font-display)" }}>
            About Me
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 max-w-xs mx-auto w-full">
            <img
              src="/headshot.jpg"
              alt="Dax Manuel"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>

          <div className="space-y-5">
            <p className="text-gray-400 text-base leading-relaxed font-light">
              I'm a Software Engineering and Mathematics student at the University of New Brunswick with a deep passion for building things that matter.
            </p>

            <p className="text-gray-400 text-base leading-relaxed font-light">
              My interests span across software engineering, machine learning, and computer vision — specifically in automotive, aerospace, and robotics.
            </p>

            <p className="text-gray-400 text-base leading-relaxed font-light">
              Outside of code, I'm on the powertrain team at UNB Formula Electric, play varsity soccer as #19, and coach soccer at FDSA.
            </p>

            <div className="pt-2">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-600 mb-3 font-medium" style={{ fontFamily: "var(--font-display)" }}>Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.04 }}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-gray-400 text-xs font-light tracking-wide"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
