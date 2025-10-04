// components/ExpertDiseaseDiagnosis.tsx
'use client';

import { useState, useEffect } from 'react';
import './ExpertDiseaseDiagnosis.css';

// TypeScript Interfaces
interface DiseaseCase {
  id: string;
  farmerName: string;
  farmerId: string;
  animalType: 'chicken' | 'pig' | 'both' | 'other';
  species?: string;
  ageGroup: 'young' | 'adult' | 'elderly';
  symptoms: string[];
  suspectedDisease?: string;
  severity: 'critical' | 'urgent' | 'normal';
  status: 'pending' | 'in-progress' | 'diagnosed' | 'resolved';
  description: string;
  images?: string[];
  createdAt: string;
  affectedCount: number;
  mortalityRate?: number;
  location: string;
}

interface Medication {
  name: string;
  dosage: string;
  duration: string;
  frequency: string;
  notes?: string;
}

interface Diagnosis {
  caseId: string;
  expertId: string;
  diagnosedDisease: string;
  confidence: number;
  treatmentPlan: string;
  medications: Medication[];
  preventionTips: string[];
  followUpRequired: boolean;
  followUpDate?: string;
  createdAt: string;
}

interface DiseaseStats {
  totalCases: number;
  criticalCases: number;
  pendingDiagnosis: number;
  resolvedCases: number;
  commonDiseases: {
    name: string;
    count: number;
    animalType: string;
  }[];
}

export default function ExpertDiseaseDiagnosis() {
  const [activeTab, setActiveTab] = useState<'pending' | 'in-progress' | 'resolved'>('pending');
  const [selectedCase, setSelectedCase] = useState<DiseaseCase | null>(null);
  const [cases, setCases] = useState<DiseaseCase[]>([]);
  const [showDiagnosisForm, setShowDiagnosisForm] = useState(false);
  const [diagnosis, setDiagnosis] = useState<Partial<Diagnosis>>({
    confidence: 80,
    treatmentPlan: '',
    medications: [{ name: '', dosage: '', duration: '', frequency: '' }],
    preventionTips: [''],
    followUpRequired: false
  });

  // Mock data for poultry and livestock disease cases
  useEffect(() => {
    const mockCases: DiseaseCase[] = [
      {
        id: '1',
        farmerName: 'Rajesh Poultry Farm',
        farmerId: 'farmer-123',
        animalType: 'chicken',
        species: 'Broiler Chickens',
        ageGroup: 'young',
        symptoms: ['Lethargy', 'Loss of appetite', 'Greenish diarrhea', 'Swollen head', 'Coughing'],
        suspectedDisease: 'Newcastle Disease',
        severity: 'critical',
        status: 'pending',
        description: 'Sudden onset of symptoms in 3-week old broiler chickens. High mortality rate observed in the past 24 hours.',
        affectedCount: 150,
        mortalityRate: 25,
        location: 'Block B, Unit 4',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        farmerName: 'Priya Swine Farm',
        farmerId: 'farmer-124',
        animalType: 'pig',
        species: 'Landrace Pigs',
        ageGroup: 'adult',
        symptoms: ['Fever', 'Skin lesions', 'Respiratory distress', 'Abortion in sows'],
        suspectedDisease: 'Porcine Reproductive & Respiratory Syndrome',
        severity: 'urgent',
        status: 'pending',
        description: 'Multiple sows showing abortion symptoms, growing pigs with respiratory issues.',
        affectedCount: 45,
        mortalityRate: 8,
        location: 'Sector 2, Pen 3',
        createdAt: new Date(Date.now() - 2 * 60 * 60000).toISOString()
      },
      {
        id: '3',
        farmerName: 'Kumar Mixed Farm',
        farmerId: 'farmer-125',
        animalType: 'both',
        species: 'Layers & Weaner Pigs',
        ageGroup: 'young',
        symptoms: ['Diarrhea', 'Dehydration', 'Weight loss', 'Ruffled feathers'],
        suspectedDisease: 'Salmonellosis',
        severity: 'urgent',
        status: 'in-progress',
        description: 'Young chickens and piglets showing similar gastrointestinal symptoms. Suspected feed contamination.',
        affectedCount: 200,
        mortalityRate: 12,
        location: 'Main Farm Unit',
        createdAt: new Date(Date.now() - 4 * 60 * 60000).toISOString()
      },
      {
        id: '4',
        farmerName: 'Anita Poultry',
        farmerId: 'farmer-126',
        animalType: 'chicken',
        species: 'Layer Hens',
        ageGroup: 'adult',
        symptoms: ['Reduced egg production', 'Poor egg quality', 'Pale combs', 'Weight loss'],
        suspectedDisease: 'Avian Influenza',
        severity: 'critical',
        status: 'pending',
        description: 'Drastic drop in egg production from 85% to 45% in one week. Abnormal egg shells observed.',
        affectedCount: 500,
        mortalityRate: 5,
        location: 'Layer Unit 2',
        createdAt: new Date(Date.now() - 6 * 60 * 60000).toISOString()
      },
      {
        id: '5',
        farmerName: 'Mohan Pig Farm',
        farmerId: 'farmer-127',
        animalType: 'pig',
        species: 'Sows & Piglets',
        ageGroup: 'young',
        symptoms: ['Neurological signs', 'Convulsions', 'Circling', 'Fever'],
        suspectedDisease: 'Pseudorabies',
        severity: 'critical',
        status: 'pending',
        description: 'Piglets showing severe neurological symptoms. High mortality in young animals.',
        affectedCount: 80,
        mortalityRate: 30,
        location: 'Nursery Unit',
        createdAt: new Date(Date.now() - 8 * 60 * 60000).toISOString()
      }
    ];
    setCases(mockCases);
  }, []);

  const stats: DiseaseStats = {
    totalCases: cases.length,
    criticalCases: cases.filter(c => c.severity === 'critical').length,
    pendingDiagnosis: cases.filter(c => c.status === 'pending').length,
    resolvedCases: cases.filter(c => c.status === 'resolved').length,
    commonDiseases: [
      { name: 'Newcastle Disease', count: 3, animalType: 'chicken' },
      { name: 'Avian Influenza', count: 2, animalType: 'chicken' },
      { name: 'PRRS', count: 2, animalType: 'pig' },
      { name: 'Salmonellosis', count: 1, animalType: 'both' }
    ]
  };

  const filteredCases = cases.filter(caseItem => 
    activeTab === 'pending' ? caseItem.status === 'pending' :
    activeTab === 'in-progress' ? caseItem.status === 'in-progress' :
    caseItem.status === 'resolved'
  );

  const getAnimalIcon = (animalType: string) => {
    switch (animalType) {
      case 'chicken': return '🐔';
      case 'pig': return '🐖';
      case 'both': return '🐔🐖';
      default: return '🐾';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'critical';
      case 'urgent': return 'urgent';
      case 'normal': return 'normal';
      default: return 'normal';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const minutes = Math.round((Date.now() - new Date(dateString).getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 min ago';
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  };

  const handleStartDiagnosis = (caseId: string) => {
    const selected = cases.find(c => c.id === caseId);
    setSelectedCase(selected || null);
    setShowDiagnosisForm(true);
  };

  const handleUpdateStatus = (caseId: string, newStatus: DiseaseCase['status']) => {
    const updatedCases = cases.map(c => 
      c.id === caseId ? { ...c, status: newStatus } : c
    );
    setCases(updatedCases);
  };

  const handleDiagnosisSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCase) {
      // Update case status to diagnosed
      const updatedCases = cases.map(c => 
        c.id === selectedCase.id ? { ...c, status: 'diagnosed' } : c
      );
      //setCases(updatedCases);
      setShowDiagnosisForm(false);
      setSelectedCase(null);
      
      // In real app, save diagnosis to backend
      console.log('Diagnosis submitted:', diagnosis);
    }
  };

  const addMedication = () => {
    setDiagnosis(prev => ({
      ...prev,
      medications: [...(prev.medications || []), { name: '', dosage: '', duration: '', frequency: '' }]
    }));
  };

  const addPreventionTip = () => {
    setDiagnosis(prev => ({
      ...prev,
      preventionTips: [...(prev.preventionTips || []), '']
    }));
  };

  const updateMedication = (index: number, field: keyof Medication, value: string) => {
    const updatedMedications = diagnosis.medications?.map((med, i) => 
      i === index ? { ...med, [field]: value } : med
    );
    setDiagnosis(prev => ({ ...prev, medications: updatedMedications }));
  };

  const updatePreventionTip = (index: number, value: string) => {
    const updatedTips = diagnosis.preventionTips?.map((tip, i) => 
      i === index ? value : tip
    );
    setDiagnosis(prev => ({ ...prev, preventionTips: updatedTips }));
  };

  return (
    <div className="disease-diagnosis">
      <div className="diagnosis-header">
        <h2>Poultry & Livestock Disease Diagnosis</h2>
        <div style={{ fontSize: '0.9rem', color: '#718096' }}>
          Real-time disease monitoring & diagnosis
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="stats-grid">
        <div className="stat-card critical">
          <div className="stat-number">{stats.criticalCases}</div>
          <div className="stat-label">Critical Cases</div>
        </div>
        <div className="stat-card warning">
          <div className="stat-number">{stats.pendingDiagnosis}</div>
          <div className="stat-label">Pending Diagnosis</div>
        </div>
        <div className="stat-card normal">
          <div className="stat-number">{stats.resolvedCases}</div>
          <div className="stat-label">Resolved Cases</div>
        </div>
        <div className="stat-card info">
          <div className="stat-number">{stats.totalCases}</div>
          <div className="stat-label">Total Cases</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="diagnosis-tabs">
        <button 
          className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending Diagnosis ({cases.filter(c => c.status === 'pending').length})
        </button>
        <button 
          className={`tab ${activeTab === 'in-progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('in-progress')}
        >
          In Progress ({cases.filter(c => c.status === 'in-progress').length})
        </button>
        <button 
          className={`tab ${activeTab === 'resolved' ? 'active' : ''}`}
          onClick={() => setActiveTab('resolved')}
        >
          Resolved ({cases.filter(c => c.status === 'resolved').length})
        </button>
      </div>

      {/* Cases List */}
      <div className="diagnosis-content">
        <div className="cases-list">
          {filteredCases.length === 0 ? (
            <div className="empty-state">
              No {activeTab} cases found
            </div>
          ) : (
            filteredCases.map((caseItem) => (
              <div key={caseItem.id} className="case-item">
                <div className="case-header">
                  <div className="case-badges">
                    <span className={`badge ${getSeverityColor(caseItem.severity)}`}>
                      {caseItem.severity.toUpperCase()}
                    </span>
                    <span className="animal-type">
                      {getAnimalIcon(caseItem.animalType)} {caseItem.species}
                    </span>
                    <span className="animal-type">
                      {caseItem.ageGroup} • {caseItem.affectedCount} affected
                    </span>
                    {caseItem.mortalityRate && (
                      <span className="animal-type" style={{ background: '#fed7d7', color: '#c53030' }}>
                        ⚠️ {caseItem.mortalityRate}% mortality
                      </span>
                    )}
                  </div>
                  
                  <div className="case-time">
                    {formatTimeAgo(caseItem.createdAt)}
                  </div>
                </div>
                
                <h3 className="case-title">
                  {caseItem.suspectedDisease || 'Unknown Disease'}
                </h3>
                
                <p className="case-description">
                  {caseItem.description}
                </p>
                
                <div className="case-meta">
                  <span className="meta-item">
                    <strong>Farm:</strong> {caseItem.farmerName}
                  </span>
                  <span className="meta-item">
                    <strong>Location:</strong> {caseItem.location}
                  </span>
                  <span className="meta-item">
                    <strong>Status:</strong> {caseItem.status}
                  </span>
                </div>

                <div className="case-symptoms">
                  <div className="symptoms-title">Observed Symptoms:</div>
                  <div className="symptoms-list">
                    {caseItem.symptoms.map((symptom, index) => (
                      <span key={index} className="symptom-tag">
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="case-actions">
                  {caseItem.status === 'pending' && (
                    <button
                      onClick={() => handleStartDiagnosis(caseItem.id)}
                      className="btn btn-primary"
                    >
                      Start Diagnosis
                    </button>
                  )}
                  {caseItem.status === 'in-progress' && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(caseItem.id, 'diagnosed')}
                        className="btn btn-success"
                      >
                        Mark as Diagnosed
                      </button>
                      <button
                        onClick={() => handleStartDiagnosis(caseItem.id)}
                        className="btn btn-secondary"
                      >
                        Continue Diagnosis
                      </button>
                    </>
                  )}
                  {caseItem.status === 'diagnosed' && (
                    <button
                      onClick={() => handleUpdateStatus(caseItem.id, 'resolved')}
                      className="btn btn-success"
                    >
                      Mark as Resolved
                    </button>
                  )}
                  <button className="btn btn-secondary">
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Diagnosis Form Modal */}
      {showDiagnosisForm && selectedCase && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3>Diagnosis Form - {selectedCase.suspectedDisease}</h3>
              <button
                onClick={() => setShowDiagnosisForm(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#718096'
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleDiagnosisSubmit}>
              <div className="form-group">
                <label className="form-label">Diagnosed Disease</label>
                <input
                  type="text"
                  className="form-input"
                  value={diagnosis.diagnosedDisease || selectedCase.suspectedDisease || ''}
                  onChange={(e) => setDiagnosis(prev => ({ ...prev, diagnosedDisease: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confidence Level</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={diagnosis.confidence || 80}
                  onChange={(e) => setDiagnosis(prev => ({ ...prev, confidence: parseInt(e.target.value) }))}
                  style={{ width: '100%' }}
                />
                <div style={{ textAlign: 'center', marginTop: '5px', color: '#718096' }}>
                  {diagnosis.confidence}% Confidence
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Treatment Plan</label>
                <textarea
                  className="form-textarea"
                  value={diagnosis.treatmentPlan}
                  onChange={(e) => setDiagnosis(prev => ({ ...prev, treatmentPlan: e.target.value }))}
                  placeholder="Detailed treatment plan and recommendations..."
                  required
                />
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <label className="form-label">Medications</label>
                  <button type="button" onClick={addMedication} className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>
                    + Add Medication
                  </button>
                </div>
                {diagnosis.medications?.map((med, index) => (
                  <div key={index} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                    <input
                      type="text"
                      placeholder="Medication name"
                      value={med.name}
                      onChange={(e) => updateMedication(index, 'name', e.target.value)}
                      className="form-input"
                    />
                    <input
                      type="text"
                      placeholder="Dosage"
                      value={med.dosage}
                      onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                      className="form-input"
                    />
                    <input
                      type="text"
                      placeholder="Duration"
                      value={med.duration}
                      onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                      className="form-input"
                    />
                    <input
                      type="text"
                      placeholder="Frequency"
                      value={med.frequency}
                      onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
                      className="form-input"
                    />
                  </div>
                ))}
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <label className="form-label">Prevention Tips</label>
                  <button type="button" onClick={addPreventionTip} className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>
                    + Add Tip
                  </button>
                </div>
                {diagnosis.preventionTips?.map((tip, index) => (
                  <input
                    key={index}
                    type="text"
                    className="form-input"
                    style={{ marginBottom: '8px' }}
                    placeholder={`Prevention tip ${index + 1}`}
                    value={tip}
                    onChange={(e) => updatePreventionTip(index, e.target.value)}
                  />
                ))}
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={diagnosis.followUpRequired || false}
                    onChange={(e) => setDiagnosis(prev => ({ ...prev, followUpRequired: e.target.checked }))}
                  />
                  Follow-up Required
                </label>
              </div>

              {diagnosis.followUpRequired && (
                <div className="form-group">
                  <label className="form-label">Follow-up Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={diagnosis.followUpDate || ''}
                    onChange={(e) => setDiagnosis(prev => ({ ...prev, followUpDate: e.target.value }))}
                  />
                </div>
              )}

              <div className="form-actions">
                <button type="button" onClick={() => setShowDiagnosisForm(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Diagnosis
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}