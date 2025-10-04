// components/ExpertReportsModule.tsx
'use client';

import { useState, useEffect } from 'react';
import './ExpertReportsModule.css';

// TypeScript Interfaces
interface MedicalReport {
  id: string;
  farmerId: string;
  farmerName: string;
  farmName: string;
  animalType: 'chicken' | 'pig' | 'both' | 'other';
  species: string;
  reportType: 'diagnosis' | 'treatment' | 'followup' | 'outbreak' | 'general';
  title: string;
  description: string;
  diagnosis?: string;
  treatmentSummary?: string;
  findings: string[];
  recommendations: string[];
  medications?: Medication[];
  labResults?: LabResult[];
  images?: string[];
  generatedBy: string;
  generatedAt: string;
  status: 'draft' | 'final' | 'sent' | 'archived';
  fileSize: string;
  format: 'pdf' | 'doc' | 'html';
  lastSent?: string;
  sentTo?: string[];
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  duration: string;
  frequency: string;
}

interface LabResult {
  testName: string;
  result: string;
  normalRange: string;
  units: string;
  status: 'normal' | 'abnormal' | 'critical';
}

interface ReportStats {
  total: number;
  draft: number;
  final: number;
  sent: number;
  thisMonth: number;
}

export default function ExpertReportsModule() {
  const [activeTab, setActiveTab] = useState<'all' | 'draft' | 'final' | 'sent'>('all');
  const [reports, setReports] = useState<MedicalReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<MedicalReport | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'diagnosis' | 'treatment' | 'followup' | 'outbreak'>('all');
  const [selectedReports, setSelectedReports] = useState<string[]>([]);

  // Mock data for medical reports
  useEffect(() => {
    const mockReports: MedicalReport[] = [
      {
        id: 'rep-001',
        farmerId: 'farmer-123',
        farmerName: 'Rajesh Kumar',
        farmName: 'Rajesh Poultry Farm',
        animalType: 'chicken',
        species: 'Broiler Chickens (3 weeks old)',
        reportType: 'diagnosis',
        title: 'Newcastle Disease Outbreak Report',
        description: 'Comprehensive diagnosis and analysis of Newcastle disease outbreak in broiler chicken unit.',
        diagnosis: 'Newcastle Disease (Velogenic Viscerotropic)',
        treatmentSummary: 'Emergency antibiotic treatment with supportive care and vaccination protocol.',
        findings: [
          'High mortality rate (25%) in 3-week old broilers',
          'Greenish diarrhea observed in affected birds',
          'Respiratory distress and neurological symptoms',
          'Swollen head and neck regions'
        ],
        recommendations: [
          'Immediate isolation of affected birds',
          'Strict biosecurity measures implementation',
          'Vaccination of remaining flock',
          'Regular monitoring and reporting'
        ],
        medications: [
          {
            id: 'med-1',
            name: 'Amoxicillin',
            dosage: '20mg/kg',
            duration: '7 days',
            frequency: 'Twice daily'
          },
          {
            id: 'med-2',
            name: 'Vitamin C Supplement',
            dosage: '1g per 10L water',
            duration: '14 days',
            frequency: 'Daily'
          }
        ],
        labResults: [
          {
            testName: 'Hemagglutination Inhibition',
            result: 'Positive',
            normalRange: 'Negative',
            units: 'Titer',
            status: 'abnormal'
          },
          {
            testName: 'Virus Isolation',
            result: 'Positive',
            normalRange: 'Negative',
            units: 'PCR',
            status: 'abnormal'
          }
        ],
        generatedBy: 'Dr. Priya Sharma',
        generatedAt: new Date().toISOString(),
        status: 'final',
        fileSize: '2.4 MB',
        format: 'pdf',
        lastSent: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        sentTo: ['rajesh.kumar@email.com', '+919876543210']
      },
      {
        id: 'rep-002',
        farmerId: 'farmer-124',
        farmerName: 'Priya Singh',
        farmName: 'Priya Swine Farm',
        animalType: 'pig',
        species: 'Landrace Pigs (4 months old)',
        reportType: 'treatment',
        title: 'PRRS Treatment Progress Report',
        description: 'Monitoring and evaluation of PRRS treatment protocol implementation.',
        treatmentSummary: 'Antibiotic therapy with environmental management and nutritional support.',
        findings: [
          'Improved respiratory function in 80% of affected pigs',
          'Reduced mortality rate from 15% to 3%',
          'Better feed conversion rates observed',
          'Normal body temperature restored'
        ],
        recommendations: [
          'Continue antibiotic course for 3 more days',
          'Maintain improved ventilation system',
          'Monitor weight gain weekly',
          'Schedule follow-up in 2 weeks'
        ],
        medications: [
          {
            id: 'med-1',
            name: 'Tylosin Tartrate',
            dosage: '10mg/kg',
            duration: '5 days',
            frequency: 'Once daily'
          }
        ],
        generatedBy: 'Dr. Amit Patel',
        generatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'sent',
        fileSize: '1.8 MB',
        format: 'pdf',
        lastSent: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        sentTo: ['priya.singh@email.com']
      },
      {
        id: 'rep-003',
        farmerId: 'farmer-125',
        farmerName: 'Kumar Reddy',
        farmName: 'Kumar Mixed Farm',
        animalType: 'both',
        species: 'Layers & Weaner Pigs',
        reportType: 'followup',
        title: 'Salmonellosis Follow-up Assessment',
        description: 'Post-treatment evaluation of salmonellosis outbreak management.',
        findings: [
          'Complete resolution of diarrhea symptoms',
          'Normal water consumption restored',
          'No new cases reported in past 7 days',
          'Improved overall herd health'
        ],
        recommendations: [
          'Continue probiotic supplementation for 1 more week',
          'Maintain strict hygiene protocols',
          'Regular water quality testing',
          'Monthly health monitoring'
        ],
        generatedBy: 'Dr. Priya Sharma',
        generatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'final',
        fileSize: '1.2 MB',
        format: 'doc'
      },
      {
        id: 'rep-004',
        farmerId: 'farmer-126',
        farmerName: 'Anita Sharma',
        farmName: 'Anita Poultry',
        animalType: 'chicken',
        species: 'Layer Hens (32 weeks old)',
        reportType: 'outbreak',
        title: 'Fowl Cholera Outbreak Report',
        description: 'Emergency outbreak response and containment report.',
        diagnosis: 'Pasteurella multocida Infection',
        findings: [
          'Rapid onset with high mortality rate',
          'Affected multiple poultry houses',
          'Successful containment after 72 hours',
          'Effective antibiotic response observed'
        ],
        recommendations: [
          'Continue surveillance for 30 days',
          'Vaccinate remaining flock',
          'Enhanced biosecurity measures',
          'Regular disinfection protocol'
        ],
        medications: [
          {
            id: 'med-1',
            name: 'Sulfonamides',
            dosage: 'As directed',
            duration: '5 days',
            frequency: 'Twice daily'
          }
        ],
        generatedBy: 'Dr. Amit Patel',
        generatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'sent',
        fileSize: '3.1 MB',
        format: 'pdf',
        lastSent: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        sentTo: ['anita.sharma@email.com', '+919876543211']
      },
      {
        id: 'rep-005',
        farmerId: 'farmer-127',
        farmerName: 'Mohan Das',
        farmName: 'Mohan Pig Farm',
        animalType: 'pig',
        species: 'Sows & Piglets',
        reportType: 'diagnosis',
        title: 'Pseudorabies Diagnosis Report',
        description: 'Neurological disorder diagnosis in weaner piglets.',
        diagnosis: 'Aujeszky\'s Disease (Pseudorabies)',
        findings: [
          'Severe neurological symptoms in piglets',
          'High mortality rate in young animals',
          'Respiratory distress in sows',
          'Successful diagnosis through PCR testing'
        ],
        recommendations: [
          'Immediate culling of affected animals',
          'Strict quarantine measures',
          'Vaccination program implementation',
          'Genetic testing for future breeding'
        ],
        labResults: [
          {
            testName: 'PCR Test',
            result: 'Positive',
            normalRange: 'Negative',
            units: 'Viral Load',
            status: 'critical'
          }
        ],
        generatedBy: 'Dr. Priya Sharma',
        generatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'draft',
        fileSize: '2.7 MB',
        format: 'doc'
      },
      {
        id: 'rep-006',
        farmerId: 'farmer-128',
        farmerName: 'Suresh Poultry',
        farmName: 'Suresh Egg Farm',
        animalType: 'chicken',
        species: 'Layer Hens (45 weeks old)',
        reportType: 'general',
        title: 'Annual Health Assessment Report',
        description: 'Comprehensive annual health review and productivity analysis.',
        findings: [
          'Overall flock health: Excellent',
          'Egg production: 87% (above average)',
          'Mortality rate: 2.3% (within normal range)',
          'Feed conversion ratio: 2.1 (optimal)'
        ],
        recommendations: [
          'Continue current vaccination schedule',
          'Monitor calcium levels in feed',
          'Regular parasite control',
          'Quarterly health assessments'
        ],
        generatedBy: 'Dr. Amit Patel',
        generatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'sent',
        fileSize: '4.2 MB',
        format: 'pdf',
        lastSent: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
        sentTo: ['suresh.poultry@email.com']
      }
    ];
    setReports(mockReports);
  }, []);

  const stats: ReportStats = {
    total: reports.length,
    draft: reports.filter(r => r.status === 'draft').length,
    final: reports.filter(r => r.status === 'final').length,
    sent: reports.filter(r => r.status === 'sent').length,
    thisMonth: reports.filter(r => 
      new Date(r.generatedAt).getMonth() === new Date().getMonth()
    ).length
  };

  const filteredReports = reports.filter(report => {
    const matchesTab = activeTab === 'all' || report.status === activeTab;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.farmName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || report.reportType === filterType;
    
    return matchesTab && matchesSearch && matchesType;
  });

  const getAnimalIcon = (animalType: string) => {
    switch (animalType) {
      case 'chicken': return '🐔';
      case 'pig': return '🐖';
      case 'both': return '🐔🐖';
      default: return '🐾';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return '#dd6b20';
      case 'final': return '#3182ce';
      case 'sent': return '#38a169';
      case 'archived': return '#718096';
      default: return '#718096';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'diagnosis': return '#e53e3e';
      case 'treatment': return '#3182ce';
      case 'followup': return '#38a169';
      case 'outbreak': return '#d69e2e';
      case 'general': return '#805ad5';
      default: return '#718096';
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'pdf': return '📄';
      case 'doc': return '📝';
      case 'html': return '🌐';
      default: return '📋';
    }
  };

  const handleDownload = (report: MedicalReport) => {
    // Simulate download
    console.log(`Downloading report: ${report.title}`);
    // In real app, this would generate and download the file
    alert(`Downloading ${report.title}...`);
  };

  const handleView = (report: MedicalReport) => {
    setSelectedReport(report);
    setShowReportModal(true);
  };

  const handleSend = (report: MedicalReport) => {
    setSelectedReport(report);
    setShowSendModal(true);
  };

  const handleBulkDownload = () => {
    if (selectedReports.length === 0) return;
    console.log(`Downloading ${selectedReports.length} reports...`);
    alert(`Downloading ${selectedReports.length} selected reports...`);
  };

  const handleBulkSend = () => {
    if (selectedReports.length === 0) return;
    setShowSendModal(true);
  };

  const toggleReportSelection = (reportId: string) => {
    setSelectedReports(prev =>
      prev.includes(reportId)
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const selectAllReports = () => {
    if (selectedReports.length === filteredReports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(filteredReports.map(r => r.id));
    }
  };

  const generateReport = () => {
    // Open report generation form/modal
    alert('Opening report generation form...');
  };

  return (
    <div className="reports-module">
      <div className="reports-header">
        <div>
          <h2>Medical Reports Management</h2>
          <p className="subtitle">Generate, view, download and send medical reports to farmers</p>
        </div>
        <button className="btn btn-primary" onClick={generateReport}>
          Generate New Report
        </button>
      </div>

      {/* Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Reports</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.draft}</div>
          <div className="stat-label">Draft Reports</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.final}</div>
          <div className="stat-label">Final Reports</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.sent}</div>
          <div className="stat-label">Sent Reports</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.thisMonth}</div>
          <div className="stat-label">This Month</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search reports by title, farmer, or farm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-controls">
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value as any)}
            className="filter-select"
          >
            <option value="all">All Report Types</option>
            <option value="diagnosis">Diagnosis Reports</option>
            <option value="treatment">Treatment Reports</option>
            <option value="followup">Follow-up Reports</option>
            <option value="outbreak">Outbreak Reports</option>
          </select>

          {selectedReports.length > 0 && (
            <div className="bulk-actions">
              <span className="selected-count">
                {selectedReports.length} selected
              </span>
              <button 
                className="btn btn-secondary"
                onClick={handleBulkDownload}
              >
                Download Selected
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleBulkSend}
              >
                Send Selected
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="reports-tabs">
        <button 
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Reports ({stats.total})
        </button>
        <button 
          className={`tab ${activeTab === 'draft' ? 'active' : ''}`}
          onClick={() => setActiveTab('draft')}
        >
          Draft ({stats.draft})
        </button>
        <button 
          className={`tab ${activeTab === 'final' ? 'active' : ''}`}
          onClick={() => setActiveTab('final')}
        >
          Final ({stats.final})
        </button>
        <button 
          className={`tab ${activeTab === 'sent' ? 'active' : ''}`}
          onClick={() => setActiveTab('sent')}
        >
          Sent ({stats.sent})
        </button>
      </div>

      {/* Reports Table */}
      <div className="reports-table-container">
        <table className="reports-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}>
                <input
                  type="checkbox"
                  checked={selectedReports.length === filteredReports.length && filteredReports.length > 0}
                  onChange={selectAllReports}
                />
              </th>
              <th>Report Details</th>
              <th>Farmer & Farm</th>
              <th>Type & Status</th>
              <th>Generated</th>
              <th>File Info</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.length === 0 ? (
              <tr>
                <td colSpan={7} className="empty-state">
                  No reports found matching your criteria
                </td>
              </tr>
            ) : (
              filteredReports.map((report) => (
                <tr key={report.id} className="report-row">
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedReports.includes(report.id)}
                      onChange={() => toggleReportSelection(report.id)}
                    />
                  </td>
                  <td>
                    <div className="report-main-info">
                      <div className="report-title">{report.title}</div>
                      <div className="report-description">{report.description}</div>
                      <div className="animal-info">
                        {getAnimalIcon(report.animalType)} {report.species}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="farmer-info">
                      <div className="farmer-name">{report.farmerName}</div>
                      <div className="farm-name">{report.farmName}</div>
                    </div>
                  </td>
                  <td>
                    <div className="type-status">
                      <span 
                        className="type-badge"
                        style={{ backgroundColor: getTypeColor(report.reportType) }}
                      >
                        {report.reportType}
                      </span>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(report.status) }}
                      >
                        {report.status}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="date-info">
                      <div>{new Date(report.generatedAt).toLocaleDateString()}</div>
                      <div className="expert-name">By {report.generatedBy}</div>
                    </div>
                  </td>
                  <td>
                    <div className="file-info">
                      <div className="file-format">
                        {getFormatIcon(report.format)} {report.format.toUpperCase()}
                      </div>
                      <div className="file-size">{report.fileSize}</div>
                      {report.lastSent && (
                        <div className="last-sent">
                          Sent: {new Date(report.lastSent).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon view"
                        onClick={() => handleView(report)}
                        title="View Report"
                      >
                        👁️
                      </button>
                      <button 
                        className="btn-icon download"
                        onClick={() => handleDownload(report)}
                        title="Download Report"
                      >
                        ⬇️
                      </button>
                      <button 
                        className="btn-icon send"
                        onClick={() => handleSend(report)}
                        title="Send to Farmer"
                      >
                        ✉️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Report View Modal */}
      {showReportModal && selectedReport && (
        <div className="modal-overlay">
          <div className="modal-content large">
            <div className="modal-header">
              <h3>{selectedReport.title}</h3>
              <button 
                className="close-btn"
                onClick={() => setShowReportModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="report-preview">
                <div className="report-header">
                  <div className="farmer-details">
                    <h4>Farmer: {selectedReport.farmerName}</h4>
                    <p>Farm: {selectedReport.farmName}</p>
                    <p>Animals: {selectedReport.species}</p>
                  </div>
                  <div className="report-meta">
                    <p>Generated: {new Date(selectedReport.generatedAt).toLocaleString()}</p>
                    <p>By: {selectedReport.generatedBy}</p>
                    <p>Status: <span style={{ color: getStatusColor(selectedReport.status) }}>
                      {selectedReport.status}
                    </span></p>
                  </div>
                </div>

                <div className="report-content">
                  <section>
                    <h4>Description</h4>
                    <p>{selectedReport.description}</p>
                  </section>

                  {selectedReport.diagnosis && (
                    <section>
                      <h4>Diagnosis</h4>
                      <p>{selectedReport.diagnosis}</p>
                    </section>
                  )}

                  {selectedReport.treatmentSummary && (
                    <section>
                      <h4>Treatment Summary</h4>
                      <p>{selectedReport.treatmentSummary}</p>
                    </section>
                  )}

                  <section>
                    <h4>Key Findings</h4>
                    <ul>
                      {selectedReport.findings.map((finding, index) => (
                        <li key={index}>{finding}</li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h4>Recommendations</h4>
                    <ul>
                      {selectedReport.recommendations.map((recommendation, index) => (
                        <li key={index}>{recommendation}</li>
                      ))}
                    </ul>
                  </section>

                  {selectedReport.medications && selectedReport.medications.length > 0 && (
                    <section>
                      <h4>Medications</h4>
                      <table className="meds-table">
                        <thead>
                          <tr>
                            <th>Medication</th>
                            <th>Dosage</th>
                            <th>Duration</th>
                            <th>Frequency</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedReport.medications.map((med) => (
                            <tr key={med.id}>
                              <td>{med.name}</td>
                              <td>{med.dosage}</td>
                              <td>{med.duration}</td>
                              <td>{med.frequency}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </section>
                  )}

                  {selectedReport.labResults && selectedReport.labResults.length > 0 && (
                    <section>
                      <h4>Laboratory Results</h4>
                      <table className="labs-table">
                        <thead>
                          <tr>
                            <th>Test</th>
                            <th>Result</th>
                            <th>Normal Range</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedReport.labResults.map((lab, index) => (
                            <tr key={index}>
                              <td>{lab.testName}</td>
                              <td>{lab.result}</td>
                              <td>{lab.normalRange}</td>
                              <td>
                                <span className={`status-${lab.status}`}>
                                  {lab.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </section>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowReportModal(false)}
              >
                Close
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => handleDownload(selectedReport)}
              >
                Download Report
              </button>
              <button 
                className="btn btn-success"
                onClick={() => {
                  setShowReportModal(false);
                  handleSend(selectedReport);
                }}
              >
                Send to Farmer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Report Modal */}
      {showSendModal && selectedReport && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Send Report to Farmer</h3>
              <button 
                className="close-btn"
                onClick={() => setShowSendModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="send-form">
                <div className="form-group">
                  <label className="form-label">Report</label>
                  <div className="report-summary">
                    <strong>{selectedReport.title}</strong>
                    <div>Farmer: {selectedReport.farmerName}</div>
                    <div>Farm: {selectedReport.farmName}</div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Send To</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Email address or phone number"
                    defaultValue={selectedReport.sentTo?.[0] || ''}
                  />
                  <div className="form-hint">
                    Separate multiple addresses with commas
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Message (Optional)</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Add a personal message for the farmer..."
                    rows={4}
                    defaultValue={`Dear ${selectedReport.farmerName},\n\nPlease find attached your ${selectedReport.reportType} report for ${selectedReport.farmName}.\n\nBest regards,\nAnimal Health Expert`}
                  />
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked />
                    Send SMS notification
                  </label>
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked />
                    Request read receipt
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowSendModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  alert(`Report sent successfully to ${selectedReport.farmerName}`);
                  setShowSendModal(false);
                  
                  // Update report status to sent
                  const updatedReports = reports.map(r =>
                    r.id === selectedReport.id ? { ...r, status: 'sent', lastSent: new Date().toISOString() } : r
                  );
                 // setReports(updatedReports);
                }}
              >
                Send Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}