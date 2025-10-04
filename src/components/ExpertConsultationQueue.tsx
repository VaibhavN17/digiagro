// components/ExpertConsultationQueue.tsx
'use client';

import { useState, useEffect } from 'react';
import { ConsultationRequest, ConsultationStats } from './Expertconsultation';
import './ExpertConsultationQueue.css';

export default function ExpertConsultationQueue({ expertId }: { expertId: string }) {
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [filter, setFilter] = useState<'all' | 'admin' | 'farmer'>('all');
  const [selectedRequest, setSelectedRequest] = useState<ConsultationRequest | null>(null);

  // Mock data for poultry farm consultations
  useEffect(() => {
    const mockRequests: ConsultationRequest[] = [
      {
        id: '1',
        farmerName: 'Admin System',
        farmerId: 'admin-001',
        requestType: 'admin',
        subject: 'URGENT: Avian Flu Outbreak Alert',
        description: 'Immediate action required: Suspected avian flu cases reported in nearby regions. Review biosecurity protocols.',
        status: 'pending',
        priority: 'high',
        createdAt: new Date().toISOString(),
        estimatedDuration: 45,
        category: 'Disease Outbreak',
        animalType: 'chicken',
        issueType: 'health',
        urgency: 'critical'
      },
      {
        id: '2',
        farmerName: 'Rajesh Poultry Farm',
        farmerId: 'farmer-123',
        requestType: 'farmer',
        subject: 'Chicken Weight Loss & Lethargy',
        description: 'Layer chickens showing sudden weight loss, reduced egg production, and lethargy. Need diagnosis and treatment plan.',
        status: 'pending',
        priority: 'high',
        createdAt: new Date(Date.now() - 25 * 60000).toISOString(),
        estimatedDuration: 30,
        category: 'Poultry Health',
        animalType: 'chicken',
        issueType: 'health',
        urgency: 'urgent'
      },
      {
        id: '3',
        farmerName: 'Admin Support',
        farmerId: 'admin-002',
        requestType: 'admin',
        subject: 'Vaccination Schedule Update',
        description: 'Update poultry vaccination schedules for new regional disease patterns. Requires expert review.',
        status: 'pending',
        priority: 'medium',
        createdAt: new Date(Date.now() - 40 * 60000).toISOString(),
        estimatedDuration: 25,
        category: 'Vaccination',
        animalType: 'both',
        issueType: 'health',
        urgency: 'normal'
      },
      {
        id: '4',
        farmerName: 'Priya Swine Farm',
        farmerId: 'farmer-124',
        requestType: 'farmer',
        subject: 'Piglet Diarrhea Issues',
        description: 'Newborn piglets showing signs of diarrhea and dehydration. Need emergency treatment advice.',
        status: 'pending',
        priority: 'high',
        createdAt: new Date(Date.now() - 55 * 60000).toISOString(),
        estimatedDuration: 20,
        category: 'Swine Health',
        animalType: 'pig',
        issueType: 'health',
        urgency: 'critical'
      },
      {
        id: '5',
        farmerName: 'Kumar Mixed Farm',
        farmerId: 'farmer-125',
        requestType: 'farmer',
        subject: 'Feed Formulation Advice',
        description: 'Need help optimizing feed ratios for both broiler chickens and growing pigs to reduce costs.',
        status: 'pending',
        priority: 'medium',
        createdAt: new Date(Date.now() - 75 * 60000).toISOString(),
        estimatedDuration: 35,
        category: 'Nutrition',
        animalType: 'both',
        issueType: 'nutrition',
        urgency: 'normal'
      },
      {
        id: '6',
        farmerName: 'System Admin',
        farmerId: 'admin-003',
        requestType: 'admin',
        subject: 'Monthly Poultry Health Report',
        description: 'Review and approve monthly poultry health statistics and outbreak predictions.',
        status: 'pending',
        priority: 'medium',
        createdAt: new Date(Date.now() - 90 * 60000).toISOString(),
        estimatedDuration: 40,
        category: 'Reporting',
        animalType: 'chicken',
        issueType: 'other',
        urgency: 'normal'
      },
      {
        id: '7',
        farmerName: 'Anita Pig Farm',
        farmerId: 'farmer-126',
        requestType: 'farmer',
        subject: 'Breeding Program Optimization',
        description: 'Looking to improve pig breeding efficiency and litter sizes. Need expert guidance.',
        status: 'pending',
        priority: 'low',
        createdAt: new Date(Date.now() - 120 * 60000).toISOString(),
        estimatedDuration: 25,
        category: 'Breeding',
        animalType: 'pig',
        issueType: 'breeding',
        urgency: 'normal'
      }
    ];
    setRequests(mockRequests);
  }, []);

  const filteredRequests = requests.filter(request => 
    filter === 'all' || request.requestType === filter
  );

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    // First sort by priority (high first)
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    
    // Then sort by request type (admin first)
    if (a.requestType !== b.requestType) {
      return a.requestType === 'admin' ? -1 : 1;
    }
    
    // Finally sort by creation time (oldest first)
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  const stats: ConsultationStats = {
    total: requests.length,
    admin: requests.filter(r => r.requestType === 'admin').length,
    farmer: requests.filter(r => r.requestType === 'farmer').length,
    highPriority: requests.filter(r => r.priority === 'high').length,
    criticalHealth: requests.filter(r => r.urgency === 'critical').length
  };

  const getAnimalIcon = (animalType: string) => {
    switch (animalType) {
      case 'chicken': return '🐔';
      case 'pig': return '🐖';
      case 'both': return '🐔🐖';
      default: return '🐾';
    }
  };

  const getIssueIcon = (issueType: string) => {
    switch (issueType) {
      case 'health': return '🏥';
      case 'nutrition': return '🍎';
      case 'housing': return '🏠';
      case 'breeding': return '🔬';
      default: return '📋';
    }
  };

  const handleStartConsultation = (requestId: string) => {
    console.log(`Starting consultation for request ${requestId}`);
    // Implement consultation start logic
  };

  const formatTimeAgo = (dateString: string) => {
    const minutes = Math.round((Date.now() - new Date(dateString).getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 min ago';
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="consultation-queue">
      <div className="queue-header">
        <h2>Poultry & Livestock Consultation Queue</h2>
        <div style={{ fontSize: '0.9rem', color: '#718096' }}>
          Expert ID: {expertId}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="queue-stats">
        <div className="stat-card admin">
          <div className="stat-label">Admin Requests</div>
          <div className="stat-value">{stats.admin}</div>
        </div>
        
        <div className="stat-card farmer">
          <div className="stat-label">Farmer Requests</div>
          <div className="stat-value">{stats.farmer}</div>
        </div>

        <div className="stat-card priority">
          <div className="stat-label">High Priority</div>
          <div className="stat-value">{stats.highPriority}</div>
        </div>

        <div className="stat-card priority">
          <div className="stat-label">Critical Health</div>
          <div className="stat-value">{stats.criticalHealth}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="filter-section">
        <div className="filter-buttons">
          <span className="filter-label">Filter by:</span>
          {(['all', 'admin', 'farmer'] as const).map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`filter-btn ${type} ${filter === type ? 'active' : ''}`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      <div className="requests-list">
        {sortedRequests.length === 0 ? (
          <div className="empty-state">
            No consultation requests found
          </div>
        ) : (
          sortedRequests.map((request, index) => (
            <div
              key={request.id}
              className={`request-item ${selectedRequest?.id === request.id ? 'selected' : ''}`}
              onClick={() => setSelectedRequest(request)}
            >
              <div className="request-header">
                <div className="request-badges">
                  <span className={`badge badge-type ${request.requestType}`}>
                    {request.requestType.toUpperCase()}
                  </span>
                  <span className={`badge badge-priority ${request.priority}`}>
                    {request.priority.toUpperCase()}
                  </span>
                  <span className="animal-type">
                    {getAnimalIcon(request.animalType)} {request.animalType}
                  </span>
                  <span className="animal-type">
                    {getIssueIcon(request.issueType)} {request.issueType}
                  </span>
                </div>
                
                <div className="request-time">
                  {formatTimeAgo(request.createdAt)}
                </div>
              </div>
              
              <h3 className="request-title">
                {request.subject}
              </h3>
              
              <p className="request-description">
                {request.description}
              </p>
              
              <div className="request-meta">
                <span className="meta-item">
                  <strong>From:</strong> {request.farmerName}
                </span>
                <span className="meta-item">
                  <strong>Category:</strong> {request.category}
                </span>
                <span className="meta-item">
                  <strong>Duration:</strong> ~{request.estimatedDuration} min
                </span>
                <span className="meta-item">
                  <strong>Urgency:</strong> {request.urgency}
                </span>
              </div>
              
              <div className="request-actions">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartConsultation(request.id);
                  }}
                  className="start-btn"
                >
                  Start Consultation
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}