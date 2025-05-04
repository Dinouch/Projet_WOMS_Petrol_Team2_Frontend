import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area,
  ComposedChart, ReferenceLine
} from 'recharts';

// Données simulées pour les graphiques financiers (inchangées)
const dailyCostData = [
  { date: '01/04', cost: 45000 },
  { date: '02/04', cost: 42000 },
  { date: '03/04', cost: 48000 },
  { date: '04/04', cost: 51000 },
  { date: '05/04', cost: 49000 },
  { date: '06/04', cost: 47000 },
  { date: '07/04', cost: 52000 },
  { date: '08/04', cost: 50000 },
  { date: '09/04', cost: 53000 },
  { date: '10/04', cost: 55000 },
];

// Calcul des coûts cumulés
const calculateCumulativeCost = () => {
  let cumulative = 0;
  return dailyCostData.map(item => {
    cumulative += item.cost;
    return {
      ...item,
      cumulativeCost: cumulative
    };
  });
};

const cumulativeCostData = calculateCumulativeCost();

// Projection des coûts cumulés
const createProjection = () => {
  const data = [...cumulativeCostData];
  const lastCost = data[data.length - 1].cumulativeCost;
  const avgDailyCost = lastCost / data.length;
  
  for (let i = 1; i <= 5; i++) {
    const lastDate = parseInt(data[data.length - 1].date.split('/')[0]) + 1;
    data.push({
      date: `${lastDate.toString().padStart(2, '0')}/04`,
      cost: 0,
      cumulativeCost: lastCost + (avgDailyCost * i),
      projected: true
    });
  }
  
  return data;
};

const projectedCostData = createProjection();

// Données pour le coût par mètre foré
const costPerMeterData = [
  { section: 'Section 1', costPerMeter: 1200 },
  { section: 'Section 2', costPerMeter: 1500 },
  { section: 'Section 3', costPerMeter: 980 },
  { section: 'Section 4', costPerMeter: 1350 },
  { section: 'Section 5', costPerMeter: 1100 },
];

// Données pour les tendances des problèmes
const issuesData = [
  { date: '01/04', incidents: 3 },
  { date: '02/04', incidents: 2 },
  { date: '03/04', incidents: 4 },
  { date: '04/04', incidents: 1 },
  { date: '05/04', incidents: 5 },
  { date: '06/04', incidents: 2 },
  { date: '07/04', incidents: 3 },
  { date: '08/04', incidents: 1 },
  { date: '09/04', incidents: 0 },
  { date: '10/04', incidents: 2 },
];

// Données pour le budget vs dépenses réelles
const budgetVsActualData = [
  { period: 'Semaine 1', budget: 300000, actual: 290000 },
  { period: 'Semaine 2', budget: 300000, actual: 310000 },
  { period: 'Semaine 3', budget: 320000, actual: 350000 },
  { period: 'Semaine 4', budget: 280000, actual: 260000 },
];

function FinancialRiskDashboard() {
  // Couleurs du thème
  const themeColors = {
    primary: '#0066CC', // Bleu
    secondary: '#FF8C00', // Orange
    success: '#22c55e',
    danger: '#ef4444',
    background: '#f8fafc',
    card: '#ffffff',
    text: '#1e293b',
    lightText: '#64748b'
  };

  // Formatage monétaire
  const formatCurrency = (value) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);

  return (
    <div className="bg-gray-50 p-6 rounded-xl text-gray-800 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Suivi Budgétaire et des Risques</h1>
          <p className="text-gray-500">Chantier de forage - Avril 2025</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white border border-gray-200 shadow-sm px-4 py-2 rounded-lg text-sm flex items-center">
            <span>28 Mar - 29 Avr 2025</span>
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Exporter PDF</button>
        </div>
      </div>
      
      {/* Indicateurs clés */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Total des dépenses */}
        <div className="bg-white rounded-xl p-6 border-l-4 border-blue-500 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-500">Total des dépenses</h3>
          </div>
          <div className="text-3xl font-bold mb-1 text-gray-800">
            {formatCurrency(cumulativeCostData[cumulativeCostData.length - 1].cumulativeCost)}
          </div>
          <div className="text-sm text-gray-500">Depuis le début du projet</div>
        </div>
        
        {/* Coût moyen journalier */}
        <div className="bg-white rounded-xl p-6 border-l-4 border-orange-500 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-500">Coût moyen journalier</h3>
          </div>
          <div className="text-3xl font-bold mb-1 text-gray-800">
            {formatCurrency(
              dailyCostData.reduce((sum, item) => sum + item.cost, 0) / dailyCostData.length
            )}
          </div>
          <div className="text-sm text-gray-500">Sur les 10 derniers jours</div>
        </div>
        
        {/* Projection de fin */}
        <div className="bg-white rounded-xl p-6 border-l-4 border-green-500 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-500">Projection de fin</h3>
          </div>
          <div className="text-3xl font-bold mb-1 text-gray-800">
            {formatCurrency(projectedCostData[projectedCostData.length - 1].cumulativeCost)}
          </div>
          <div className="text-sm text-gray-500">Basé sur la tendance actuelle</div>
        </div>
      </div>
      
      {/* Suivi Budgétaire - Graphiques principaux */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Coût journalier */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-gray-600 mb-4 font-medium">Coût journalier</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={dailyCostData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)} 
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #eee' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="cost" 
                  stroke={themeColors.primary} 
                  strokeWidth={3}
                  name="Coût journalier"
                  dot={{ stroke: themeColors.primary, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Coût cumulé */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-gray-600 mb-4 font-medium">Coût cumulé avec projection</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={projectedCostData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #eee' }}
                />
                <Legend />
                <ReferenceLine x={dailyCostData[dailyCostData.length-1].date} stroke="red" strokeDasharray="3 3" label={{ value: "Aujourd'hui", fill: '#333', position: 'top' }} />
                <Area 
                  type="monotone" 
                  dataKey="cumulativeCost" 
                  stroke={themeColors.secondary} 
                  fill={themeColors.secondary} 
                  fillOpacity={0.4}
                  name="Coût cumulé" 
                />
                <Area 
                  type="monotone" 
                  dataKey="projected" 
                  stroke={themeColors.secondary} 
                  strokeDasharray="3 3"
                  fill={themeColors.secondary} 
                  fillOpacity={0.2}
                  name="Projection" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Coût par mètre foré */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-gray-600 mb-4 font-medium">Coût par mètre foré</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={costPerMeterData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="section" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #eee' }}
                />
                <Legend />
                <Bar dataKey="costPerMeter" name="Coût par mètre" fill={themeColors.primary} radius={[4, 4, 0, 0]} />
                <ReferenceLine y={1200} stroke={themeColors.secondary} strokeDasharray="3 3" label={{ value: "Moyenne", fill: '#333', position: 'insideRight' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Budget vs dépenses réelles */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-gray-600 mb-4 font-medium">Budget vs dépenses réelles</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={budgetVsActualData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="period" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #eee' }}
                />
                <Legend />
                <Bar dataKey="budget" name="Budget prévu" fill={themeColors.primary} radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" name="Dépenses réelles" fill={themeColors.secondary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Indicateurs de Risque */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Indicateurs de Risque</h2>
          <select className="bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm shadow-sm">
            <option>Mensuel</option>
            <option>Hebdomadaire</option>
            <option>Journalier</option>
          </select>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-gray-600 mb-4 font-medium">Tendances des problèmes</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={issuesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #eee' }} />
                <Legend />
                <Bar dataKey="incidents" name="Incidents" fill={themeColors.secondary} radius={[4, 4, 0, 0]} />
                <Line 
                  type="monotone" 
                  dataKey="incidents" 
                  stroke="#333" 
                  name="Tendance" 
                  dot={false}
                  activeDot={false}
                  strokeWidth={2}
                  strokeDasharray="3 3"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* KPIs d'alerte */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Alertes financières</h2>
        <div className="grid grid-cols-4 gap-4">
          {budgetVsActualData.map((item, index) => {
            const variance = ((item.actual - item.budget) / item.budget) * 100;
            const isOverBudget = variance > 0;
            
            return (
              <div 
                key={index} 
                className={`p-6 rounded-xl bg-white shadow-sm border-l-4 ${isOverBudget ? 'border-red-500' : 'border-green-500'}`}
              >
                <div className="font-medium text-gray-600 mb-2">{item.period}</div>
                <div className={`text-2xl font-bold ${isOverBudget ? 'text-red-500' : 'text-green-500'} mb-1`}>
                  {variance.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-500">
                  {isOverBudget ? 'Au-dessus du budget' : 'En dessous du budget'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FinancialRiskDashboard;