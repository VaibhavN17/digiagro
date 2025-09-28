// src/app/expert-dashboard/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ExpertDashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }

    const userObj = JSON.parse(userData);
    if (userObj.role !== 'expert') {
      router.push('/login');
      return;
    }

    setUser(userObj);
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Expert Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
        <div style={{ background: '#f0f8ff', padding: '1rem', borderRadius: '8px' }}>
          <h3>Farmer Queries</h3>
          <p>Answer questions from farmers</p>
        </div>
        
        <div style={{ background: '#f0fff0', padding: '1rem', borderRadius: '8px' }}>
          <h3>Crop Advisory</h3>
          <p>Provide crop recommendations</p>
        </div>
        
        <div style={{ background: '#fff8f0', padding: '1rem', borderRadius: '8px' }}>
          <h3>Disease Diagnosis</h3>
          <p>Help diagnose plant diseases</p>
        </div>
      </div>
    </div>
  );
}