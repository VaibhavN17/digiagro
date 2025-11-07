"use client";

import { useState, useEffect } from 'react';

interface AccessLog {
  id: string;
  timestamp: string;
  person: string;
  type: 'entry' | 'exit';
  location: string;
  status: 'authorized' | 'unauthorized';
  temperature?: number;
}

export default function BiosecurityLog({ farmId }: { farmId: string }) {
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [filter, setFilter] = useState<'all' | 'unauthorized'>('all');

  useEffect(() => {
    // Mock data - replace with API call
    const mockLogs: AccessLog[] = [
      {
        id: '1',
        timestamp: '2024-01-15T08:30:00Z',
        person: 'Dr. Raj (Veterinarian)',
        type: 'entry',
        location: 'Main Gate',
        status: 'authorized',
        temperature: 36.6
      },
      {
        id: '2',
        timestamp: '2024-01-15T09:15:00Z',
        person: 'Feed Delivery - Truck 45',
        type: 'entry',
        location: 'Service Entrance',
        status: 'unauthorized'
      },
      {
        id: '3',
        timestamp: '2024-01-15T10:00:00Z',
        person: 'Farm Worker - Rajpal Yadav',
        type: 'entry',
        location: 'Staff Gate',
        status: 'authorized',
        temperature: 36.8
      }
    ];
    setLogs(mockLogs);
  }, [farmId]);

  const filteredLogs = logs.filter(log => 
    filter === 'all' || log.status === 'unauthorized'
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Real-Time Biosecurity Enforcement</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'unauthorized')}
            style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '5px' }}
          >
            <option value="all">All Events</option>
            <option value="unauthorized">Unauthorized Only</option>
          </select>
          <button style={{ padding: '0.5rem 1rem', background: '#3498db', color: 'white', border: 'none', borderRadius: '5px' }}>
            📄 Export Compliance Report
          </button>
        </div>
      </div>

      {/* Current Status */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem', 
        marginBottom: '2rem' 
      }}>
        <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#666' }}>Active Zones</h3>
          <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#2c3e50' }}>8/8</p>
          <small style={{ color: '#27ae60' }}>All Secure</small>
        </div>
        
        <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#666' }}>Today's Entries</h3>
          <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#2c3e50' }}>24</p>
        </div>
        
        <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#666' }}>Unauthorized</h3>
          <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#e74c3c' }}>2</p>
        </div>
        
        <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#666' }}>Compliance Score</h3>
          <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#27ae60' }}>92%</p>
        </div>
      </div>

      {/* Access Logs Table */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Time</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Person/Vehicle</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Location</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Type</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Temperature</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(log => (
              <tr key={log.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                <td style={{ padding: '1rem' }}>
                  {new Date(log.timestamp).toLocaleTimeString()}
                </td>
                <td style={{ padding: '1rem', fontWeight: '500' }}>{log.person}</td>
                <td style={{ padding: '1rem' }}>{log.location}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '3px', 
                    fontSize: '0.8rem',
                    background: log.type === 'entry' ? '#e8f6f3' : '#fef9e7',
                    color: log.type === 'entry' ? '#27ae60' : '#f39c12'
                  }}>
                    {log.type.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  {log.temperature ? `${log.temperature}°C` : 'N/A'}
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '3px', 
                    fontSize: '0.8rem',
                    background: log.status === 'authorized' ? '#e8f6f3' : '#fdeaea',
                    color: log.status === 'authorized' ? '#27ae60' : '#e74c3c'
                  }}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Real-time Monitoring Section */}
      <div style={{ marginTop: '2rem', background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3>🔒 Active Zone Monitoring</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          {['Main Gate', 'Staff Entrance', 'Service Gate', 'Quarantine Zone', 'Feed Storage', 'Medical Bay'].map(zone => (
            <div key={zone} style={{ 
              padding: '1rem', 
              border: '2px solid #27ae60', 
              borderRadius: '5px',
              textAlign: 'center'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{zone}</div>
              <div style={{ color: '#27ae60', fontSize: '0.8rem' }}>● SECURE</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}