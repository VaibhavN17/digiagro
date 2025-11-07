"use client";

import { useEffect, useState } from "react";

interface Bill {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: "pending" | "paid" | "overdue";
  category: "veterinary" | "feed" | "equipment" | "consultation" | "other";
}

interface Payment {
  id: string;
  billId: string;
  amount: number;
  date: string;
  method: "card" | "bank_transfer" | "upi" | "cash";
  status: "completed" | "failed" | "pending";
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentModule({ farmerId }: { farmerId: string }) {
  const [bills, setBills] = useState<Bill[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "bank_transfer" | "upi" | "cash"
  >("upi");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Load Razorpay checkout script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Mock data (replace with API calls)
  useEffect(() => {
    const mockBills: Bill[] = [
      {
        id: "1",
        description: "Veterinary Consultation - Dr. Sharma",
        amount: 2500,
        dueDate: "2024-01-15",
        status: "pending",
        category: "veterinary",
      },
      {
        id: "2",
        description: "Animal Feed - Premium Mix",
        amount: 8500,
        dueDate: "2024-01-20",
        status: "pending",
        category: "feed",
      },
      {
        id: "3",
        description: "Medical Supplies - Vaccines",
        amount: 1500,
        dueDate: "2024-01-10",
        status: "overdue",
        category: "veterinary",
      },
       {
        id: "4",
        description: "for testing payment",
        amount: 1,
        dueDate: "2024-01-20",
        status: "pending",
        category: "feed",
      },
    ];

    const mockPayments: Payment[] = [
      {
        id: "p1",
        billId: "5",
        amount: 1800,
        date: "2024-01-05",
        method: "upi",
        status: "completed",
      },
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

    try {
      // Create Razorpay order from backend
      const res = await fetch("/api/payment/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: selectedBill.amount }),
      });

      const order = await res.json();
      if (!order.id) throw new Error("Failed to create payment order");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "DigiFarm",
        description: selectedBill.description,
        order_id: order.id,
        handler: async (response: any) => {
          const newPayment: Payment = {
            id: response.razorpay_payment_id,
            billId: selectedBill.id,
            amount: selectedBill.amount,
            date: new Date().toISOString().split("T")[0],
            method: paymentMethod,
            status: "completed",
          };

          // Update UI
          setBills((prev) =>
            prev.map((b) =>
              b.id === selectedBill.id ? { ...b, status: "paid" } : b
            )
          );
          setPayments((prev) => [newPayment, ...prev]);
          setShowPaymentModal(false);
          setSelectedBill(null);
          setIsProcessing(false);
        },
        prefill: {
          name: "Vaibhav More",
          email: "vaibhav@example.com",
          contact: "9999999999",
        },
        theme: { color: "#28a745" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong during payment!");
      setIsProcessing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "#27ae60";
      case "pending":
        return "#f39c12";
      case "overdue":
        return "#e74c3c";
      default:
        return "#6c757d";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "veterinary":
        return "🏥";
      case "feed":
        return "🌾";
      case "equipment":
        return "🔧";
      case "consultation":
        return "👨‍⚕️";
      default:
        return "📄";
    }
  };

  const totalPending = bills
    .filter((bill) => bill.status !== "paid")
    .reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <div>
      <h2 style={{ marginBottom: "20px", color: "#2d5016" }}>
        Payment Management
      </h2>

      {/* Pending Bills */}
      <div>
        <h3 style={{ color: "#2d5016" }}>Pending Bills</h3>
        <div style={{ background: "white", borderRadius: "8px" }}>
          {bills.filter((b) => b.status !== "paid").map((bill) => (
            <div
              key={bill.id}
              style={{
                borderBottom: "1px solid #ccc",
                padding: "15px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <strong>{bill.description}</strong>
                <div>₹{bill.amount}</div>
                <div style={{ fontSize: "12px" }}>
                  Due: {new Date(bill.dueDate).toLocaleDateString()}
                </div>
              </div>
              <button
                onClick={() => handlePayBill(bill)}
                style={{
                  padding: "8px 16px",
                  background: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Pay Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedBill && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "400px",
            }}
          >
            <h3 style={{ marginBottom: "20px", color: "#2d5016" }}>
              Complete Payment
            </h3>

            <div style={{ marginBottom: "15px" }}>
              <div style={{ fontWeight: "500", marginBottom: "5px" }}>
                {selectedBill.description}
              </div>
              <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                ₹{selectedBill.amount.toLocaleString()}
              </div>
            </div>

            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as any)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #dee2e6",
                borderRadius: "4px",
              }}
            >
              <option value="upi">UPI</option>
              <option value="card">Credit/Debit Card</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="cash">Cash</option>
            </select>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
              <button
                onClick={() => setShowPaymentModal(false)}
                style={{
                  padding: "10px 20px",
                  background: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  marginRight: "10px",
                }}
              >
                Cancel
              </button>
              <button
                onClick={processPayment}
                disabled={isProcessing}
                style={{
                  padding: "10px 20px",
                  background: isProcessing ? "#6c757d" : "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                {isProcessing ? "Processing..." : "Confirm Payment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
