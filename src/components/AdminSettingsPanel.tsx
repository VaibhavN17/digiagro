// src/components/AdminSettingsPanel.tsx
export default function AdminSettingsPanel({ user }: { user: any }) {
  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#2d5016' }}>Admin Settings</h2>
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <p>Admin settings content goes here...</p>
      </div>
    </div>
  );
}