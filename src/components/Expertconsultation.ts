// types/consultation.ts
export interface ConsultationRequest {
  id: string;
  farmerName: string;
  farmerId: string;
  requestType: 'admin' | 'farmer';
  subject: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
  estimatedDuration: number;
  category: string;
  animalType: 'chicken' | 'pig' | 'both' | 'other';
  issueType: 'health' | 'nutrition' | 'housing' | 'breeding' | 'other';
  urgency: 'critical' | 'urgent' | 'normal';
}

export interface ConsultationStats {
  total: number;
  admin: number;
  farmer: number;
  highPriority: number;
  criticalHealth: number;
}