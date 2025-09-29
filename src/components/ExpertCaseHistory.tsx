// src/components/ExpertCaseHistory.tsx
export default function ExpertCaseHistory({ expertId }: { expertId: string }) {
  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#2d5016' }}>Case History</h2>
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <p>Case history content goes here...</p>
      </div>
    </div>
  );
}