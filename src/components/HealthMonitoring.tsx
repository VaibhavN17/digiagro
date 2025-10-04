"use client";

import React, { useState, useEffect } from 'react';
import './HealthMonitoring.css';

interface HealthAlert {
  id: string;
  animalId: string;
  animalName: string;
  species: 'poultry' | 'swine';
  alertType: 'disease' | 'behavior' | 'environment' | 'feeding';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  cameraId: string;
  confidence: number;
  status: 'active' | 'resolved';
  suggestedAction: string;
}

interface CameraFeed {
  id: string;
  location: string;
  status: 'online' | 'offline' | 'recording';
  animalCount: number;
  lastActivity: string;
  temperature?: number;
  humidity?: number;
}

interface HealthMetric {
  animalId: string;
  name: string;
  species: 'poultry' | 'swine';
  temperature: number;
  activityLevel: number;
  feedIntake: number;
  waterConsumption: number;
  lastUpdate: string;
  status: 'normal' | 'warning' | 'critical';
}

const HealthMonitoring: React.FC<{ farmerId: string }> = ({ farmerId }) => {
  const [alerts, setAlerts] = useState<HealthAlert[]>([]);
  const [cameraFeeds, setCameraFeeds] = useState<CameraFeed[]>([]);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<HealthAlert | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  // Mock data for health alerts
  const mockAlerts: HealthAlert[] = [
    {
      id: '1',
      animalId: 'RFID_CHK_001',
      animalName: 'Goldie',
      species: 'poultry',
      alertType: 'disease',
      severity: 'high',
      message: 'Abnormal breathing pattern detected - possible respiratory infection',
      timestamp: '2024-02-15T10:30:00',
      cameraId: 'CAM_COOP_A1',
      confidence: 87,
      status: 'active',
      suggestedAction: 'Isolate animal and consult veterinarian for respiratory checkup'
    },
    {
      id: '2',
      animalId: 'RFID_PIG_001',
      animalName: 'Porky',
      species: 'swine',
      alertType: 'feeding',
      severity: 'medium',
      message: 'Reduced feed intake detected - 40% below normal levels',
      timestamp: '2024-02-15T09:15:00',
      cameraId: 'CAM_PEN_B1',
      confidence: 92,
      status: 'active',
      suggestedAction: 'Monitor closely and check for signs of digestive issues'
    },
    {
      id: '3',
      animalId: 'RFID_CHK_002',
      animalName: 'Spotty',
      species: 'poultry',
      alertType: 'behavior',
      severity: 'low',
      message: 'Unusual movement pattern - possible leg injury',
      timestamp: '2024-02-14T16:45:00',
      cameraId: 'CAM_COOP_A2',
      confidence: 78,
      status: 'resolved',
      suggestedAction: 'Already treated - continue monitoring recovery'
    },
    {
      id: '4',
      animalId: 'RFID_PIG_002',
      animalName: 'Babe',
      species: 'swine',
      alertType: 'environment',
      severity: 'critical',
      message: 'High temperature detected in pen - 35°C exceeds safe range',
      timestamp: '2024-02-15T11:20:00',
      cameraId: 'CAM_PEN_B2',
      confidence: 95,
      status: 'active',
      suggestedAction: 'Immediately activate cooling system and provide additional water'
    }
  ];

  // Mock data for camera feeds
  const mockCameraFeeds: CameraFeed[] = [
    {
      id: 'CAM_COOP_A1',
      location: 'Coop A-1',
      status: 'recording',
      animalCount: 25,
      lastActivity: '2024-02-15T11:45:00',
      temperature: 28,
      humidity: 65
    },
    {
      id: 'CAM_COOP_A2',
      location: 'Coop A-2',
      status: 'online',
      animalCount: 30,
      lastActivity: '2024-02-15T11:40:00',
      temperature: 27,
      humidity: 62
    },
    {
      id: 'CAM_PEN_B1',
      location: 'Pen B-1',
      status: 'online',
      animalCount: 8,
      lastActivity: '2024-02-15T11:42:00',
      temperature: 35,
      humidity: 70
    },
    {
      id: 'CAM_PEN_B2',
      location: 'Pen B-2',
      status: 'offline',
      animalCount: 6,
      lastActivity: '2024-02-15T09:30:00'
    }
  ];

  // Mock data for health metrics
  const mockHealthMetrics: HealthMetric[] = [
    {
      animalId: 'RFID_CHK_001',
      name: 'Goldie',
      species: 'poultry',
      temperature: 41.8,
      activityLevel: 45,
      feedIntake: 0.11,
      waterConsumption: 0.25,
      lastUpdate: '2024-02-15T11:30:00',
      status: 'warning'
    },
    {
      animalId: 'RFID_CHK_002',
      name: 'Spotty',
      species: 'poultry',
      temperature: 41.2,
      activityLevel: 85,
      feedIntake: 0.13,
      waterConsumption: 0.28,
      lastUpdate: '2024-02-15T11:25:00',
      status: 'normal'
    },
    {
      animalId: 'RFID_PIG_001',
      name: 'Porky',
      species: 'swine',
      temperature: 38.8,
      activityLevel: 60,
      feedIntake: 2.8,
      waterConsumption: 8.5,
      lastUpdate: '2024-02-15T11:35:00',
      status: 'warning'
    },
    {
      animalId: 'RFID_PIG_002',
      name: 'Babe',
      species: 'swine',
      temperature: 39.5,
      activityLevel: 40,
      feedIntake: 1.2,
      waterConsumption: 4.8,
      lastUpdate: '2024-02-15T11:20:00',
      status: 'critical'
    }
  ];

  useEffect(() => {
    setAlerts(mockAlerts);
    setCameraFeeds(mockCameraFeeds);
    setHealthMetrics(mockHealthMetrics);
  }, []);

  const filteredAlerts = alerts.filter(alert => {
    if (filterStatus !== 'all' && alert.status !== filterStatus) return false;
    if (filterSeverity !== 'all' && alert.severity !== filterSeverity) return false;
    return true;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'severity-critical';
      case 'high': return 'severity-high';
      case 'medium': return 'severity-medium';
      case 'low': return 'severity-low';
      default: return 'severity-default';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'status-active' : 'status-resolved';
  };

  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case 'disease': return '🦠';
      case 'behavior': return '🏃';
      case 'environment': return '🌡️';
      case 'feeding': return '🍽️';
      default: return '⚠️';
    }
  };

  const getSpeciesIcon = (species: string) => {
    return species === 'poultry' ? '🐔' : '🐖';
  };

  const getCameraStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'camera-online';
      case 'offline': return 'camera-offline';
      case 'recording': return 'camera-recording';
      default: return 'camera-default';
    }
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'health-normal';
      case 'warning': return 'health-warning';
      case 'critical': return 'health-critical';
      default: return 'health-default';
    }
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status: 'resolved' } : alert
    ));
  };

  const getActiveAlertsCount = () => {
    return alerts.filter(alert => alert.status === 'active').length;
  };

  const getCriticalAlertsCount = () => {
    return alerts.filter(alert => alert.severity === 'critical' && alert.status === 'active').length;
  };

  return (
    <div className="health-monitoring-container">
      <div className="health-header">
        <h1>AI Health Monitoring</h1>
        <p>Smart camera alerts and early disease detection for poultry and pigs</p>
      </div>

      {/* Overview Stats */}
      <div className="overview-stats">
        <div className="stat-card">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <div className="stat-number">{getActiveAlertsCount()}</div>
            <div className="stat-label">Active Alerts</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔴</div>
          <div className="stat-content">
            <div className="stat-number">{getCriticalAlertsCount()}</div>
            <div className="stat-label">Critical Alerts</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📹</div>
          <div className="stat-content">
            <div className="stat-number">{cameraFeeds.filter(cam => cam.status === 'online').length}</div>
            <div className="stat-label">Active Cameras</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👁️</div>
          <div className="stat-content">
            <div className="stat-number">{cameraFeeds.reduce((sum, cam) => sum + cam.animalCount, 0)}</div>
            <div className="stat-label">Animals Monitored</div>
          </div>
        </div>
      </div>

      <div className="health-content">
        {/* Left Column - Alerts and Camera Feeds */}
        <div className="left-column">
          {/* Health Alerts */}
          <div className="alerts-section">
            <div className="section-header">
              <h2>Health Alerts</h2>
              <div className="filter-controls">
                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="resolved">Resolved</option>
                </select>
                <select 
                  value={filterSeverity} 
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Severity</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            <div className="alerts-list">
              {filteredAlerts.map(alert => (
                <div 
                  key={alert.id} 
                  className={`alert-card ${getSeverityColor(alert.severity)}`}
                  onClick={() => setSelectedAlert(alert)}
                >
                  <div className="alert-header">
                    <div className="alert-type">
                      <span className="alert-icon">{getAlertTypeIcon(alert.alertType)}</span>
                      <span className="alert-type-text">{alert.alertType}</span>
                    </div>
                    <div className={`alert-status ${getStatusColor(alert.status)}`}>
                      {alert.status}
                    </div>
                  </div>
                  
                  <div className="alert-body">
                    <div className="animal-info">
                      <span className="species-icon">{getSpeciesIcon(alert.species)}</span>
                      <span className="animal-name">{alert.animalName}</span>
                      <span className="animal-id">({alert.animalId})</span>
                    </div>
                    <p className="alert-message">{alert.message}</p>
                    <div className="alert-meta">
                      <span className="confidence">AI Confidence: {alert.confidence}%</span>
                      <span className="timestamp">{new Date(alert.timestamp).toLocaleString()}</span>
                    </div>
                  </div>

                  {alert.status === 'active' && (
                    <div className="alert-actions">
                      <button 
                        className="resolve-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          resolveAlert(alert.id);
                        }}
                      >
                        Mark Resolved
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Camera Feeds */}
          <div className="cameras-section">
            <h2>Camera Feeds</h2>
            <div className="cameras-grid">
              {cameraFeeds.map(camera => (
                <div key={camera.id} className="camera-card">
                  <div className="camera-header">
                    <h4>{camera.location}</h4>
                    <span className={`camera-status ${getCameraStatusColor(camera.status)}`}>
                      {camera.status}
                    </span>
                  </div>
                  
                  <div className="camera-preview">
                    <div className="camera-placeholder">
                      <div className="camera-overlay">
                        <span className="camera-id">{camera.id}</span>
                        <span className="animal-count">{camera.animalCount} animals</span>
                      </div>
                      {camera.status === 'recording' && <div className="recording-indicator"></div>}
                    </div>
                  </div>

                  <div className="camera-info">
                    <div className="camera-metrics">
                      {camera.temperature && (
                        <span className="metric">🌡️ {camera.temperature}°C</span>
                      )}
                      {camera.humidity && (
                        <span className="metric">💧 {camera.humidity}%</span>
                      )}
                    </div>
                    <div className="last-activity">
                      Last: {new Date(camera.lastActivity).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Selected Alert Details and Health Metrics */}
        <div className="right-column">
          {/* Selected Alert Details */}
          {selectedAlert ? (
            <div className="alert-details-section">
              <h2>Alert Details</h2>
              <div className="alert-details-card">
                <div className="detail-header">
                  <div className="detail-type">
                    <span className="detail-icon">{getAlertTypeIcon(selectedAlert.alertType)}</span>
                    <span className="detail-type-text">{selectedAlert.alertType.toUpperCase()} ALERT</span>
                  </div>
                  <span className={`detail-severity ${getSeverityColor(selectedAlert.severity)}`}>
                    {selectedAlert.severity}
                  </span>
                </div>

                <div className="detail-body">
                  <div className="animal-detail">
                    <span className="species-icon">{getSpeciesIcon(selectedAlert.species)}</span>
                    <div className="animal-info">
                      <h3>{selectedAlert.animalName}</h3>
                      <p>ID: {selectedAlert.animalId}</p>
                    </div>
                  </div>

                  <div className="alert-description">
                    <h4>Alert Description</h4>
                    <p>{selectedAlert.message}</p>
                  </div>

                  <div className="alert-metadata">
                    <div className="metadata-item">
                      <label>Camera Source:</label>
                      <span>{selectedAlert.cameraId}</span>
                    </div>
                    <div className="metadata-item">
                      <label>AI Confidence:</label>
                      <span>{selectedAlert.confidence}%</span>
                    </div>
                    <div className="metadata-item">
                      <label>Detected At:</label>
                      <span>{new Date(selectedAlert.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="metadata-item">
                      <label>Current Status:</label>
                      <span className={`status-badge ${getStatusColor(selectedAlert.status)}`}>
                        {selectedAlert.status}
                      </span>
                    </div>
                  </div>

                  <div className="suggested-action">
                    <h4>Suggested Action</h4>
                    <p>{selectedAlert.suggestedAction}</p>
                  </div>

                  {selectedAlert.status === 'active' && (
                    <div className="action-buttons">
                      <button className="primary-action">
                        🏥 Contact Veterinarian
                      </button>
                      <button 
                        className="secondary-action"
                        onClick={() => resolveAlert(selectedAlert.id)}
                      >
                        ✅ Mark as Resolved
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="alert-details-section">
              <h2>Alert Details</h2>
              <div className="no-alert-selected">
                <p>Select an alert to view detailed information and suggested actions</p>
              </div>
            </div>
          )}

          {/* Health Metrics Overview */}
          <div className="metrics-section">
            <h2>Health Metrics Overview</h2>
            <div className="metrics-list">
              {healthMetrics.map(metric => (
                <div key={metric.animalId} className="metric-card">
                  <div className="metric-header">
                    <div className="metric-animal">
                      <span className="species-icon">{getSpeciesIcon(metric.species)}</span>
                      <span className="animal-name">{metric.name}</span>
                    </div>
                    <span className={`health-status ${getHealthStatusColor(metric.status)}`}>
                      {metric.status}
                    </span>
                  </div>
                  
                  <div className="metric-values">
                    <div className="metric-item">
                      <label>Temperature:</label>
                      <span>{metric.temperature}°C</span>
                    </div>
                    <div className="metric-item">
                      <label>Activity:</label>
                      <span>{metric.activityLevel}%</span>
                    </div>
                    <div className="metric-item">
                      <label>Feed Intake:</label>
                      <span>{metric.feedIntake} kg/day</span>
                    </div>
                    <div className="metric-item">
                      <label>Water:</label>
                      <span>{metric.waterConsumption} L/day</span>
                    </div>
                  </div>
                  
                  <div className="metric-footer">
                    <span className="last-update">
                      Updated: {new Date(metric.lastUpdate).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthMonitoring;