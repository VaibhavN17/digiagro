// // src/app/farmer-dashboard/page.tsx
// "use client";

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function FarmerDashboard() {
//   const [user, setUser] = useState<any>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const userData = localStorage.getItem('user');
//     if (!userData) {
//       router.push('/login');
//       return;
//     }

//     const userObj = JSON.parse(userData);
//     if (userObj.role !== 'farmer') {
//       router.push('/login');
//       return;
//     }

//     setUser(userObj);
//   }, [router]);

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h1>Farmer Dashboard</h1>
//       <p>Welcome, {user.name}!</p>
      
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
//         <div style={{ background: '#f0f8ff', padding: '1rem', borderRadius: '8px' }}>
//           <h3>Crop Management</h3>
//           <p>Manage your crops and planting schedule</p>
//         </div>
        
//         <div style={{ background: '#f0fff0', padding: '1rem', borderRadius: '8px' }}>
//           <h3>Weather Updates</h3>
//           <p>Get latest weather information</p>
//         </div>
        
//         <div style={{ background: '#fff8f0', padding: '1rem', borderRadius: '8px' }}>
//           <h3>Market Prices</h3>
//           <p>Check current market rates</p>
//         </div>
//       </div>
//     </div>
//   );
// }

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
import SettingsPanel from '../../components/SettingsPanel';
import MobileAlertFeed from '../../components/MobileAlertFeed';


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
      case 'settings':
        return <SettingsPanel user={user} />;
      default:
        return <DashboardOverview data={mockDashboardData} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Sidebar Navigation */}
      <div style={{
        width: '250px',
        background: '#2c3e50',
        color: 'white',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ margin: 0, color: '#3498db' }}>LiveStock AI</h2>
          <small style={{ color: '#bdc3c7' }}>Farmer Portal</small>
        </div>

        <nav style={{ flex: 1 }}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'animals', label: 'Animal Registry', icon: '🐄' },
            { id: 'health', label: 'Health Monitoring', icon: '❤️' },
            { id: 'biosecurity', label: 'Biosecurity Log', icon: '🔒' },
            { id: 'forecast', label: 'Outbreak Forecast', icon: '🌡️' },
            { id: 'reports', label: 'Reports', icon: '📋' },
            { id: 'breeding', label: 'Breeding Insights', icon: '🧬' },
            { id: 'settings', label: 'Settings', icon: '⚙️' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '0.75rem 1rem',
                marginBottom: '0.5rem',
                background: activeModule === item.id ? '#3498db' : 'transparent',
                border: 'none',
                color: 'white',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ borderTop: '1px solid #34495e', paddingTop: '1rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '1rem',
            padding: '0.5rem',
            background: isOnline ? '#27ae60' : '#e74c3c',
            borderRadius: '5px',
            fontSize: '0.8rem'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'white',
              marginRight: '0.5rem',
              animation: isOnline ? 'pulse 2s infinite' : 'none'
            }} />
            {isOnline ? 'Online' : 'Offline Mode'}
          </div>
          
          {!isOnline && (
            <button
              onClick={syncOfflineData}
              style={{
                width: '100%',
                padding: '0.5rem',
                background: '#f39c12',
                border: 'none',
                color: 'white',
                borderRadius: '5px',
                cursor: 'pointer',
                marginBottom: '0.5rem'
              }}
            >
              Sync Data
            </button>
          )}
          
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#e74c3c',
              border: 'none',
              color: 'white',
              borderRadius: '5px',
              cursor: 'pointer'
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
          padding: '1rem 2rem',
          borderBottom: '1px solid #ddd',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem' }}>
              Welcome back, {user.name}!
            </h1>
            <p style={{ margin: 0, color: '#666' }}>
              Farm: {user.farmName || 'My Farm'} | Location: {user.location || 'Not specified'}
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <select 
              style={{ 
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}
              defaultValue={user.language || 'en'}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
            
            <div style={{
              padding: '0.5rem 1rem',
              background: '#f8f9fa',
              borderRadius: '20px',
              fontSize: '0.8rem',
              border: '1px solid #dee2e6'
            }}>
              Farmer ID: {user.id}
            </div>
          </div>
        </header>

        {/* Alert Banner */}
        <div style={{
          background: '#fff3cd',
          border: '1px solid #ffeaa7',
          padding: '0.75rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <strong>🚨 Active Alerts:</strong> 
            <span style={{ marginLeft: '1rem' }}>
              {mockDashboardData.alertsCount} health alerts • 
              {mockDashboardData.biosecurityBreaches} biosecurity issues
            </span>
          </div>
          <button style={{
            background: 'transparent',
            border: '1px solid #f39c12',
            color: '#e67e22',
            padding: '0.25rem 0.75rem',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '0.8rem'
          }}>
            View All
          </button>
        </div>

        {/* Main Content */}
        <main style={{ 
          flex: 1, 
          padding: '2rem',
          overflow: 'auto'
        }}>
          {renderActiveModule()}
        </main>

        {/* Mobile Alert Feed (Bottom on mobile, sidebar on desktop) */}
        <div style={{
          position: 'fixed',
          right: '2rem',
          bottom: '2rem',
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