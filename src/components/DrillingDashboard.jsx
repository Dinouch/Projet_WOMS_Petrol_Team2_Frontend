import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Données simulées pour le ROP (Rate of Penetration)
const ropData = [
  { day: '01/02', rop: 12.3, formation: 'Brine' },
  { day: '02/02', rop: 10.8, formation: 'Brine' },
  { day: '03/02', rop: 11.5, formation: 'Brine' },
  { day: '04/02', rop: 9.7, formation: 'Dv3' },
  { day: '05/02', rop: 8.2, formation: 'Dv3' },
  { day: '06/02', rop: 7.8, formation: 'Dv2' },
  { day: '07/02', rop: 8.5, formation: 'Dv2' }
];

// Données pour le temps non-productif (NPT)
const nptData = [
  { day: '01/02', entp: 2, hole: 1, other: 0.5 },
  { day: '02/02', entp: 1, hole: 0.5, other: 0 },
  { day: '03/02', entp: 0, hole: 2, other: 1 },
  { day: '04/02', entp: 3, hole: 0, other: 0 },
  { day: '05/02', entp: 1, hole: 1, other: 0.5 },
  { day: '06/02', entp: 0.5, hole: 0, other: 0 },
  { day: '07/02', entp: 1, hole: 1.5, other: 0 }
];

// Données pour l'avancement cumulé
const progressData = [
  { day: '01/02', planned: 10, actual: 8 },
  { day: '02/02', planned: 20, actual: 17 },
  { day: '03/02', planned: 30, actual: 28 },
  { day: '04/02', planned: 40, actual: 35 },
  { day: '05/02', planned: 50, actual: 48 },
  { day: '06/02', planned: 60, actual: 55 },
  { day: '07/02', planned: 70, actual: 68 }
];

function DrillingDashboard() {
  // Calcul du ratio temps productif
  const productiveTimeRatio = 0.75; // 75% (exemple)
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">
        Performance du Forage et Efficacité Opérationnelle
      </h2>
      
      <div className="grid grid-cols-2 gap-6">
        {/* ROP Chart */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-gray-600 text-center mb-4">ROP (Rate of Penetration)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ropData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="rop" stroke="#ff6b35" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* NPT Chart */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-gray-600 text-center mb-4">Temps non-productif (NPT)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={nptData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="entp" stackId="a" fill="#ff6b35" />
                <Bar dataKey="hole" stackId="a" fill="#33a1fd" />
                <Bar dataKey="other" stackId="a" fill="#a5a5a5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Productive Time Ratio */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-gray-600 text-center mb-4">Ratio temps productif/total</h3>
          <div className="flex justify-center items-center h-64">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="#e0e0e0" />
                <circle cx="50" cy="50" r="45" fill="transparent" 
                  stroke="#1c9e33" 
                  strokeWidth="10" 
                  strokeDasharray={`${productiveTimeRatio * 283} ${283 - productiveTimeRatio * 283}`} 
                  strokeDashoffset="70" />
                <circle cx="50" cy="50" r="35" fill="white" />
                <text x="50" y="45" textAnchor="middle" fontSize="16" fontWeight="bold">
                  {Math.round(productiveTimeRatio * 100)}%
                </text>
                <text x="50" y="60" textAnchor="middle" fontSize="10">
                  Temps productif
                </text>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Cumulative Progress */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-gray-600 text-center mb-4">Avancement cumulé</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="planned" stroke="#33a1fd" />
                <Line type="monotone" dataKey="actual" stroke="#ff6b35" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrillingDashboard;