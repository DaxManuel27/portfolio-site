import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useScroll, useTransform } from "motion/react";
import { Github } from "lucide-react";

const projects = [
  {
    title: "Neural Network from Scratch in C",
    date: "Feb 2026",
    description: "Handwritten digit classifier using the MNIST dataset, achieving 98% accuracy. Built entirely in C with no ML libraries.",
    tags: ["C"],
    github: "https://github.com/DaxManuel27/neural-network-in-c",
  },
  {
    title: "Vehicle Perception Model",
    date: "Nov 2025 – Jan 2026",
    description: "3D bounding box predictions for vehicles using LiDAR driving data. Deep learning model trained on point cloud datasets.",
    tags: ["Python", "PyTorch", "Pandas", "NumPy"],
    github: "https://github.com/DaxManuel27/vehicle-perception-model",
  },
  {
    title: "HR System | CS2043 Final Project",
    date: "Sep – Nov 2025",
    description: "Full stack Employee Management System handling employee data and leave requests.",
    tags: ["Spring Boot", "JavaScript", "PostgreSQL", "HTML/CSS"],
    github: "https://github.com/DaxManuel27/CS2043-Project",
  },
  {
    title: "CAD Automation Platform | McHacks '26",
    date: "Jan 2026",
    description: "Generates 3D CAD models from natural language prompts using the Gemini API.",
    tags: ["Next.js", "FastAPI", "Gemini API"],
    github: "https://github.com/DaxManuel27/McHacks",
  },
  {
    title: "Soccer Match Prediction Model",
    date: "Jun 2025",
    description: "Predicts soccer match outcomes using a linear regression model trained on historical match data.",
    tags: ["Python", "Scikit-learn", "Pandas", "NumPy"],
    github: "https://github.com/DaxManuel27/Soccer-Prediction-Model",
  },
  {
    title: "CodeSimplify",
    date: "Jul 2025",
    description: "Chrome extension that explains code snippets on GitHub using AI.",
    tags: ["JavaScript", "HTML/CSS"],
    github: "https://github.com/DaxManuel27/codesimplify",
  },
  {
    title: "Photo Sharing App",
    date: "Aug 2025",
    description: "Mobile app allowing users to take and share photos within a group, backed by AWS S3.",
    tags: ["React Native", "AWS S3", "Node.js"],
    github: "https://github.com/DaxManuel27/photo-app",
  },
  {
    title: "CVGen",
    date: "Apr 2025",
    description: "AI-generated cover letters tailored from a resume and job description using the Gemini API.",
    tags: ["HTML/CSS", "Node.js", "Gemini API"],
    github: "https://github.com/DaxManuel27/CVGen",
  },
];

export function Projects() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const x = useTransform(scrollYProgress, [0, 0.7], ["-60%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 0.5, 1]);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="projects" ref={containerRef} className="relative min-h-screen py-20">
      <motion.div
        style={{ x, opacity }}
        ref={ref}
        className="max-w-7xl mx-auto px-6"
      >
        <p className="text-center text-xs uppercase tracking-[0.3em] text-gray-600 mb-4 font-medium" style={{ fontFamily: "var(--font-display)" }}>What I've built</p>
        <h2 className="text-5xl md:text-6xl mb-6 text-center font-semibold tracking-tight bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent" style={{ fontFamily: "var(--font-display)" }}>
          Projects
        </h2>
        <p className="text-gray-500 text-sm text-center mb-16 max-w-xl mx-auto font-light tracking-wide">
          A collection of my work and side projects
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all flex flex-col p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-base text-white leading-snug font-medium tracking-tight" style={{ fontFamily: "var(--font-display)" }}>{project.title}</h3>
                  <p className="text-gray-600 text-xs mt-1 tracking-wide font-light">{project.date}</p>
                </div>
              </div>

              <p className="text-gray-500 mb-4 leading-relaxed text-sm flex-1 font-light">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all text-gray-300 w-fit"
              >
                <Github className="w-4 h-4" />
                <span className="text-sm">GitHub</span>
              </motion.a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
