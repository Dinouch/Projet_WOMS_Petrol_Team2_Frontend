import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format, parse, isWithinInterval } from 'date-fns';
import fr from 'date-fns/locale/fr';
import { motion, AnimatePresence } from 'framer-motion';
import DetailCouts from './details_couts';

const DetailDelais = () => {
  // State for summary cards data
  const [summaryData] = useState([
    {
      title: "Total de jour",
      value: "101 jours",
      change: "10.2 +1.01% this week",
      changePositive: true
    },
    {
      title: "Total prévu reste",
      value: "0 jours",
      change: "31 -7.49% this week",
      changePositive: false
    },
    {
      title: "Total non prévu",
      value: "17 jours",
      change: "2.56 -0.91% this week",
      changePositive: false
    },
    {
      title: "nbr de jour prévu",
      value: "84",
      change: "7.2 +1.51% this week",
      changePositive: true
    }
  ]);

  // State for operations journal data
  const [operationsJournal] = useState([
    {
      id: "#12594",
      date: "Dec 1, 2021",
      dateObj: new Date(2021, 11, 1),
      phase: "Phase 26\"",
      depth: "120 ft",
      progress: "120 ft",
      npt: "0 h",
      cumulativeNpt: "10 h",
      status: "Sous contrôle",
      statusType: "controlled",
      details: "**"
    },
    {
      id: "#12490",
      date: "Dec 2, 2025",
      dateObj: new Date(2025, 11, 2),
      phase: "Phase 12 1/4",
      depth: "140 ft",
      progress: "135 ft",
      npt: "2 h",
      cumulativeNpt: "12 h",
      status: "À surveiller",
      statusType: "warning",
      details: "**"
    },
    {
      id: "#12306",
      date: "Dec 3, 2021",
      dateObj: new Date(2021, 11, 3),
      phase: "Phase 16\"",
      depth: "160 ft",
      progress: "40 ft",
      npt: "3 h",
      cumulativeNpt: "13 h",
      status: "Dépassement",
      statusType: "exceeded",
      details: "**"
    },
    {
      id: "#12307",
      date: "Dec 4, 2021",
      dateObj: new Date(2021, 11, 4),
      phase: "Phase 8 1/2",
      depth: "100 ft",
      progress: "102 ft",
      npt: "1 h",
      cumulativeNpt: "14 h",
      status: "Sous contrôle",
      statusType: "controlled",
      details: "**"
    },
    {
      id: "#12308",
      date: "Dec 5, 2021",
      dateObj: new Date(2021, 11, 5),
      phase: "Phase 16\"",
      depth: "80 ft",
      progress: "80 ft",
      npt: "3 h",
      cumulativeNpt: "13 h",
      status: "Sous contrôle",
      statusType: "controlled",
      details: "**"
    },
    {
      id: "#12309",
      date: "Dec 6, 2021",
      dateObj: new Date(2021, 11, 6),
      phase: "Phase 26\"",
      depth: "123 ft",
      progress: "90 ft",
      npt: "0 h",
      cumulativeNpt: "17 h",
      status: "Dépassement",
      statusType: "exceeded",
      details: "**"
    },
    {
      id: "#12310",
      date: "Dec 7, 2021",
      dateObj: new Date(2021, 11, 7),
      phase: "Phase 26\"",
      depth: "130 ft",
      progress: "110 ft",
      npt: "0 h",
      cumulativeNpt: "17 h",
      status: "Dépassement",
      statusType: "exceeded",
      details: "**"
    },
    {
      id: "#12311",
      date: "Jan 15, 2026",
      dateObj: new Date(2026, 0, 15),
      phase: "Phase 12\"",
      depth: "150 ft",
      progress: "95 ft",
      npt: "5 h",
      cumulativeNpt: "22 h",
      status: "Dépassement",
      statusType: "exceeded",
      details: "**"
    }
  ]);

  // Daily operations data for popup
  const dailyOperations = {
    "Dec 1, 2021": [
      { no: "13E", id: "#12594", name: "Operation P", timing: "00:00 - 04:30", status: "Sous contrôle", statusType: "controlled" },
      { no: "2N5", id: "#12490", name: "Operation R", timing: "04:00 - 05:30", status: "À surveiller", statusType: "warning" },
      { no: "46G", id: "#12306", name: "Operation I", timing: "05:45 - 06:30", status: "Dépassement", statusType: "exceeded" },
      { no: "483", id: "#12306", name: "Operation S", timing: "06:30 - 07:30", status: "Sous contrôle", statusType: "controlled" }
    ],
    "Dec 2, 2025": [
      { no: "23L", id: "#12306", name: "Operation M", timing: "7h:40 - 09:15", status: "Dépassement", statusType: "exceeded" },
      { no: "3Y9", id: "#12306", name: "Operation B", timing: "9:20 - 11:30", status: "Dépassement", statusType: "exceeded" },
      { no: "3E4", id: "#12306", name: "Operation E", timing: "12:00 - 13:30", status: "Dépassement", statusType: "exceeded" }
    ],
    "Dec 3, 2021": [
      { no: "13E", id: "#12594", name: "Operation P", timing: "00:00 - 04:30", status: "Sous contrôle", statusType: "controlled" },
      { no: "2N5", id: "#12490", name: "Operation R", timing: "04:00 - 05:30", status: "À surveiller", statusType: "warning" }
    ],
    "Dec 4, 2021": [
      { no: "46G", id: "#12306", name: "Operation I", timing: "05:45 - 06:30", status: "Dépassement", statusType: "exceeded" },
      { no: "483", id: "#12306", name: "Operation S", timing: "06:30 - 07:30", status: "Sous contrôle", statusType: "controlled" }
    ],
    "Dec 5, 2021": [
      { no: "23L", id: "#12306", name: "Operation M", timing: "7h:40 - 09:15", status: "Dépassement", statusType: "exceeded" }
    ],
    "Dec 6, 2021": [
      { no: "3Y9", id: "#12306", name: "Operation B", timing: "9:20 - 11:30", status: "Dépassement", statusType: "exceeded" },
      { no: "3E4", id: "#12306", name: "Operation E", timing: "12:00 - 13:30", status: "Dépassement", statusType: "exceeded" }
    ],
    "Dec 7, 2021": [
      { no: "13E", id: "#12594", name: "Operation P", timing: "00:00 - 04:30", status: "Sous contrôle", statusType: "controlled" },
      { no: "2N5", id: "#12490", name: "Operation R", timing: "04:00 - 05:30", status: "À surveiller", statusType: "warning" },
      { no: "46G", id: "#12306", name: "Operation I", timing: "05:45 - 06:30", status: "Dépassement", statusType: "exceeded" }
    ],
    "Jan 15, 2026": [
      { no: "15A", id: "#12311", name: "Operation X", timing: "08:00 - 12:30", status: "Dépassement", statusType: "exceeded" },
      { no: "15B", id: "#12311", name: "Operation Y", timing: "13:00 - 17:45", status: "Dépassement", statusType: "exceeded" }
    ]
  };

  // State for popup
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [filter, setFilter] = useState({
    status: 'all',
    phase: 'all',
    date: 'all'
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedFilterDate, setSelectedFilterDate] = useState(null);
  const [dateRange, setDateRange] = useState({ min: null, max: null });

  // Calculate min and max dates from operations data
  useEffect(() => {
    if (operationsJournal.length > 0) {
      const dates = operationsJournal.map(op => op.dateObj);
      const minDate = new Date(Math.min(...dates.map(date => date.getTime())));
      const maxDate = new Date(Math.max(...dates.map(date => date.getTime())));
      setDateRange({ min: minDate, max: maxDate });
    }
  }, [operationsJournal]);

  // Status indicator component
  const StatusIndicator = ({ type, status }) => {
    const colorVariants = {
      controlled: "bg-[#34C759]",
      warning: "bg-[#FF9500]",
      exceeded: "bg-[#FF3B30]"
    };
    
    return (
      <div className="px-2">
        <motion.div 
          className="inline-flex items-center rounded-full border border-gray-200 py-1 px-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className={`w-2 h-2 rounded-full mr-2 ${colorVariants[type]}`}></div>
          <span className="text-xs font-semibold whitespace-nowrap">{status}</span>
        </motion.div>
      </div>
    );
  };

  // Close icon component
  const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  // Chevron down icon for select
  const ChevronDown = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#7C8DB5]" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );

  // Handle details click
  const handleDetailsClick = (operation) => {
    setSelectedDate(operation.date);
    setShowPopup(true);
    // Reset filters when opening popup
    setFilter({
      status: 'all',
      phase: 'all',
      date: operation.date
    });
  };

  // Filter operations for main table
  const filteredOperations = operationsJournal.filter(item => {
    const matchesDate = filter.date === 'all' || 
                      (filter.date === item.date) || 
                      (selectedFilterDate && item.dateObj.toDateString() === selectedFilterDate.toDateString());
    const matchesStatus = filter.status === 'all' || item.statusType === filter.status;
    const matchesPhase = filter.phase === 'all' || item.phase === filter.phase;
    return matchesDate && matchesStatus && matchesPhase;
  });

  // Filter daily operations for popup
  const filteredDailyOperations = dailyOperations[selectedDate]?.filter(item => {
    const matchesStatus = filter.status === 'all' || item.statusType === filter.status;
    return matchesStatus;
  }) || [];

  // Handle date selection from calendar
  const handleDateSelect = (date) => {
    // Find matching date in the data
    const matchingDate = operationsJournal.find(item => 
      item.dateObj.toDateString() === date.toDateString()
    )?.date || format(date, 'MMM d, yyyy', { locale: fr });
    
    setFilter({...filter, date: matchingDate});
    setSelectedFilterDate(date);
    setShowDatePicker(false);
  };

  // Animated filter button component
  const FilterButton = ({ children, active, onClick }) => (
    <motion.button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg ${
        active 
          ? 'bg-[#7C8DB5] text-white shadow-md' 
          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {children}
    </motion.button>
  );

  // Get unique phases and dates for filter dropdowns
  const uniquePhases = [...new Set(operationsJournal.map(item => item.phase))];
  const uniqueDates = [...new Set(operationsJournal.map(item => item.date))];

  return (
    <div className="min-h-screen bg-[#F6F6F6] font-sans p-6">
      {/* Main Container with rounded corners and centered content */}
      <motion.div 
        className="bg-white rounded-[30px] shadow-sm max-w-7xl mx-auto p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
              <motion.div 
                key={index} 
                className={`p-4 ${index < summaryData.length - 1 ? 'border-r border-[#E6EDFF]' : ''}`}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-[34px] font-bold text-[#2E2E30] mb-2">{item.value}</p>
                <h3 className="text-[#2E2E30] text-sm font-medium mb-1">{item.title}</h3>
                <p className={`text-xs ${item.changePositive ? 'text-green-500' : 'text-red-500'}`}>
                  {item.change}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-gray-200 my-6"></div>

          {/* Filter Section - Styled with white divs and floating effect */}
          <div className="flex flex-wrap gap-4 mb-6">
            {/* Date filter */}
            <motion.div 
              className="relative"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-white rounded-lg shadow-md p-2 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Date:</span>
                  <div className="relative">
                    <button 
                      onClick={() => setShowDatePicker(!showDatePicker)}
                      className="flex items-center justify-between w-40 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7C8DB5] focus:border-[#7C8DB5] transition-all duration-200 hover:border-[#7C8DB5]"
                    >
                      <span>{filter.date === 'all' ? 'Toutes les dates' : filter.date}</span>
                      <ChevronDown />
                    </button>
                    <AnimatePresence>
                      {showDatePicker && (
                        <motion.div 
                          className="absolute z-10 mt-1 bg-white rounded-lg shadow-lg border border-gray-200"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Calendar
                            date={selectedFilterDate || dateRange.min}
                            onChange={handleDateSelect}
                            locale={fr}
                            color="#7C8DB5"
                            minDate={dateRange.min}
                            maxDate={dateRange.max}
                          />
                          <div className="flex justify-between p-2 border-t border-gray-200">
                            <button 
                              onClick={() => {
                                setFilter({...filter, date: 'all'});
                                setSelectedFilterDate(null);
                                setShowDatePicker(false);
                              }}
                              className="px-3 py-1 text-sm text-[#7C8DB5] hover:bg-gray-100 rounded transition-colors duration-200"
                            >
                              Toutes les dates
                            </button>
                            <button 
                              onClick={() => setShowDatePicker(false)}
                              className="px-3 py-1 text-sm text-white bg-[#7C8DB5] rounded hover:bg-[#6a7aa1] transition-colors duration-200"
                            >
                              Valider
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Phase filter */}
            <motion.div 
              className="bg-white rounded-lg shadow-md p-2 hover:shadow-lg"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Phase:</span>
                <div className="relative">
                  <select
                    value={filter.phase}
                    onChange={(e) => setFilter({...filter, phase: e.target.value})}
                    className="appearance-none w-40 pl-3 pr-8 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7C8DB5] focus:border-[#7C8DB5] transition-all duration-200 hover:border-[#7C8DB5]"
                  >
                    <option value="all">Toutes les phases</option>
                    {uniquePhases.map((phase, index) => (
                      <option key={index} value={phase}>{phase}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Status filter */}
            <motion.div 
              className="bg-white rounded-lg shadow-md p-2 hover:shadow-lg"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Statut:</span>
                <div className="relative">
                  <select
                    value={filter.status}
                    onChange={(e) => setFilter({...filter, status: e.target.value})}
                    className="appearance-none w-40 pl-3 pr-8 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7C8DB5] focus:border-[#7C8DB5] transition-all duration-200 hover:border-[#7C8DB5]"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="controlled">Sous contrôle</option>
                    <option value="warning">À surveiller</option>
                    <option value="exceeded">Dépassement</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick filter buttons */}
            <motion.div 
              className="flex items-center space-x-2"
              layout
            >
              <FilterButton 
                active={filter.status === 'all' && filter.phase === 'all' && filter.date === 'all'}
                onClick={() => setFilter({
                  status: 'all',
                  phase: 'all',
                  date: 'all'
                })}
              >
                Tous
              </FilterButton>
              <FilterButton 
                active={filter.status === 'controlled'}
                onClick={() => setFilter({...filter, status: 'controlled'})}
              >
                Sous contrôle
              </FilterButton>
              <FilterButton 
                active={filter.status === 'exceeded'}
                onClick={() => setFilter({...filter, status: 'exceeded'})}
              >
                Dépassement
              </FilterButton>
            </motion.div>
          </div>

          {/* Operations Journal */}
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Journal des Opérations :</h2>
          
          <motion.div 
            className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200"
            whileHover={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phase</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Depth @ 24h (ft)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PROGRESS (ft)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NPT (h)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cumulative NPT</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut délai</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Détails</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOperations.length > 0 ? (
                    filteredOperations.map((item, index) => (
                      <motion.tr 
                        key={index} 
                        className="hover:bg-gray-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {item.date}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.phase}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.depth}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.progress}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.npt}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.cumulativeNpt}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <StatusIndicator type={item.statusType} status={item.status} />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          <motion.button 
                            className="p-1 hover:bg-gray-100 rounded"
                            onClick={() => handleDetailsClick(item)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-4 py-3 text-center text-sm text-gray-500">
                        Aucune opération trouvée avec les filtres sélectionnés
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </main>
      </motion.div>

      {/* Popup for daily operations */}
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-[30px] shadow-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Journal des Opérations du {selectedDate}
                  </h2>
                  <motion.button 
                    onClick={() => setShowPopup(false)}
                    className="text-gray-500 hover:text-gray-700"
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CloseIcon />
                  </motion.button>
                </div>

                {/* Filter buttons - Styled with white divs and floating effect */}
                <div className="flex flex-wrap gap-4 mb-6">
                  {/* Status filter */}
                  <motion.div 
                    className="bg-white rounded-lg shadow-md p-2"
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Statut:</span>
                      <div className="relative">
                        <select
                          value={filter.status}
                          onChange={(e) => setFilter({...filter, status: e.target.value})}
                          className="appearance-none w-40 pl-3 pr-8 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7C8DB5] focus:border-[#7C8DB5] transition-all duration-200 hover:border-[#7C8DB5]"
                        >
                          <option value="all">Tous les statuts</option>
                          <option value="controlled">Sous contrôle</option>
                          <option value="warning">À surveiller</option>
                          <option value="exceeded">Dépassement</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <ChevronDown />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Quick filter buttons */}
                  <motion.div 
                    className="flex items-center space-x-2"
                    layout
                  >
                    <FilterButton 
                      active={filter.status === 'all'}
                      onClick={() => setFilter({...filter, status: 'all'})}
                    >
                      Tous
                    </FilterButton>
                    <FilterButton 
                      active={filter.status === 'controlled'}
                      onClick={() => setFilter({...filter, status: 'controlled'})}
                    >
                      Sous contrôle
                    </FilterButton>
                    <FilterButton 
                      active={filter.status === 'exceeded'}
                      onClick={() => setFilter({...filter, status: 'exceeded'})}
                    >
                      Dépassement
                    </FilterButton>
                  </motion.div>
                </div>

                <motion.div 
                  className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200"
                  whileHover={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
                >
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timing (h)</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut délai</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredDailyOperations.length > 0 ? (
                          filteredDailyOperations.map((item, index) => (
                            <motion.tr 
                              key={index} 
                              className="hover:bg-gray-50"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.no}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.timing}</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <StatusIndicator type={item.statusType} status={item.status} />
                              </td>
                            </motion.tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="px-4 py-3 text-center text-sm text-gray-500">
                              Aucune opération trouvée avec les filtres sélectionnés
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DetailDelais;