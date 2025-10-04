// src/components/AdminSystemAnalytics.tsx
"use client";

import React, { useState, useEffect } from 'react';
import './AdminSystemAnalytics.css';

interface AnalyticsData {
  timestamp: string;
  farms: number;
  animals: number;
  activeUsers: number;
  healthAlerts: number;
  sensorReadings: number;
  averageTemperature: number;
  averageHumidity: number;
  waterConsumption: number;
  feedConsumption: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    fill?: boolean;
  }[];
}

const AdminSystemAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [activeTab, setActiveTab] = useState<'overview' | 'environment' | 'consumption' | 'health'>('overview');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data generation
  const generateMockData = (days: number): AnalyticsData[] => {
    const data: AnalyticsData[] = [];
    const baseDate = new Date();
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(baseDate);
      date.setDate(date.getDate() - i);
      
      data.push({
        timestamp: date.toISOString().split('T')[0],
        farms: 50 + Math.floor(Math.random() * 20),
        animals: 25000 + Math.floor(Math.random() * 10000),
        activeUsers: 120 + Math.floor(Math.random() * 30),
        healthAlerts: Math.floor(Math.random() * 15),
        sensorReadings: 50000 + Math.floor(Math.random() * 20000),
        averageTemperature: 28 + Math.random() * 8,
        averageHumidity: 60 + Math.random() * 20,
        waterConsumption: 50000 + Math.floor(Math.random() * 20000),
        feedConsumption: 25000 + Math.floor(Math.random() * 10000),
      });
    }
    
    return data;
  };

  useEffect(() => {
    setLoading(true);
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const mockData = generateMockData(days);
    setAnalyticsData(mockData);
    setTimeout(() => setLoading(false), 500);
  }, [timeRange]);

  // Chart data generators
  const getOverviewChartData = (): ChartData => ({
    labels: analyticsData.map(d => {
      const date = new Date(d.timestamp);
      return timeRange === '7d' 
        ? date.toLocaleDateString('en-US', { weekday: 'short' })
        : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Total Animals',
        data: analyticsData.map(d => d.animals),
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2,
        fill: true
      },
      {
        label: 'Active Farms',
        data: analyticsData.map(d => d.farms),
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        fill: true
      },
      {
        label: 'Active Users',
        data: analyticsData.map(d => d.activeUsers),
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        borderColor: 'rgb(168, 85, 247)',
        borderWidth: 2,
        fill: true
      }
    ]
  });

  const getEnvironmentChartData = (): ChartData => ({
    labels: analyticsData.map(d => {
      const date = new Date(d.timestamp);
      return timeRange === '7d' 
        ? date.toLocaleDateString('en-US', { weekday: 'short' })
        : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: analyticsData.map(d => d.averageTemperature),
        backgroundColor: 'rgba(234, 88, 12, 0.1)',
        borderColor: 'rgb(234, 88, 12)',
        borderWidth: 2,
        fill: true
      },
      {
        label: 'Humidity (%)',
        data: analyticsData.map(d => d.averageHumidity),
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        borderColor: 'rgb(14, 165, 233)',
        borderWidth: 2,
        fill: true
      }
    ]
  });

  const getConsumptionChartData = (): ChartData => ({
    labels: analyticsData.map(d => {
      const date = new Date(d.timestamp);
      return timeRange === '7d' 
        ? date.toLocaleDateString('en-US', { weekday: 'short' })
        : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Water Consumption (L)',
        data: analyticsData.map(d => d.waterConsumption),
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        borderColor: 'rgb(14, 165, 233)',
        borderWidth: 2,
        fill: true
      },
      {
        label: 'Feed Consumption (kg)',
        data: analyticsData.map(d => d.feedConsumption),
        backgroundColor: 'rgba(234, 88, 12, 0.1)',
        borderColor: 'rgb(234, 88, 12)',
        borderWidth: 2,
        fill: true
      }
    ]
  });

  const getHealthAlertsChartData = (): ChartData => ({
    labels: analyticsData.map(d => {
      const date = new Date(d.timestamp);
      return timeRange === '7d' 
        ? date.toLocaleDateString('en-US', { weekday: 'short' })
        : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Health Alerts',
        data: analyticsData.map(d => d.healthAlerts),
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 2,
        fill: true
      },
      {
        label: 'Sensor Readings',
        data: analyticsData.map(d => d.sensorReadings / 1000),
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2,
        fill: true
      }
    ]
  });

  const getMetricDistributionData = () => ({
    labels: ['Normal', 'Warning', 'Critical'],
    datasets: [
      {
        data: [75, 20, 5],
        backgroundColor: [
          'rgb(34, 197, 94)',
          'rgb(234, 179, 8)',
          'rgb(239, 68, 68)'
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }
    ]
  });

  const getFarmSizeDistributionData = () => ({
    labels: ['Small (<1000)', 'Medium (1000-5000)', 'Large (5000+)'],
    datasets: [
      {
        data: [35, 45, 20],
        backgroundColor: [
          'rgb(59, 130, 246)',
          'rgb(168, 85, 247)',
          'rgb(14, 165, 233)'
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }
    ]
  });

  // Calculate summary statistics
  const getSummaryStats = () => {
    if (analyticsData.length === 0) return null;
    
    const latest = analyticsData[analyticsData.length - 1];
    const previous = analyticsData[analyticsData.length - 2];
    
    const calculateChange = (current: number, previous: number) => {
      if (!previous) return 0;
      return ((current - previous) / previous) * 100;
    };

    return {
      totalAnimals: {
        value: latest.animals.toLocaleString(),
        change: calculateChange(latest.animals, previous?.animals || latest.animals)
      },
      activeFarms: {
        value: latest.farms,
        change: calculateChange(latest.farms, previous?.farms || latest.farms)
      },
      healthAlerts: {
        value: latest.healthAlerts,
        change: calculateChange(latest.healthAlerts, previous?.healthAlerts || latest.healthAlerts)
      },
      sensorReadings: {
        value: (latest.sensorReadings / 1000).toFixed(0) + 'K',
        change: calculateChange(latest.sensorReadings, previous?.sensorReadings || latest.sensorReadings)
      }
    };
  };

  const summaryStats = getSummaryStats();

  const renderLineChart = (data: ChartData, title: string) => (
    <div className="chart-container">
      <div className="chart-header">
        <h4>{title}</h4>
        <span className="time-range">{timeRange.toUpperCase()}</span>
      </div>
      <div className="line-chart">
        <div className="chart-grid">
          {data.labels.map((label, index) => (
            <div key={index} className="grid-line">
              <span className="grid-label">{label}</span>
            </div>
          ))}
        </div>
        <div className="chart-lines">
          {data.datasets.map((dataset, datasetIndex) => (
            <div key={datasetIndex} className="dataset-line">
              <div 
                className="line-path"
                style={{
                  '--color': dataset.borderColor,
                  '--data': dataset.data.join(',')
                } as React.CSSProperties}
              >
                {dataset.data.map((value, pointIndex) => {
                  const maxValue = Math.max(...dataset.data);
                  const percentage = (value / maxValue) * 100;
                  return (
                    <div
                      key={pointIndex}
                      className="data-point"
                      style={{
                        left: `${(pointIndex / (data.labels.length - 1)) * 100}%`,
                        bottom: `${percentage}%`,
                        backgroundColor: dataset.borderColor
                      }}
                      title={`${value}`}
                    />
                  );
                })}
              </div>
              <div className="dataset-legend">
                <div 
                  className="legend-color" 
                  style={{ backgroundColor: dataset.borderColor }}
                />
                <span>{dataset.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPieChart = (data: any, title: string) => (
    <div className="chart-container">
      <div className="chart-header">
        <h4>{title}</h4>
      </div>
      <div className="pie-chart">
        <div className="pie-container">
          <div className="pie-svg">
            {data.datasets[0].data.map((value: number, index: number) => {
              const total = data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
              const percentage = (value / total) * 100;
              const startAngle = data.datasets[0].data.slice(0, index).reduce((a: number, b: number) => a + (b / total) * 360, 0);
              
              return (
                <div
                  key={index}
                  className="pie-segment"
                  style={{
                    '--percentage': percentage,
                    '--start-angle': startAngle,
                    '--color': data.datasets[0].backgroundColor[index]
                  } as React.CSSProperties}
                />
              );
            })}
          </div>
          <div className="pie-center">
            <span className="pie-total">{data.datasets[0].data.reduce((a: number, b: number) => a + b, 0)}</span>
            <span className="pie-label">Total</span>
          </div>
        </div>
        <div className="pie-legend">
          {data.labels.map((label: string, index: number) => (
            <div key={index} className="legend-item">
              <div 
                className="legend-color" 
                style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
              />
              <span>{label}</span>
              <span className="legend-value">
                {data.datasets[0].data[index]} ({((data.datasets[0].data[index] / data.datasets[0].data.reduce((a: number, b: number) => a + b, 0)) * 100).toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBarChart = (data: ChartData, title: string) => (
    <div className="chart-container">
      <div className="chart-header">
        <h4>{title}</h4>
        <span className="time-range">{timeRange.toUpperCase()}</span>
      </div>
      <div className="bar-chart">
        <div className="chart-grid">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="grid-line horizontal">
              <span className="grid-label">
                {Math.round(Math.max(...data.datasets.flatMap(d => d.data)) * (i / 5))}
              </span>
            </div>
          ))}
        </div>
        <div className="bars-container">
          {data.labels.map((label, labelIndex) => (
            <div key={labelIndex} className="bar-group">
              {data.datasets.map((dataset, datasetIndex) => {
                const value = dataset.data[labelIndex];
                const maxValue = Math.max(...dataset.data);
                const height = (value / maxValue) * 100;
                
                return (
                  <div
                    key={datasetIndex}
                    className="bar"
                    style={{
                      height: `${height}%`,
                      backgroundColor: dataset.backgroundColor,
                      borderColor: dataset.borderColor,
                      width: `${80 / data.datasets.length}%`
                    }}
                    title={`${dataset.label}: ${value}`}
                  />
                );
              })}
              <span className="bar-label">{label}</span>
            </div>
          ))}
        </div>
        <div className="bar-legend">
          {data.datasets.map((dataset, index) => (
            <div key={index} className="legend-item">
              <div 
                className="legend-color" 
                style={{ backgroundColor: dataset.borderColor }}
              />
              <span>{dataset.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="admin-system-analytics">
        <div className="analytics-header">
          <h1>System Analytics Dashboard</h1>
          <p>Loading analytics data...</p>
        </div>
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-system-analytics">
      <div className="analytics-header">
        <h1>System Analytics Dashboard</h1>
        <p>Comprehensive insights and performance metrics across all farms</p>
      </div>

      {/* Time Range Selector */}
      <div className="controls-row">
        <div className="time-controls">
          <button 
            className={`time-btn ${timeRange === '7d' ? 'active' : ''}`}
            onClick={() => setTimeRange('7d')}
          >
            7 Days
          </button>
          <button 
            className={`time-btn ${timeRange === '30d' ? 'active' : ''}`}
            onClick={() => setTimeRange('30d')}
          >
            30 Days
          </button>
          <button 
            className={`time-btn ${timeRange === '90d' ? 'active' : ''}`}
            onClick={() => setTimeRange('90d')}
          >
            90 Days
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      {summaryStats && (
        <div className="summary-stats">
          <div className="stat-card">
            <div className="stat-icon">🐾</div>
            <div className="stat-content">
              <div className="stat-value">{summaryStats.totalAnimals.value}</div>
              <div className="stat-label">Total Animals</div>
              <div className={`stat-change ${summaryStats.totalAnimals.change >= 0 ? 'positive' : 'negative'}`}>
                {summaryStats.totalAnimals.change >= 0 ? '↗' : '↘'} {Math.abs(summaryStats.totalAnimals.change).toFixed(1)}%
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏢</div>
            <div className="stat-content">
              <div className="stat-value">{summaryStats.activeFarms.value}</div>
              <div className="stat-label">Active Farms</div>
              <div className={`stat-change ${summaryStats.activeFarms.change >= 0 ? 'positive' : 'negative'}`}>
                {summaryStats.activeFarms.change >= 0 ? '↗' : '↘'} {Math.abs(summaryStats.activeFarms.change).toFixed(1)}%
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🚨</div>
            <div className="stat-content">
              <div className="stat-value">{summaryStats.healthAlerts.value}</div>
              <div className="stat-label">Health Alerts</div>
              <div className={`stat-change ${summaryStats.healthAlerts.change <= 0 ? 'positive' : 'negative'}`}>
                {summaryStats.healthAlerts.change <= 0 ? '↘' : '↗'} {Math.abs(summaryStats.healthAlerts.change).toFixed(1)}%
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📡</div>
            <div className="stat-content">
              <div className="stat-value">{summaryStats.sensorReadings.value}</div>
              <div className="stat-label">Sensor Readings</div>
              <div className={`stat-change ${summaryStats.sensorReadings.change >= 0 ? 'positive' : 'negative'}`}>
                {summaryStats.sensorReadings.change >= 0 ? '↗' : '↘'} {Math.abs(summaryStats.sensorReadings.change).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="analytics-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'environment' ? 'active' : ''}`}
          onClick={() => setActiveTab('environment')}
        >
          🌡️ Environment
        </button>
        <button 
          className={`tab-btn ${activeTab === 'consumption' ? 'active' : ''}`}
          onClick={() => setActiveTab('consumption')}
        >
          💧 Consumption
        </button>
        <button 
          className={`tab-btn ${activeTab === 'health' ? 'active' : ''}`}
          onClick={() => setActiveTab('health')}
        >
          🏥 Health
        </button>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {activeTab === 'overview' && (
          <>
            <div className="chart-card full-width">
              {renderLineChart(getOverviewChartData(), 'Platform Growth Overview')}
            </div>
            <div className="chart-card">
              {renderPieChart(getMetricDistributionData(), 'Metric Status Distribution')}
            </div>
            <div className="chart-card">
              {renderPieChart(getFarmSizeDistributionData(), 'Farm Size Distribution')}
            </div>
          </>
        )}

        {activeTab === 'environment' && (
          <>
            <div className="chart-card full-width">
              {renderLineChart(getEnvironmentChartData(), 'Environmental Conditions Trend')}
            </div>
            <div className="chart-card">
              {renderBarChart(getEnvironmentChartData(), 'Temperature & Humidity')}
            </div>
          </>
        )}

        {activeTab === 'consumption' && (
          <>
            <div className="chart-card full-width">
              {renderLineChart(getConsumptionChartData(), 'Resource Consumption Trends')}
            </div>
            <div className="chart-card">
              {renderBarChart(getConsumptionChartData(), 'Daily Consumption')}
            </div>
          </>
        )}

        {activeTab === 'health' && (
          <>
            <div className="chart-card full-width">
              {renderLineChart(getHealthAlertsChartData(), 'Health Alerts & Sensor Activity')}
            </div>
            <div className="chart-card">
              {renderPieChart(getMetricDistributionData(), 'Alert Severity Distribution')}
            </div>
          </>
        )}
      </div>

      {/* Additional Metrics */}
      <div className="additional-metrics">
        <h3>Performance Metrics</h3>
        <div className="metrics-grid">
          <div className="metric-item">
            <span className="metric-label">Data Accuracy</span>
            <span className="metric-value">98.2%</span>
            <div className="metric-progress">
              <div className="progress-bar" style={{ width: '98.2%' }}></div>
            </div>
          </div>
          <div className="metric-item">
            <span className="metric-label">System Uptime</span>
            <span className="metric-value">99.9%</span>
            <div className="metric-progress">
              <div className="progress-bar" style={{ width: '99.9%' }}></div>
            </div>
          </div>
          <div className="metric-item">
            <span className="metric-label">Avg Response Time</span>
            <span className="metric-value">128ms</span>
            <div className="metric-progress">
              <div className="progress-bar" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div className="metric-item">
            <span className="metric-label">Data Processing</span>
            <span className="metric-value">45K/sec</span>
            <div className="metric-progress">
              <div className="progress-bar" style={{ width: '90%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSystemAnalytics;