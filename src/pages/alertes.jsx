import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AlertTriangle, Clock, DollarSign,
  Filter, ChevronDown, ChevronUp,
  BarChart2, Activity
} from 'lucide-react';


// Données d'exemple pour les alertes globales
const globalAlerts = [
  { id: 1, name: 'Coût Global Projet', planned: 15500000, actual: 17250000, variance: 11.29, unit: 'DZD' },
  { id: 2, name: 'Durée Totale Projet', planned: 180, actual: 205, variance: 13.89, unit: 'jours' }
 
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat('fr-DZ', {
    style: 'currency',
    currency: 'DZD',
    maximumFractionDigits: 0
  }).format(amount);

const getVarianceSeverityClass = (variance) => {
  if (variance < 10) return 'text-green-500';
  if (variance < 20) return 'text-amber-500';
  return 'text-red-500';
};

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState('global');
  const [costTypeFilter, setCostTypeFilter] = useState('all');
  const [phaseFilter, setPhaseFilter] = useState('all');
  const [varianceFilter, setVarianceFilter] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const [costAlerts, setCostAlerts] = useState([]);
  const [loadingCosts, setLoadingCosts] = useState(true);
  const [errorCosts, setErrorCosts] = useState(null);

  const [timeAlerts, setTimeAlerts] = useState([]);
  const [loadingTime, setLoadingTime] = useState(true);
  const [errorTime, setErrorTime] = useState(null);

  useEffect(() => {
    const fetchCostAlerts = async () => {
      setLoadingCosts(true);
      try {
        const resp = await axios.get('http://localhost:8090/test_j2ee/coutAlerts', {
          withCredentials: true
        });

        const rawOverrun = resp.data.overrunCosts || [];
        const rawMonitor = resp.data.monitorCosts || [];

        const allAlerts = [...rawOverrun, ...rawMonitor].map(a => {
          const variance = a.coutPrevu === 0 ? 0 : Math.round(((a.coutReel - a.coutPrevu) / a.coutPrevu) * 100);
          return {
            id: a.idCoutOpr,
            operation: a.nomOpr,
            planned: a.coutPrevu,
            actual: a.coutReel,
            variance: variance,
            phase: a.phase,
            date: a.date_creation,
            statut: a.statutCout,
            wellName: a.nom_puit
          };
        });

        setCostAlerts(allAlerts);
      } catch (err) {
        console.error('Erreur fetch coutAlerts', err);
        setErrorCosts('Impossible de charger les alertes de coûts');
      } finally {
        setLoadingCosts(false);
      }
    };

    


    const fetchTimeAlerts = async () => {
  setLoadingTime(true);
  try {
    const resp = await axios.get('http://localhost:8090/test_j2ee/delaiAlerts', {
      withCredentials: true
    });

    const rawOverrun = resp.data.overrunDelays || [];
    const rawMonitor = resp.data.monitorDelays || [];

    const parseTime = (timeStr) => {
      if (!timeStr) return null;
      const [time, modifier] = timeStr.split(' ');
      let [hours, minutes, seconds] = time.split(':').map(Number);
      if (modifier === 'PM' && hours !== 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;
      return hours + minutes / 60 + (seconds || 0) / 3600;
    };

    const allAlerts = [...rawOverrun, ...rawMonitor].map(a => {
      // Si startTime ET endTime existent → on calcule la durée réelle
      let actualDurationHours = 0;

      if (a.startTime && a.endTime) {
        const start = parseTime(a.startTime);
        const end = parseTime(a.endTime);
        // Cas où end < start (ex: overnight → passe minuit)
        if (start !== null && end !== null) {
          actualDurationHours = end >= start
            ? end - start
            : (24 - start) + end;
        }
      }

      // Si pas de startTime/endTime → durée réelle = 0 (ou autre valeur par défaut selon besoin)
      // Mais au moins on évite NaN

      const variance = a.dureepr === 0
        ? 0
        : Math.round(((actualDurationHours - Number(a.dureepr)) / Number(a.dureepr)) * 100);

      return {
        id: a.idDelaiOpr,
        operation: a.despOpr ? a.despOpr : (a.nomOpr || 'Inconnu'),
        planned: Number(a.dureepr),
        actual: actualDurationHours.toFixed(2),  // 2 décimales
        variance: variance,
        phase: a.phase,
        date: a.date_creation,
        statut: a.statutDelai,
        wellName: a.nom_puit
      };
    });

    setTimeAlerts(allAlerts);
  } catch (err) {
    console.error('Erreur fetch delaiAlerts', err);
    setErrorTime('Impossible de charger les alertes de délais');
  } finally {
    setLoadingTime(false);
  }
};


    fetchCostAlerts();
    fetchTimeAlerts();
  }, []);

  const costTypes = ['all.', ...new Set(costAlerts.map(a => a.operation))];
  const phases = ['all.', ...new Set(costAlerts.map(a => a.phase))];

  const filteredCostAlerts = costAlerts.filter(a => {
    if (costTypeFilter !== 'all' && a.operation !== costTypeFilter) return false;
    if (phaseFilter !== 'all' && a.phase !== phaseFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-orange-500 to-orange-700 text-white py-4 px-6 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Activity size={24} />
            <h1 className="text-2xl font-bold">WOMS Pétrol - Sonatrach</h1>
          </div>
          <div className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
            Système de Gestion des Opérations
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle size={20} className="text-orange-500" />
            Tableau de bord des alertes
          </h2>

          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'global' ? 'text-orange-600 border-b-2 border-orange-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('global')}
            >Alertes Globales</button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'cost' ? 'text-orange-600 border-b-2 border-orange-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('cost')}
            >
              <DollarSign size={16} className="inline mr-1" />
              Alertes de Coûts
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'time' ? 'text-orange-600 border-b-2 border-orange-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('time')}
            >
              <Clock size={16} className="inline mr-1" />
              Alertes de Délais
            </button>
          </div>



          




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
              {loadingCosts ? (
                <div className="p-4 text-center text-gray-500">Chargement...</div>
              ) : errorCosts ? (
                <div className="p-4 text-center text-red-500">{errorCosts}</div>
              ) : (
                <table className="w-full border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
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
                      <tr><td colSpan="6" className="p-4 text-center text-gray-500">Aucune alerte trouvée</td></tr>
                    ) : filteredCostAlerts.map(a => (
                      <tr key={a.id} className="border-b">
                        <td className="p-3 text-sm">{a.operation}</td>
                        <td className="p-3 text-sm">{a.phase}</td>
                        <td className="p-3 text-sm text-right">{formatCurrency(a.planned)}</td>
                        <td className="p-3 text-sm text-right">{formatCurrency(a.actual)}</td>
                        <td className={`p-3 text-sm text-right font-medium ${getVarianceSeverityClass(a.variance)}`}>
                          +{a.variance}%
                        </td>
                        <td className="p-3 text-sm text-right">
                          {new Date(a.date).toLocaleDateString('fr-FR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {activeTab === 'time' && (
            <div className="overflow-x-auto">
              {loadingTime ? (
                <div className="p-4 text-center text-gray-500">Chargement...</div>
              ) : errorTime ? (
                <div className="p-4 text-center text-red-500">{errorTime}</div>
              ) : (
                <table className="w-full border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 text-left text-sm font-semibold text-gray-700">Opération</th>
                      <th className="p-3 text-left text-sm font-semibold text-gray-700">Phase</th>
                      <th className="p-3 text-right text-sm font-semibold text-gray-700">Durée prévue (H)</th>
                      <th className="p-3 text-right text-sm font-semibold text-gray-700">Durée réelle (H)</th>
                      <th className="p-3 text-right text-sm font-semibold text-gray-700">Écart</th>
                      <th className="p-3 text-right text-sm font-semibold text-gray-700">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timeAlerts.length === 0 ? (
                      <tr><td colSpan="6" className="p-4 text-center text-gray-500">Aucune alerte trouvée</td></tr>
                    ) : timeAlerts.map(a => (
                      <tr key={a.id} className="border-b">
                        <td className="p-3 text-sm">{a.operation}</td>
                        <td className="p-3 text-sm">{a.phase}</td>
                        <td className="p-3 text-sm text-right">{a.planned}</td>
                        <td className="p-3 text-sm text-right">{a.actual}</td>
                        <td className={`p-3 text-sm text-right font-medium ${getVarianceSeverityClass(a.variance)}`}>
                          +{a.variance}%
                        </td>
                        <td className="p-3 text-sm text-right">
                          {new Date(a.date).toLocaleDateString('fr-FR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded shadow p-6">
            <h3 className="font-semibold flex items-center gap-2 mb-4">
              <BarChart2 size={20} className="text-orange-500" /> Résumé Coûts
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Alertes totales</span>
                <span>{costAlerts.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Écart moyen</span>
                <span>
                  {costAlerts.length > 0
                    ? (costAlerts.reduce((s, a) => s + a.variance, 0) / costAlerts.length).toFixed(2) + '%'
                    : '0%'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Critiques (&gt;20%)</span>
                <span className="text-red-500">
                  {costAlerts.filter(a => a.variance > 20).length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded shadow p-6">
            <h3 className="font-semibold flex items-center gap-2 mb-4">
              <Clock size={20} className="text-orange-500" /> Résumé Délais
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Alertes totales</span>
                <span>{timeAlerts.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Écart moyen</span>
                <span>
                  {timeAlerts.length > 0
                    ? (timeAlerts.reduce((s, a) => s + a.variance, 0) / timeAlerts.length).toFixed(2) + '%'
                    : '0%'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Critiques (&gt;20%)</span>
                <span className="text-red-500">
                  {timeAlerts.filter(a => a.variance > 20).length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
