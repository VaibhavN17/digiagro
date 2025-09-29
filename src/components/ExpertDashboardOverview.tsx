// src/components/ExpertDashboardOverview.tsx
export default function ExpertDashboardOverview({ data }: { data: any }) {
  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#2d5016' }}>Expert Dashboard Overview</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #3498db'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#495057' }}>Pending Consultations</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#3498db', margin: 0 }}>
            {data.pendingConsultations}
          </p>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #27ae60'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#495057' }}>Completed Cases</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#27ae60', margin: 0 }}>
            {data.completedCases}
          </p>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #f39c12'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#495057' }}>Active Patients</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#f39c12', margin: 0 }}>
            {data.activePatients}
          </p>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #e74c3c'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#495057' }}>Urgent Cases</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#e74c3c', margin: 0 }}>
            {data.urgentCases}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginBottom: '15px', color: '#2d5016' }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button style={{
            padding: '10px 15px',
            background: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            View Consultations
          </button>
          <button style={{
            padding: '10px 15px',
            background: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Disease Diagnosis
          </button>
          <button style={{
            padding: '10px 15px',
            background: '#f39c12',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Create Treatment Plan
          </button>
        </div>
      </div>
    </div>
  );
}