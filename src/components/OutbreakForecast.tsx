"use client";

import { useState, useEffect } from 'react';

interface ForecastData {
  date: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  temperature: number;
  humidity: number;
  diseaseType?: string;
  probability: number;
}

export default function OutbreakForecast({ location }: { location: string }) {
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [selectedDisease, setSelectedDisease] = useState('all');

  useEffect(() => {
    // Mock data - replace with API call
    const mockForecast: ForecastData[] = [
      {
        date: '2024-01-16',
        riskLevel: 'low',
        temperature: 22,
        humidity: 65,
        probability: 15
      },
      {
        date: '2024-01-17',
        riskLevel: 'medium',
        temperature: 24,
        humidity: 72,
        diseaseType: 'Foot & Mouth',
        probability: 45
      },
      {
        date: '2024-01-18',
        riskLevel: 'high',
        temperature: 26,
        humidity: 85,
        diseaseType: 'Avian Flu',
        probability: 78
      },
      {
        date: '2024-01-19',
        riskLevel: 'critical',
        temperature: 28,
        humidity: 90,
        diseaseType: 'Swine Fever',
        probability: 92
      }
    ];
    setForecast(mockForecast);
  }, [location]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return '#27ae60';
      case 'medium': return '#f39c12';
      case 'high': return '#e67e22';
      case 'critical': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2>Predictive Outbreak Forecasting</h2>
          <p style={{ color: '#666', margin: 0 }}>ML-powered disease risk prediction for {location}</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <select 
            value={selectedDisease}
            onChange={(e) => setSelectedDisease(e.target.value)}
            style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '5px' }}
          >
            <option value="all">All Diseases</option>
            <option value="foot_mouth">Foot & Mouth</option>
            <option value="avian_flu">Avian Flu</option>
            <option value="swine_fever">Swine Fever</option>
          </select>
          <button style={{ padding: '0.5rem 1rem', background: '#3498db', color: 'white', border: 'none', borderRadius: '5px' }}>
            📊 View Heatmap
          </button>
        </div>
      </div>

      {/* Current Risk Level */}
      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '8px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '2rem',
        borderLeft: `6px solid ${getRiskColor(forecast[0]?.riskLevel || 'low')}`
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>Current Risk Assessment</h3>
            <p style={{ margin: 0, color: '#666' }}>
              Based on real-time environmental sensor data and historical patterns
            </p>
          </div>
          <div style={{ 
            padding: '1rem 2rem', 
            background: getRiskColor(forecast[0]?.riskLevel || 'low'),
            color: 'white',
            borderRadius: '5px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.8rem' }}>CURRENT RISK</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {forecast[0]?.riskLevel?.toUpperCase() || 'LOW'}
            </div>
          </div>
        </div>
      </div>

      {/* Forecast Timeline */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #dee2e6' }}>
          <h3 style={{ margin: 0 }}>7-Day Disease Forecast</h3>
        </div>
        
        <div style={{ padding: '1.5rem' }}>
          {forecast.map((day, index) => (
            <div key={day.date} style={{ 
              display: 'grid', 
              gridTemplateColumns: '100px 1fr auto auto',
              gap: '1rem',
              alignItems: 'center',
              padding: '1rem',
              borderBottom: index < forecast.length - 1 ? '1px solid #f0f0f0' : 'none'
            }}>
              <div style={{ fontWeight: '500' }}>
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: getRiskColor(day.riskLevel)
                }} />
                <span style={{ 
                  color: getRiskColor(day.riskLevel),
                  fontWeight: 'bold',
                  textTransform: 'capitalize'
                }}>
                  {day.riskLevel} Risk
                </span>
                {day.diseaseType && (
                  <span style={{ 
                    padding: '0.25rem 0.5rem', 
                    background: '#f8f9fa', 
                    borderRadius: '3px',
                    fontSize: '0.8rem'
                  }}>
                    {day.diseaseType}
                  </span>
                )}
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', color: '#666', fontSize: '0.9rem' }}>
                <span>🌡️ {day.temperature}°C</span>
                <span>💧 {day.humidity}%</span>
              </div>
              
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'bold', color: getRiskColor(day.riskLevel) }}>
                  {day.probability}%
                </div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>Probability</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prevention Recommendations */}
      <div style={{ 
        marginTop: '2rem', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '1.5rem', 
        borderRadius: '8px' 
      }}>
        <h3 style={{ margin: '0 0 1rem 0' }}>🛡️ Recommended Preventive Actions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Immediate (Next 24h)</h4>
            <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.9rem' }}>
              <li>Increase biosecurity checks at entry points</li>
              <li>Monitor animals for early symptoms</li>
              <li>Review quarantine zone readiness</li>
            </ul>
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Medium-term (2-3 days)</h4>
            <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.9rem' }}>
              <li>Schedule preventive vaccinations</li>
              <li>Prepare isolation areas</li>
              <li>Stock emergency medical supplies</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Environmental Sensors Status */}
      <div style={{ 
        marginTop: '2rem', 
        background: 'white', 
        padding: '1.5rem', 
        borderRadius: '8px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
      }}>
        <h3 style={{ margin: '0 0 1rem 0' }}>🌡️ Active Environmental Sensors</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          {[
            { name: 'Temperature', value: '24.5°C', status: 'active' },
            { name: 'Humidity', value: '72%', status: 'active' },
            { name: 'Air Quality', value: 'Good', status: 'active' },
            { name: 'Water pH', value: '7.2', status: 'warning' },
            { name: 'Ammonia', value: '2.1 ppm', status: 'normal' }
          ].map(sensor => (
            <div key={sensor.name} style={{ 
              padding: '1rem', 
              border: `2px solid ${sensor.status === 'active' ? '#27ae60' : sensor.status === 'warning' ? '#f39c12' : '#95a5a6'}`,
              borderRadius: '5px',
              textAlign: 'center'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{sensor.name}</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{sensor.value}</div>
              <div style={{ 
                fontSize: '0.8rem',
                color: sensor.status === 'active' ? '#27ae60' : sensor.status === 'warning' ? '#f39c12' : '#95a5a6'
              }}>
                {sensor.status.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}