'use client'

import styles from './page.module.css'
import { useEffect } from 'react'

export default function Home() {
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

    // Observe all fade-in elements
    const elements = document.querySelectorAll(`.${styles.fadeIn}`)
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section id="home" className={styles.section}>
        <div className={styles.container}>
          <img 
            src="/logo.png" 
            alt="Profile" 
            className={styles.profileImage}
          />
          <h1 className={styles.title}>Dax Manuel</h1>
          <h2 className={styles.subtitle}>Software Engineering @ the University of New Brunswick</h2>
          <p className={styles.contents}>
              Currently, I am a Powertrain member at UNB Formula SAE, where I'm working on low-voltage systems of an electric race car. 
              
          </p>
          <p className={styles.contents}>
              My interests span across machine learning, computer vision, and artificial intelligence specifically for autonomous vehicles. My most recent project applies that interest into a real applicable project.
          </p>
        </div>
      </section>

      <section id="resume" className={`${styles.section} ${styles.fadeIn}`}>
        <div className={styles.container}>
          <div className={styles.resumeContent}>
            <h1 className={styles.sectionTitle}>Resume</h1>
            
            <a href="/resume.pdf" download className={styles.downloadButton}>
              Download Resume
            </a>
          </div>
        </div>
      </section>

{/* Projects section temporarily hidden
      <section id="portfolio" className={`${styles.section} ${styles.fadeIn}`}>
        <div className={styles.container}>
          <h1 className={styles.sectionTitle}>Projects</h1>

          <div className={styles.projectGrid}>
            <div className={`${styles.projectCard} ${styles.fadeIn}`}>
              <h2 className={styles.projectTitle}>Soccer Match Predictor</h2>
              <p className={styles.projectDescription}>
                Uses 700+ games to predict outcomes of Premier League Soccer matches
              </p>
              <div className={styles.tags}>
                <span className={styles.tag}>Python</span>
                <span className={styles.tag}>Scikit-learn</span>
                <span className={styles.tag}>pandas/numpy</span>
              </div>
              <a href="https://github.com/yourusername/project-one" target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
                View on GitHub →
              </a>
            </div>

            <div className={`${styles.projectCard} ${styles.fadeIn}`}>
              <h2 className={styles.projectTitle}>Vehicle Perception Model</h2>
              <p className={styles.projectDescription}>
                Deep learning model for vehicle detection and classification in autonomous driving scenarios
              </p>
              <div className={styles.tags}>
                <span className={styles.tag}>Python</span>
                <span className={styles.tag}>PyTorch</span>
                <span className={styles.tag}>pandas/numpy</span>
              </div>
              <a href="https://github.com/DaxManuel27/lidar-object-detection" target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
                View on GitHub →
              </a>
            </div>
          </div>
        </div>
      </section>
      */}
    </>
  )
}

