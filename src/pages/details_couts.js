import React, { useState } from 'react';

const DetailCouts = () => {
  // State for summary cards data
  const [summaryData] = useState([
    {
      title: "Total coûts",
      value: "9,5M $",
      change: "10.2 +1.01% this week",
      changePositive: true
    },
    {
      title: "Total prevu reste",
      value: "0,5M $",
      change: "31 -7.49% this week",
      changePositive: false
    },
    {
      title: "Total non prevu",
      value: "0M $",
      change: "2.56 -0.91% this week",
      changePositive: false
    },
    {
      title: "prevision",
      value: "11,6M $",
      change: "7.2 +1.51% this week",
      changePositive: true
    }
  ]);

  // State for cost journal data
  const [costJournal] = useState([
    {
      id: "#12594",
      date: "Dec 1, 2021",
      operation: "Operation X",
      phase: "Phase 26\"",
      realCost: "$500.00",
      plannedCost: "$497.69",
      status: "Sous contrôle",
      statusType: "controlled",
      details: "**"
    },
    {
      id: "#12490",
      date: "Nov 15, 2021",
      operation: "Operation Y",
      phase: "Phase 12 1/4",
      realCost: "$674.00",
      plannedCost: "$679.14",
      status: "À surveiller",
      statusType: "warning",
      details: "**"
    },
    {
      id: "#12306",
      date: "Nov 2, 2021",
      operation: "Operation A",
      phase: "Phase 16\"",
      realCost: "$1000.00",
      plannedCost: "$1237.14",
      status: "Dépassement",
      statusType: "exceeded",
      details: "**"
    },
    {
      id: "#12306",
      date: "Nov 2, 2021",
      operation: "Operation C",
      phase: "Phase 8 1/2",
      realCost: "$850.00",
      plannedCost: "$777.14",
      status: "Sous contrôle",
      statusType: "controlled",
      details: "**"
    },
    {
      id: "#12306",
      date: "Nov 2, 2021",
      operation: "Operation E",
      phase: "Phase 16\"",
      realCost: "$380.00",
      plannedCost: "$477.14",
      status: "Dépassement",
      statusType: "exceeded",
      details: "**"
    },
    {
      id: "#12306",
      date: "Nov 2, 2021",
      operation: "Operation P",
      phase: "Phase 26\"",
      realCost: "$574.00",
      plannedCost: "$677.00",
      status: "Dépassement",
      statusType: "exceeded",
      details: "**"
    },
    {
      id: "#12306",
      date: "Nov 2, 2021",
      operation: "Operation F",
      phase: "Phase 26\"",
      realCost: "$400.00",
      plannedCost: "$543.14",
      status: "Dépassement",
      statusType: "exceeded",
      details: "**"
    }
  ]);

  // State for popup
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [phaseFilter, setPhaseFilter] = useState('all');

  // Filter operations by selected date and filters
  const filteredOperations = costJournal.filter(item => {
    const matchesDate = item.date === selectedDate;
    const matchesStatus = statusFilter === 'all' || item.statusType === statusFilter;
    const matchesPhase = phaseFilter === 'all' || item.phase === phaseFilter;
    return matchesDate && matchesStatus && matchesPhase;
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
  const handleDetailsClick = (operation) => {
    setSelectedDate(operation.date);
    setShowPopup(true);
    // Reset filters when opening popup
    setStatusFilter('all');
    setPhaseFilter('all');
  };

  return (
    <div className="min-h-screen bg-[#F6F6F6] font-sans p-6">
      {/* Main Container with rounded corners and centered content */}
      <div className="bg-white rounded-[30px] shadow-sm max-w-7xl mx-auto p-6">
        {/* Navbar */}
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
              
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Admin</span>
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Summary Cards */}
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

              {/* Filter buttons */}
              <div className="flex flex-wrap gap-4 mb-6">
                {/* Status filter */}
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

                {/* Phase filter */}
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