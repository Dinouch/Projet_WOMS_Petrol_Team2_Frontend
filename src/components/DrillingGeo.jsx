import React from 'react';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area,
  ComposedChart, Cell
} from 'recharts';

// Données simulées
const bitData = {
  current: {
    metrics: {
      hoursUsed: 42,
      metresDrilled: 125,
      efficiency: 0.87
    },
    components: [
      { name: 'MWD', hours: 120, alertThreshold: 200 },
      { name: 'Motor', hours: 180, alertThreshold: 200 },
      { name: 'Stabilizer', hours: 90, alertThreshold: 150 },
      { name: 'Bit', hours: 42, alertThreshold: 60 }
    ]
  }
};

// Données simulées pour les graphiques
const mudWeightData = [
  { depth: 0, weight: 1.1 },
  { depth: 500, weight: 1.2 },
  { depth: 1000, weight: 1.3 },
  { depth: 1500, weight: 1.25 },
  { depth: 2000, weight: 1.4 },
  { depth: 2500, weight: 1.45 },
  { depth: 3000, weight: 1.5 },
];

const circulationLossData = [
  { date: '01/04', surface: 5, subsurface: 2 },
  { date: '02/04', surface: 3, subsurface: 1 },
  { date: '03/04', surface: 7, subsurface: 3 },
  { date: '04/04', surface: 2, subsurface: 0 },
  { date: '05/04', surface: 4, subsurface: 5 },
  { date: '06/04', surface: 8, subsurface: 2 },
  { date: '07/04', surface: 6, subsurface: 1 },
];

const inclinationData = [
  { depth: 0, angle: 0 },
  { depth: 500, angle: 2 },
  { depth: 1000, angle: 5 },
  { depth: 1500, angle: 12 },
  { depth: 2000, angle: 18 },
  { depth: 2500, angle: 23 },
  { depth: 3000, angle: 30 },
];

const geologyData = [
  { depth: 500, formation: 'Argile', rop: 12 },
  { depth: 1000, formation: 'Calcaire', rop: 8 },
  { depth: 1500, formation: 'Grès', rop: 15 },
  { depth: 2000, formation: 'Schiste', rop: 6 },
  { depth: 2500, formation: 'Dolomite', rop: 9 },
];

const ropByFormationData = [
  { formation: 'Argile', rop: 12 },
  { formation: 'Calcaire', rop: 8 },
  { formation: 'Grès', rop: 15 },
  { formation: 'Schiste', rop: 6 },
  { formation: 'Dolomite', rop: 9 },
];

const pumpPerformanceData = [
  { time: '08:00', debit: 600, pressure: 180 },
  { time: '09:00', debit: 620, pressure: 185 },
  { time: '10:00', debit: 640, pressure: 195 },
  { time: '11:00', debit: 600, pressure: 190 },
  { time: '12:00', debit: 590, pressure: 185 },
  { time: '13:00', debit: 610, pressure: 190 },
  { time: '14:00', debit: 630, pressure: 200 },
];

const mudPropertiesData = [
  { time: '08:00', ph: 8.5, viscosity: 45 },
  { time: '09:00', ph: 8.6, viscosity: 46 },
  { time: '10:00', ph: 8.7, viscosity: 48 },
  { time: '11:00', ph: 8.5, viscosity: 47 },
  { time: '12:00', ph: 8.4, viscosity: 46 },
  { time: '13:00', ph: 8.6, viscosity: 45 },
  { time: '14:00', ph: 8.7, viscosity: 47 },
];

// Couleurs pour les formations géologiques
const formationColors = {
  'Argile': '#8884d8',
  'Calcaire': '#82ca9d',
  'Grès': '#ffc658',
  'Schiste': '#ff8042',
  'Dolomite': '#0088fe'
};

function BitBhaTracking() {
  // Fonction pour déterminer le statut d'un composant basé sur ses heures d'utilisation
  const getComponentStatus = (hours, threshold) => {
    if (hours >= threshold) return 'alert';
    if (hours >= threshold * 0.8) return 'warning';
    return 'normal';
  };

  // Fonction pour obtenir la couleur selon le statut
  const getStatusColor = (status) => {
    switch (status) {
      case 'alert': return 'text-red-500';
      case 'warning': return 'text-amber-500';
      default: return 'text-green-500';
    }
  };

  // Fonction pour obtenir l'icône selon le statut
  const getStatusIcon = (status) => {
    switch (status) {
      case 'alert': return <AlertCircle className={`${getStatusColor(status)}`} size={20} />;
      case 'warning': return <Clock className={`${getStatusColor(status)}`} size={20} />;
      default: return <CheckCircle className={`${getStatusColor(status)}`} size={20} />;
    }
  };

  // Préparer des données pour le diagramme de progression géologique
  const prepareGeologyData = () => {
    const result = [];
    let prevDepth = 0;
    
    geologyData.forEach((item) => {
      result.push({
        name: `${prevDepth}m - ${item.depth}m`,
        depth: item.depth - prevDepth,
        formation: item.formation
      });
      prevDepth = item.depth;
    });
    
    return result;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">
        Suivi du Trépan et BHA
      </h2>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Bit Performance Card */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-gray-600 text-center mb-4">Performance du trépan actuel</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded-lg shadow-sm text-center">
              <div className="text-sm text-gray-500 mb-1">Métrage</div>
              <div className="text-lg font-semibold text-gray-800">{bitData.current.metrics.metresDrilled} m</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm text-center">
              <div className="text-sm text-gray-500 mb-1">Temps</div>
              <div className="text-lg font-semibold text-gray-800">{bitData.current.metrics.hoursUsed} h</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm text-center">
              <div className="text-sm text-gray-500 mb-1">Efficacité</div>
              <div className="text-lg font-semibold text-gray-800">{Math.round(bitData.current.metrics.efficiency * 100)}%</div>
            </div>
          </div>
        </div>
        
        {/* Hours Used */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-gray-600 text-center mb-4">Durée d'utilisation</h3>
          <div className="flex items-center justify-center h-32">
            <div className="flex items-center">
              <Clock className="text-gray-500 mr-3" size={24} />
              <div>
                <div className="text-3xl font-bold text-gray-800">{bitData.current.metrics.hoursUsed} h</div>
                <div className="text-sm text-gray-500">sur {60} h recommandées</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Component Hours */}
        <div className="bg-gray-50 rounded-lg p-4 col-span-2">
          <h3 className="text-gray-600 text-center mb-4">Heures cumulées des composants</h3>
          <div className="grid grid-cols-4 gap-4">
            {bitData.current.components.map((component, index) => {
              const status = getComponentStatus(component.hours, component.alertThreshold);
              return (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">{component.name}</span>
                    {getStatusIcon(status)}
                  </div>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block text-gray-600">
                          {component.hours} h
                        </span>
                      </div>
                      <div>
                        <span className="text-xs font-semibold inline-block text-gray-500">
                          Limite: {component.alertThreshold} h
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${Math.min(100, (component.hours / component.alertThreshold) * 100)}%` }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                          status === 'alert' ? 'bg-red-500' : status === 'warning' ? 'bg-amber-500' : 'bg-green-500'
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Propriétés et Gestion de la Boue */}
      <div className="mt-6">
        <h2 className="text-xl font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Propriétés et Gestion de la Boue
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {/* Poids de la boue */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-gray-600 text-center mb-4">Poids de la boue</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={mudWeightData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="depth" label={{ value: 'Profondeur (m)', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Poids (sg)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="weight" stroke="#8884d8" name="Poids" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Pertes de circulation */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-gray-600 text-center mb-4">Pertes de circulation</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={circulationLossData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis label={{ value: 'Volume (m³)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="surface" stackId="1" stroke="#8884d8" fill="#8884d8" name="Pertes en surface" />
                  <Area type="monotone" dataKey="subsurface" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Pertes S.C.E." />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Évolution des propriétés de la boue */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-gray-600 text-center mb-4">Évolution des propriétés</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={mudPropertiesData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" label={{ value: 'PH', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'Viscosité', angle: 90, position: 'insideRight' }} />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="ph" stroke="#8884d8" name="PH" />
                  <Line yAxisId="right" type="monotone" dataKey="viscosity" stroke="#82ca9d" name="Viscosité" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Performance des pompes */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-gray-600 text-center mb-4">Performance des pompes</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={pumpPerformanceData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" label={{ value: 'Débit (l/min)', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'Pression (bar)', angle: 90, position: 'insideRight' }} />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="debit" fill="#8884d8" name="Débit" />
                  <Line yAxisId="right" type="monotone" dataKey="pressure" stroke="#ff7300" name="Pression" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      
      {/* Suivi de Trajectoire et Géologie */}
      <div className="mt-6">
        <h2 className="text-xl font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Suivi de Trajectoire et Géologie
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {/* Inclinaison vs profondeur */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-gray-600 text-center mb-4">Inclinaison vs profondeur</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={inclinationData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="depth" label={{ value: 'Profondeur (m)', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Angle (°)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="angle" stroke="#ff7300" name="Inclinaison" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Progression géologique */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-gray-600 text-center mb-4">Progression géologique</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={prepareGeologyData()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" label={{ value: 'Épaisseur (m)', position: 'insideBottom', offset: -5 }} />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="depth" name="Formation">
                    {prepareGeologyData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={formationColors[entry.formation]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* ROP par formation */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-gray-600 text-center mb-4">ROP par formation</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ropByFormationData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="formation" />
                  <YAxis label={{ value: 'ROP (m/h)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="rop" name="Vitesse de forage">
                    {ropByFormationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={formationColors[entry.formation]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Équipements critiques */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-gray-600 text-center mb-4">Équipements critiques</h3>
            <div className="grid grid-cols-2 gap-4">
              {bitData.current.components.map((component, index) => {
                const status = getComponentStatus(component.hours, component.alertThreshold);
                const percentage = Math.round((component.hours / component.alertThreshold) * 100);
                return (
                  <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{component.name}</span>
                      <span className={`${
                        status === 'alert' ? 'text-red-500' : status === 'warning' ? 'text-amber-500' : 'text-green-500'
                      }`}>{percentage}%</span>
                    </div>
                    <div className="mb-2 text-xs text-gray-500">
                      {component.hours}h / {component.alertThreshold}h
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className={`h-2.5 rounded-full ${
                        status === 'alert' ? 'bg-red-500' : status === 'warning' ? 'bg-amber-500' : 'bg-green-500'
                      }`} style={{ width: `${Math.min(100, percentage)}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BitBhaTracking;