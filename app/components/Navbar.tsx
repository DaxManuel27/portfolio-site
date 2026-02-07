import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          Dax Manuel
        </a>
        
        <ul className={styles.navLinks}>
          <li>
            <a href="/" className={styles.navLink}>
              Home
            </a>
          </li>
          <li>
            <a href="/projects" className={styles.navLink}>
              Projects
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

