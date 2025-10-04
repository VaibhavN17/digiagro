// src/components/ExpertCaseHistory.tsx
"use client";

import React, { useState, useEffect } from 'react';
import './ExpertCaseHistory.css';

interface Case {
  id: string;
  farmId: string;
  farmName: string;
  species: 'poultry' | 'swine';
  caseType: 'disease' | 'nutrition' | 'management' | 'environment' | 'vaccination';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  description: string;
  symptoms: string[];
  diagnosis: string;
  treatment: string;
  outcome: string;
  dateReported: string;
  dateResolved?: string;
  expertNotes: string;
  medications: string[];
  followUpRequired: boolean;
  images?: string[];
}

interface ExpertStats {
  totalCases: number;
  resolvedCases: number;
  activeCases: number;
  successRate: number;
  averageResolutionTime: number;
}

const ExpertCaseHistory: React.FC<{ expertId: string }> = ({ expertId }) => {
  const [cases, setCases] = useState<Case[]>([]);
  const [filteredCases, setFilteredCases] = useState<Case[]>([]);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [stats, setStats] = useState<ExpertStats>({
    totalCases: 0,
    resolvedCases: 0,
    activeCases: 0,
    successRate: 0,
    averageResolutionTime: 0
  });
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSpecies, setFilterSpecies] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for expert cases
  const mockCases: Case[] = [
    {
      id: 'CASE_001',
      farmId: 'FARM_001',
      farmName: 'Green Valley Poultry',
      species: 'poultry',
      caseType: 'disease',
      severity: 'high',
      status: 'resolved',
      description: 'Avian Influenza outbreak in Layer flock',
      symptoms: ['Respiratory distress', 'Reduced egg production', 'Swelling around eyes', 'Sudden mortality'],
      diagnosis: 'H5N1 Avian Influenza confirmed through lab tests',
      treatment: 'Isolation of affected birds, antiviral medication, enhanced biosecurity measures',
      outcome: 'Outbreak contained with 15% mortality rate. Remaining flock recovered fully.',
      dateReported: '2024-01-15',
      dateResolved: '2024-02-01',
      expertNotes: 'Implemented strict quarantine protocols. Recommended vaccination program for future prevention.',
      medications: ['Oseltamivir', 'Vitamin supplements', 'Electrolytes'],
      followUpRequired: true
    },
    {
      id: 'CASE_002',
      farmId: 'FARM_002',
      farmName: 'Happy Pig Farm',
      species: 'swine',
      caseType: 'nutrition',
      severity: 'medium',
      status: 'in-progress',
      description: 'Poor growth rates in weaner pigs',
      symptoms: ['Reduced weight gain', 'Poor coat condition', 'Diarrhea in some animals'],
      diagnosis: 'Nutritional deficiency - insufficient protein and amino acids in feed',
      treatment: 'Revised feed formulation with higher protein content, added amino acid supplements',
      outcome: 'Initial improvement observed, monitoring ongoing',
      dateReported: '2024-02-10',
      expertNotes: 'Conducted feed analysis. Recommended switching to specialized weaner feed with 22% protein.',
      medications: ['Protein supplements', 'Probiotics', 'Vitamin B complex'],
      followUpRequired: true
    },
    {
      id: 'CASE_003',
      farmId: 'FARM_003',
      farmName: 'Sunrise Poultry',
      species: 'poultry',
      caseType: 'management',
      severity: 'low',
      status: 'closed',
      description: 'Ventilation issues in broiler house',
      symptoms: ['Heat stress', 'Reduced feed intake', 'Panting behavior'],
      diagnosis: 'Inadequate ventilation leading to heat stress and poor air quality',
      treatment: 'Installed additional exhaust fans, improved air circulation, temperature monitoring',
      outcome: 'Ventilation system upgraded. Bird behavior returned to normal within 48 hours.',
      dateReported: '2024-01-20',
      dateResolved: '2024-01-25',
      expertNotes: 'Recommended automated climate control system for better temperature regulation.',
      medications: ['Electrolytes in water'],
      followUpRequired: false
    },
    {
      id: 'CASE_004',
      farmId: 'FARM_004',
      farmName: 'Premium Pork Producers',
      species: 'swine',
      caseType: 'disease',
      severity: 'critical',
      status: 'open',
      description: 'Suspected African Swine Fever outbreak',
      symptoms: ['High fever', 'Skin hemorrhages', 'Sudden death', 'Loss of appetite'],
      diagnosis: 'Pending lab confirmation for ASF. High suspicion based on clinical signs.',
      treatment: 'Complete lockdown, movement restrictions, sample collection for testing',
      outcome: 'Under investigation',
      dateReported: '2024-02-14',
      expertNotes: 'URGENT: Immediate reporting to veterinary authorities. Strict biosecurity enforcement.',
      medications: ['Supportive care only'],
      followUpRequired: true
    }
  ];

  useEffect(() => {
    // Simulate API call
    setCases(mockCases);
    setFilteredCases(mockCases);
    
    // Calculate stats
    const totalCases = mockCases.length;
    const resolvedCases = mockCases.filter(c => c.status === 'resolved' || c.status === 'closed').length;
    const activeCases = mockCases.filter(c => c.status === 'open' || c.status === 'in-progress').length;
    const successRate = totalCases > 0 ? Math.round((resolvedCases / totalCases) * 100) : 0;
    
    setStats({
      totalCases,
      resolvedCases,
      activeCases,
      successRate,
      averageResolutionTime: 14 // Mock average days
    });
  }, []);

  useEffect(() => {
    let filtered = cases;

    if (filterStatus !== 'all') {
      filtered = filtered.filter(c => c.status === filterStatus);
    }

    if (filterSpecies !== 'all') {
      filtered = filtered.filter(c => c.species === filterSpecies);
    }

    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCases(filtered);
  }, [filterStatus, filterSpecies, searchTerm, cases]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'status-open';
      case 'in-progress': return 'status-in-progress';
      case 'resolved': return 'status-resolved';
      case 'closed': return 'status-closed';
      default: return 'status-default';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'severity-critical';
      case 'high': return 'severity-high';
      case 'medium': return 'severity-medium';
      case 'low': return 'severity-low';
      default: return 'severity-default';
    }
  };

  const getCaseTypeIcon = (type: string) => {
    switch (type) {
      case 'disease': return '🦠';
      case 'nutrition': return '🍽️';
      case 'management': return '⚙️';
      case 'environment': return '🌡️';
      case 'vaccination': return '💉';
      default: return '📋';
    }
  };

  const getSpeciesIcon = (species: string) => {
    return species === 'poultry' ? '🐔' : '🐖';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getResolutionTime = (caseItem: Case) => {
    if (!caseItem.dateResolved) return 'Ongoing';
    const start = new Date(caseItem.dateReported);
    const end = new Date(caseItem.dateResolved);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  };

  return (
    <div className="expert-case-history">
      <div className="case-header">
        <h1>Expert Case History</h1>
        <p>Comprehensive tracking and management of veterinary cases</p>
      </div>

      {/* Statistics Overview */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalCases}</div>
            <div className="stat-label">Total Cases</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-number">{stats.resolvedCases}</div>
            <div className="stat-label">Resolved Cases</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <div className="stat-content">
            <div className="stat-number">{stats.activeCases}</div>
            <div className="stat-label">Active Cases</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <div className="stat-number">{stats.successRate}%</div>
            <div className="stat-label">Success Rate</div>
          </div>
        </div>
      </div>

      <div className="case-content">
        {/* Cases List */}
        <div className="cases-section">
          <div className="section-header">
            <h2>Case History</h2>
            <div className="filter-controls">
              <input
                type="text"
                placeholder="Search cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
              <select
                value={filterSpecies}
                onChange={(e) => setFilterSpecies(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Species</option>
                <option value="poultry">Poultry</option>
                <option value="swine">Swine</option>
              </select>
            </div>
          </div>

          <div className="cases-list">
            {filteredCases.length === 0 ? (
              <div className="empty-state">
                No cases found matching your criteria.
              </div>
            ) : (
              filteredCases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className={`case-card ${selectedCase?.id === caseItem.id ? 'selected' : ''}`}
                  onClick={() => setSelectedCase(caseItem)}
                >
                  <div className="case-header">
                    <div className="case-title">
                      <span className="case-type-icon">
                        {getCaseTypeIcon(caseItem.caseType)}
                      </span>
                      <h3>{caseItem.description}</h3>
                    </div>
                    <div className="case-meta">
                      <span className={`status-badge ${getStatusColor(caseItem.status)}`}>
                        {caseItem.status}
                      </span>
                      <span className={`severity-badge ${getSeverityColor(caseItem.severity)}`}>
                        {caseItem.severity}
                      </span>
                    </div>
                  </div>

                  <div className="case-details">
                    <div className="farm-info">
                      <span className="species-icon">{getSpeciesIcon(caseItem.species)}</span>
                      <span className="farm-name">{caseItem.farmName}</span>
                      <span className="case-id">#{caseItem.id}</span>
                    </div>
                    
                    <p className="case-diagnosis">{caseItem.diagnosis}</p>
                    
                    <div className="case-timeline">
                      <span className="date-reported">
                        Reported: {formatDate(caseItem.dateReported)}
                      </span>
                      {caseItem.dateResolved && (
                        <span className="date-resolved">
                          Resolved: {formatDate(caseItem.dateResolved)}
                        </span>
                      )}
                      <span className="resolution-time">
                        Duration: {getResolutionTime(caseItem)}
                      </span>
                    </div>

                    <div className="symptoms-preview">
                      <strong>Symptoms:</strong> {caseItem.symptoms.slice(0, 2).join(', ')}
                      {caseItem.symptoms.length > 2 && `... (+${caseItem.symptoms.length - 2} more)`}
                    </div>
                  </div>

                  {caseItem.followUpRequired && (
                    <div className="follow-up-flag">
                      🔄 Follow-up Required
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Case Details */}
        <div className="case-details-section">
          {selectedCase ? (
            <div className="case-detail-card">
              <div className="detail-header">
                <h2>Case Details</h2>
                <div className="case-actions">
                  <button className="btn-primary">Update Case</button>
                  <button className="btn-secondary">Generate Report</button>
                </div>
              </div>

              <div className="detail-content">
                {/* Basic Info */}
                <div className="detail-section">
                  <h3>Case Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Case ID:</label>
                      <span>{selectedCase.id}</span>
                    </div>
                    <div className="info-item">
                      <label>Farm:</label>
                      <span>{selectedCase.farmName} ({selectedCase.farmId})</span>
                    </div>
                    <div className="info-item">
                      <label>Species:</label>
                      <span>
                        <span className="species-icon">{getSpeciesIcon(selectedCase.species)}</span>
                        {selectedCase.species === 'poultry' ? 'Poultry' : 'Swine'}
                      </span>
                    </div>
                    <div className="info-item">
                      <label>Case Type:</label>
                      <span>
                        <span className="type-icon">{getCaseTypeIcon(selectedCase.caseType)}</span>
                        {selectedCase.caseType}
                      </span>
                    </div>
                    <div className="info-item">
                      <label>Status:</label>
                      <span className={`status-badge ${getStatusColor(selectedCase.status)}`}>
                        {selectedCase.status}
                      </span>
                    </div>
                    <div className="info-item">
                      <label>Severity:</label>
                      <span className={`severity-badge ${getSeverityColor(selectedCase.severity)}`}>
                        {selectedCase.severity}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="detail-section">
                  <h3>Case Description</h3>
                  <p>{selectedCase.description}</p>
                </div>

                {/* Symptoms */}
                <div className="detail-section">
                  <h3>Observed Symptoms</h3>
                  <div className="symptoms-list">
                    {selectedCase.symptoms.map((symptom, index) => (
                      <span key={index} className="symptom-tag">
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Diagnosis & Treatment */}
                <div className="detail-section">
                  <h3>Diagnosis & Treatment</h3>
                  <div className="treatment-grid">
                    <div className="treatment-item">
                      <label>Diagnosis:</label>
                      <p>{selectedCase.diagnosis}</p>
                    </div>
                    <div className="treatment-item">
                      <label>Treatment Plan:</label>
                      <p>{selectedCase.treatment}</p>
                    </div>
                    <div className="treatment-item">
                      <label>Medications:</label>
                      <div className="medications-list">
                        {selectedCase.medications.map((med, index) => (
                          <span key={index} className="medication-tag">
                            💊 {med}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Outcome & Notes */}
                <div className="detail-section">
                  <h3>Outcome & Expert Notes</h3>
                  <div className="outcome-grid">
                    <div className="outcome-item">
                      <label>Outcome:</label>
                      <p>{selectedCase.outcome}</p>
                    </div>
                    <div className="outcome-item">
                      <label>Expert Notes:</label>
                      <p>{selectedCase.expertNotes}</p>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="detail-section">
                  <h3>Case Timeline</h3>
                  <div className="timeline">
                    <div className="timeline-item">
                      <div className="timeline-marker"></div>
                      <div className="timeline-content">
                        <strong>Case Reported</strong>
                        <span>{formatDate(selectedCase.dateReported)}</span>
                      </div>
                    </div>
                    {selectedCase.dateResolved && (
                      <div className="timeline-item">
                        <div className="timeline-marker resolved"></div>
                        <div className="timeline-content">
                          <strong>Case Resolved</strong>
                          <span>{formatDate(selectedCase.dateResolved)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-case-selected">
              <div className="placeholder-icon">📋</div>
              <h3>Select a Case</h3>
              <p>Choose a case from the list to view detailed information</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpertCaseHistory;