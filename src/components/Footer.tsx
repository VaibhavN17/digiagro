// src/components/Footer.tsx
import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <h3>DigiAgro</h3>
            <p>Digital Agriculture Platform</p>
          </div>
          <div className={styles.links}>
            <div>
              <h4>Navigation</h4>
              <Link href="/">Home</Link>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/about">About</Link>
            </div>
            <div>
              <h4>Legal</h4>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; 2024 DigiAgro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}