// src/components/AdminUserManagement.tsx
"use client";

import React, { useState, useEffect } from 'react';
import './AdminUserManagement.css';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'farmer' | 'veterinarian' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  registrationDate: string;
  lastLogin?: string;
  farmCount?: number;
  specialization?: string;
  licenseNumber?: string;
  address: string;
  region: string;
  totalAnimals?: number;
  casesHandled?: number;
  rating?: number;
}

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  farmers: number;
  veterinarians: number;
  admins: number;
  suspendedUsers: number;
}

const AdminUserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newUser, setNewUser] = useState<Partial<User>>({
    role: 'farmer',
    status: 'active'
  });
  const [stats, setStats] = useState<UserStats>({
    totalUsers: 0,
    activeUsers: 0,
    farmers: 0,
    veterinarians: 0,
    admins: 0,
    suspendedUsers: 0
  });
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserForm, setShowUserForm] = useState(false);

  // Mock data for users
  const mockUsers: User[] = [
    {
      id: 'USER_001',
      name: 'Rajesh Kumar',
      email: 'rajesh@greenvalleyfarms.com',
      phone: '+91 9876543210',
      role: 'farmer',
      status: 'active',
      registrationDate: '2023-05-15',
      lastLogin: '2024-02-15T10:30:00',
      farmCount: 2,
      address: 'Green Valley Farms, Pune, Maharashtra',
      region: 'Western Maharashtra',
      totalAnimals: 1250
    },
    {
      id: 'USER_002',
      name: 'Dr. Priya Sharma',
      email: 'priya.sharma@vetcare.com',
      phone: '+91 8765432109',
      role: 'veterinarian',
      status: 'active',
      registrationDate: '2023-03-20',
      lastLogin: '2024-02-15T09:15:00',
      specialization: 'Poultry Health',
      licenseNumber: 'VET-MH-2023-0456',
      address: 'VetCare Clinic, Mumbai, Maharashtra',
      region: 'Mumbai Metropolitan',
      casesHandled: 47,
      rating: 4.8
    },
    {
      id: 'USER_003',
      name: 'Amit Patel',
      email: 'amit@happypigfarms.com',
      phone: '+91 7654321098',
      role: 'farmer',
      status: 'active',
      registrationDate: '2023-08-10',
      lastLogin: '2024-02-14T16:45:00',
      farmCount: 1,
      address: 'Happy Pig Farms, Ahmedabad, Gujarat',
      region: 'Central Gujarat',
      totalAnimals: 800
    },
    {
      id: 'USER_004',
      name: 'Dr. Sanjay Mehta',
      email: 'sanjay.mehta@animalhealth.org',
      phone: '+91 6543210987',
      role: 'veterinarian',
      status: 'inactive',
      registrationDate: '2023-01-15',
      lastLogin: '2024-01-20T14:20:00',
      specialization: 'Swine Medicine',
      licenseNumber: 'VET-GJ-2022-0789',
      address: 'Animal Health Center, Vadodara, Gujarat',
      region: 'South Gujarat',
      casesHandled: 32,
      rating: 4.6
    },
    {
      id: 'USER_005',
      name: 'System Administrator',
      email: 'admin@digiagro.gov',
      phone: '+91 9123456780',
      role: 'admin',
      status: 'active',
      registrationDate: '2023-01-01',
      lastLogin: '2024-02-15T11:30:00',
      address: 'Department of Animal Husbandry, New Delhi',
      region: 'National Capital Region'
    },
    {
      id: 'USER_006',
      name: 'Laxmi Devi',
      email: 'laxmi@sunrisepoultry.com',
      phone: '+91 9432109876',
      role: 'farmer',
      status: 'suspended',
      registrationDate: '2023-06-25',
      lastLogin: '2024-01-10T08:15:00',
      farmCount: 1,
      address: 'Sunrise Poultry Farm, Hyderabad, Telangana',
      region: 'Telangana',
      totalAnimals: 500
    },
    {
      id: 'USER_007',
      name: 'Dr. Arjun Reddy',
      email: 'arjun.reddy@vetexpert.com',
      phone: '+91 8321098765',
      role: 'veterinarian',
      status: 'active',
      registrationDate: '2023-04-12',
      lastLogin: '2024-02-15T08:45:00',
      specialization: 'Mixed Practice',
      licenseNumber: 'VET-TS-2023-0123',
      address: 'VetExpert Clinic, Hyderabad, Telangana',
      region: 'Telangana',
      casesHandled: 65,
      rating: 4.9
    }
  ];

  useEffect(() => {
    // Simulate API call
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
    calculateStats(mockUsers);
  }, []);

  useEffect(() => {
    let filtered = users;

    if (filterRole !== 'all') {
      filtered = filtered.filter(user => user.role === filterRole);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(user => user.status === filterStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm) ||
        user.region.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
    calculateStats(filtered);
  }, [filterRole, filterStatus, searchTerm, users]);

  const calculateStats = (userList: User[]) => {
    const totalUsers = userList.length;
    const activeUsers = userList.filter(user => user.status === 'active').length;
    const farmers = userList.filter(user => user.role === 'farmer').length;
    const veterinarians = userList.filter(user => user.role === 'veterinarian').length;
    const admins = userList.filter(user => user.role === 'admin').length;
    const suspendedUsers = userList.filter(user => user.status === 'suspended').length;

    setStats({
      totalUsers,
      activeUsers,
      farmers,
      veterinarians,
      admins,
      suspendedUsers
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'farmer': return 'role-farmer';
      case 'veterinarian': return 'role-veterinarian';
      case 'admin': return 'role-admin';
      default: return 'role-default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'status-active';
      case 'inactive': return 'status-inactive';
      case 'suspended': return 'status-suspended';
      default: return 'status-default';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'farmer': return '👨‍🌾';
      case 'veterinarian': return '👨‍⚕️';
      case 'admin': return '👨‍💼';
      default: return '👤';
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'farmer': return 'Farmer';
      case 'veterinarian': return 'Veterinarian';
      case 'admin': return 'Administrator';
      default: return role;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.phone) {
      alert('Please fill in all required fields');
      return;
    }

    const user: User = {
      id: `USER_${Date.now()}`,
      name: newUser.name!,
      email: newUser.email!,
      phone: newUser.phone!,
      role: newUser.role!,
      status: newUser.status!,
      registrationDate: new Date().toISOString().split('T')[0],
      address: newUser.address || '',
      region: newUser.region || '',
      specialization: newUser.specialization,
      licenseNumber: newUser.licenseNumber,
      farmCount: newUser.farmCount || 0,
      totalAnimals: newUser.totalAnimals || 0
    };

    setUsers(prev => [...prev, user]);
    setNewUser({ role: 'farmer', status: 'active' });
    setShowUserForm(false);
    alert('User added successfully!');
  };

  const handleUpdateUser = () => {
    if (!selectedUser) return;

    setUsers(prev => prev.map(user => 
      user.id === selectedUser.id ? { ...user, ...newUser } : user
    ));
    setIsEditing(false);
    setSelectedUser(null);
    alert('User updated successfully!');
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
      setSelectedUser(null);
      alert('User deleted successfully!');
    }
  };

  const handleStatusChange = (userId: string, newStatus: User['status']) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    alert(`User status updated to ${newStatus}`);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setNewUser(user);
    setIsEditing(true);
  };

  const exportUserData = () => {
    const csvContent = [
      ['ID', 'Name', 'Email', 'Phone', 'Role', 'Status', 'Registration Date', 'Region', 'Specialization', 'Farm Count', 'Total Animals'],
      ...filteredUsers.map(user => [
        user.id,
        user.name,
        user.email,
        user.phone,
        user.role,
        user.status,
        user.registrationDate,
        user.region,
        user.specialization || '',
        user.farmCount?.toString() || '',
        user.totalAnimals?.toString() || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="admin-user-management">
      <div className="admin-header">
        <h1>User Management</h1>
        <p>Manage farmers, veterinarians, and administrators across the platform</p>
      </div>

      {/* Statistics Overview */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalUsers}</div>
            <div className="stat-label">Total Users</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-number">{stats.activeUsers}</div>
            <div className="stat-label">Active Users</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👨‍🌾</div>
          <div className="stat-content">
            <div className="stat-number">{stats.farmers}</div>
            <div className="stat-label">Farmers</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👨‍⚕️</div>
          <div className="stat-content">
            <div className="stat-number">{stats.veterinarians}</div>
            <div className="stat-label">Veterinarians</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👨‍💼</div>
          <div className="stat-content">
            <div className="stat-number">{stats.admins}</div>
            <div className="stat-label">Admins</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏸️</div>
          <div className="stat-content">
            <div className="stat-number">{stats.suspendedUsers}</div>
            <div className="stat-label">Suspended</div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="action-bar">
        <div className="search-filters">
          <input
            type="text"
            placeholder="Search users by name, email, phone, or region..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Roles</option>
            <option value="farmer">Farmers</option>
            <option value="veterinarian">Veterinarians</option>
            <option value="admin">Administrators</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
        <div className="action-buttons">
          <button 
            className="btn-primary"
            onClick={() => setShowUserForm(true)}
          >
            + Add New User
          </button>
          <button 
            className="btn-secondary"
            onClick={exportUserData}
          >
            📊 Export Data
          </button>
        </div>
      </div>

      <div className="user-content">
        {/* Users List */}
        <div className="users-section">
          <h2>Users ({filteredUsers.length})</h2>
          <div className="users-list">
            {filteredUsers.length === 0 ? (
              <div className="empty-state">
                No users found matching your criteria.
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className={`user-card ${selectedUser?.id === user.id ? 'selected' : ''}`}
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="user-header">
                    <div className="user-avatar">
                      <span className="avatar-icon">{getRoleIcon(user.role)}</span>
                    </div>
                    <div className="user-info">
                      <h3>{user.name}</h3>
                      <p className="user-email">{user.email}</p>
                    </div>
                    <div className="user-meta">
                      <span className={`role-badge ${getRoleColor(user.role)}`}>
                        {getRoleDisplayName(user.role)}
                      </span>
                      <span className={`status-badge ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </div>
                  </div>

                  <div className="user-details">
                    <div className="detail-row">
                      <span className="detail-label">Phone:</span>
                      <span className="detail-value">{user.phone}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Region:</span>
                      <span className="detail-value">{user.region}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Registered:</span>
                      <span className="detail-value">{formatDate(user.registrationDate)}</span>
                    </div>
                    
                    {user.role === 'farmer' && (
                      <div className="detail-row">
                        <span className="detail-label">Farms/Animals:</span>
                        <span className="detail-value">
                          {user.farmCount} farm(s) • {user.totalAnimals} animals
                        </span>
                      </div>
                    )}

                    {user.role === 'veterinarian' && (
                      <div className="detail-row">
                        <span className="detail-label">Specialization:</span>
                        <span className="detail-value">{user.specialization}</span>
                      </div>
                    )}
                  </div>

                  <div className="user-actions">
                    <button 
                      className="action-btn edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditUser(user);
                      }}
                    >
                      Edit
                    </button>
                    <button 
                      className="action-btn suspend"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newStatus = user.status === 'suspended' ? 'active' : 'suspended';
                        handleStatusChange(user.id, newStatus);
                      }}
                    >
                      {user.status === 'suspended' ? 'Activate' : 'Suspend'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* User Details / Edit Form */}
        <div className="user-details-section">
          {isEditing ? (
            <div className="edit-user-form">
              <h2>Edit User</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    value={newUser.name || ''}
                    onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    value={newUser.email || ''}
                    onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    value={newUser.phone || ''}
                    onChange={(e) => setNewUser(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value as User['role'] }))}
                  >
                    <option value="farmer">Farmer</option>
                    <option value="veterinarian">Veterinarian</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={newUser.status}
                    onChange={(e) => setNewUser(prev => ({ ...prev, status: e.target.value as User['status'] }))}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    value={newUser.address || ''}
                    onChange={(e) => setNewUser(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter address"
                  />
                </div>
                <div className="form-group">
                  <label>Region</label>
                  <input
                    type="text"
                    value={newUser.region || ''}
                    onChange={(e) => setNewUser(prev => ({ ...prev, region: e.target.value }))}
                    placeholder="Enter region"
                  />
                </div>
                {newUser.role === 'veterinarian' && (
                  <>
                    <div className="form-group">
                      <label>Specialization</label>
                      <input
                        type="text"
                        value={newUser.specialization || ''}
                        onChange={(e) => setNewUser(prev => ({ ...prev, specialization: e.target.value }))}
                        placeholder="e.g., Poultry Health, Swine Medicine"
                      />
                    </div>
                    <div className="form-group">
                      <label>License Number</label>
                      <input
                        type="text"
                        value={newUser.licenseNumber || ''}
                        onChange={(e) => setNewUser(prev => ({ ...prev, licenseNumber: e.target.value }))}
                        placeholder="Enter license number"
                      />
                    </div>
                  </>
                )}
                {newUser.role === 'farmer' && (
                  <>
                    <div className="form-group">
                      <label>Farm Count</label>
                      <input
                        type="number"
                        value={newUser.farmCount || 0}
                        onChange={(e) => setNewUser(prev => ({ ...prev, farmCount: parseInt(e.target.value) }))}
                        placeholder="Number of farms"
                      />
                    </div>
                    <div className="form-group">
                      <label>Total Animals</label>
                      <input
                        type="number"
                        value={newUser.totalAnimals || 0}
                        onChange={(e) => setNewUser(prev => ({ ...prev, totalAnimals: parseInt(e.target.value) }))}
                        placeholder="Total number of animals"
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="form-actions">
                <button className="btn-primary" onClick={handleUpdateUser}>
                  Update User
                </button>
                <button 
                  className="btn-secondary"
                  onClick={() => {
                    setIsEditing(false);
                    setSelectedUser(null);
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="btn-danger"
                  onClick={() => selectedUser && handleDeleteUser(selectedUser.id)}
                >
                  Delete User
                </button>
              </div>
            </div>
          ) : selectedUser ? (
            <div className="user-detail-card">
              <div className="detail-header">
                <div className="user-avatar-large">
                  <span className="avatar-icon">{getRoleIcon(selectedUser.role)}</span>
                </div>
                <div className="user-title">
                  <h2>{selectedUser.name}</h2>
                  <p>{selectedUser.email}</p>
                </div>
                <div className="user-status">
                  <span className={`role-badge ${getRoleColor(selectedUser.role)}`}>
                    {getRoleDisplayName(selectedUser.role)}
                  </span>
                  <span className={`status-badge ${getStatusColor(selectedUser.status)}`}>
                    {selectedUser.status}
                  </span>
                </div>
              </div>

              <div className="detail-content">
                <div className="detail-section">
                  <h3>Contact Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Phone:</label>
                      <span>{selectedUser.phone}</span>
                    </div>
                    <div className="info-item">
                      <label>Address:</label>
                      <span>{selectedUser.address}</span>
                    </div>
                    <div className="info-item">
                      <label>Region:</label>
                      <span>{selectedUser.region}</span>
                    </div>
                    <div className="info-item">
                      <label>Registration Date:</label>
                      <span>{formatDate(selectedUser.registrationDate)}</span>
                    </div>
                    {selectedUser.lastLogin && (
                      <div className="info-item">
                        <label>Last Login:</label>
                        <span>{formatDate(selectedUser.lastLogin)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {selectedUser.role === 'farmer' && (
                  <div className="detail-section">
                    <h3>Farm Information</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <label>Number of Farms:</label>
                        <span>{selectedUser.farmCount}</span>
                      </div>
                      <div className="info-item">
                        <label>Total Animals:</label>
                        <span>{selectedUser.totalAnimals}</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedUser.role === 'veterinarian' && (
                  <div className="detail-section">
                    <h3>Professional Information</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <label>Specialization:</label>
                        <span>{selectedUser.specialization}</span>
                      </div>
                      <div className="info-item">
                        <label>License Number:</label>
                        <span>{selectedUser.licenseNumber}</span>
                      </div>
                      <div className="info-item">
                        <label>Cases Handled:</label>
                        <span>{selectedUser.casesHandled}</span>
                      </div>
                      {selectedUser.rating && (
                        <div className="info-item">
                          <label>Rating:</label>
                          <span>⭐ {selectedUser.rating}/5</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="detail-actions">
                  <button 
                    className="btn-primary"
                    onClick={() => handleEditUser(selectedUser)}
                  >
                    Edit User
                  </button>
                  <button 
                    className="btn-secondary"
                    onClick={() => {
                      const newStatus = selectedUser.status === 'suspended' ? 'active' : 'suspended';
                      handleStatusChange(selectedUser.id, newStatus);
                    }}
                  >
                    {selectedUser.status === 'suspended' ? 'Activate User' : 'Suspend User'}
                  </button>
                  <button 
                    className="btn-danger"
                    onClick={() => handleDeleteUser(selectedUser.id)}
                  >
                    Delete User
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-user-selected">
              <div className="placeholder-icon">👥</div>
              <h3>Select a User</h3>
              <p>Choose a user from the list to view detailed information and manage their account</p>
            </div>
          )}
        </div>
      </div>

      {/* Add User Modal */}
      {showUserForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New User</h2>
              <button 
                className="close-btn"
                onClick={() => setShowUserForm(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    value={newUser.name || ''}
                    onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    value={newUser.email || ''}
                    onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    value={newUser.phone || ''}
                    onChange={(e) => setNewUser(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value as User['role'] }))}
                  >
                    <option value="farmer">Farmer</option>
                    <option value="veterinarian">Veterinarian</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={newUser.status}
                    onChange={(e) => setNewUser(prev => ({ ...prev, status: e.target.value as User['status'] }))}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    value={newUser.address || ''}
                    onChange={(e) => setNewUser(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter address"
                  />
                </div>
                <div className="form-group">
                  <label>Region</label>
                  <input
                    type="text"
                    value={newUser.region || ''}
                    onChange={(e) => setNewUser(prev => ({ ...prev, region: e.target.value }))}
                    placeholder="Enter region"
                  />
                </div>
                {newUser.role === 'veterinarian' && (
                  <>
                    <div className="form-group">
                      <label>Specialization</label>
                      <input
                        type="text"
                        value={newUser.specialization || ''}
                        onChange={(e) => setNewUser(prev => ({ ...prev, specialization: e.target.value }))}
                        placeholder="e.g., Poultry Health, Swine Medicine"
                      />
                    </div>
                    <div className="form-group">
                      <label>License Number</label>
                      <input
                        type="text"
                        value={newUser.licenseNumber || ''}
                        onChange={(e) => setNewUser(prev => ({ ...prev, licenseNumber: e.target.value }))}
                        placeholder="Enter license number"
                      />
                    </div>
                  </>
                )}
                {newUser.role === 'farmer' && (
                  <>
                    <div className="form-group">
                      <label>Farm Count</label>
                      <input
                        type="number"
                        value={newUser.farmCount || 0}
                        onChange={(e) => setNewUser(prev => ({ ...prev, farmCount: parseInt(e.target.value) }))}
                        placeholder="Number of farms"
                      />
                    </div>
                    <div className="form-group">
                      <label>Total Animals</label>
                      <input
                        type="number"
                        value={newUser.totalAnimals || 0}
                        onChange={(e) => setNewUser(prev => ({ ...prev, totalAnimals: parseInt(e.target.value) }))}
                        placeholder="Total number of animals"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-primary" onClick={handleAddUser}>
                Add User
              </button>
              <button 
                className="btn-secondary"
                onClick={() => setShowUserForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;