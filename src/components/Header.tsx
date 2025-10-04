// src/components/Header.tsx
"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is logged in on component mount
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const userData = localStorage.getItem('user');
        if (userData) {
          setIsLoggedIn(true);
          setUser(JSON.parse(userData));
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      }
    };

    checkAuth();

    // Listen for storage changes (when login/logout happens)
    window.addEventListener('storage', checkAuth);
    
    // Custom event listener for login/logout
    window.addEventListener('authChange', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    
    // Trigger custom event to update other components
    window.dispatchEvent(new Event('authChange'));
    
    router.push('/login');
    router.refresh(); // Refresh to update the page
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
      // router.push(`/search?q=${searchQuery}`);
    }
  };

  const isActiveLink = (path: string) => {
    return pathname === path ? styles.active : '';
  };

  return (
    <header className={styles.header}>
      {/* Top Bar with Logo and Search */}
      <div className={styles.topBar}>
        <div className={styles.container}>
          <div className={styles.logoSection}>
            <Link href="/" className={styles.logo}>
              DigiFarm 
            </Link>
            <span className={styles.tagline}>Digital Agriculture Platform</span>
          </div>
          
          <div className={styles.searchSection}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchButton}>
                🔍
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className={styles.nav}>
        <div className={styles.container}>
          <div className={styles.navLeft}>
            <Link href="/" className={`${styles.navLink} ${isActiveLink('/')}`}>
              Home
            </Link>
            {isLoggedIn ? (
              <Link 
                href={
                  user?.role === 'farmer' ? '/farmer-dashboard' :
                  user?.role === 'expert' ? '/expert-dashboard' :
                  user?.role === 'admin' ? '/admin-dashboard' : '/dashboard'
                } 
                className={`${styles.navLink} ${isActiveLink('/dashboard')}`}
              >
                Dashboard
              </Link>
            ) : (
              <Link href="/about" className={`${styles.navLink} ${isActiveLink('/about')}`}>
                About
              </Link>
            )}
            {isLoggedIn && (
              <Link href="/profile" className={`${styles.navLink} ${isActiveLink('/profile')}`}>
                Profile
              </Link>
            )}
          </div>

          <div className={styles.navRight}>
            <Link href="/privacy" className={styles.legalLink}>
              Privacy
            </Link>
            <Link href="/terms" className={styles.legalLink}>
              Terms
            </Link>
            <Link href="/contact" className={styles.legalLink}>
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}