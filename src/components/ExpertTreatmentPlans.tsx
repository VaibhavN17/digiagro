// src/components/ExpertTreatmentPlans.tsx
export default function ExpertTreatmentPlans({ expertId }: { expertId: string }) {
  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#2d5016' }}>Treatment Plans</h2>
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <p>Treatment plans content goes here...</p>
      </div>
    </div>
  );
}