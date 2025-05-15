import { useState } from 'react';
import { AlertTriangle, Clock, DollarSign, Filter, ChevronDown, ChevronUp, BarChart2, Activity } from 'lucide-react';

// Données d'exemple pour les alertes de coûts
const costAlerts = [
  { id: 1, operation: 'MUD', planned: 45000, actual: 58000, variance: 29, phase: 'Phase 1', date: '2025-05-12' },
  { id: 2, operation: 'LOGGING', planned: 32000, actual: 42500, variance: 33, phase: 'Phase 2', date: '2025-05-10' },
  { id: 3, operation: 'EQUIPMENT', planned: 78000, actual: 85000, variance: 9, phase: 'Phase 1', date: '2025-05-14' },
  { id: 4, operation: 'MUD', planned: 52000, actual: 71000, variance: 37, phase: 'Phase 2', date: '2025-05-08' },
  { id: 5, operation: 'LOGGING', planned: 29000, actual: 32000, variance: 10, phase: 'Phase 3', date: '2025-05-13' }
];

// Données d'exemple pour les alertes de délais
const timeAlerts = [
  { id: 1, operation: 'Forage P-123', planned: 12, actual: 15, variance: 25, phase: 'Phase 1', date: '2025-05-12', unit: 'jours' },
  { id: 2, operation: 'Analyse S-456', planned: 8, actual: 12, variance: 50, phase: 'Phase 2', date: '2025-05-10', unit: 'jours' },
  { id: 3, operation: 'Installation E-789', planned: 5, actual: 6.5, variance: 30, phase: 'Phase 1', date: '2025-05-14', unit: 'jours' },
  { id: 4, operation: 'Forage P-234', planned: 15, actual: 18, variance: 20, phase: 'Phase 2', date: '2025-05-08', unit: 'jours' },
  { id: 5, operation: 'Analyse S-567', planned: 7, actual: 7.5, variance: 7, phase: 'Phase 3', date: '2025-05-13', unit: 'jours' }
];

// Données d'exemple pour les alertes globales
const globalAlerts = [
  { id: 1, name: 'Coût Global Projet', planned: 15500000, actual: 17250000, variance: 11.29, unit: 'DZD' },
  { id: 2, name: 'Durée Totale Projet', planned: 180, actual: 205, variance: 13.89, unit: 'jours' },
  { id: 3, name: 'Coût Phase 1', planned: 5200000, actual: 6100000, variance: 17.31, unit: 'DZD' },
  { id: 4, name: 'Coût Phase 2', planned: 7300000, actual: 7850000, variance: 7.53, unit: 'DZD' },
  { id: 5, name: 'Coût Phase 3', planned: 3000000, actual: 3300000, variance: 10.00, unit: 'DZD' }
];

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState('global');
  const [costTypeFilter, setCostTypeFilter] = useState('all');
  const [phaseFilter, setPhaseFilter] = useState('all');
  const [varianceFilter, setVarianceFilter] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filtrage des alertes de coûts
  const filteredCostAlerts = costAlerts.filter(alert => {
    if (costTypeFilter !== 'all' && alert.type !== costTypeFilter) return false;
    if (phaseFilter !== 'all' && alert.phase !== phaseFilter) return false;
    if (alert.variance < varianceFilter) return false;
    return true;
  });
  
  // Filtrage des alertes de délais  
  const filteredTimeAlerts = timeAlerts.filter(alert => {
    if (phaseFilter !== 'all' && alert.phase !== phaseFilter) return false;
    if (alert.variance < varianceFilter) return false;
    return true;
  });

  // Extraction des types de coûts et phases uniques pour les filtres
  const costTypes = [...new Set(costAlerts.map(alert => alert.type))];
  const phases = [...new Set([...costAlerts, ...timeAlerts].map(alert => alert.phase))];

  // Fonction pour formater les montants
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-DZ', { 
      style: 'currency', 
      currency: 'DZD',
      maximumFractionDigits: 0 
    }).format(amount);
  };

  const getVarianceSeverityClass = (variance) => {
    if (variance < 10) return 'text-green-500';
    if (variance < 20) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* En-tête */}
      <header className="bg-gradient-to-r from-orange-500 to-orange-700 text-white py-4 px-6 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Activity size={24} className="text-white" />
            <h1 className="text-2xl font-bold">WOMS Pétrol - Sonatrach</h1>
          </div>
          <div className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
            Système de Gestion des Opérations
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <AlertTriangle className="text-orange-500" size={20} />
            Tableau de bord des alertes
          </h2>
          
          {/* Onglets */}
          <div className="flex border-b border-gray-200 mb-6">
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'global' ? 'text-orange-600 border-b-2 border-orange-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('global')}
            >
              Alertes Globales
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'cost' ? 'text-orange-600 border-b-2 border-orange-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('cost')}
            >
              <div className="flex items-center gap-1">
                <DollarSign size={16} />
                Alertes de Coûts
              </div>
            </button>
            <button 
              className={`px-4 py-2 font-medium ${activeTab === 'time' ? 'text-orange-600 border-b-2 border-orange-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('time')}
            >
              <div className="flex items-center gap-1">
                <Clock size={16} />
                Alertes de Délais
              </div>
            </button>
          </div>
          
          {/* Filtres */}
          {activeTab !== 'global' && (
            <div className="mb-6">
              <div 
                className="flex items-center justify-between bg-gray-50 p-3 rounded-md cursor-pointer mb-3"
                onClick={() => setShowFilters(!showFilters)}
              >
                <div className="flex items-center gap-2">
                  <Filter size={18} className="text-gray-500" />
                  <span className="font-medium text-gray-700">Filtres</span>
                </div>
                {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              
              {showFilters && (
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {activeTab === 'cost' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type de coût</label>
                        <select 
                          className="w-full border border-gray-300 rounded-md py-2 px-3"
                          value={costTypeFilter}
                          onChange={(e) => setCostTypeFilter(e.target.value)}
                        >
                          <option value="all">Tous les types</option>
                          {costTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phase</label>
                      <select 
                        className="w-full border border-gray-300 rounded-md py-2 px-3"
                        value={phaseFilter}
                        onChange={(e) => setPhaseFilter(e.target.value)}
                      >
                        <option value="all">Toutes les phases</option>
                        {phases.map(phase => (
                          <option key={phase} value={phase}>{phase}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Écart minimum ({varianceFilter}%)
                      </label>
                      <input 
                        type="range" 
                        min="0" 
                        max="50" 
                        step="5"
                        value={varianceFilter}
                        onChange={(e) => setVarianceFilter(parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Contenu des onglets */}
          {activeTab === 'global' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {globalAlerts.slice(0, 3).map(alert => (
                  <div key={alert.id} className="bg-white border border-gray-200 rounded-lg shadow p-4">
                    <h3 className="font-semibold text-lg mb-2">{alert.name}</h3>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <div className="text-gray-500">Prévu</div>
                        <div className="font-medium">
                          {alert.unit === 'DZD' 
                            ? formatCurrency(alert.planned) 
                            : `${alert.planned} ${alert.unit}`}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Réel</div>
                        <div className="font-medium">
                          {alert.unit === 'DZD' 
                            ? formatCurrency(alert.actual) 
                            : `${alert.actual} ${alert.unit}`}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Écart</div>
                        <div className={`font-medium ${getVarianceSeverityClass(alert.variance)}`}>
                          +{alert.variance.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-3 text-left text-sm font-semibold text-gray-700">Indicateur</th>
                      <th className="p-3 text-right text-sm font-semibold text-gray-700">Prévu</th>
                      <th className="p-3 text-right text-sm font-semibold text-gray-700">Réel</th>
                      <th className="p-3 text-right text-sm font-semibold text-gray-700">Écart</th>
                    </tr>
                  </thead>
                  <tbody>
                    {globalAlerts.map(alert => (
                      <tr key={alert.id} className="border-b border-gray-200">
                        <td className="p-3 text-sm font-medium text-gray-800">{alert.name}</td>
                        <td className="p-3 text-sm text-right">
                          {alert.unit === 'DZD' 
                            ? formatCurrency(alert.planned) 
                            : `${alert.planned} ${alert.unit}`}
                        </td>
                        <td className="p-3 text-sm text-right">
                          {alert.unit === 'DZD' 
                            ? formatCurrency(alert.actual) 
                            : `${alert.actual} ${alert.unit}`}
                        </td>
                        <td className={`p-3 text-sm text-right font-medium ${getVarianceSeverityClass(alert.variance)}`}>
                          +{alert.variance.toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'cost' && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-left text-sm font-semibold text-gray-700">Type</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-700">Opération</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-700">Phase</th>
                    <th className="p-3 text-right text-sm font-semibold text-gray-700">Budget</th>
                    <th className="p-3 text-right text-sm font-semibold text-gray-700">Réel</th>
                    <th className="p-3 text-right text-sm font-semibold text-gray-700">Écart</th>
                    <th className="p-3 text-right text-sm font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCostAlerts.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="p-4 text-center text-gray-500">
                        Aucune alerte ne correspond aux critères de filtrage
                      </td>
                    </tr>
                  ) : (
                    filteredCostAlerts.map(alert => (
                      <tr key={alert.id} className="border-b border-gray-200">
                        <td className="p-3 text-sm font-medium text-gray-800">{alert.type}</td>
                        <td className="p-3 text-sm text-gray-800">{alert.operation}</td>
                        <td className="p-3 text-sm text-gray-800">{alert.phase}</td>
                        <td className="p-3 text-sm text-right">{formatCurrency(alert.planned)}</td>
                        <td className="p-3 text-sm text-right">{formatCurrency(alert.actual)}</td>
                        <td className={`p-3 text-sm text-right font-medium ${getVarianceSeverityClass(alert.variance)}`}>
                          +{alert.variance}%
                        </td>
                        <td className="p-3 text-sm text-right">
                          {new Date(alert.date).toLocaleDateString('fr-FR')}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'time' && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-left text-sm font-semibold text-gray-700">Opération</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-700">Phase</th>
                    <th className="p-3 text-right text-sm font-semibold text-gray-700">Délai prévu</th>
                    <th className="p-3 text-right text-sm font-semibold text-gray-700">Délai réel</th>
                    <th className="p-3 text-right text-sm font-semibold text-gray-700">Écart</th>
                    <th className="p-3 text-right text-sm font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTimeAlerts.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-4 text-center text-gray-500">
                        Aucune alerte ne correspond aux critères de filtrage
                      </td>
                    </tr>
                  ) : (
                    filteredTimeAlerts.map(alert => (
                      <tr key={alert.id} className="border-b border-gray-200">
                        <td className="p-3 text-sm font-medium text-gray-800">{alert.operation}</td>
                        <td className="p-3 text-sm text-gray-800">{alert.phase}</td>
                        <td className="p-3 text-sm text-right">{alert.planned} {alert.unit}</td>
                        <td className="p-3 text-sm text-right">{alert.actual} {alert.unit}</td>
                        <td className={`p-3 text-sm text-right font-medium ${getVarianceSeverityClass(alert.variance)}`}>
                          +{alert.variance}%
                        </td>
                        <td className="p-3 text-sm text-right">
                          {new Date(alert.date).toLocaleDateString('fr-FR')}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* Résumé en bas de page */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <BarChart2 className="text-orange-500" size={20} />
              Résumé des Alertes de Coûts
            </h3>
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-700">Nombre total d'alertes</span>
                <span className="text-sm font-medium">{costAlerts.length}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-700">Écart moyen</span>
                <span className="text-sm font-medium">
                  {(costAlerts.reduce((sum, alert) => sum + alert.variance, 0) / costAlerts.length).toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-700">Alertes critiques ({'>'}20%)</span>
                <span className="text-sm font-medium text-red-500">
                  {costAlerts.filter(alert => alert.variance > 20).length}
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Clock className="text-orange-500" size={20} />
              Résumé des Alertes de Délais
            </h3>
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-700">Nombre total d'alertes</span>
                <span className="text-sm font-medium">{timeAlerts.length}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-700">Écart moyen</span>
                <span className="text-sm font-medium">
                  {(timeAlerts.reduce((sum, alert) => sum + alert.variance, 0) / timeAlerts.length).toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-700">Alertes critiques ({'>'}20%)</span>
                <span className="text-sm font-medium text-red-500">
                  {timeAlerts.filter(alert => alert.variance > 20).length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Pied de page */}
      <footer className="bg-gray-800 text-white py-4 px-6 mt-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-sm">
              &copy; 2025 Sonatrach - WOMS (Well Operations Management System)
            </div>
            <div className="text-sm">
              Version 2.3.0
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}