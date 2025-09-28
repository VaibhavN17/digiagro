"use client";

interface DashboardData {
  totalAnimals: number;
  healthyAnimals: number;
  sickAnimals: number;
  alertsCount: number;
  biosecurityBreaches: number;
}

export default function DashboardOverview({ data }: { data: DashboardData }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Farm Overview</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{ padding: '0.5rem 1rem', background: '#3498db', color: 'white', border: 'none', borderRadius: '5px' }}>
            📋 Quick Report
          </button>
          <button style={{ padding: '0.5rem 1rem', background: '#27ae60', color: 'white', border: 'none', borderRadius: '5px' }}>
            🎥 View Camera Feed
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem', 
        marginBottom: '2rem' 
      }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#666' }}>Total Animals</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#2c3e50' }}>
            {data.totalAnimals}
          </p>
        </div>
        
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#666' }}>Healthy</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#27ae60' }}>
            {data.healthyAnimals}
          </p>
        </div>
        
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#666' }}>Sick</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#e74c3c' }}>
            {data.sickAnimals}
          </p>
        </div>
        
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#666' }}>Active Alerts</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#f39c12' }}>
            {data.alertsCount}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1rem' 
      }}>
        <div style={{ background: '#e8f4fd', padding: '1rem', borderRadius: '8px' }}>
          <h3>🚨 Health Alerts</h3>
          <p>Monitor animal health in real-time</p>
          <button style={{ width: '100%', padding: '0.5rem', background: '#3498db', color: 'white', border: 'none', borderRadius: '5px' }}>
            View Health Dashboard
          </button>
        </div>
        
        <div style={{ background: '#e8f6f3', padding: '1rem', borderRadius: '8px' }}>
          <h3>📋 Records</h3>
          <p>Access automated health records</p>
          <button style={{ width: '100%', padding: '0.5rem', background: '#27ae60', color: 'white', border: 'none', borderRadius: '5px' }}>
            View Animal Registry
          </button>
        </div>
        
        <div style={{ background: '#fef9e7', padding: '1rem', borderRadius: '8px' }}>
          <h3>🌡️ Forecast</h3>
          <p>Check disease outbreak predictions</p>
          <button style={{ width: '100%', padding: '0.5rem', background: '#f39c12', color: 'white', border: 'none', borderRadius: '5px' }}>
            View Forecast
          </button>
        </div>
      </div>
    </div>
  );
}