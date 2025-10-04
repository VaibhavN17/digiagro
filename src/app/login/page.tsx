// src/app/login/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('farmer');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock authentication - replace with actual API call
      const user = await authenticateUser(email, password, role);
      
      if (user) {
        // Store user data in localStorage or context
        localStorage.setItem('user', JSON.stringify(user));
        
        // Redirect based on role
        switch (user.role) {
          case 'farmer':
            router.push('/farmer-dashboard');
            break;
          case 'expert':
            router.push('/expert-dashboard');
            break;
          case 'admin':
            router.push('/admin-dashboard');
            break;
          default:
            router.push('/dashboard');
        }
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Mock authentication function - replace with real API
  const authenticateUser = async (email: string, password: string, role: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock users database
    const users = [
      { id: 1, email: 'farmer@digiagro.com', password: 'password', role: 'farmer', name: 'John Farmer' },
      { id: 2, email: 'Veterinarian@digiagro.com', password: 'password', role: 'expert', name: 'Dr. Agriculture Expert' },
      { id: 3, email: 'admin@digiagro.com', password: 'password', role: 'admin', name: 'Admin User' },
    ];

    const user = users.find(u => 
      u.email === email && u.password === password && u.role === role
    );

    return user || null;
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.logo}>LOGO DigiAgro</h2>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Username or Email</label>
          <input 
            type="email" 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email" 
            className={styles.input}
            required
          />
          <span className={styles.usernameHint}>Username is present in email</span>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input 
            type="password" 
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password" 
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="role" className={styles.label}>Login As</label>
          <select 
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={styles.select}
          >
            <option value="farmer">Farmer</option>
            <option value="expert">Veterinarian</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button 
          type="submit" 
          className={styles.button}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className={styles.links}>
          <a href="#" className={styles.link}>Forgot Password?</a>
          <a href="#" className={styles.link}>Do Not have Account? Sign Up</a>
        </div>
      </form>
    </div>
  );
}