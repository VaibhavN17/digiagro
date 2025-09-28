"use client";

import { useState, useEffect } from 'react';

interface Alert {
  id: string;
  type: 'health' | 'security' | 'system' | 'forecast';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: string;
  animalId?: string;
  read: boolean;
}

export default function MobileAlertFeed({ farmerId }: { farmerId: string }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Mock data - replace with WebSocket or API calls
    const mockAlerts: Alert[] = [
      {
        id: '1',
        type: 'health',
        priority: 'high',
        title: 'Abnormal Temperature Detected',
        message: 'Animal B-0024 shows elevated body temperature (40.2°C)',
        timestamp: '2024-01-15T14:30:00Z',
        animalId: 'B-0024',
        read: false
      },
      {
        id: '2',
        type: 'security',
        priority: 'medium',
        title: 'Unauthorized Access',
        message: 'Unknown vehicle detected at Service Gate',
        timestamp: '2024-01-15T13:45:00Z',
        read: false
      },
      {
        id: '3',
        type: 'forecast',
        priority: 'critical',
        title: 'High Disease Risk',
        message: 'Foot & Mouth disease risk predicted at 78% for tomorrow',
        timestamp: '2024-01-15T12:00:00Z',
        read: true
      }
    ];
    
    setAlerts(mockAlerts);
    setUnreadCount(mockAlerts.filter(alert => !alert.read).length);
  }, [farmerId]);

  const markAsRead = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return '#e74c3c';
      case 'high': return '#e67e22';
      case 'medium': return '#f39c12';
      case 'low': return '#3498db';
      default: return '#95a5a6';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'health': return '❤️';
      case 'security': return '🔒';
      case 'system': return '⚙️';
      case 'forecast': return '🌡️';
      default: return '📢';
    }
  };

  return (
    <>
      {/* Floating Alert Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            zIndex: 1000
          }}
        >
          📢
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              background: '#e74c3c',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              fontSize: '0.7rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid white'
            }}>
              {unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Alert Panel */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '400px',
          maxHeight: '500px',
          background: 'white',
          borderRadius: '10px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <div style={{
            padding: '1rem',
            background: '#2c3e50',
            color: 'white',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{ margin: 0, fontSize: '1rem' }}>Live Alerts ({alerts.length})</h3>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1.2rem',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>

          {/* Alert List */}
          <div style={{ flex: 1, overflow: 'auto' }}>
            {alerts.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                No alerts at this time
              </div>
            ) : (
              alerts.map(alert => (
                <div
                  key={alert.id}
                  style={{
                    padding: '1rem',
                    borderBottom: '1px solid #f0f0f0',
                    background: alert.read ? 'white' : '#f8f9fa',
                    cursor: 'pointer'
                  }}
                  onClick={() => markAsRead(alert.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ fontSize: '1.2rem' }}>
                      {getTypeIcon(alert.type)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                        <div style={{ fontWeight: '500', fontSize: '0.9rem' }}>
                          {alert.title}
                        </div>
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: getPriorityColor(alert.priority),
                          flexShrink: 0,
                          marginLeft: '0.5rem'
                        }} />
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem' }}>
                        {alert.message}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.7rem', color: '#999' }}>
                          {new Date(alert.timestamp).toLocaleTimeString()}
                        </span>
                        {alert.animalId && (
                          <span style={{
                            fontSize: '0.7rem',
                            padding: '0.2rem 0.4rem',
                            background: '#e8f4fd',
                            color: '#3498db',
                            borderRadius: '3px'
                          }}>
                            {alert.animalId}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div style={{
            padding: '0.75rem',
            borderTop: '1px solid #dee2e6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <button
              onClick={() => {
                setAlerts(prev => prev.map(alert => ({ ...alert, read: true })));
                setUnreadCount(0);
              }}
              style={{
                padding: '0.5rem 1rem',
                background: 'none',
                border: '1px solid #dee2e6',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
            >
              Mark All Read
            </button>
            <button
              onClick={() => {
                // Navigate to full alerts page
                console.log('View all alerts');
              }}
              style={{
                padding: '0.5rem 1rem',
                background: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
            >
              View All
            </button>
          </div>
        </div>
      )}
    </>
  );
}