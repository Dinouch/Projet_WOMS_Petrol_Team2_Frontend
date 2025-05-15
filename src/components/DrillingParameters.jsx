import React from 'react';
import { CheckCircle, AlertCircle, Clock, ChevronRight, HardHat, Drill, Droplet, Layers } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area,
  ComposedChart, Cell, PieChart, Pie, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

// Couleurs modernes
const colors = {
  primary: '#3b82f6',
  secondary: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  dark: '#1e293b',
  light: '#f8fafc'
};

// Données simulées
const bitData = {
  current: {
    metrics: {
      hoursUsed: 42,
      metresDrilled: 125,
      efficiency: 0.87,
      weightOnBit: 12,
      rpm: 120
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

// Composant de carte moderne
const ModernCard = ({ title, value, icon, trend, unit, className = '' }) => (
  <div className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 ${className}`}>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className="flex items-end mt-2">
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          {unit && <span className="text-sm text-gray-500 ml-1 mb-1">{unit}</span>}
        </div>
      </div>
      <div className={`p-2 rounded-lg ${icon ? 'bg-blue-50 text-blue-600' : ''}`}>
        {icon}
      </div>
    </div>
    {trend && (
      <div className={`flex items-center mt-2 text-sm ${trend.value > 0 ? 'text-green-500' : 'text-red-500'}`}>
        {trend.value > 0 ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
        <span className="ml-1">{trend.value}% vs hier</span>
      </div>
    )}
  </div>
);

// Composant de barre de progression
const ProgressBar = ({ value, max, color = 'primary' }) => {
  const percentage = Math.min(100, (value / max) * 100);
  const colorClasses = {
    primary: 'bg-blue-500',
    secondary: 'bg-green-500',
    danger: 'bg-red-500',
    warning: 'bg-yellow-500'
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className={`h-2 rounded-full ${colorClasses[color]}`} 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
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
    <div className="bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Suivi du forage</h1>
          <p className="text-gray-500">Dernière mise à jour: {new Date().toLocaleString()}</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Exporter le rapport <ChevronRight className="ml-2" size={16} />
        </button>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <ModernCard 
          title="Métrage foré" 
          value={bitData.current.metrics.metresDrilled} 
          unit="m" 
          icon={<Drill className="w-5 h-5" />}
          trend={{ value: 2.5 }}
        />
        <ModernCard 
          title="Heures d'utilisation" 
          value={bitData.current.metrics.hoursUsed} 
          unit="h" 
          icon={<Clock className="w-5 h-5" />}
        />
        <ModernCard 
          title="Efficacité" 
          value={Math.round(bitData.current.metrics.efficiency * 100)} 
          unit="%" 
          icon={<CheckCircle className="w-5 h-5" />}
        />
        <ModernCard 
          title="Poids sur trépan" 
          value={bitData.current.metrics.weightOnBit} 
          unit="t" 
          icon={<HardHat className="w-5 h-5" />}
        />
        <ModernCard 
          title="RPM" 
          value={bitData.current.metrics.rpm} 
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>}
        />
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Performance du trépan */}
        <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Performance du trépan</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg">Journalier</button>
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg">Hebdomadaire</button>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Progression</p>
              <ProgressBar value={bitData.current.metrics.hoursUsed} max={60} color="warning" />
              <p className="text-xs text-gray-500 mt-1">{bitData.current.metrics.hoursUsed}h sur 60h</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">État</p>
              <div className="flex items-center">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${bitData.current.metrics.hoursUsed > 50 ? 'bg-red-500' : 'bg-green-500'}`}></span>
                <span className="text-sm">{bitData.current.metrics.hoursUsed > 50 ? 'À remplacer' : 'Bon état'}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Vitesse moyenne</p>
              <p className="text-lg font-semibold">{(bitData.current.metrics.metresDrilled / bitData.current.metrics.hoursUsed).toFixed(2)} m/h</p>
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={pumpPerformanceData}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" tick={{ fill: '#6b7280' }} />
                <YAxis yAxisId="left" tick={{ fill: '#6b7280' }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: '#6b7280' }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="debit" name="Débit (l/min)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="pressure" name="Pression (bar)" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* État des composants */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">État des composants BHA</h2>
          <div className="space-y-4">
            {bitData.current.components.map((component, index) => {
              const status = getComponentStatus(component.hours, component.alertThreshold);
              const percentage = Math.round((component.hours / component.alertThreshold) * 100);
              
              return (
                <div key={index} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        status === 'alert' ? 'bg-red-500' : status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></span>
                      <span className="font-medium">{component.name}</span>
                    </div>
                    <span className={`text-sm font-medium ${
                      status === 'alert' ? 'text-red-500' : status === 'warning' ? 'text-yellow-500' : 'text-green-500'
                    }`}>{percentage}%</span>
                  </div>
                  <ProgressBar 
                    value={component.hours} 
                    max={component.alertThreshold} 
                    color={status === 'alert' ? 'danger' : status === 'warning' ? 'warning' : 'primary'}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{component.hours}h utilisées</span>
                    <span>Limite: {component.alertThreshold}h</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Graphiques secondaires */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Poids de la boue */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Poids de la boue</h2>
            <Droplet className="text-blue-500" size={20} />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={mudWeightData}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="depth" tick={{ fill: '#6b7280' }} />
                <YAxis tick={{ fill: '#6b7280' }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  name="Poids (sg)" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#ffffff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Progression géologique */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Progression géologique</h2>
            <Layers className="text-blue-500" size={20} />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={prepareGeologyData()}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fill: '#6b7280' }} />
                <YAxis dataKey="name" type="category" tick={{ fill: '#6b7280' }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                />
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
      </div>
      
      {/* Dernière ligne de graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ROP par formation */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">ROP par formation</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={ropByFormationData}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="formation" tick={{ fill: '#6b7280' }} />
                <YAxis tick={{ fill: '#6b7280' }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
                <Bar dataKey="rop" name="Vitesse de forage (m/h)" radius={[4, 4, 0, 0]}>
                  {ropByFormationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={formationColors[entry.formation]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Pertes de circulation */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Pertes de circulation</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={circulationLossData}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fill: '#6b7280' }} />
                <YAxis tick={{ fill: '#6b7280' }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="surface" 
                  name="Pertes en surface (m³)" 
                  stroke="#3b82f6" 
                  fill="#93c5fd" 
                  fillOpacity={0.8}
                />
                <Area 
                  type="monotone" 
                  dataKey="subsurface" 
                  name="Pertes S.C.E. (m³)" 
                  stroke="#10b981" 
                  fill="#a7f3d0" 
                  fillOpacity={0.8}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Inclinaison */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Inclinaison vs profondeur</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={inclinationData}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="depth" tick={{ fill: '#6b7280' }} />
                <YAxis tick={{ fill: '#6b7280' }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="angle" 
                  name="Inclinaison (°)" 
                  stroke="#f59e0b" 
                  strokeWidth={2} 
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2, fill: '#ffffff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BitBhaTracking;