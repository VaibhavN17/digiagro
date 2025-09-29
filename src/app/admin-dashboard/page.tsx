// // src/app/admin-dashboard/page.tsx
// "use client";

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function AdminDashboard() {
//   const [user, setUser] = useState<any>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const userData = localStorage.getItem('user');
//     if (!userData) {
//       router.push('/login');
//       return;
//     }

//     const userObj = JSON.parse(userData);
//     if (userObj.role !== 'admin') {
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
//       <h1>Admin Dashboard</h1>
//       <p>Welcome, {user.name}!</p>
      
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
//         <div style={{ background: '#f0f8ff', padding: '1rem', borderRadius: '8px' }}>
//           <h3>User Management</h3>
//           <p>Manage all users in the system</p>
//         </div>
        
//         <div style={{ background: '#f0fff0', padding: '1rem', borderRadius: '8px' }}>
//           <h3>System Analytics</h3>
//           <p>View system usage statistics</p>
//         </div>
        
//         <div style={{ background: '#fff8f0', padding: '1rem', borderRadius: '8px' }}>
//           <h3>Content Management</h3>
//           <p>Manage platform content</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/app/admin-dashboard/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboardOverview from '../../components/AdminDashboardOverview';
import AdminUserManagement from '../../components/AdminUserManagement';
import AdminSystemAnalytics from '../../components/AdminSystemAnalytics';
import AdminContentManagement from '../../components/AdminContentManagement';
import AdminSettingsPanel from '../../components/AdminSettingsPanel';
import AdminReportsModule from '../../components/AdminReportsModule';

// Mock data for admin dashboard
const mockAdminData = {
  totalUsers: 156,
  activeUsers: 142,
  newRegistrations: 8,
  systemAlerts: 3,
  pendingApprovals: 5
};

export default function AdminDashboard() {
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
    if (userObj.role !== 'admin') {
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
    localStorage.removeItem('admin-data');
    router.push('/login');
  };

  const syncOfflineData = () => {
    // Simulate syncing offline data
    const offlineData = localStorage.getItem('admin-offline-data');
    if (offlineData) {
      console.log('Syncing admin offline data...');
      // API call to sync data
      localStorage.removeItem('admin-offline-data');
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
        <div>Loading Admin Dashboard...</div>
      </div>
    );
  }

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <AdminDashboardOverview data={mockAdminData} />;
      case 'users':
        return <AdminUserManagement />;
      case 'analytics':
        return <AdminSystemAnalytics />;
      case 'content':
        return <AdminContentManagement />;
      case 'reports':
        return <AdminReportsModule />;
      case 'settings':
        return <AdminSettingsPanel user={user} />;
      default:
        return <AdminDashboardOverview data={mockAdminData} />;
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
       

        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent 0%, #dee2e6 50%, transparent 100%)', margin: '20px 0' }}></div>

        {/* Admin Management Section */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: '#2d5016',
            margin: '0 0 5px 0'
          }}>
            Admin Center
          </h3>
          <p style={{ 
            fontSize: '12px', 
            color: '#6c757d',
            margin: '0 0 20px 0',
            fontWeight: '500'
          }}>
            System Management
          </p>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'users', label: 'User Management', icon: '👥' },
              { id: 'analytics', label: 'System Analytics', icon: '📈' },
              { id: 'content', label: 'Content Management', icon: '📝' },
              { id: 'reports', label: 'System Reports', icon: '📋' },
              { id: 'settings', label: 'Admin Settings', icon: '⚙️' }
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
              Role: System Administrator | Last Login: Today
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
              Admin ID: {user.id}
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
            <strong style={{ color: '#856404' }}>🚨 System Alerts:</strong> 
            <span style={{ marginLeft: '15px', color: '#856404' }}>
              {mockAdminData.systemAlerts} system alerts • 
              {mockAdminData.pendingApprovals} pending approvals
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