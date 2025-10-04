// src/app/farmer-dashboard/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardOverview from '../../components/DashboardOverview';
import AnimalRegistry from '../../components/AnimalRegistry';
import HealthMonitoring from '../../components/HealthMonitoring';
import BiosecurityLog from '../../components/BiosecurityLog';
import OutbreakForecast from '../../components/OutbreakForecast';
import ReportsModule from '../../components/ReportsModule';
import BreedingInsights from '../../components/BreedingInsights';
import PaymentModule from '../../components/PaymentModule'; // New Payment Module
import SettingsPanel from '../../components/SettingsPanel';
import MobileAlertFeed from '../../components/MobileAlertFeed';
//import RiskAnalysis from '../../components/RiskAnalysis'; // New Risk Analysis Module
import LiveVideoDemo from '@/components/LiveVideoDemo';

// Mock data - replace with actual API calls
const mockDashboardData = {
  totalAnimals: 247,
  healthyAnimals: 223,
  sickAnimals: 8,
  alertsCount: 12,
  biosecurityBreaches: 2
};

export default function FarmerDashboard() {
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
    if (userObj.role !== 'farmer') {
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
    localStorage.removeItem('farm-data');
    router.push('/login');
  };

  const syncOfflineData = () => {
    // Simulate syncing offline data
    const offlineData = localStorage.getItem('offline-data');
    if (offlineData) {
      console.log('Syncing offline data...');
      // API call to sync data
      localStorage.removeItem('offline-data');
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
        <div>Loading Dashboard...</div>
      </div>
    );
  }

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardOverview data={mockDashboardData} />;
      case 'animals':
        return <AnimalRegistry farmerId={user.id} />;
      case 'health':
        return <HealthMonitoring farmerId={user.id} />;
      case 'biosecurity':
        return <BiosecurityLog farmId={user.farmId} />;
      case 'forecast':
        return <OutbreakForecast location={user.location} />;
      case 'reports':
        return <ReportsModule farmerId={user.id} />;
      case 'breeding':
        return <BreedingInsights farmId={user.farmId} />;
      case 'payments':
        return <PaymentModule farmerId={user.id} />; // New Payment Module
      // case 'riskanalysis':
      //   return <RiskAnalysis  />; // New Risk Analysis Module
      case 'LiveVideo':
        return <LiveVideoDemo />;
      case 'settings':
        return <SettingsPanel user={user} />;
      default:
        return <DashboardOverview data={mockDashboardData} />;
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
       
        {/* Livestock AI Section */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: '#2d5016',
            margin: '0 0 5px 0'
          }}>
            LiveStock AI
          </h3>
          <p style={{ 
            fontSize: '12px', 
            color: '#6c757d',
            margin: '0 0 20px 0',
            fontWeight: '500'
          }}>
            Farmer Portal
          </p>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'animals', label: 'Animal Registry', icon: '🐄' },
              { id: 'health', label: 'Health Monitoring', icon: '❤️' },
              { id: 'biosecurity', label: 'Biosecurity Log', icon: '🛡️' },
              { id: 'forecast', label: 'Risk Forecasting', icon: '📈' },
              { id: 'reports', label: 'Reports', icon: '📋' },
              { id: 'breeding', label: 'Breeding Insights', icon: '🔍' },
              { id: 'payments', label: 'Payments', icon: '💳' } ,
              // { id: 'riskanalysis', label: 'Risk Analysis', icon: '⚠️' },
              { id: 'LiveVideo', label: 'LiveVideo', icon: '⚙️' }
              
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
              Welcome back, {"Vaibhav"}!
            </h1>
            <p style={{ 
              margin: 0, 
              color: '#6c757d',
              fontSize: '14px'
            }}>
              Farm: {user.farmName || 'My Farm'} | Location: {user.location || 'Not specified'}
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
              <option value="es">Marathi</option>
              {/* <option value="fr">French</option> */}
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
              Farmer ID: {user.id}
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
            <strong style={{ color: '#856404' }}>🚨 Active Alerts:</strong> 
            <span style={{ marginLeft: '15px', color: '#856404' }}>
              {mockDashboardData.alertsCount} health alerts • 
              {mockDashboardData.biosecurityBreaches} biosecurity issues
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

        {/* Mobile Alert Feed */}
        <div style={{
          position: 'fixed',
          right: '30px',
          bottom: '30px',
          zIndex: 1000
        }}>
          <MobileAlertFeed farmerId={user.id} />
        </div>
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

// src/components/AdminDashboardOverview.tsx