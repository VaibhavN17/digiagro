// src/components/PaymentModule.tsx
"use client";

import { useState, useEffect } from 'react';

interface Bill {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  category: 'veterinary' | 'feed' | 'equipment' | 'consultation' | 'other';
}

interface Payment {
  id: string;
  billId: string;
  amount: number;
  date: string;
  method: 'card' | 'bank_transfer' | 'upi' | 'cash';
  status: 'completed' | 'failed' | 'pending';
}

export default function PaymentModule({ farmerId }: { farmerId: string }) {
  const [bills, setBills] = useState<Bill[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank_transfer' | 'upi' | 'cash'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockBills: Bill[] = [
      {
        id: '1',
        description: 'Veterinary Consultation - Dr. Sharma',
        amount: 2500,
        dueDate: '2024-01-15',
        status: 'pending',
        category: 'veterinary'
      },
      {
        id: '2',
        description: 'Animal Feed - Premium Mix',
        amount: 8500,
        dueDate: '2024-01-20',
        status: 'pending',
        category: 'feed'
      },
      {
        id: '3',
        description: 'Medical Supplies - Vaccines',
        amount: 1500,
        dueDate: '2024-01-10',
        status: 'overdue',
        category: 'veterinary'
      },
      {
        id: '4',
        description: 'Equipment Maintenance',
        amount: 3200,
        dueDate: '2024-02-01',
        status: 'pending',
        category: 'equipment'
      }
    ];

    const mockPayments: Payment[] = [
      {
        id: 'p1',
        billId: '5',
        amount: 1800,
        date: '2024-01-05',
        method: 'upi',
        status: 'completed'
      },
      {
        id: 'p2',
        billId: '6',
        amount: 4500,
        date: '2024-01-02',
        method: 'bank_transfer',
        status: 'completed'
      }
    ];

    setBills(mockBills);
    setPayments(mockPayments);
  }, [farmerId]);

  const handlePayBill = (bill: Bill) => {
    setSelectedBill(bill);
    setShowPaymentModal(true);
  };

  const processPayment = async () => {
    if (!selectedBill) return;

    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update bill status
    setBills(prev => prev.map(bill => 
      bill.id === selectedBill.id ? { ...bill, status: 'paid' } : bill
    ));
    
    // Add to payment history
    const newPayment: Payment = {
      id: `p${Date.now()}`,
      billId: selectedBill.id,
      amount: selectedBill.amount,
      date: new Date().toISOString().split('T')[0],
      method: paymentMethod,
      status: 'completed'
    };
    
    setPayments(prev => [newPayment, ...prev]);
    setIsProcessing(false);
    setShowPaymentModal(false);
    setSelectedBill(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return '#27ae60';
      case 'pending': return '#f39c12';
      case 'overdue': return '#e74c3c';
      default: return '#6c757d';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'veterinary': return '🏥';
      case 'feed': return '🌾';
      case 'equipment': return '🔧';
      case 'consultation': return '👨‍⚕️';
      default: return '📄';
    }
  };

  const totalPending = bills.filter(bill => bill.status === 'pending' || bill.status === 'overdue')
    .reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#2d5016' }}>Payment Management</h2>
      
      {/* Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #e74c3c'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#495057', fontSize: '14px' }}>Total Due</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#e74c3c', margin: 0 }}>
            ₹{totalPending.toLocaleString()}
          </p>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #f39c12'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#495057', fontSize: '14px' }}>Pending Bills</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#f39c12', margin: 0 }}>
            {bills.filter(bill => bill.status === 'pending').length}
          </p>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #e74c3c'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#495057', fontSize: '14px' }}>Overdue</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#e74c3c', margin: 0 }}>
            {bills.filter(bill => bill.status === 'overdue').length}
          </p>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #27ae60'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#495057', fontSize: '14px' }}>Paid This Month</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#27ae60', margin: 0 }}>
            ₹{payments.reduce((sum, payment) => sum + payment.amount, 0).toLocaleString()}
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Pending Bills Section */}
        <div>
          <h3 style={{ marginBottom: '15px', color: '#2d5016' }}>Pending Bills</h3>
          <div style={{
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            {bills.filter(bill => bill.status !== 'paid').length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: '#6c757d' }}>
                No pending bills
              </div>
            ) : (
              bills.filter(bill => bill.status !== 'paid').map(bill => (
                <div key={bill.id} style={{
                  padding: '15px 20px',
                  borderBottom: '1px solid #dee2e6',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '18px' }}>{getCategoryIcon(bill.category)}</span>
                    <div>
                      <div style={{ fontWeight: '500', color: '#495057' }}>
                        {bill.description}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6c757d' }}>
                        Due: {new Date(bill.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ 
                      fontWeight: 'bold', 
                      color: '#2d5016',
                      marginBottom: '5px'
                    }}>
                      ₹{bill.amount.toLocaleString()}
                    </div>
                    <div style={{
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: '500',
                      background: getStatusColor(bill.status),
                      color: 'white',
                      display: 'inline-block'
                    }}>
                      {bill.status.toUpperCase()}
                    </div>
                  </div>
                  <button
                    onClick={() => handlePayBill(bill)}
                    style={{
                      padding: '8px 16px',
                      background: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}
                  >
                    Pay Now
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Payment History Section */}
        <div>
          <h3 style={{ marginBottom: '15px', color: '#2d5016' }}>Payment History</h3>
          <div style={{
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            {payments.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: '#6c757d' }}>
                No payment history
              </div>
            ) : (
              payments.map(payment => (
                <div key={payment.id} style={{
                  padding: '15px 20px',
                  borderBottom: '1px solid #dee2e6'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontWeight: '500', color: '#495057' }}>
                      Payment #{payment.id}
                    </span>
                    <span style={{ 
                      fontWeight: 'bold', 
                      color: '#27ae60'
                    }}>
                      ₹{payment.amount.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6c757d' }}>
                    <span>
                      {new Date(payment.date).toLocaleDateString()} • 
                      {payment.method.replace('_', ' ').toUpperCase()}
                    </span>
                    <span style={{
                      color: payment.status === 'completed' ? '#27ae60' : 
                            payment.status === 'failed' ? '#e74c3c' : '#f39c12'
                    }}>
                      {payment.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedBill && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
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
            maxWidth: '400px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ marginBottom: '20px', color: '#2d5016' }}>Complete Payment</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ 
                padding: '15px', 
                background: '#f8f9fa', 
                borderRadius: '6px',
                marginBottom: '15px'
              }}>
                <div style={{ fontWeight: '500', marginBottom: '5px' }}>
                  {selectedBill.description}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2d5016' }}>
                  ₹{selectedBill.amount.toLocaleString()}
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  <option value="upi">UPI</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="cash">Cash</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowPaymentModal(false)}
                style={{
                  padding: '10px 20px',
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={processPayment}
                disabled={isProcessing}
                style={{
                  padding: '10px 20px',
                  background: isProcessing ? '#6c757d' : '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isProcessing ? 'not-allowed' : 'pointer'
                }}
              >
                {isProcessing ? 'Processing...' : 'Confirm Payment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}