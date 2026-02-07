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
          <div className={styles.heroLayout}>
            <div className={styles.heroLeft}>
              <img src="/headshot.jpg" alt="Dax Manuel" className={styles.profileImage} />
            </div>
            <div className={styles.heroRight}>
              <div className={styles.titleWrapper}>
                <h1 className={styles.title}>Dax Manuel</h1>
              </div>
              <h2 className={styles.subtitle}>Software Engineering, Mathematics @ the University of New Brunswick </h2>
              
              <div className={styles.currentlySection}>
                <h3 className={styles.currentlyTitle}>Currently:</h3>
                <ul className={styles.currentlyList}>
                  <li>Powertrain @ UNB Formula Electric</li>
                  <li>Research Intern @ Intelligent Mobility and Robotics Lab</li>
                  <li>#19 @ UNB Men's Varsity Soccer</li>
                  <li>Coaching Soccer @ FDSA</li>
                </ul>
              </div>
              
              <div className={styles.socialLinks}>
                <a href="https://github.com/DaxManuel27" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="GitHub">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/nikolasdaxmanuel" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="resume" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.resumeContent}>
            <h1 className={styles.sectionTitle}>Resume</h1>
            
            <a href="/DaxManuel-ResumeFeb7.pdf" download className={styles.downloadButton}>
              Download Resume
            </a>
          </div>
        </div>
      </section>

{/* Projects section temporarily hidden
      <section id="portfolio" className={`${styles.section} ${styles.fadeIn}`}>
        <div className={styles.container}>
          <h1 className={styles.sectionTitle}>Projects</h1>

          <div className={`${styles.projectCard} ${styles.fadeIn}`}>
            <div className={styles.projectHeader}>
              <h2 className={styles.projectTitle}>Project Title Here</h2>
              <a href="https://github.com/DxaxManuel27/your-repo" target="_blank" rel="noopener noreferrer" className={styles.githubButton}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </div>
            
            <p className={styles.projectDescription}>
              Add your project description here. Explain what the project does, what technologies you used, 
              what problems it solves, and any interesting challenges you overcame during development.
            </p>
            
            <div className={styles.projectImages}>
              <img src="/projects/project1-img1.png" alt="Project screenshot 1" className={styles.projectImage} />
              <img src="/projects/project1-img2.png" alt="Project screenshot 2" className={styles.projectImage} />
              <img src="/projects/project1-img3.png" alt="Project screenshot 3" className={styles.projectImage} />
            </div>
          </div>

        </div>
      </section>
*/}
    </>
  )
}

