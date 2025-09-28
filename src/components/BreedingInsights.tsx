"use client";

import { useState } from 'react';

interface Animal {
  id: string;
  tagId: string;
  name: string;
  breed: string;
  age: number;
  healthScore: number;
  productivity: number;
  geneticScore: number;
  lastCalving?: string;
  offspringCount: number;
}

export default function BreedingInsights({ farmId }: { farmId: string }) {
  const [selectedTrait, setSelectedTrait] = useState<'health' | 'productivity' | 'genetic'>('health');

  const animals: Animal[] = [
    {
      id: '1',
      tagId: 'B-001',
      name: 'Bella',
      breed: 'Holstein',
      age: 4,
      healthScore: 95,
      productivity: 88,
      geneticScore: 92,
      lastCalving: '2023-11-15',
      offspringCount: 3
    },
    {
      id: '2',
      tagId: 'B-002',
      name: 'Daisy',
      breed: 'Jersey',
      age: 3,
      healthScore: 88,
      productivity: 94,
      geneticScore: 87,
      lastCalving: '2023-12-01',
      offspringCount: 2
    },
    {
      id: '3',
      tagId: 'B-003',
      name: 'Molly',
      breed: 'Holstein',
      age: 5,
      healthScore: 92,
      productivity: 85,
      geneticScore: 95,
      lastCalving: '2023-10-20',
      offspringCount: 4
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#27ae60';
    if (score >= 80) return '#f39c12';
    return '#e74c3c';
  };

  const getTraitScore = (animal: Animal, trait: string) => {
    switch (trait) {
      case 'health': return animal.healthScore;
      case 'productivity': return animal.productivity;
      case 'genetic': return animal.geneticScore;
      default: return 0;
    }
  };

  const sortedAnimals = [...animals].sort((a, b) => 
    getTraitScore(b, selectedTrait) - getTraitScore(a, selectedTrait)
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2>Data-Driven Breeding Decisions</h2>
          <p style={{ color: '#666', margin: 0 }}>Optimize breeding selection using health and performance analytics</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <select 
            value={selectedTrait}
            onChange={(e) => setSelectedTrait(e.target.value as any)}
            style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '5px' }}
          >
            <option value="health">Health Score</option>
            <option value="productivity">Productivity</option>
            <option value="genetic">Genetic Potential</option>
          </select>
          <button style={{ padding: '0.5rem 1rem', background: '#3498db', color: 'white', border: 'none', borderRadius: '5px' }}>
            🧬 Breeding Planner
          </button>
        </div>
      </div>

      {/* Top Performers */}
      <div style={{ 
        background: 'white', 
        padding: '1.5rem', 
        borderRadius: '8px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <h3 style={{ margin: '0 0 1rem 0' }}>🏆 Top Breeding Candidates</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {sortedAnimals.slice(0, 3).map((animal, index) => (
            <div key={animal.id} style={{ 
              padding: '1rem', 
              border: `2px solid ${getScoreColor(getTraitScore(animal, selectedTrait))}`,
              borderRadius: '5px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
              </div>
              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{animal.name}</div>
              <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem' }}>{animal.tagId}</div>
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: getScoreColor(getTraitScore(animal, selectedTrait))
              }}>
                {getTraitScore(animal, selectedTrait)}%
              </div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>
                {selectedTrait.charAt(0).toUpperCase() + selectedTrait.slice(1)} Score
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Breeding Analysis */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'hidden', marginBottom: '2rem' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #dee2e6' }}>
          <h3 style={{ margin: 0 }}>Breeding Performance Analysis</h3>
        </div>
        
        <div style={{ padding: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Animal</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Breed</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Health</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Productivity</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Genetic</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Offspring</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Last Calving</th>
              </tr>
            </thead>
            <tbody>
              {sortedAnimals.map(animal => (
                <tr key={animal.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '500' }}>{animal.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>{animal.tagId}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>{animal.breed}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ 
                      padding: '0.25rem 0.5rem', 
                      background: getScoreColor(animal.healthScore),
                      color: 'white',
                      borderRadius: '3px',
                      fontSize: '0.8rem',
                      textAlign: 'center'
                    }}>
                      {animal.healthScore}%
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ 
                      padding: '0.25rem 0.5rem', 
                      background: getScoreColor(animal.productivity),
                      color: 'white',
                      borderRadius: '3px',
                      fontSize: '0.8rem',
                      textAlign: 'center'
                    }}>
                      {animal.productivity}%
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ 
                      padding: '0.25rem 0.5rem', 
                      background: getScoreColor(animal.geneticScore),
                      color: 'white',
                      borderRadius: '3px',
                      fontSize: '0.8rem',
                      textAlign: 'center'
                    }}>
                      {animal.geneticScore}%
                    </div>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>{animal.offspringCount}</td>
                  <td style={{ padding: '1rem' }}>
                    {animal.lastCalving ? new Date(animal.lastCalving).toLocaleDateString() : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Breeding Recommendations */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1rem' 
      }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>💡 Breeding Recommendations</h3>
          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#27ae60' }}>Optimal Pairings</h4>
            <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.9rem' }}>
              <li><strong>Bella × Charlie</strong> - High genetic diversity</li>
              <li><strong>Daisy × Max</strong> - Productivity optimization</li>
              <li><strong>Molly × Rocky</strong> - Health traits enhancement</li>
            </ul>
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#e74c3c' }}>Avoid Pairings</h4>
            <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.9rem' }}>
              <li><strong>Bella × Daisy</strong> - Genetic similarity too high</li>
              <li><strong>Molly × Bella</strong> - Risk of recessive traits</li>
            </ul>
          </div>
        </div>

        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>📈 Genetic Trends</h3>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Milk Production</span>
              <span style={{ color: '#27ae60', fontWeight: 'bold' }}>↑ 12%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Disease Resistance</span>
              <span style={{ color: '#27ae60', fontWeight: 'bold' }}>↑ 8%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Reproductive Health</span>
              <span style={{ color: '#f39c12', fontWeight: 'bold' }}>→ 3%</span>
            </div>
          </div>
          <button style={{ 
            width: '100%', 
            padding: '0.75rem', 
            background: '#9b59b6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            🧪 View Genetic Analysis
          </button>
        </div>
      </div>
    </div>
  );
}