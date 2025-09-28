// src/components/Header.tsx
"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

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

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          DigiAgro
        </Link>
        <nav className={styles.nav}>
          {isLoggedIn ? (
            // Show these when user IS logged in
            <>
              <Link href="/">Home</Link>
              <Link href={
                user?.role === 'farmer' ? '/farmer-dashboard' :
                user?.role === 'expert' ? '/expert-dashboard' :
                user?.role === 'admin' ? '/admin-dashboard' : '/dashboard'
              }>
                Dashboard
              </Link>
              <Link href="/profile">Profile</Link>
              <button 
                onClick={handleLogout}
                className={styles.logoutButton}
              >
                Logout
              </button>
            </>
          ) : (
            // Show these when user is NOT logged in
            <>
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}