// components/ExpertTreatmentPlans.tsx
'use client';

import { useState, useEffect } from 'react';
import './ExpertTreatmentPlans.css';

// TypeScript Interfaces
interface Medication {
  id: string;
  name: string;
  dosage: string;
  duration: string;
  frequency: string;
  route: 'oral' | 'injection' | 'topical' | 'water' | 'feed';
  notes?: string;
  costPerUnit: number;
  unitsRequired: number;
}

interface TreatmentStep {
  id: string;
  description: string;
  duration: string;
  frequency: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

interface TreatmentPlan {
  id: string;
  farmerId: string;
  farmerName: string;
  farmName: string;
  animalType: 'chicken' | 'pig' | 'both' | 'other';
  species: string;
  diagnosedDisease: string;
  caseId: string;
  expertId: string;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  severity: 'critical' | 'urgent' | 'normal';
  createdAt: string;
  updatedAt: string;
  estimatedRecoveryTime: string;
  medications: Medication[];
  treatmentSteps: TreatmentStep[];
  specialInstructions: string[];
  followUpRequired: boolean;
  followUpDate?: string;
  progressNotes: ProgressNote[];
  totalCost: number;
  effectiveness: 'excellent' | 'good' | 'fair' | 'poor' | 'not-evaluated';
}

interface ProgressNote {
  id: string;
  date: string;
  note: string;
  improvements: string[];
  concerns: string[];
  nextSteps: string[];
  recordedBy: string;
}

export default function ExpertTreatmentPlans({ expertId }: { expertId: string }) {
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'all'>('active');
  const [selectedPlan, setSelectedPlan] = useState<TreatmentPlan | null>(null);
  const [plans, setPlans] = useState<TreatmentPlan[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlan, setNewPlan] = useState<Partial<TreatmentPlan>>({
    medications: [{ id: '1', name: '', dosage: '', duration: '', frequency: '', route: 'oral', costPerUnit: 0, unitsRequired: 1 }],
    treatmentSteps: [{ id: '1', description: '', duration: '', frequency: '', priority: 'medium', completed: false }],
    specialInstructions: [''],
    progressNotes: []
  });

  // Mock data - unique treatment plans for each farmer
  useEffect(() => {
    const mockPlans: TreatmentPlan[] = [
      {
        id: '1',
        farmerId: 'farmer-123',
        farmerName: 'Rajesh Kumar',
        farmName: 'Rajesh Poultry Farm',
        animalType: 'chicken',
        species: 'Broiler Chickens (3 weeks old)',
        diagnosedDisease: 'Newcastle Disease',
        caseId: 'case-001',
        expertId: expertId,
        status: 'active',
        severity: 'critical',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        estimatedRecoveryTime: '14-21 days',
        medications: [
          {
            id: 'med-1',
            name: 'Amoxicillin',
            dosage: '20mg/kg',
            duration: '7 days',
            frequency: 'Twice daily',
            route: 'water',
            notes: 'Mix in drinking water. Ensure proper hydration.',
            costPerUnit: 150,
            unitsRequired: 10
          },
          {
            id: 'med-2',
            name: 'Vitamin C Supplement',
            dosage: '1g per 10L water',
            duration: '14 days',
            frequency: 'Daily',
            route: 'water',
            notes: 'Boost immune system during recovery',
            costPerUnit: 80,
            unitsRequired: 5
          },
          {
            id: 'med-3',
            name: 'Electrolytes',
            dosage: '5g per liter',
            duration: '5 days',
            frequency: 'Continuous',
            route: 'water',
            costPerUnit: 40,
            unitsRequired: 8
          }
        ],
        treatmentSteps: [
          {
            id: 'step-1',
            description: 'Isolate affected birds immediately',
            duration: 'Immediate',
            frequency: 'Once',
            priority: 'high',
            completed: true
          },
          {
            id: 'step-2',
            description: 'Administer antibiotics in drinking water',
            duration: '7 days',
            frequency: 'Twice daily',
            priority: 'high',
            completed: false
          },
          {
            id: 'step-3',
            description: 'Provide vitamin supplements',
            duration: '14 days',
            frequency: 'Daily',
            priority: 'medium',
            completed: false
          },
          {
            id: 'step-4',
            description: 'Monitor temperature and humidity',
            duration: 'Entire treatment',
            frequency: 'Twice daily',
            priority: 'medium',
            completed: false
          },
          {
            id: 'step-5',
            description: 'Follow-up health assessment',
            duration: '1 day',
            frequency: 'After 14 days',
            priority: 'low',
            completed: false
          }
        ],
        specialInstructions: [
          'Maintain strict biosecurity measures',
          'Disinfect housing daily',
          'Provide clean, fresh water at all times',
          'Monitor feed consumption closely'
        ],
        followUpRequired: true,
        followUpDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        progressNotes: [
          {
            id: 'note-1',
            date: new Date().toISOString(),
            note: 'Initial treatment started. Birds showing signs of dehydration.',
            improvements: ['Isolation completed'],
            concerns: ['Low water consumption', 'High mortality rate'],
            nextSteps: ['Monitor hydration', 'Check medication mixing'],
            recordedBy: expertId
          }
        ],
        totalCost: 2340,
        effectiveness: 'not-evaluated'
      },
      {
        id: '2',
        farmerId: 'farmer-124',
        farmerName: 'Priya Singh',
        farmName: 'Priya Swine Farm',
        animalType: 'pig',
        species: 'Landrace Pigs (4 months old)',
        diagnosedDisease: 'Porcine Respiratory Disease Complex',
        caseId: 'case-002',
        expertId: expertId,
        status: 'active',
        severity: 'urgent',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        estimatedRecoveryTime: '10-15 days',
        medications: [
          {
            id: 'med-1',
            name: 'Tylosin Tartrate',
            dosage: '10mg/kg',
            duration: '5 days',
            frequency: 'Once daily',
            route: 'injection',
            notes: 'Intramuscular injection. Rotate injection sites.',
            costPerUnit: 200,
            unitsRequired: 15
          },
          {
            id: 'med-2',
            name: 'Anti-inflammatory',
            dosage: '2mg/kg',
            duration: '3 days',
            frequency: 'Twice daily',
            route: 'oral',
            costPerUnit: 120,
            unitsRequired: 10
          }
        ],
        treatmentSteps: [
          {
            id: 'step-1',
            description: 'Improve ventilation in pig housing',
            duration: 'Continuous',
            frequency: 'Monitor daily',
            priority: 'high',
            completed: true
          },
          {
            id: 'step-2',
            description: 'Administer antibiotic injections',
            duration: '5 days',
            frequency: 'Daily',
            priority: 'high',
            completed: false
          },
          {
            id: 'step-3',
            description: 'Provide anti-inflammatory medication',
            duration: '3 days',
            frequency: 'Twice daily',
            priority: 'medium',
            completed: false
          }
        ],
        specialInstructions: [
          'Keep housing dry and well-ventilated',
          'Reduce stocking density if possible',
          'Monitor respiratory rate twice daily'
        ],
        followUpRequired: true,
        followUpDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        progressNotes: [
          {
            id: 'note-1',
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            note: 'Ventilation improved. Pigs still showing labored breathing.',
            improvements: ['Ventilation system upgraded'],
            concerns: ['Persistent coughing', 'Reduced appetite'],
            nextSteps: ['Start medication protocol', 'Monitor temperature'],
            recordedBy: expertId
          }
        ],
        totalCost: 4200,
        effectiveness: 'not-evaluated'
      },
      {
        id: '3',
        farmerId: 'farmer-125',
        farmerName: 'Kumar Reddy',
        farmName: 'Kumar Mixed Farm',
        animalType: 'both',
        species: 'Layers & Weaner Pigs',
        diagnosedDisease: 'Salmonellosis',
        caseId: 'case-003',
        expertId: expertId,
        status: 'active',
        severity: 'urgent',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        estimatedRecoveryTime: '7-10 days',
        medications: [
          {
            id: 'med-1',
            name: 'Enrofloxacin',
            dosage: '10mg/kg',
            duration: '5 days',
            frequency: 'Once daily',
            route: 'water',
            notes: 'For both chickens and pigs. Adjust water consumption rates.',
            costPerUnit: 180,
            unitsRequired: 12
          },
          {
            id: 'med-2',
            name: 'Probiotics',
            dosage: 'As directed',
            duration: '10 days',
            frequency: 'Daily',
            route: 'feed',
            costPerUnit: 90,
            unitsRequired: 8
          }
        ],
        treatmentSteps: [
          {
            id: 'step-1',
            description: 'Disinfect all water sources and feeders',
            duration: '2 days',
            frequency: 'Twice daily',
            priority: 'high',
            completed: true
          },
          {
            id: 'step-2',
            description: 'Administer antibiotics in water',
            duration: '5 days',
            frequency: 'Daily',
            priority: 'high',
            completed: false
          },
          {
            id: 'step-3',
            description: 'Add probiotics to feed',
            duration: '10 days',
            frequency: 'Daily',
            priority: 'medium',
            completed: false
          }
        ],
        specialInstructions: [
          'Separate sick animals immediately',
          'Test water quality regularly',
          'Maintain strict hygiene during handling'
        ],
        followUpRequired: true,
        followUpDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        progressNotes: [
          {
            id: 'note-1',
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            note: 'Initial disinfection completed. Still observing diarrhea in some animals.',
            improvements: ['Water sources cleaned', 'Isolation implemented'],
            concerns: ['Persistent diarrhea', 'Reduced water intake'],
            nextSteps: ['Start antibiotic treatment', 'Monitor hydration'],
            recordedBy: expertId
          }
        ],
        totalCost: 3120,
        effectiveness: 'fair'
      },
      {
        id: '4',
        farmerId: 'farmer-126',
        farmerName: 'Anita Sharma',
        farmName: 'Anita Poultry',
        animalType: 'chicken',
        species: 'Layer Hens (32 weeks old)',
        diagnosedDisease: 'Fowl Cholera',
        caseId: 'case-004',
        expertId: expertId,
        status: 'completed',
        severity: 'critical',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        estimatedRecoveryTime: '21 days',
        medications: [
          {
            id: 'med-1',
            name: 'Sulfonamides',
            dosage: 'As directed',
            duration: '5 days',
            frequency: 'Twice daily',
            route: 'water',
            costPerUnit: 160,
            unitsRequired: 15
          }
        ],
        treatmentSteps: [
          {
            id: 'step-1',
            description: 'Emergency antibiotic treatment',
            duration: '5 days',
            frequency: 'Twice daily',
            priority: 'high',
            completed: true
          },
          {
            id: 'step-2',
            description: 'Carcass disposal and disinfection',
            duration: '3 days',
            frequency: 'Daily',
            priority: 'high',
            completed: true
          },
          {
            id: 'step-3',
            description: 'Vaccination of remaining flock',
            duration: '1 day',
            frequency: 'Once',
            priority: 'medium',
            completed: true
          }
        ],
        specialInstructions: [
          'Dispose of dead birds properly',
          'Vaccinate remaining healthy birds',
          'Monitor closely for recurrence'
        ],
        followUpRequired: false,
        progressNotes: [
          {
            id: 'note-1',
            date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            note: 'Outbreak identified. High mortality rate observed.',
            improvements: [],
            concerns: ['Rapid spread', 'High mortality'],
            nextSteps: ['Start emergency treatment', 'Isolate affected areas'],
            recordedBy: expertId
          },
          {
            id: 'note-2',
            date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            note: 'Treatment completed. Mortality rate reduced significantly.',
            improvements: ['Mortality stopped', 'Birds recovering well'],
            concerns: ['Weak birds need special care'],
            nextSteps: ['Continue monitoring', 'Provide nutritional support'],
            recordedBy: expertId
          },
          {
            id: 'note-3',
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            note: 'Full recovery achieved. Egg production returning to normal.',
            improvements: ['Full recovery', 'Normal production resumed'],
            concerns: [],
            nextSteps: ['Routine health monitoring'],
            recordedBy: expertId
          }
        ],
        totalCost: 5600,
        effectiveness: 'excellent'
      }
    ];
    setPlans(mockPlans);
  }, [expertId]);

  const filteredPlans = plans.filter(plan => 
    activeTab === 'all' ? true : plan.status === activeTab
  );

  const stats = {
    total: plans.length,
    active: plans.filter(p => p.status === 'active').length,
    completed: plans.filter(p => p.status === 'completed').length,
    critical: plans.filter(p => p.severity === 'critical').length
  };

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
      case 'active': return '#38a169';
      case 'completed': return '#3182ce';
      case 'paused': return '#dd6b20';
      case 'cancelled': return '#e53e3e';
      default: return '#718096';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#e53e3e';
      case 'urgent': return '#dd6b20';
      case 'normal': return '#38a169';
      default: return '#718096';
    }
  };

  const getEffectivenessColor = (effectiveness: string) => {
    switch (effectiveness) {
      case 'excellent': return '#38a169';
      case 'good': return '#68d391';
      case 'fair': return '#ecc94b';
      case 'poor': return '#ed8936';
      case 'not-evaluated': return '#a0aec0';
      default: return '#718096';
    }
  };

  const calculateProgress = (plan: TreatmentPlan) => {
    const completedSteps = plan.treatmentSteps.filter(step => step.completed).length;
    return Math.round((completedSteps / plan.treatmentSteps.length) * 100);
  };

  const handleUpdateStep = (planId: string, stepId: string, completed: boolean) => {
    const updatedPlans = plans.map(plan => {
      if (plan.id === planId) {
        const updatedSteps = plan.treatmentSteps.map(step =>
          step.id === stepId ? { ...step, completed } : step
        );
        return { ...plan, treatmentSteps: updatedSteps, updatedAt: new Date().toISOString() };
      }
      return plan;
    });
    setPlans(updatedPlans);
  };

  const handleAddProgressNote = (planId: string, note: Omit<ProgressNote, 'id'>) => {
    const updatedPlans = plans.map(plan => {
      if (plan.id === planId) {
        const newNote: ProgressNote = {
          ...note,
          id: `note-${Date.now()}`
        };
        return {
          ...plan,
          progressNotes: [...plan.progressNotes, newNote],
          updatedAt: new Date().toISOString()
        };
      }
      return plan;
    });
    setPlans(updatedPlans);
  };

  return (
    <div className="treatment-plans">
      <div className="plans-header">
        <div>
          <h2>Treatment Plans Management</h2>
          <p style={{ color: '#718096', margin: 0 }}>Unique treatment plans for each farmer</p>
        </div>
        {/* <button 
          className="btn btn-primary"
          onClick={() => setShowCreateForm(true)}
        >
          Create New Plan
        </button> */}
      </div>

      {/* Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Plans</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.active}</div>
          <div className="stat-label">Active Plans</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.critical}</div>
          <div className="stat-label">Critical Cases</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="plans-tabs">
        <button 
          className={`tab ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active Plans ({stats.active})
        </button>
        <button 
          className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed ({stats.completed})
        </button>
        <button 
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Plans ({stats.total})
        </button>
      </div>

      {/* Plans Grid */}
      <div className="plans-grid">
        {filteredPlans.length === 0 ? (
          <div className="empty-state">
            No {activeTab} treatment plans found
          </div>
        ) : (
          filteredPlans.map(plan => (
            <div key={plan.id} className="plan-card">
              <div className="plan-header">
                <div className="plan-badges">
                  <span 
                    className="badge status"
                    style={{ background: getStatusColor(plan.status) }}
                  >
                    {plan.status.toUpperCase()}
                  </span>
                  <span 
                    className="badge severity"
                    style={{ background: getSeverityColor(plan.severity) }}
                  >
                    {plan.severity.toUpperCase()}
                  </span>
                  <span className="animal-type">
                    {getAnimalIcon(plan.animalType)} {plan.animalType}
                  </span>
                </div>
                <div className="plan-meta">
                  <span>Updated: {new Date(plan.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="plan-content">
                <h3 className="plan-title">{plan.diagnosedDisease}</h3>
                <p className="plan-farmer">
                  <strong>Farmer:</strong> {plan.farmerName} ({plan.farmName})
                </p>
                <p className="plan-species">
                  <strong>Animals:</strong> {plan.species}
                </p>

                {/* Progress Bar */}
                <div className="progress-section">
                  <div className="progress-header">
                    <span>Treatment Progress</span>
                    <span>{calculateProgress(plan)}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${calculateProgress(plan)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Medications Summary */}
                <div className="medications-summary">
                  <strong>Medications:</strong> {plan.medications.length} types
                  <div className="meds-list">
                    {plan.medications.slice(0, 2).map(med => (
                      <span key={med.id} className="med-tag">
                        {med.name}
                      </span>
                    ))}
                    {plan.medications.length > 2 && (
                      <span className="med-tag more">
                        +{plan.medications.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Treatment Steps */}
                <div className="steps-summary">
                  <strong>Steps:</strong> {plan.treatmentSteps.filter(s => s.completed).length} of {plan.treatmentSteps.length} completed
                </div>

                {/* Cost and Effectiveness */}
                <div className="plan-footer">
                  <div className="cost">
                    <strong>Total Cost:</strong> ₹{plan.totalCost}
                  </div>
                  <div 
                    className="effectiveness"
                    style={{ color: getEffectivenessColor(plan.effectiveness) }}
                  >
                    <strong>Effectiveness:</strong> {plan.effectiveness.replace('-', ' ')}
                  </div>
                </div>
              </div>

              <div className="plan-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => setSelectedPlan(plan)}
                >
                  View Details
                </button>
                <button className="btn btn-secondary">
                  Update Progress
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Plan Detail Modal */}
      {selectedPlan && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Treatment Plan Details</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedPlan(null)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              {/* Plan details implementation would go here */}
              <p>Detailed view for {selectedPlan.farmerName}'s treatment plan</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}