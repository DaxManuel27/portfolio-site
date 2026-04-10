import { motion } from "motion/react";

export function About() {
  const skills = [
    "Python", "C", "TypeScript", "Java",
    "PyTorch", "React", "Next.js", "Spring Boot",
    "Node.js", "PostgreSQL", "AWS", "Tailwind CSS",
  ];

  return (
    <div className="w-full h-full flex items-center overflow-y-auto">
      <div className="max-w-7xl mx-auto px-6 py-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-center text-xs uppercase tracking-[0.3em] text-gray-600 mb-4 font-medium" style={{ fontFamily: "var(--font-display)" }}>Who I am</p>
          <h2 className="text-5xl md:text-6xl text-center font-semibold tracking-tight bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent mb-14" style={{ fontFamily: "var(--font-display)" }}>
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 max-w-xs mx-auto w-full">
              <img src="/headshot.jpg" alt="Dax Manuel" className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>

            <div className="space-y-5">
              <p className="text-gray-400 text-base leading-relaxed font-light">
                My interests span across software engineering, machine learning, and computer vision — specifically in automotive, and robotics.
              </p>
              <p className="text-gray-400 text-base leading-relaxed font-light">
                Outside of code, I'm on the powertrain team at UNB Formula Racing, playing university soccer, hitting the gym, or doing some random side quest.
              </p>

              <div className="pt-2">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-600 mb-3 font-medium" style={{ fontFamily: "var(--font-display)" }}>Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.04 }}
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
      </div>
    </div>
  );
}
