import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DetailCouts = () => {
  // State for summary cards data
  const [summaryData, setSummaryData] = useState([
    {
      title: "Total coûts",
      value: "0.00 $",
      change: "0.00% this week",
      changePositive: true
    },
    {
      title: "Total prevu reste",
      value: "0.00 $",
      change: "0.00% this week",
      changePositive: false
    },
    {
      title: "Total non prevu",
      value: "0.00 $",
      change: "0.00% this week",
      changePositive: false
    },
    {
      title: "prevision",
      value: "0.00 $",
      change: "0.00% this week",
      changePositive: true
    }
  ]);

  // State for global stats
  const [globalStats, setGlobalStats] = useState({
    statutGlobal: "Vert",
    totalReel: "0.00",
    totalPrevuReste: "0.00",
    totalNonPrevu: "0.00",
    budgetPrevisionnel: "0.00",
    pourcentageConsomme: "0.00"
  });

  // State for cost journal data
  const [costJournal, setCostJournal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dailyOperations, setDailyOperations] = useState([]);

  // State for popup
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [phaseFilter, setPhaseFilter] = useState('all');

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch global stats
        const statsResponse = await axios.get('http://localhost:8090/test_j2ee/analyseCouts?action=statistiquesGlobales&nomPuit=A');
        if (statsResponse.data.success) {
          setGlobalStats(statsResponse.data);
          
          // Update summary cards with real data
          setSummaryData([
            {
              title: "Total coûts",
              value: `${(parseFloat(statsResponse.data.totalReel) / 1000000).toFixed(2)}M $`,
              change: "10.2 +1.01% this week",
              changePositive: true
            },
            {
              title: "Total prevu reste",
              value: `${(parseFloat(statsResponse.data.totalPrevuReste) / 1000000).toFixed(2)}M $`,
              change: "31 -7.49% this week",
              changePositive: false
            },
            {
              title: "Total non prevu",
              value: `${(parseFloat(statsResponse.data.totalNonPrevu) / 1000000).toFixed(2)}M $`,
              change: "2.56 -0.91% this week",
              changePositive: false
            },
            {
              title: "prevision",
              value: `${(parseFloat(statsResponse.data.budgetPrevisionnel) / 1000000).toFixed(2)}M $`,
              change: "7.2 +1.51% this week",
              changePositive: true
            }
          ]);
        }

        // Fetch cost journal data
        const journalResponse = await axios.get('http://localhost:8090/test_j2ee/importCoutOpr?nomPuit=A');
        if (journalResponse.data.success) {
          const transformedData = journalResponse.data.data.map(item => ({
            id: "#" + Math.floor(10000 + Math.random() * 90000),
            date: new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            originalDate: item.date,
            operation: "Operation " + String.fromCharCode(65 + Math.floor(Math.random() * 26)),
            phase: item.phase,
            realCost: "$" + parseFloat(item.sommeReel).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            plannedCost: "$" + parseFloat(item.sommePrevu).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            status: item.statutCout,
            statusType: item.statutCout === "Sous contrôle" ? "controlled" : 
                        item.statutCout === "À surveiller" ? "warning" : "exceeded",
            details: "**"
          }));
          setCostJournal(transformedData);
        } else {
          setError("Failed to fetch data from API");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter operations by selected date and filters
  const filteredOperations = dailyOperations.filter(item => {
    const matchesStatus = statusFilter === 'all' || item.statusType === statusFilter;
    const matchesPhase = phaseFilter === 'all' || item.phase === phaseFilter;
    return matchesStatus && matchesPhase;
  });

  // Get unique phases for filter dropdown
  const uniquePhases = [...new Set(costJournal.map(item => item.phase))];

  // Status indicator component
  const StatusIndicator = ({ type, status }) => {
    const colorVariants = {
      controlled: "bg-[#34C759]",
      warning: "bg-[#FF9500]",
      exceeded: "bg-[#FF3B30]"
    };
    
    return (
      <div className="px-2">
        <div className="inline-flex items-center rounded-full border border-gray-200 py-1 px-3">
          <div className={`w-2 h-2 rounded-full mr-2 ${colorVariants[type]}`}></div>
          <span className="text-xs font-semibold whitespace-nowrap">{status}</span>
        </div>
      </div>
    );
  };

  // Close icon component
  const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  // Handle details click
  const handleDetailsClick = async (item) => {
    setSelectedDate(item.date);
    setShowPopup(true);
    
    const apiDate = item.originalDate;
    
    try {
      const response = await axios.get(`http://localhost:8090/test_j2ee/operationsByPuitAndDate?nomPuit=A&date=${apiDate}`);
      if (response.data && response.data.operations) {
        const transformed = response.data.operations.map((op, index) => ({
          id: "#" + (10000 + index),
          operation: op.nomOperation || "N/A",
          phase: op.phase || "N/A",
          realCost: op.coutReel !== "null" ? `$${parseFloat(op.coutReel).toLocaleString()}` : "N/A",
          plannedCost: op.coutPrevu !== "null" ? `$${parseFloat(op.coutPrevu).toLocaleString()}` : "N/A",
          status: op.statutCout !== "null" ? op.statutCout : "Non défini",
          statusType: op.statutCout === "Sous contrôle" ? "controlled" : 
                      op.statutCout === "À surveiller" ? "warning" : 
                      op.statutCout === "Dépassement" ? "exceeded" : "warning"
        }));
        setDailyOperations(transformed);
      } else {
        setDailyOperations([]);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des opérations par date :", error);
      setDailyOperations([]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F6F6] font-sans p-6 flex items-center justify-center">
        <div className="bg-white rounded-[30px] shadow-sm max-w-7xl w-full p-6 text-center">
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F6F6F6] font-sans p-6 flex items-center justify-center">
        <div className="bg-white rounded-[30px] shadow-sm max-w-7xl w-full p-6 text-center text-red-500">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F6F6] font-sans p-6">
      <div className="bg-white rounded-[30px] shadow-sm max-w-7xl mx-auto p-6">
        <header className="bg-white border-b border-gray-200 rounded-t-lg">
          <div className="flex justify-between items-center px-6 py-3">
            <div className="flex items-center space-x-4">
              <h1 className="text-[30px] font-bold text-gray-800">Puit de Tindouf #49001</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-1 text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Summary Cards with real data */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[10px] mb-8 bg-white rounded-lg shadow-sm">
            {summaryData.map((item, index) => (
              <div 
                key={index} 
                className={`p-4 ${index < summaryData.length - 1 ? 'border-r border-[#E6EDFF]' : ''}`}
              >
                <p className="text-[34px] font-bold text-[#2E2E30] mb-2">{item.value}</p>
                <h3 className="text-[#2E2E30] text-sm font-medium mb-1">{item.title}</h3>
                <p className={`text-xs ${item.changePositive ? 'text-green-500' : 'text-red-500'}`}>
                  {item.change}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 my-6"></div>

          {/* Cost Journal */}
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Journal de coûts par jour :</h2>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phase / Tâche</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coût réel</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coût prévu</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut coût</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Détails</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {costJournal.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {item.date}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.phase}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.realCost}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.plannedCost}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <StatusIndicator type={item.statusType} status={item.status} />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <button 
                          className="p-1 hover:bg-gray-100 rounded"
                          onClick={() => handleDetailsClick(item)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Popup for daily operations */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[30px] shadow-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Journal des Opérations du {selectedDate} (Coûts)
                </h2>
                <button 
                  onClick={() => setShowPopup(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Statut:</span>
                  <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button
                      type="button"
                      onClick={() => setStatusFilter('all')}
                      className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${statusFilter === 'all' ? 'bg-blue-100 border-blue-500 text-blue-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                    >
                      Tous
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatusFilter('controlled')}
                      className={`px-4 py-2 text-sm font-medium border-t border-b ${statusFilter === 'controlled' ? 'bg-green-100 border-green-500 text-green-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                    >
                      Sous contrôle
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatusFilter('warning')}
                      className={`px-4 py-2 text-sm font-medium border-t border-b ${statusFilter === 'warning' ? 'bg-orange-100 border-orange-500 text-orange-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                    >
                      À surveiller
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatusFilter('exceeded')}
                      className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${statusFilter === 'exceeded' ? 'bg-red-100 border-red-500 text-red-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                    >
                      Dépassement
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Phase:</span>
                  <select
                    value={phaseFilter}
                    onChange={(e) => setPhaseFilter(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  >
                    <option value="all">Toutes les phases</option>
                    {uniquePhases.map((phase, index) => (
                      <option key={index} value={phase}>{phase}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom Opération</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phase / Tâche</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coût réel</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coût prévu</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut coût</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredOperations.length > 0 ? (
                        filteredOperations.map((item, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.operation}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.phase}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.realCost}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.plannedCost}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <StatusIndicator type={item.statusType} status={item.status} />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="px-4 py-3 text-center text-sm text-gray-500">
                            Aucune opération trouvée avec les filtres sélectionnés
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailCouts;