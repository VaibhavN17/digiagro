"use client";

import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  farmName?: string;
  location?: string;
  language: string;
}

interface AlertRule {
  id: string;
  name: string;
  type: 'temperature' | 'behavior' | 'movement' | 'health';
  threshold: number;
  enabled: boolean;
}

export default function SettingsPanel({ user }: { user: User }) {
  const [userData, setUserData] = useState<User>(user);
  const [activeTab, setActiveTab] = useState<'profile' | 'alerts' | 'devices' | 'system'>('profile');
  const [alertRules, setAlertRules] = useState<AlertRule[]>([
    {
      id: '1',
      name: 'High Temperature Alert',
      type: 'temperature',
      threshold: 39.5,
      enabled: true
    },
    {
      id: '2',
      name: 'Abnormal Behavior',
      type: 'behavior',
      threshold: 75,
      enabled: true
    },
    {
      id: '3',
      name: 'Unauthorized Movement',
      type: 'movement',
      threshold: 0,
      enabled: true
    }
  ]);

  const handleSaveProfile = () => {
    // API call to save profile
    alert('Profile updated successfully!');
  };

  const toggleAlertRule = (id: string) => {
    setAlertRules(rules => 
      rules.map(rule => 
        rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  return (
    <div>
      <h2>Settings & Configuration</h2>
      
      {/* Tab Navigation */}
      <div style={{ 
        display: 'flex', 
        borderBottom: '1px solid #dee2e6',
        marginBottom: '2rem'
      }}>
        {[
          { id: 'profile', label: 'Profile', icon: '👤' },
          { id: 'alerts', label: 'Alert Rules', icon: '🚨' },
          { id: 'devices', label: 'IoT Devices', icon: '📱' },
          { id: 'system', label: 'System', icon: '⚙️' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: '1rem 2rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid #3498db' : '2px solid transparent',
              color: activeTab === tab.id ? '#3498db' : '#666',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 1.5rem 0' }}>Farm Profile</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Farm Name</label>
              <input 
                type="text"
                value={userData.farmName || ''}
                onChange={(e) => setUserData(prev => ({ ...prev, farmName: e.target.value }))}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Location</label>
              <input 
                type="text"
                value={userData.location || ''}
                onChange={(e) => setUserData(prev => ({ ...prev, location: e.target.value }))}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
              <input 
                type="email"
                value={userData.email}
                onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Language</label>
              <select 
                value={userData.language}
                onChange={(e) => setUserData(prev => ({ ...prev, language: e.target.value }))}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '5px' }}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>
          <button 
            onClick={handleSaveProfile}
            style={{ padding: '0.75rem 2rem', background: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Save Changes
          </button>
        </div>
      )}

      {/* Alert Rules Tab */}
      {activeTab === 'alerts' && (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0 }}>Custom Alert Rules</h3>
            <button style={{ padding: '0.5rem 1rem', background: '#27ae60', color: 'white', border: 'none', borderRadius: '5px' }}>
              + New Rule
            </button>
          </div>
          
          <div style={{ display: 'grid', gap: '1rem' }}>
            {alertRules.map(rule => (
              <div key={rule.id} style={{ 
                padding: '1.5rem', 
                border: '1px solid #dee2e6', 
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontWeight: '500', marginBottom: '0.5rem' }}>{rule.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    Type: {rule.type} | Threshold: {rule.threshold}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button 
                    onClick={() => toggleAlertRule(rule.id)}
                    style={{ 
                      padding: '0.5rem 1rem', 
                      background: rule.enabled ? '#e74c3c' : '#27ae60', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '3px',
                      cursor: 'pointer'
                    }}
                  >
                    {rule.enabled ? 'Disable' : 'Enable'}
                  </button>
                  <button style={{ 
                    padding: '0.5rem', 
                    background: '#3498db', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '3px',
                    cursor: 'pointer'
                  }}>
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f8f9fa', borderRadius: '5px' }}>
            <h4 style={{ margin: '0 0 1rem 0' }}>Alert Delivery Methods</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" defaultChecked />
                SMS Notifications
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" defaultChecked />
                Email Alerts
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" />
                Mobile Push Notifications
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" defaultChecked />
                In-App Notifications
              </label>
            </div>
          </div>
        </div>
      )}

      {/* IoT Devices Tab */}
      {activeTab === 'devices' && (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 1.5rem 0' }}>IoT Device Management</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            {[
              { name: 'Smart Camera 1', type: 'Camera', status: 'online', lastActive: '2 min ago' },
              { name: 'Temperature Sensor A', type: 'Sensor', status: 'online', lastActive: '5 min ago' },
              { name: 'RFID Reader Main', type: 'RFID', status: 'offline', lastActive: '1 hour ago' },
              { name: 'IoT Gateway', type: 'Gateway', status: 'online', lastActive: 'Just now' }
            ].map(device => (
              <div key={device.name} style={{ 
                padding: '1.5rem', 
                border: `2px solid ${device.status === 'online' ? '#27ae60' : '#e74c3c'}`,
                borderRadius: '5px'
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{device.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>{device.type}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', 
                    background: device.status === 'online' ? '#e8f6f3' : '#fdeaea',
                    color: device.status === 'online' ? '#27ae60' : '#e74c3c',
                    borderRadius: '3px',
                    fontSize: '0.8rem'
                  }}>
                    {device.status.toUpperCase()}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#666' }}>{device.lastActive}</span>
                </div>
              </div>
            ))}
          </div>

          <button style={{ 
            padding: '0.75rem 1.5rem', 
            background: '#3498db', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            🔧 Add New Device
          </button>
        </div>
      )}

      {/* System Tab */}
      {activeTab === 'system' && (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 1.5rem 0' }}>System Configuration</h3>
          
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <h4 style={{ margin: '0 0 1rem 0' }}>Data Management</h4>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button style={{ 
                  padding: '0.75rem 1.5rem', 
                  background: '#f39c12', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}>
                  📁 Export All Data
                </button>
                <button style={{ 
                  padding: '0.75rem 1.5rem', 
                  background: '#e74c3c', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}>
                  🗑️ Clear Cache
                </button>
              </div>
            </div>

            <div>
              <h4 style={{ margin: '0 0 1rem 0' }}>Offline Mode</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" defaultChecked />
                  Enable Offline Sync
                </label>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>Automatically sync data when back online</span>
              </div>
            </div>

            <div>
              <h4 style={{ margin: '0 0 1rem 0' }}>API Access</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ 
                  padding: '0.75rem', 
                  background: '#f8f9fa', 
                  border: '1px solid #dee2e6',
                  borderRadius: '5px',
                  fontFamily: 'monospace',
                  fontSize: '0.8rem',
                  flex: 1
                }}>
                  api_key_•••••••••••••••••
                </div>
                <button style={{ 
                  padding: '0.75rem 1rem', 
                  background: '#2c3e50', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}>
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}