// src/app/page.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      // Redirect to appropriate dashboard
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
          router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  return <div>Redirecting...</div>;
}