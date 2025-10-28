import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <a href="#home" className={styles.logo}>
          Dax Manuel
        </a>
        
        <ul className={styles.navLinks}>
          <li>
            <a href="#home" className={styles.navLink}>
              Home
            </a>
          </li>
          <li>
            <a href="#resume" className={styles.navLink}>
              Resume
            </a>
          </li>
          <li>
            <a href="#portfolio" className={styles.navLink}>
              Portfolio
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

