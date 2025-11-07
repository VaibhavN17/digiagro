"use client";

import { useState } from 'react';

interface Chicken {
  id: string;
  tagId: string;
  name: string;
  breed: string;
  age: number; // in months
  healthScore: number;
  productivity: number; // egg production
  geneticScore: number;
  lastLaying?: string;
  offspringCount: number;
}

export default function BreedingInsights({ farmId }: { farmId: string }) {
  const [selectedTrait, setSelectedTrait] = useState<'health' | 'productivity' | 'genetic'>('health');

  const chickens: Chicken[] = [
    {
      id: '1',
      tagId: 'CHK-001',
      name: 'Goldie',
      breed: 'Rhode Island Red',
      age: 18,
      healthScore: 92,
      productivity: 95,
      geneticScore: 88,
      lastLaying: '2024-01-15',
      offspringCount: 25
    },
    {
      id: '2',
      tagId: 'CHK-002',
      name: 'Speckles',
      breed: 'Plymouth Rock',
      age: 15,
      healthScore: 88,
      productivity: 91,
      geneticScore: 94,
      lastLaying: '2024-01-14',
      offspringCount: 18
    },
    {
      id: '3',
      tagId: 'CHK-003',
      name: 'Sunny',
      breed: 'Leghorn',
      age: 20,
      healthScore: 95,
      productivity: 98,
      geneticScore: 90,
      lastLaying: '2024-01-16',
      offspringCount: 32
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#27ae60';
    if (score >= 80) return '#f39c12';
    return '#e74c3c';
  };

  const getTraitScore = (chicken: Chicken, trait: string) => {
    switch (trait) {
      case 'health': return chicken.healthScore;
      case 'productivity': return chicken.productivity;
      case 'genetic': return chicken.geneticScore;
      default: return 0;
    }
  };

  const sortedChickens = [...chickens].sort((a, b) => 
    getTraitScore(b, selectedTrait) - getTraitScore(a, selectedTrait)
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2>Poultry Breeding Insights</h2>
          <p style={{ color: '#666', margin: 0 }}>Optimize breeding selection using health and egg production analytics</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <select 
            value={selectedTrait}
            onChange={(e) => setSelectedTrait(e.target.value as any)}
            style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '5px' }}
          >
            <option value="health">Health Score</option>
            <option value="productivity">Egg Production</option>
            <option value="genetic">Genetic Potential</option>
          </select>
          <button style={{ padding: '0.5rem 1rem', background: '#3498db', color: 'white', border: 'none', borderRadius: '5px' }}>
            🐔 Breeding Planner
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
        <h3 style={{ margin: '0 0 1rem 0' }}>🏆 Top Breeding Hens</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {sortedChickens.slice(0, 3).map((chicken, index) => (
            <div key={chicken.id} style={{ 
              padding: '1rem', 
              border: `2px solid ${getScoreColor(getTraitScore(chicken, selectedTrait))}`,
              borderRadius: '5px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
              </div>
              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{chicken.name}</div>
              <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem' }}>{chicken.tagId}</div>
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: getScoreColor(getTraitScore(chicken, selectedTrait))
              }}>
                {getTraitScore(chicken, selectedTrait)}%
              </div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>
                {selectedTrait === 'productivity' ? 'Egg Production' : selectedTrait.charAt(0).toUpperCase() + selectedTrait.slice(1)} Score
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Breeding Analysis */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'hidden', marginBottom: '2rem' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #dee2e6' }}>
          <h3 style={{ margin: 0 }}>Poultry Breeding Performance</h3>
        </div>
        
        <div style={{ padding: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Hen</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Breed</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Health</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Egg Production</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Genetic</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Chicks Produced</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Last Egg Laid</th>
              </tr>
            </thead>
            <tbody>
              {sortedChickens.map(chicken => (
                <tr key={chicken.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '500' }}>{chicken.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>{chicken.tagId}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>{chicken.breed}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ 
                      padding: '0.25rem 0.5rem', 
                      background: getScoreColor(chicken.healthScore),
                      color: 'white',
                      borderRadius: '3px',
                      fontSize: '0.8rem',
                      textAlign: 'center'
                    }}>
                      {chicken.healthScore}%
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ 
                      padding: '0.25rem 0.5rem', 
                      background: getScoreColor(chicken.productivity),
                      color: 'white',
                      borderRadius: '3px',
                      fontSize: '0.8rem',
                      textAlign: 'center'
                    }}>
                      {chicken.productivity}%
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ 
                      padding: '0.25rem 0.5rem', 
                      background: getScoreColor(chicken.geneticScore),
                      color: 'white',
                      borderRadius: '3px',
                      fontSize: '0.8rem',
                      textAlign: 'center'
                    }}>
                      {chicken.geneticScore}%
                    </div>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>{chicken.offspringCount}</td>
                  <td style={{ padding: '1rem' }}>
                    {chicken.lastLaying ? new Date(chicken.lastLaying).toLocaleDateString() : 'N/A'}
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
          <h3 style={{ margin: '0 0 1rem 0' }}>💡 Breeding Pair Recommendations</h3>
          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#27ae60' }}>Optimal Pairings</h4>
            <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.9rem' }}>
              <li><strong>Goldie × Rocky</strong> - Enhanced egg size and quantity</li>
              <li><strong>Speckles × Ranger</strong> - Disease resistance traits</li>
              <li><strong>Sunny × Chief</strong> - Temperament and growth rate</li>
            </ul>
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#e74c3c' }}>Avoid Pairings</h4>
            <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.9rem' }}>
              <li><strong>Goldie × Chief</strong> - Genetic similarity too high</li>
              <li><strong>Speckles × Ranger</strong> - Risk of feather pecking traits</li>
            </ul>
          </div>
        </div>

        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>📈 Flock Genetic Trends</h3>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Egg Production Rate</span>
              <span style={{ color: '#27ae60', fontWeight: 'bold' }}>↑ 15%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Disease Resistance</span>
              <span style={{ color: '#27ae60', fontWeight: 'bold' }}>↑ 10%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Feed Conversion</span>
              <span style={{ color: '#f39c12', fontWeight: 'bold' }}>→ 5%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Shell Quality</span>
              <span style={{ color: '#27ae60', fontWeight: 'bold' }}>↑ 7%</span>
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
            🧬 View Genetic Analysis
          </button>
        </div>
      </div>
    </div>
  );
}