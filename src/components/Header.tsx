"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from './Header.module.css';
import React from 'react';
import digiformlogo from '@/assets/images/digifarm.png';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Check if current page is login page
  const isLoginPage = pathname === '/login';

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActiveLink = (path: string) => {
    return pathname === path ? styles.active : '';
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <Link href="/" className={styles.logoLink}>
            <div className={styles.logoContainer}>
              <Image 
                src={digiformlogo} 
                alt="DigiFarm Logo"
                width={50}
                height={50}
                className={styles.logoImage}
              />
              <div className={styles.logoText}>
                <span className={styles.logoMain}>DigiFarm</span>
                <span className={styles.tagline}>Powering the Future of Flock Health</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          <div className={styles.navLinks}>
            <Link href="/" className={`${styles.navLink} ${isActiveLink('/')}`}>
              Home
            </Link>
            <Link href="/about" className={`${styles.navLink} ${isActiveLink('/about')}`}>
              About
            </Link>
            <Link href="/features" className={`${styles.navLink} ${isActiveLink('/features')}`}>
              Features
            </Link>
            
            {isLoggedIn ? (
              <Link 
                href={
                  user?.role === 'farmer' ? '/farmer-dashboard' :
                  user?.role === 'expert' ? '/expert-dashboard' :
                  user?.role === 'admin' ? '/admin-dashboard' : '/dashboard'
                } 
                className={`${styles.navLink} ${styles.dashboardLink}`}
              >
                Dashboard
              </Link>
            ) : null}
          </div>
        </nav>

        {/* Auth Buttons - Only show on login page when not logged in */}
        <div className={styles.authSection}>
          {isLoggedIn ? (
            <div className={styles.userMenu}>
              <span className={styles.welcomeText}>Welcome, {user?.name}</span>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Sign Out
              </button>
            </div>
          ) : (
            // Only show auth buttons on login page
            isLoginPage && (
              <div className={styles.authButtons}>
                <Link href="/login" className={styles.signInButton}>
                  Sign In
                </Link>
                <Link href="/signup" className={styles.signUpButton}>
                  Sign Up
                </Link>
              </div>
            )
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuButton}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileNavLinks}>
          <Link 
            href="/" 
            className={`${styles.mobileNavLink} ${isActiveLink('/')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className={`${styles.mobileNavLink} ${isActiveLink('/about')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            href="/features" 
            className={`${styles.mobileNavLink} ${isActiveLink('/features')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </Link>
          
          {isLoggedIn ? (
            <Link 
              href={
                user?.role === 'farmer' ? '/farmer-dashboard' :
                user?.role === 'expert' ? '/expert-dashboard' :
                user?.role === 'admin' ? '/admin-dashboard' : '/dashboard'
              } 
              className={styles.mobileNavLink}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          ) : null}

          {/* Mobile Auth Buttons - Only show on login page when not logged in */}
          <div className={styles.mobileAuthButtons}>
            {isLoggedIn ? (
              <>
                <span className={styles.mobileWelcome}>Welcome, {user?.name}</span>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }} 
                  className={styles.mobileLogoutButton}
                >
                  Sign Out
                </button>
              </>
            ) : (
              // Only show mobile auth buttons on login page
              isLoginPage && (
                <>
                  <Link 
                    href="/login" 
                    className={styles.mobileSignInButton}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/signup" 
                    className={styles.mobileSignUpButton}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  );
}