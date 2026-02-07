'use client'

import styles from './projects.module.css'
import { useEffect } from 'react'

const projects = [
  {
    title: "Vehicle Perception Model",
    dateRange: "Nov 2025 - Jan 2026",
    description: "Add your project description here. Explain what the project does and what technologies you used.",
    tags: ["Python", "PyTorch", "Pandas", "NumPy"],
    github: "https://github.com/DaxManuel27vehicle-perception-model"
  },
  {
    title: "HR System | CS2043 Final Project",
    dateRange: "Sep 2025 - Nov 2025",
    description: "Full stack Employee Management System to handle employee data and leave requests",
    tags: ["Spring Boot", "JavaScript", "PostgreSQL", "HTML/CSS"],
    github: "https://github.com/DaxManuel27CS2043-Project"
  },
  {
    title: "CAD Automation Platform | Mchacks '26",
    dateRange: "Jan 2026",
    description: "Generating 3D CAD Models with Gemini API",
    tags: ["Next.js", "FastAPI", "Gemini API"],
    github: "https://github.com/DaxManuel27/McHacks"
  },
  {
    title: "Soccer Match Prediction Model",
    dateRange: "Jun 2025",
    description: "Predicting soccer matches with a linear regression model using scikit-learn",
    tags: ["Python", "Scikit-learn", "Pandas", "NumPy"],
    github: "https://github.com/DaxManuel27/Soccer-Prediction-Model"
  },
  {
    title: "CodeSimplify",
    dateRange: "Jul 2025",
    description: "Chrome extension that explains code snippets on GitHub.",
    tags: ["JavaScript", "HTML/CSS"],
    github: "https://github.com/DaxManuel27/codesimplify"
  },
  {
    title: "Photo Sharing App",
    dateRange: "Aug 2025",
    description: "Allowing users to take and share photos within a group",
    tags: ["React Native", "AWS S3", "Node.js"],
    github: "https://github.com/DaxManuel27/photo-app"
  },
  {
    title: "CVGen",
    dateRange: "Apr 2025",
    description: "Creating AI generated CV's from a resume and a job description",
    tags: ["HTML/CSS", "Node.js", "Gemini API"],
    github: "https://github.com/DaxManuel27/CVGen"
  }
]

export default function Projects() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible)
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll(`.${styles.fadeIn}`)
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className={styles.projectsPage}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Projects</h1>
          <p className={styles.pageSubtitle}>A collection of my work and side projects</p>
        </div>
      </section>

      <section className={styles.projectsSection}>
        <div className={styles.container}>
          <div className={styles.projectsGrid}>
            {projects.map((project, index) => (
              <div key={index} className={`${styles.projectCard} ${styles.fadeIn}`}>
                <div className={styles.projectHeader}>
                  <div>
                    <h2 className={styles.projectTitle}>{project.title}</h2>
                    <p className={styles.dateRange}>{project.dateRange}</p>
                  </div>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.githubButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                </div>
                
                <p className={styles.projectDescription}>
                  {project.description}
                </p>
                
                <div className={styles.tags}>
                  {project.tags.map((tag, i) => (
                    <span key={i} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
