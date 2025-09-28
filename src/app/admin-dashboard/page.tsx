// src/app/admin-dashboard/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }

    const userObj = JSON.parse(userData);
    if (userObj.role !== 'admin') {
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
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
        <div style={{ background: '#f0f8ff', padding: '1rem', borderRadius: '8px' }}>
          <h3>User Management</h3>
          <p>Manage all users in the system</p>
        </div>
        
        <div style={{ background: '#f0fff0', padding: '1rem', borderRadius: '8px' }}>
          <h3>System Analytics</h3>
          <p>View system usage statistics</p>
        </div>
        
        <div style={{ background: '#fff8f0', padding: '1rem', borderRadius: '8px' }}>
          <h3>Content Management</h3>
          <p>Manage platform content</p>
        </div>
      </div>
    </div>
  );
}