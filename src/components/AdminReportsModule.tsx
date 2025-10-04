// src/components/AdminReportsModule.tsx
"use client";

import React, { useState, useEffect } from 'react';
import './AdminReportsModule.css';

interface FarmSensorData {
  farmId: string;
  farmName: string;
  location: string;
  species: 'poultry' | 'swine' | 'mixed';
  totalAnimals: number;
  sensorMetrics: {
    temperature: number;
    humidity: number;
    ammonia: number;
    co2: number;
    waterConsumption: number;
    feedConsumption: number;
    activityLevel: number;
  };
  healthAlerts: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  lastUpdate: string;
  sensorStatus: 'online' | 'offline' | 'maintenance';
}

interface SystemStats {
  totalFarms: number;
  onlineSensors: number;
  criticalAlerts: number;
  averageTemperature: number;
  averageHumidity: number;
  totalAnimals: number;
  dataAccuracy: number;
}

interface ReportData {
  timestamp: string;
  farmId: string;
  metric: string;
  value: number;
  threshold: number;
  status: 'normal' | 'warning' | 'critical';
}

const AdminReportsModule: React.FC = () => {
  const [sensorData, setSensorData] = useState<FarmSensorData[]>([]);
  const [filteredData, setFilteredData] = useState<FarmSensorData[]>([]);
  const [systemStats, setSystemStats] = useState<SystemStats>({
    totalFarms: 0,
    onlineSensors: 0,
    criticalAlerts: 0,
    averageTemperature: 0,
    averageHumidity: 0,
    totalAnimals: 0,
    dataAccuracy: 0
  });
  const [selectedFarm, setSelectedFarm] = useState<FarmSensorData | null>(null);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [selectedMetric, setSelectedMetric] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock sensor data from farms
  const mockSensorData: FarmSensorData[] = [
    {
      farmId: 'FARM_001',
      farmName: 'Green Valley Poultry',
      location: 'Pune, Maharashtra',
      species: 'poultry',
      totalAnimals: 5000,
      sensorMetrics: {
        temperature: 28.5,
        humidity: 65,
        ammonia: 12,
        co2: 450,
        waterConsumption: 1250,
        feedConsumption: 600,
        activityLevel: 85
      },
      healthAlerts: 2,
      riskLevel: 'medium',
      lastUpdate: '2024-02-15T10:30:00',
      sensorStatus: 'online'
    },
    {
      farmId: 'FARM_002',
      farmName: 'Happy Pig Farms',
      location: 'Ahmedabad, Gujarat',
      species: 'swine',
      totalAnimals: 1200,
      sensorMetrics: {
        temperature: 32.8,
        humidity: 70,
        ammonia: 25,
        co2: 680,
        waterConsumption: 3200,
        feedConsumption: 1800,
        activityLevel: 72
      },
      healthAlerts: 5,
      riskLevel: 'high',
      lastUpdate: '2024-02-15T09:45:00',
      sensorStatus: 'online'
    },
    {
      farmId: 'FARM_003',
      farmName: 'Sunrise Poultry',
      location: 'Hyderabad, Telangana',
      species: 'poultry',
      totalAnimals: 8000,
      sensorMetrics: {
        temperature: 26.2,
        humidity: 58,
        ammonia: 8,
        co2: 380,
        waterConsumption: 2000,
        feedConsumption: 950,
        activityLevel: 92
      },
      healthAlerts: 0,
      riskLevel: 'low',
      lastUpdate: '2024-02-15T11:15:00',
      sensorStatus: 'online'
    },
    {
      farmId: 'FARM_004',
      farmName: 'Premium Pork Producers',
      location: 'Bengaluru, Karnataka',
      species: 'swine',
      totalAnimals: 2000,
      sensorMetrics: {
        temperature: 35.2,
        humidity: 75,
        ammonia: 35,
        co2: 820,
        waterConsumption: 4800,
        feedConsumption: 2200,
        activityLevel: 45
      },
      healthAlerts: 8,
      riskLevel: 'critical',
      lastUpdate: '2024-02-15T08:20:00',
      sensorStatus: 'online'
    },
    {
      farmId: 'FARM_005',
      farmName: 'Golden Eggs Farm',
      location: 'Chennai, Tamil Nadu',
      species: 'poultry',
      totalAnimals: 3500,
      sensorMetrics: {
        temperature: 29.8,
        humidity: 62,
        ammonia: 15,
        co2: 520,
        waterConsumption: 900,
        feedConsumption: 450,
        activityLevel: 78
      },
      healthAlerts: 1,
      riskLevel: 'medium',
      lastUpdate: '2024-02-14T16:30:00',
      sensorStatus: 'offline'
    },
    {
      farmId: 'FARM_006',
      farmName: 'Royal Swine Estate',
      location: 'Mumbai, Maharashtra',
      species: 'swine',
      totalAnimals: 1500,
      sensorMetrics: {
        temperature: 31.5,
        humidity: 68,
        ammonia: 18,
        co2: 580,
        waterConsumption: 3800,
        feedConsumption: 1700,
        activityLevel: 65
      },
      healthAlerts: 3,
      riskLevel: 'medium',
      lastUpdate: '2024-02-15T10:00:00',
      sensorStatus: 'maintenance'
    }
  ];

  // Mock historical data for charts
  const mockReportData: ReportData[] = [
    { timestamp: '2024-02-15T10:00:00', farmId: 'FARM_001', metric: 'temperature', value: 28.2, threshold: 30, status: 'normal' },
    { timestamp: '2024-02-15T10:00:00', farmId: 'FARM_001', metric: 'ammonia', value: 15, threshold: 20, status: 'normal' },
    { timestamp: '2024-02-15T10:00:00', farmId: 'FARM_004', metric: 'temperature', value: 35.2, threshold: 32, status: 'critical' },
    { timestamp: '2024-02-15T10:00:00', farmId: 'FARM_004', metric: 'ammonia', value: 35, threshold: 25, status: 'critical' },
    { timestamp: '2024-02-15T09:00:00', farmId: 'FARM_002', metric: 'co2', value: 680, threshold: 600, status: 'warning' },
  ];

  useEffect(() => {
    setSensorData(mockSensorData);
    setFilteredData(mockSensorData);
    calculateSystemStats(mockSensorData);
  }, []);

  useEffect(() => {
    let filtered = sensorData;

    if (selectedMetric !== 'all') {
      filtered = filtered.filter(farm => {
        const metricValue = farm.sensorMetrics[selectedMetric as keyof typeof farm.sensorMetrics];
        return metricValue !== undefined;
      });
    }

    if (searchTerm) {
      filtered = filtered.filter(farm =>
        farm.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farm.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farm.farmId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [selectedMetric, searchTerm, sensorData]);

  const calculateSystemStats = (data: FarmSensorData[]) => {
    const totalFarms = data.length;
    const onlineSensors = data.filter(farm => farm.sensorStatus === 'online').length;
    const criticalAlerts = data.filter(farm => farm.riskLevel === 'critical').length;
    const averageTemperature = data.reduce((sum, farm) => sum + farm.sensorMetrics.temperature, 0) / totalFarms;
    const averageHumidity = data.reduce((sum, farm) => sum + farm.sensorMetrics.humidity, 0) / totalFarms;
    const totalAnimals = data.reduce((sum, farm) => sum + farm.totalAnimals, 0);
    const dataAccuracy = (onlineSensors / totalFarms) * 100;

    setSystemStats({
      totalFarms,
      onlineSensors,
      criticalAlerts,
      averageTemperature: Number(averageTemperature.toFixed(1)),
      averageHumidity: Number(averageHumidity.toFixed(1)),
      totalAnimals,
      dataAccuracy: Number(dataAccuracy.toFixed(1))
    });
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'risk-low';
      case 'medium': return 'risk-medium';
      case 'high': return 'risk-high';
      case 'critical': return 'risk-critical';
      default: return 'risk-default';
    }
  };

  const getSensorStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'sensor-online';
      case 'offline': return 'sensor-offline';
      case 'maintenance': return 'sensor-maintenance';
      default: return 'sensor-default';
    }
  };

  const getSpeciesIcon = (species: string) => {
    return species === 'poultry' ? '🐔' : '🐖';
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'temperature': return '🌡️';
      case 'humidity': return '💧';
      case 'ammonia': return '☁️';
      case 'co2': return '🌫️';
      case 'waterConsumption': return '🚰';
      case 'feedConsumption': return '🍽️';
      case 'activityLevel': return '🏃';
      default: return '📊';
    }
  };

  const getMetricUnit = (metric: string) => {
    switch (metric) {
      case 'temperature': return '°C';
      case 'humidity': return '%';
      case 'ammonia': return 'ppm';
      case 'co2': return 'ppm';
      case 'waterConsumption': return 'L/day';
      case 'feedConsumption': return 'kg/day';
      case 'activityLevel': return '%';
      default: return '';
    }
  };

  const getMetricStatus = (metric: string, value: number): 'normal' | 'warning' | 'critical' => {
    const thresholds: { [key: string]: { warning: number; critical: number } } = {
      temperature: { warning: 32, critical: 35 },
      humidity: { warning: 75, critical: 85 },
      ammonia: { warning: 20, critical: 30 },
      co2: { warning: 600, critical: 800 },
      waterConsumption: { warning: -20, critical: -40 }, // Percentage change
      feedConsumption: { warning: -15, critical: -30 }, // Percentage change
      activityLevel: { warning: 60, critical: 40 }
    };

    const threshold = thresholds[metric];
    if (!threshold) return 'normal';

    if (value >= threshold.critical) return 'critical';
    if (value >= threshold.warning) return 'warning';
    return 'normal';
  };

  const formatLastUpdate = (timestamp: string) => {
    const now = new Date();
    const updateTime = new Date(timestamp);
    const diffMinutes = Math.floor((now.getTime() - updateTime.getTime()) / (1000 * 60));
    
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return `${Math.floor(diffMinutes / 1440)}d ago`;
  };

  const exportSensorData = () => {
    const csvContent = [
      ['Farm ID', 'Farm Name', 'Location', 'Species', 'Total Animals', 'Temperature', 'Humidity', 'Ammonia', 'CO2', 'Water Consumption', 'Feed Consumption', 'Activity Level', 'Health Alerts', 'Risk Level', 'Last Update'],
      ...filteredData.map(farm => [
        farm.farmId,
        farm.farmName,
        farm.location,
        farm.species,
        farm.totalAnimals.toString(),
        farm.sensorMetrics.temperature.toString(),
        farm.sensorMetrics.humidity.toString(),
        farm.sensorMetrics.ammonia.toString(),
        farm.sensorMetrics.co2.toString(),
        farm.sensorMetrics.waterConsumption.toString(),
        farm.sensorMetrics.feedConsumption.toString(),
        farm.sensorMetrics.activityLevel.toString(),
        farm.healthAlerts.toString(),
        farm.riskLevel,
        farm.lastUpdate
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sensor_data_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const generateSystemReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      summary: systemStats,
      criticalFarms: filteredData.filter(farm => farm.riskLevel === 'critical'),
      offlineSensors: filteredData.filter(farm => farm.sensorStatus !== 'online'),
      metricsOverview: Object.keys(mockSensorData[0].sensorMetrics).map(metric => ({
        metric,
        average: Number((filteredData.reduce((sum, farm) => sum + farm.sensorMetrics[metric as keyof typeof farm.sensorMetrics], 0) / filteredData.length).toFixed(2)),
        unit: getMetricUnit(metric)
      }))
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system_report_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="admin-reports-module">
      <div className="reports-header">
        <h1>Farm Sensor Monitoring & Reports</h1>
        <p>Real-time sensor data analytics and comprehensive farm monitoring system</p>
      </div>

      {/* System Overview Stats */}
      <div className="system-overview">
        <div className="stat-card">
          <div className="stat-icon">🏢</div>
          <div className="stat-content">
            <div className="stat-number">{systemStats.totalFarms}</div>
            <div className="stat-label">Total Farms</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📡</div>
          <div className="stat-content">
            <div className="stat-number">{systemStats.onlineSensors}</div>
            <div className="stat-label">Online Sensors</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🚨</div>
          <div className="stat-content">
            <div className="stat-number">{systemStats.criticalAlerts}</div>
            <div className="stat-label">Critical Alerts</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🌡️</div>
          <div className="stat-content">
            <div className="stat-number">{systemStats.averageTemperature}°C</div>
            <div className="stat-label">Avg Temperature</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💧</div>
          <div className="stat-content">
            <div className="stat-number">{systemStats.averageHumidity}%</div>
            <div className="stat-label">Avg Humidity</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-number">{systemStats.dataAccuracy}%</div>
            <div className="stat-label">Data Accuracy</div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="action-bar">
        <div className="filter-controls">
          <input
            type="text"
            placeholder="Search farms by name, location, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Metrics</option>
            <option value="temperature">Temperature</option>
            <option value="humidity">Humidity</option>
            <option value="ammonia">Ammonia</option>
            <option value="co2">CO2 Levels</option>
            <option value="waterConsumption">Water Consumption</option>
            <option value="feedConsumption">Feed Consumption</option>
            <option value="activityLevel">Activity Level</option>
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="filter-select"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
        <div className="report-actions">
          <button className="btn-primary" onClick={exportSensorData}>
            📥 Export Sensor Data
          </button>
          <button className="btn-secondary" onClick={generateSystemReport}>
            📊 Generate System Report
          </button>
        </div>
      </div>

      <div className="reports-content">
        {/* Farms Sensor Data Grid */}
        <div className="sensor-grid-section">
          <h2>Real-time Farm Sensor Data</h2>
          <div className="sensor-grid">
            {filteredData.map((farm) => (
              <div
                key={farm.farmId}
                className={`sensor-card ${selectedFarm?.farmId === farm.farmId ? 'selected' : ''}`}
                onClick={() => setSelectedFarm(farm)}
              >
                <div className="farm-header">
                  <div className="farm-info">
                    <span className="species-icon">{getSpeciesIcon(farm.species)}</span>
                    <div>
                      <h3>{farm.farmName}</h3>
                      <p className="farm-location">{farm.location}</p>
                    </div>
                  </div>
                  <div className="farm-status">
                    <span className={`risk-badge ${getRiskLevelColor(farm.riskLevel)}`}>
                      {farm.riskLevel}
                    </span>
                    <span className={`sensor-status ${getSensorStatusColor(farm.sensorStatus)}`}>
                      {farm.sensorStatus}
                    </span>
                  </div>
                </div>

                <div className="sensor-metrics">
                  <div className="metric-row">
                    <div className="metric-item">
                      <span className="metric-icon">🌡️</span>
                      <div className="metric-info">
                        <span className="metric-value">{farm.sensorMetrics.temperature}°C</span>
                        <span className="metric-label">Temperature</span>
                      </div>
                    </div>
                    <div className="metric-item">
                      <span className="metric-icon">💧</span>
                      <div className="metric-info">
                        <span className="metric-value">{farm.sensorMetrics.humidity}%</span>
                        <span className="metric-label">Humidity</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="metric-row">
                    <div className="metric-item">
                      <span className="metric-icon">☁️</span>
                      <div className="metric-info">
                        <span className="metric-value">{farm.sensorMetrics.ammonia}ppm</span>
                        <span className="metric-label">Ammonia</span>
                      </div>
                    </div>
                    <div className="metric-item">
                      <span className="metric-icon">🌫️</span>
                      <div className="metric-info">
                        <span className="metric-value">{farm.sensorMetrics.co2}ppm</span>
                        <span className="metric-label">CO2</span>
                      </div>
                    </div>
                  </div>

                  <div className="additional-metrics">
                    <div className="additional-metric">
                      <span>🚰 {farm.sensorMetrics.waterConsumption}L</span>
                      <span>🍽️ {farm.sensorMetrics.feedConsumption}kg</span>
                      <span>🏃 {farm.sensorMetrics.activityLevel}%</span>
                    </div>
                  </div>
                </div>

                <div className="farm-footer">
                  <div className="farm-stats">
                    <span className="animal-count">🐾 {farm.totalAnimals} animals</span>
                    <span className="alert-count">🚨 {farm.healthAlerts} alerts</span>
                  </div>
                  <div className="last-update">
                    Updated: {formatLastUpdate(farm.lastUpdate)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Farm Details & Analytics */}
        <div className="analytics-section">
          {selectedFarm ? (
            <div className="analytics-card">
              <div className="analytics-header">
                <h2>{selectedFarm.farmName} - Detailed Analytics</h2>
                <span className={`risk-badge large ${getRiskLevelColor(selectedFarm.riskLevel)}`}>
                  {selectedFarm.riskLevel.toUpperCase()} RISK
                </span>
              </div>

              <div className="detailed-metrics">
                <h3>Sensor Metrics Overview</h3>
                <div className="metrics-detail-grid">
                  {Object.entries(selectedFarm.sensorMetrics).map(([metric, value]) => {
                    const status = getMetricStatus(metric, value);
                    return (
                      <div key={metric} className={`metric-detail-card metric-${status}`}>
                        <div className="metric-header">
                          <span className="metric-icon">{getMetricIcon(metric)}</span>
                          <span className="metric-name">
                            {metric.charAt(0).toUpperCase() + metric.slice(1)}
                          </span>
                          <span className={`status-indicator status-${status}`}>
                            {status}
                          </span>
                        </div>
                        <div className="metric-value">
                          {value} {getMetricUnit(metric)}
                        </div>
                        <div className="metric-threshold">
                          Threshold: {metric === 'temperature' ? '32°C' : 
                                    metric === 'humidity' ? '75%' : 
                                    metric === 'ammonia' ? '20ppm' : 
                                    metric === 'co2' ? '600ppm' : 
                                    metric === 'activityLevel' ? '60%' : 'N/A'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Health Alerts Summary */}
              <div className="alerts-summary">
                <h3>Health Alerts & Recommendations</h3>
                <div className="alerts-list">
                  {selectedFarm.healthAlerts > 0 ? (
                    <div className="alert-items">
                      {selectedFarm.sensorMetrics.temperature > 32 && (
                        <div className="alert-item critical">
                          <span>🌡️ High Temperature: {selectedFarm.sensorMetrics.temperature}°C</span>
                          <span>Recommendation: Improve ventilation and provide cooling</span>
                        </div>
                      )}
                      {selectedFarm.sensorMetrics.ammonia > 20 && (
                        <div className="alert-item warning">
                          <span>☁️ Elevated Ammonia: {selectedFarm.sensorMetrics.ammonia}ppm</span>
                          <span>Recommendation: Increase air circulation and check waste management</span>
                        </div>
                      )}
                      {selectedFarm.sensorMetrics.activityLevel < 60 && (
                        <div className="alert-item warning">
                          <span>🏃 Low Activity: {selectedFarm.sensorMetrics.activityLevel}%</span>
                          <span>Recommendation: Check for health issues or environmental stress</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="no-alerts">
                      <span className="success-icon">✅</span>
                      <p>All sensor readings are within normal parameters. No immediate action required.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Historical Trends */}
              <div className="trends-section">
                <h3>Historical Trends ({timeRange})</h3>
                <div className="trends-placeholder">
                  <div className="trend-chart">
                    <div className="chart-header">
                      <span>📈 Metric Trends Visualization</span>
                      <span className="chart-note">(Chart would show historical data here)</span>
                    </div>
                    <div className="chart-content">
                      <p>Temperature: Stable around {selectedFarm.sensorMetrics.temperature}°C</p>
                      <p>Humidity: Consistent at {selectedFarm.sensorMetrics.humidity}%</p>
                      <p>Ammonia: {selectedFarm.sensorMetrics.ammonia > 20 ? 'Increasing trend' : 'Stable'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-farm-selected">
              <div className="placeholder-icon">📊</div>
              <h3>Select a Farm</h3>
              <p>Choose a farm from the grid to view detailed sensor analytics and historical trends</p>
              <div className="quick-stats">
                <h4>System Quick Stats</h4>
                <div className="quick-stats-grid">
                  <div className="quick-stat">
                    <span>🏢 Total Farms: {systemStats.totalFarms}</span>
                  </div>
                  <div className="quick-stat">
                    <span>📡 Online Sensors: {systemStats.onlineSensors}</span>
                  </div>
                  <div className="quick-stat">
                    <span>🚨 Critical Alerts: {systemStats.criticalAlerts}</span>
                  </div>
                  <div className="quick-stat">
                    <span>🐾 Total Animals: {systemStats.totalAnimals.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Critical Alerts Panel */}
      {systemStats.criticalAlerts > 0 && (
        <div className="critical-alerts-panel">
          <div className="alerts-header">
            <h3>🚨 Critical Alerts Requiring Immediate Attention</h3>
            <span className="alerts-count">{systemStats.criticalAlerts} farms</span>
          </div>
          <div className="critical-farms-list">
            {filteredData
              .filter(farm => farm.riskLevel === 'critical')
              .map(farm => (
                <div key={farm.farmId} className="critical-farm">
                  <span className="farm-name">{farm.farmName}</span>
                  <span className="farm-issue">
                    {farm.sensorMetrics.temperature > 35 ? 'High Temperature' : 
                     farm.sensorMetrics.ammonia > 30 ? 'Dangerous Ammonia Levels' : 
                     'Multiple Parameter Issues'}
                  </span>
                  <span className="action-required">Immediate Action Required</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReportsModule;