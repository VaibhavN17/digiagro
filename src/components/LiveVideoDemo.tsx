// E:\SIH Work\Final_Project_SIH\digiagro\src\components\LiveVideoDemo.jsx
import React, { useState } from 'react';
import './LiveVideoDemo.css';

type CameraType = 'biosecurity' | 'animal_welfare' | 'equipment' | 'security' | 'inventory';

interface Camera {
  id: number;
  name: string;
  location: string;
  status: 'online' | 'offline';
  type: CameraType;
  lastAlert: string;
}

interface VideoPlaceholderProps {
  camera: Camera;
  isLarge?: boolean;
}

const LiveVideoDemo: React.FC = () => {
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [layout, setLayout] = useState<'grid' | 'focus'>('grid');

  const cameras: Camera[] = [
    { id: 1, name: "Main Entrance", location: "Gate 1", status: "online", type: "biosecurity", lastAlert: "No recent alerts" },
    { id: 2, name: "Feeding Area", location: "Poultry House A", status: "online", type: "animal_welfare", lastAlert: "Normal activity" },
    { id: 3, name: "Watering System", location: "Poultry House B", status: "online", type: "equipment", lastAlert: "System normal" },
    { id: 4, name: "Isolation Zone", location: "Quarantine Area", status: "offline", type: "biosecurity", lastAlert: "Camera maintenance" },
    { id: 5, name: "Parking Area", location: "Visitor Parking", status: "online", type: "security", lastAlert: "2 vehicles present" },
    { id: 6, name: "Storage Facility", location: "Feed Storage", status: "online", type: "inventory", lastAlert: "Access recorded" }
  ];

  const getCameraIcon = (type: CameraType): string => {
    const icons: Record<CameraType, string> = {
      biosecurity: '🛡️',
      animal_welfare: '🐔',
      equipment: '⚙️',
      security: '🔒',
      inventory: '📦'
    };
    return icons[type] || '📹';
  };

  const getStatusColor = (status: 'online' | 'offline'): string => {
    return status === 'online' ? 'status-online' : 'status-offline';
  };

  const VideoPlaceholder: React.FC<VideoPlaceholderProps> = ({ camera, isLarge = false }) => (
    <div className={`video-placeholder ${isLarge ? 'large' : ''}`}>
      <div className="video-overlay">
        <div className="camera-info">
          <span className="camera-icon">{getCameraIcon(camera.type)}</span>
          <span className="camera-name">{camera.name}</span>
        </div>
        <div className={`status-badge ${getStatusColor(camera.status)}`}>
          {camera.status.toUpperCase()}
        </div>
      </div>
      <div className="video-content">
        <div className="mock-video-feed">
          <div className="mock-animation">
            <div className="scan-line"></div>
            <div className="timestamp">LIVE - {new Date().toLocaleTimeString()}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="live-video-demo">
      <div className="video-header">
        <h2>Live Farm Monitoring</h2>
        <p>Real-time surveillance and biosecurity monitoring</p>
      </div>

      <div className="video-controls">
        <div className="layout-controls">
          <button 
            className={`layout-btn ${layout === 'grid' ? 'active' : ''}`}
            onClick={() => setLayout('grid')}
          >
            Grid View
          </button>
          <button 
            className={`layout-btn ${layout === 'focus' ? 'active' : ''}`}
            onClick={() => setLayout('focus')}
          >
            Focus View
          </button>
        </div>
        
        <div className="camera-stats">
          <span>📹 {cameras.filter(c => c.status === 'online').length}/{cameras.length} Cameras Online</span>
        </div>
      </div>

      {layout === 'focus' && selectedCamera ? (
        <div className="focus-view">
          <div className="focus-header">
            <button className="back-btn" onClick={() => setLayout('grid')}>
              ← Back to Grid
            </button>
            <h3>{selectedCamera.name} - {selectedCamera.location}</h3>
          </div>
          <VideoPlaceholder camera={selectedCamera} isLarge={true} />
          <div className="camera-details">
            <h4>Camera Information</h4>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Status:</label>
                <span className={getStatusColor(selectedCamera.status)}>
                  {selectedCamera.status}
                </span>
              </div>
              <div className="detail-item">
                <label>Type:</label>
                <span>{selectedCamera.type.replace('_', ' ')}</span>
              </div>
              <div className="detail-item">
                <label>Last Alert:</label>
                <span>{selectedCamera.lastAlert}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid-view">
          <div className="cameras-grid">
            {cameras.map(camera => (
              <div 
                key={camera.id} 
                className="camera-card"
                onClick={() => {
                  setSelectedCamera(camera);
                  setLayout('focus');
                }}
              >
                <VideoPlaceholder camera={camera} />
                <div className="camera-footer">
                  <h4>{camera.name}</h4>
                  <p>{camera.location}</p>
                  <span className={`status ${getStatusColor(camera.status)}`}>
                    {camera.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="alerts-panel">
        <h3>Recent Alerts</h3>
        <div className="alerts-list">
          <div className="alert-item warning">
            <span className="alert-icon">⚠️</span>
            <div className="alert-content">
              <strong>Unauthorized access attempt</strong>
              <span>Main Entrance - 2 hours ago</span>
            </div>
          </div>
          <div className="alert-item info">
            <span className="alert-icon">ℹ️</span>
            <div className="alert-content">
              <strong>Vehicle disinfection completed</strong>
              <span>Parking Area - 4 hours ago</span>
            </div>
          </div>
          <div className="alert-item success">
            <span className="alert-icon">✅</span>
            <div className="alert-content">
              <strong>Regular health check completed</strong>
              <span>Poultry House A - 6 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveVideoDemo;