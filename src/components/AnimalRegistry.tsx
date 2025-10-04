"use client";

import React, { useState, useEffect } from 'react';
import './AnimalRegistry.css';

interface Animal {
  id: string;
  rfid: string;
  name: string;
  species: 'poultry' | 'swine';
  breed: string;
  age: number;
  weight: number;
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
  lastVaccination: string;
  nextVaccination: string;
  temperature?: number;
  feedIntake?: number;
  productionData?: {
    eggsPerDay?: number;
    eggQuality?: 'A' | 'B' | 'C';
    litterSize?: number;
    weaningAge?: number;
    growthRate?: number;
  };
  location: string;
}

const AnimalRegistry: React.FC<{ farmerId: string }> = ({ farmerId }) => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<string>('all');
  const [selectedHealth, setSelectedHealth] = useState<string>('all');
  const [isScanning, setIsScanning] = useState(false);
  const [newAnimal, setNewAnimal] = useState<Partial<Animal>>({
    species: 'poultry',
    healthStatus: 'good',
    productionData: {}
  });

  // Mock data
  const mockAnimals: Animal[] = [
    {
      id: '1',
      rfid: 'RFID_CHK_001',
      name: 'Goldie',
      species: 'poultry',
      breed: 'Kadaknath',
      age: 8,
      weight: 1.8,
      healthStatus: 'excellent',
      lastVaccination: '2024-02-01',
      nextVaccination: '2024-08-01',
      temperature: 41.5,
      feedIntake: 0.12,
      productionData: { eggsPerDay: 5, eggQuality: 'A' },
      location: 'Coop A-1'
    },
    {
      id: '2',
      rfid: 'RFID_CHK_002',
      name: 'Spotty',
      species: 'poultry',
      breed: 'Rhode Island Red',
      age: 12,
      weight: 2.2,
      healthStatus: 'good',
      lastVaccination: '2024-01-28',
      nextVaccination: '2024-07-28',
      productionData: { eggsPerDay: 6, eggQuality: 'A' },
      location: 'Coop A-2'
    },
    {
      id: '3',
      rfid: 'RFID_CHK_003',
      name: 'Porky',
      species: 'poultry',
      breed: 'Large White',
      age: 0.2,
      weight: 180,
      healthStatus: 'good',
      lastVaccination: '2024-01-20',
      nextVaccination: '2024-07-20',
      temperature: 38.5,
      feedIntake: 3.2,
      productionData: { growthRate: 0.8, litterSize: 8 },
      location: 'Pen B-1'
    }
  ];

  useEffect(() => {
    setAnimals(mockAnimals);
    setFilteredAnimals(mockAnimals);
  }, []);

  useEffect(() => {
    let filtered = animals;
    if (searchTerm) {
      filtered = filtered.filter(animal =>
        animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.rfid.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedSpecies !== 'all') {
      filtered = filtered.filter(animal => animal.species === selectedSpecies);
    }
    if (selectedHealth !== 'all') {
      filtered = filtered.filter(animal => animal.healthStatus === selectedHealth);
    }
    setFilteredAnimals(filtered);
  }, [searchTerm, selectedSpecies, selectedHealth, animals]);

  const simulateRFIDScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const prefix = newAnimal.species === 'poultry' ? 'RFID_CHK_' : 'RFID_PIG_';
      const newRFID = `${prefix}${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      setNewAnimal(prev => ({ ...prev, rfid: newRFID }));
      setIsScanning(false);
      alert(`RFID Scanned: ${newRFID}`);
    }, 1500);
  };

  const handleAddAnimal = () => {
    if (!newAnimal.rfid || !newAnimal.name || !newAnimal.location) {
      alert('Please fill required fields and scan RFID');
      return;
    }

    const animal: Animal = {
      id: Date.now().toString(),
      rfid: newAnimal.rfid!,
      name: newAnimal.name!,
      species: newAnimal.species!,
      breed: newAnimal.breed!,
      age: newAnimal.age!,
      weight: newAnimal.weight!,
      healthStatus: newAnimal.healthStatus!,
      lastVaccination: new Date().toISOString().split('T')[0],
      nextVaccination: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      location: newAnimal.location!,
      productionData: newAnimal.productionData || {}
    };

    setAnimals(prev => [...prev, animal]);
    setNewAnimal({ species: 'poultry', healthStatus: 'good', productionData: {} });
    alert('Animal registered successfully!');
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'health-status-excellent';
      case 'good': return 'health-status-good';
      case 'fair': return 'health-status-fair';
      case 'poor': return 'health-status-poor';
      default: return 'health-status-default';
    }
  };

  const getSpeciesIcon = (species: string) => {
    return species === 'poultry' ? '🐔' : '🐖';
  };

  const getSpeciesDisplayName = (species: string) => {
    return species === 'poultry' ? 'Chicken' : 'Pig';
  };

  const getBreedOptions = (species: string) => {
    return species === 'poultry' 
      ? ['Kadaknath', 'Rhode Island Red', 'Leghorn', 'Plymouth Rock', 'Sussex', 'Asil']
      : ['Large White', 'Landrace', 'Duroc', 'Hampshire', 'Pietrain', 'Berkshire'];
  };

  // Container styles
  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const headerStyle = {
    textAlign: 'center' as const,
    marginBottom: '30px'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    color: '#2d3748',
    marginBottom: '10px',
    fontWeight: '700'
  };

  const subtitleStyle = {
    fontSize: '1.2rem',
    color: '#718096',
    margin: '0'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Poultry & Pig Registry</h1>
        <p style={subtitleStyle}>RFID/NFC based digital health records for your farm</p>
      </div>

      <div className="registry-layout">
        {/* Left Sidebar */}
        <div className="sidebar">
          <div className="form-card">
            <h2>Register New Animal</h2>

            {/* RFID Scan Section */}
            <div className="rfid-section">
              <h3>RFID/NFC Scan</h3>
              <div className="rfid-input-group">
                <input
                  type="text"
                  placeholder="RFID Tag"
                  value={newAnimal.rfid || ''}
                  readOnly
                  className="rfid-input"
                />
                <button
                  onClick={simulateRFIDScan}
                  disabled={isScanning}
                  className={`scan-button ${isScanning ? 'scanning' : ''}`}
                >
                  {isScanning ? 'Scanning...' : 'Scan RFID'}
                </button>
              </div>
              <p className="rfid-help">Use RFID/NFC scanner to automatically register animal tag</p>
            </div>

            {/* Animal Form */}
            <div className="animal-form">
              <div className="form-group">
                <label>Animal Name *</label>
                <input
                  type="text"
                  value={newAnimal.name || ''}
                  onChange={(e) => setNewAnimal(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter animal name"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Species</label>
                  <select
                    value={newAnimal.species}
                    onChange={(e) => setNewAnimal(prev => ({ 
                      ...prev, 
                      species: e.target.value as 'poultry' | 'swine',
                      productionData: {}
                    }))}
                  >
                    <option value="poultry">Chicken</option>
                    <option value="swine">Pig</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Breed</label>
                  <select
                    value={newAnimal.breed || ''}
                    onChange={(e) => setNewAnimal(prev => ({ ...prev, breed: e.target.value }))}
                  >
                    <option value="">Select Breed</option>
                    {getBreedOptions(newAnimal.species || 'poultry').map(breed => (
                      <option key={breed} value={breed}>{breed}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>{newAnimal.species === 'poultry' ? 'Age (months)' : 'Age (years)'} *</label>
                  <input
                    type="number"
                    value={newAnimal.age || ''}
                    onChange={(e) => setNewAnimal(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                    placeholder="Age"
                  />
                </div>

                <div className="form-group">
                  <label>Weight (kg) *</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newAnimal.weight || ''}
                    onChange={(e) => setNewAnimal(prev => ({ ...prev, weight: parseFloat(e.target.value) }))}
                    placeholder="Weight"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Location *</label>
                <input
                  type="text"
                  value={newAnimal.location || ''}
                  onChange={(e) => setNewAnimal(prev => ({ ...prev, location: e.target.value }))}
                  placeholder={newAnimal.species === 'poultry' ? 'Coop A-1' : 'Pen B-1'}
                />
              </div>

              {newAnimal.species === 'poultry' && (
                <div className="form-group">
                  <label>Eggs per Day</label>
                  <input
                    type="number"
                    value={newAnimal.productionData?.eggsPerDay || ''}
                    onChange={(e) => setNewAnimal(prev => ({
                      ...prev,
                      productionData: {
                        ...prev.productionData,
                        eggsPerDay: parseInt(e.target.value)
                      }
                    }))}
                    placeholder="Average eggs per day"
                  />
                </div>
              )}

              {newAnimal.species === 'swine' && (
                <div className="form-group">
                  <label>Growth Rate (kg/day)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newAnimal.productionData?.growthRate || ''}
                    onChange={(e) => setNewAnimal(prev => ({
                      ...prev,
                      productionData: {
                        ...prev.productionData,
                        growthRate: parseFloat(e.target.value)
                      }
                    }))}
                    placeholder="Daily growth rate"
                  />
                </div>
              )}

              <div className="form-group">
                <label>Health Status</label>
                <select
                  value={newAnimal.healthStatus}
                  onChange={(e) => setNewAnimal(prev => ({ ...prev, healthStatus: e.target.value as any }))}
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>

              <button onClick={handleAddAnimal} className="register-button">
                Register Animal
              </button>
            </div>
          </div>

          {/* Stats Card */}
          <div className="stats-card">
            <h3>Farm Overview</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">{animals.length}</div>
                <div className="stat-label">Total Animals</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  {animals.filter(a => a.healthStatus === 'excellent' || a.healthStatus === 'good').length}
                </div>
                <div className="stat-label">Healthy</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  {animals.filter(a => a.species === 'poultry').length}
                </div>
                <div className="stat-label">Chickens</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  {animals.filter(a => a.species === 'swine').length}
                </div>
                {/* <div className="stat-label">Pigs</div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="animals-card">
            {/* Search and Filters */}
            <div className="search-section">
              <div className="search-filters">
                <input
                  type="text"
                  placeholder="Search by name, RFID, breed, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <select
                  value={selectedSpecies}
                  onChange={(e) => setSelectedSpecies(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Species</option>
                  <option value="poultry">Chickens</option>
                  <option value="swine">Pigs</option>
                </select>
                <select
                  value={selectedHealth}
                  onChange={(e) => setSelectedHealth(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Health</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
            </div>

            {/* Animal List */}
            <div className="animals-list-section">
              <h3>Registered Animals ({filteredAnimals.length})</h3>

              {filteredAnimals.length === 0 ? (
                <div className="empty-state">
                  No animals found. Register your first animal using the form.
                </div>
              ) : (
                <div className="animals-list">
                  {filteredAnimals.map((animal) => (
                    <div key={animal.id} className="animal-card">
                      <div className="animal-header">
                        <div className="animal-icon">
                          {getSpeciesIcon(animal.species)}
                        </div>
                        <div className="animal-info">
                          <div className="animal-title">
                            <h4>{animal.name}</h4>
                            <span className={`health-badge ${getHealthStatusColor(animal.healthStatus)}`}>
                              {animal.healthStatus}
                            </span>
                            <span className="species-badge">
                              {getSpeciesDisplayName(animal.species)}
                            </span>
                          </div>
                          <div className="animal-details">
                            <p>
                              <strong>RFID:</strong> {animal.rfid} • 
                              <strong> Breed:</strong> {animal.breed} • 
                              <strong> Age:</strong> {animal.age}{animal.species === 'poultry' ? ' months' : ' years'} • 
                              <strong> Weight:</strong> {animal.weight}kg
                            </p>
                            <p>
                              <strong>Location:</strong> {animal.location} • 
                              <strong> Last Vaccination:</strong> {animal.lastVaccination}
                            </p>
                            {animal.species === 'poultry' && animal.productionData?.eggsPerDay && (
                              <p>
                                <strong>Production:</strong> {animal.productionData.eggsPerDay} eggs/day
                                {animal.productionData.eggQuality && ` • Quality: ${animal.productionData.eggQuality}`}
                              </p>
                            )}
                            {animal.species === 'swine' && animal.productionData?.growthRate && (
                              <p>
                                <strong>Growth Rate:</strong> {animal.productionData.growthRate} kg/day
                                {animal.productionData.litterSize && ` • Litter Size: ${animal.productionData.litterSize}`}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <button className="view-details-button">
                        View Health
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Vaccinations Card */}
          <div className="vaccinations-card">
            <h3>Upcoming Vaccinations (Next 30 days)</h3>
            <div className="vaccinations-list">
              {animals
                .filter(animal => {
                  const nextVax = new Date(animal.nextVaccination);
                  const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                  return nextVax <= thirtyDaysFromNow;
                })
                .map(animal => (
                  <div key={animal.id} className="vaccination-item">
                    <div className="vaccination-info">
                      <span className="animal-name">{animal.name}</span>
                      <span className="animal-details">({animal.rfid}) - {getSpeciesDisplayName(animal.species)}</span>
                      <p className="vaccination-date">Next vaccination due: {animal.nextVaccination}</p>
                    </div>
                    <span className="due-badge">Due Soon</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalRegistry;