// src/app/expert-dashboard/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ExpertDashboardOverview from '../../components/ExpertDashboardOverview';
import ExpertConsultationQueue from '../../components/ExpertConsultationQueue';
import ExpertDiseaseDiagnosis from '../../components/ExpertDiseaseDiagnosis';
import ExpertTreatmentPlans from '../../components/ExpertTreatmentPlans';
import ExpertCaseHistory from '../../components/ExpertCaseHistory';
import ExpertReportsModule from '../../components/ExpertReportsModule';
import ExpertSettingsPanel from '../../components/ExpertSettingsPanel';

// Mock data for expert dashboard
const mockExpertData = {
  pendingConsultations: 8,
  completedCases: 45,
  activePatients: 23,
  urgentCases: 3,
  successRate: '94%'
};

export default function ExpertDashboard() {
  const [user, setUser] = useState<any>(null);
  const [activeModule, setActiveModule] = useState('dashboard');
  const [isOnline, setIsOnline] = useState(true);
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
    
    // Check online status
    setIsOnline(navigator.onLine);
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('expert-data');
    router.push('/login');
  };

  const syncOfflineData = () => {
    // Simulate syncing offline data
    const offlineData = localStorage.getItem('expert-offline-data');
    if (offlineData) {
      console.log('Syncing expert offline data...');
      // API call to sync data
      localStorage.removeItem('expert-offline-data');
    }
  };

  if (!user) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Loading Expert Dashboard...</div>
      </div>
    );
  }

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <ExpertDashboardOverview data={mockExpertData} />;
      case 'consultations':
        return <ExpertConsultationQueue expertId={user.id} />;
      case 'diagnosis':
        return <ExpertDiseaseDiagnosis />;
      case 'treatment':
        return <ExpertTreatmentPlans expertId={user.id} />;
      case 'history':
        return <ExpertCaseHistory expertId={user.id} />;
      case 'reports':
        return <ExpertReportsModule />;
      case 'settings':
        return <ExpertSettingsPanel user={user} />;
      default:
        return <ExpertDashboardOverview data={mockExpertData} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Sidebar Navigation */}
      <div style={{
        width: '280px',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        color: '#495057',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #dee2e6',
        boxShadow: '2px 0 10px rgba(0, 0, 0, 0.05)'
      }}>

        {/* Veterinary Services Section */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: '#2d5016',
            margin: '0 0 5px 0'
          }}>
            Veterinary Services
          </h3>
          <p style={{ 
            fontSize: '12px', 
            color: '#6c757d',
            margin: '0 0 20px 0',
            fontWeight: '500'
          }}>
            Expert Portal
          </p>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'consultations', label: 'Consultation Queue', icon: '👥' },
              { id: 'diagnosis', label: 'Disease Diagnosis', icon: '🔍' },
              { id: 'treatment', label: 'Treatment Plans', icon: '💊' },
              { id: 'history', label: 'Case History', icon: '📋' },
              { id: 'reports', label: 'Medical Reports', icon: '🏥' },
              { id: 'settings', label: 'Expert Settings', icon: '⚙️' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px 15px',
                  background: activeModule === item.id ? 'rgba(40, 167, 69, 0.15)' : 'transparent',
                  border: 'none',
                  color: activeModule === item.id ? '#28a745' : '#495057',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                  borderLeft: activeModule === item.id ? '3px solid #28a745' : 'none'
                }}
                onMouseOver={(e) => {
                  if (activeModule !== item.id) {
                    e.currentTarget.style.background = 'rgba(40, 167, 69, 0.1)';
                    e.currentTarget.style.color = '#28a745';
                    e.currentTarget.style.transform = 'translateX(2px)';
                  }
                }}
                onMouseOut={(e) => {
                  if (activeModule !== item.id) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#495057';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }
                }}
              >
                <span style={{ fontSize: '16px', minWidth: '20px', textAlign: 'center' }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Status & Logout Section */}
        <div style={{ 
          marginTop: 'auto', 
          borderTop: '1px solid #dee2e6', 
          paddingTop: '20px' 
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '15px',
            padding: '8px 12px',
            background: isOnline ? 'rgba(39, 174, 96, 0.1)' : 'rgba(231, 76, 60, 0.1)',
            border: `1px solid ${isOnline ? '#27ae60' : '#e74c3c'}`,
            borderRadius: '6px',
            fontSize: '14px',
            color: isOnline ? '#27ae60' : '#e74c3c'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: isOnline ? '#27ae60' : '#e74c3c',
              marginRight: '8px',
              animation: isOnline ? 'pulse 2s infinite' : 'none'
            }} />
            {isOnline ? 'Online' : 'Offline Mode'}
          </div>
          
          {!isOnline && (
            <button
              onClick={syncOfflineData}
              style={{
                width: '100%',
                padding: '10px',
                background: 'rgba(243, 156, 18, 0.1)',
                border: '1px solid #f39c12',
                color: '#f39c12',
                borderRadius: '6px',
                cursor: 'pointer',
                marginBottom: '10px',
                fontSize: '14px',
                transition: 'background-color 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(243, 156, 18, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(243, 156, 18, 0.1)';
              }}
            >
              Sync Data
            </button>
          )}
          
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(231, 76, 60, 0.1)',
              border: '1px solid #e74c3c',
              color: '#e74c3c',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(231, 76, 60, 0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(231, 76, 60, 0.1)';
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header style={{
          background: 'white',
          padding: '20px 30px',
          borderBottom: '1px solid #dee2e6',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <div>
            <h1 style={{ 
              margin: '0 0 5px 0', 
              fontSize: '24px', 
              fontWeight: 'bold',
              color: '#2d5016'
            }}>
              Welcome back, {user.name}!
            </h1>
            <p style={{ 
              margin: 0, 
              color: '#6c757d',
              fontSize: '14px'
            }}>
              Role: Veterinary Expert | Specialization: {user.specialization || 'Animal Health'}
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <select 
              style={{ 
                padding: '8px 12px',
                border: '1px solid #dee2e6',
                borderRadius: '6px',
                background: 'white',
                color: '#495057',
                fontSize: '14px',
                outline: 'none'
              }}
              defaultValue={user.language || 'en'}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
            
            <div style={{
              padding: '8px 16px',
              background: '#f8f9fa',
              borderRadius: '20px',
              fontSize: '12px',
              border: '1px solid #dee2e6',
              color: '#495057',
              fontWeight: '500'
            }}>
              Expert ID: {user.id}
            </div>
          </div>
        </header>

        {/* Alert Banner */}
        <div style={{
          background: '#fff3cd',
          border: '1px solid #ffeaa7',
          padding: '12px 30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '14px' }}>
            <strong style={{ color: '#856404' }}>🚨 Active Cases:</strong> 
            <span style={{ marginLeft: '15px', color: '#856404' }}>
              {mockExpertData.pendingConsultations} pending consultations • 
              {mockExpertData.urgentCases} urgent cases
            </span>
          </div>
          <button style={{
            background: 'transparent',
            border: '1px solid #f39c12',
            color: '#e67e22',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '500',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#f39c12';
            e.currentTarget.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#e67e22';
          }}
          >
            View All
          </button>
        </div>

        {/* Main Content */}
        <main style={{ 
          flex: 1, 
          padding: '30px',
          overflow: 'auto',
          background: '#f8f9fa'
        }}>
          {renderActiveModule()}
        </main>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}