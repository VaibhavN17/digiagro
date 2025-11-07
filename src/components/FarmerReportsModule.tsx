"use client";

import { useState } from 'react';

interface Report {
  id: string;
  title: string;
  type: 'compliance' | 'health' | 'breeding' | 'financial';
  date: string;
  status: 'generated' | 'pending';
  downloadUrl?: string;
}

export default function ReportsModule({ farmerId }: { farmerId: string }) {
  const [selectedReportType, setSelectedReportType] = useState<string>('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const reports: Report[] = [
    {
      id: '1',
      title: 'Monthly Health Compliance Report',
      type: 'compliance',
      date: '2024-01-15',
      status: 'generated',
      downloadUrl: '#'
    },
    {
      id: '2',
      title: 'Vaccination Records Summary',
      type: 'health',
      date: '2024-01-14',
      status: 'generated',
      downloadUrl: '#'
    },
    {
      id: '3',
      title: 'Biosecurity Audit Report',
      type: 'compliance',
      date: '2024-01-13',
      status: 'generated',
      downloadUrl: '#'
    },
    {
      id: '4',
      title: 'Breeding Performance Analysis',
      type: 'breeding',
      date: '2024-01-12',
      status: 'pending'
    }
  ];

  const filteredReports = reports.filter(report => 
    selectedReportType === 'all' || report.type === selectedReportType
  );

  const generateReport = () => {
    // API call to generate report
    alert(`Generating ${selectedReportType} report for ${dateRange.start} to ${dateRange.end}`);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Automated Reporting & Compliance</h2>
        <button style={{ padding: '0.5rem 1rem', background: '#27ae60', color: 'white', border: 'none', borderRadius: '5px' }}>
          📄 Generate New Report
        </button>
      </div>

      {/* Report Generator */}
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
        <h3 style={{ margin: '0 0 1rem 0' }}>Generate Custom Report</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Report Type</label>
            <select 
              value={selectedReportType}
              onChange={(e) => setSelectedReportType(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '5px' }}
            >
              <option value="all">All Reports</option>
              <option value="compliance">Compliance Reports</option>
              <option value="health">Health Records</option>
              <option value="breeding">Breeding Analysis</option>
              <option value="financial">Financial Summary</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Start Date</label>
            <input 
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>End Date</label>
            <input 
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          </div>
        </div>
        <button 
          onClick={generateReport}
          style={{ padding: '0.75rem 1.5rem', background: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          🚀 Generate Report
        </button>
      </div>

      {/* Available Reports */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #dee2e6' }}>
          <h3 style={{ margin: 0 }}>Available Reports</h3>
        </div>
        
        <div style={{ padding: '1.5rem' }}>
          {filteredReports.map((report, index) => (
            <div key={report.id} style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr auto auto',
              gap: '1rem',
              alignItems: 'center',
              padding: '1rem',
              borderBottom: index < filteredReports.length - 1 ? '1px solid #f0f0f0' : 'none'
            }}>
              <div>
                <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>{report.title}</div>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#666' }}>
                  <span style={{ 
                    padding: '0.2rem 0.5rem', 
                    background: '#f8f9fa', 
                    borderRadius: '3px',
                    textTransform: 'capitalize'
                  }}>
                    {report.type}
                  </span>
                  <span>Generated: {new Date(report.date).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div>
                <span style={{ 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '3px', 
                  fontSize: '0.8rem',
                  background: report.status === 'generated' ? '#e8f6f3' : '#fef9e7',
                  color: report.status === 'generated' ? '#27ae60' : '#f39c12'
                }}>
                  {report.status}
                </span>
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {report.downloadUrl && (
                  <>
                    <button style={{ 
                      padding: '0.5rem', 
                      background: '#3498db', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '3px',
                      cursor: 'pointer'
                    }}>
                      📥 PDF
                    </button>
                    <button style={{ 
                      padding: '0.5rem', 
                      background: '#27ae60', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '3px',
                      cursor: 'pointer'
                    }}>
                      📊 Excel
                    </button>
                  </>
                )}
                {report.status === 'pending' && (
                  <button style={{ 
                    padding: '0.5rem', 
                    background: '#f39c12', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '3px',
                    cursor: 'pointer'
                  }}>
                    ⏳ Processing
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Status */}
      <div style={{ 
        marginTop: '2rem', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1rem' 
      }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>📋 Compliance Status</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span>Overall Compliance</span>
            <span style={{ fontWeight: 'bold', color: '#27ae60' }}>95%</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span>Health Records</span>
            <span style={{ fontWeight: 'bold', color: '#27ae60' }}>100%</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Biosecurity</span>
            <span style={{ fontWeight: 'bold', color: '#f39c12' }}>88%</span>
          </div>
        </div>

        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>🏛️ Government Reports</h3>
          <button style={{ 
            width: '100%', 
            padding: '0.75rem', 
            background: '#2c3e50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            marginBottom: '0.5rem',
            cursor: 'pointer'
          }}>
            📑 Generate FMD Report
          </button>
          <button style={{ 
            width: '100%', 
            padding: '0.75rem', 
            background: '#34495e', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            marginBottom: '0.5rem',
            cursor: 'pointer'
          }}>
            🏥 Health Certificate
          </button>
          <button style={{ 
            width: '100%', 
            padding: '0.75rem', 
            background: '#7f8c8d', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            📊 Export for Audit
          </button>
        </div>
      </div>
    </div>
  );
}