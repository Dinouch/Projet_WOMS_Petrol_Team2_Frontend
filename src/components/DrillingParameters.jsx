import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Données simulées pour les paramètres de forage
const drillingParamsData = [
  { depth: 50, wob: 10, rpm: 120, flow: 600, pressure: 1500, hsi: 2.4 },
  { depth: 100, wob: 12, rpm: 110, flow: 650, pressure: 1600, hsi: 2.6 },
  { depth: 150, wob: 15, rpm: 100, flow: 700, pressure: 1700, hsi: 3.0 },
  { depth: 200, wob: 18, rpm: 90, flow: 750, pressure: 1800, hsi: 3.4 },
  { depth: 250, wob: 20, rpm: 80, flow: 800, pressure: 1900, hsi: 3.8 },
  { depth: 300, wob: 22, rpm: 70, flow: 850, pressure: 2000, hsi: 4.2 }
];

function DrillingParameters() {
  // Valeurs actuelles pour les jauges
  const currentWOB = 22;
  const maxWOB = 30;
  const currentRPM = 70;
  const maxRPM = 150;
  const currentFlow = 850;
  const maxFlow = 1000;
  const currentPressure = 2000;
  const maxPressure = 2500;
  const currentHSI = 4.2;
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">
        Paramètres de Forage et Optimisation
      </h2>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* WOB Gauge */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-gray-600 mb-3">WOB (Weight on Bit)</h3>
            <div className="mt-2">
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-500 rounded-full" 
                  style={{ width: `${(currentWOB / maxWOB) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-end mt-1">
                <span className="text-sm font-medium text-gray-700">{currentWOB} tonnes</span>
              </div>
            </div>
          </div>
          
          {/* RPM Gauge */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-gray-600 mb-3">RPM</h3>
            <div className="mt-2">
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-500 rounded-full" 
                  style={{ width: `${(currentRPM / maxRPM) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-end mt-1">
                <span className="text-sm font-medium text-gray-700">{currentRPM} rpm</span>
              </div>
            </div>
          </div>
          
          {/* Flow & Pressure */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-gray-600 mb-3">Flow & Pressure</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${(currentFlow / maxFlow) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-end mt-1">
                  <span className="text-sm font-medium text-gray-700">{currentFlow} gpm</span>
                </div>
              </div>
              <div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${(currentPressure / maxPressure) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-end mt-1">
                  <span className="text-sm font-medium text-gray-700">{currentPressure} psi</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* HSI Indicator */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-gray-600 mb-3">HSI</h3>
            <div className="bg-green-600 text-white rounded p-4 flex items-center justify-center">
              <span className="text-xl font-bold">{currentHSI}</span>
            </div>
          </div>
        </div>
        
        {/* Parameters-ROP Correlation */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-gray-600 text-center mb-4">Corrélation paramètres-ROP</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={drillingParamsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="depth" label={{ value: 'Profondeur (m)', position: 'insideBottom', offset: -5 }} />
                <YAxis yAxisId="left" orientation="left" stroke="#ff6b35" />
                <YAxis yAxisId="right" orientation="right" stroke="#33a1fd" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="wob" stroke="#ff6b35" activeDot={{ r: 8 }} />
                <Line yAxisId="right" type="monotone" dataKey="rpm" stroke="#33a1fd" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrillingParameters;