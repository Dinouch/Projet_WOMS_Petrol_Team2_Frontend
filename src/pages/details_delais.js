import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format, parse, isWithinInterval } from 'date-fns';
import fr from 'date-fns/locale/fr';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const DetailDelais = () => {
  // State for summary cards data
  const [summaryData, setSummaryData] = useState([
    {
      title: "Total de jour",
      value: "0 jours",
      change: "0.00% this week",
      changePositive: true
    },
    {
      title: "Total prévu reste",
      value: "0 jours",
      change: "0.00% this week",
      changePositive: false
    },
    {
      title: "Total non prévu",
      value: "0 jours",
      change: "0.00% this week",
      changePositive: false
    },
    {
      title: "nbr de jour prévu",
      value: "120",
      change: "0.00% this week",
      changePositive: true
    }
  ]);

  // State for delai stats from API
  const [delaiStats, setDelaiStats] = useState({
    statutGlobalDelai: "Vert",
    nbrJourX: 0,
    totalJour: 0,
    totalPrevuReste: 120,
    totalNonPrevu: 0
  });

  // State for operations data from API
  const [operationsData, setOperationsData] = useState([]);
  const [dailyOperations, setDailyOperations] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch summary data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch delai stats
        const delaiResponse = await axios.get('http://localhost:8090/test_j2ee/analyseDelais?action=statistiquesGlobales&nomPuit=A');
        if (delaiResponse.data.success) {
          setDelaiStats(delaiResponse.data);
          
          // Update summary cards with real data
          setSummaryData([
            {
              title: "Total de jour",
              value: `${delaiResponse.data.nbrJourX} jours`,
              change: "10.2 +1.01% this week",
              changePositive: true
            },
            {
              title: "Total prévu reste",
              value: `${delaiResponse.data.totalPrevuReste} jours`,
              change: "31 -7.49% this week",
              changePositive: false
            },
            {
              title: "Total non prévu",
              value: `${delaiResponse.data.totalNonPrevu} jours`,
              change: "2.56 -0.91% this week",
              changePositive: false
            },
            {
              title: "nbr de jour prévu",
              value: "120",
              change: "7.2 +1.51% this week",
              changePositive: true
            }
          ]);
        }

        // Fetch operations data
        const response = await fetch('http://localhost:8090/test_j2ee/summaryByDate');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const html = await response.text();
        
        // Parse the HTML to extract table data
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const rows = doc.querySelectorAll('table tr');
        
        const data = [];
        
        // Skip header row and process data rows
        for (let i = 1; i < rows.length; i++) {
          const cells = rows[i].querySelectorAll('td');
          if (cells.length >= 7) {
            data.push({
              date: cells[0].textContent === 'null' ? null : cells[0].textContent,
              originalDate: cells[0].textContent, // Store original date format for API calls
              phase: cells[1].textContent === 'null' ? null : cells[1].textContent,
              depth: cells[2].textContent === 'null' ? null : cells[2].textContent,
              progress: cells[3].textContent === 'null' ? null : cells[3].textContent,
              npt: cells[4].textContent === 'null' ? null : cells[4].textContent,
              cumulativeNpt: cells[5].textContent === 'null' ? null : cells[5].textContent,
              status: cells[6].textContent,
              statusType: cells[6].textContent === "Sous Contrôle" ? "controlled" : 
                         cells[6].textContent === "À surveiller" ? "warning" : "exceeded"
            });
          }
        }
        
        // Filter out null entries and add date objects
        const processedData = data
          .filter(item => item.date !== null)
          .map(item => ({
            ...item,
            dateObj: item.date ? parse(item.date, 'yyyy-MM-dd', new Date()) : new Date(),
            id: `#${Math.floor(10000 + Math.random() * 90000)}`,
            displayDate: item.date ? format(parse(item.date, 'yyyy-MM-dd', new Date()), 'MMM d, yyyy') : ''
          }));
        
        setOperationsData(processedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Fetch daily operations when a date is selected
  const fetchDailyOperations = async (date) => {
    try {
      const response = await fetch(`http://localhost:8090/test_j2ee/delaiByDate?date=${date}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const html = await response.text();
      
      // Créer un élément DOM temporaire pour parser le HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      
      // Trouver la table
      const table = tempDiv.querySelector('table');
      if (!table) {
        console.error('Table not found in HTML response');
        return [];
      }
      
      const operations = [];
      const rows = table.querySelectorAll('tr');
      
      // Ignorer l'en-tête (première ligne) et traiter les lignes suivantes
      for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].querySelectorAll('td');
        if (cells.length >= 5) {
          let status = cells[4]?.textContent?.trim() || 'N/A';
          status = status.replace(/^\s+|\s+$/g, ''); // Supprimer les espaces
          
          operations.push({
            startTime: cells[0]?.textContent?.trim() || 'N/A',
            endTime: cells[1]?.textContent?.trim() || 'N/A',
            operation: cells[2]?.textContent?.trim() || 'N/A',
            duration: cells[3]?.textContent?.trim() || 'N/A',
            status: status
          });
        }
      }
      
      console.log('Parsed operations:', operations);
      return operations;
    } catch (error) {
      console.error('Error fetching daily operations:', error);
      return [];
    }
  };

  // State for popup
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateOperations, setSelectedDateOperations] = useState([]);
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
    if (operationsData.length > 0) {
      const dates = operationsData.map(op => op.dateObj);
      const minDate = new Date(Math.min(...dates.map(date => date.getTime())));
      const maxDate = new Date(Math.max(...dates.map(date => date.getTime())));
      setDateRange({ min: minDate, max: maxDate });
    }
  }, [operationsData]);

  // Status indicator component for main table
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

  // Status indicator component for popup table
  const PopupStatusIndicator = ({ status }) => {
    // Déterminer le type et la couleur en fonction du statut
    let bgColor;
    
    if (status === "Sous Contrôle") {
      bgColor = "bg-[#34C759]";
    } else if (status === "À surveiller") {
      bgColor = "bg-[#FF9500]";
    } else if (status === "Dépassement") {
      bgColor = "bg-[#FF3B30]";
    } else {
      // Cas par défaut pour les statuts non reconnus
      bgColor = "bg-gray-400";
    }

    return (
      <div className="px-2">
        <motion.div 
          className="inline-flex items-center rounded-full border border-gray-200 py-1 px-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className={`w-2 h-2 rounded-full mr-2 ${bgColor}`}></div>
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
  const handleDetailsClick = async (operation) => {
    const apiDate = operation.originalDate; // Use the original date format for API call
    const displayDate = operation.displayDate; // Formatted date for display
    
    setSelectedDate(displayDate);
    setShowPopup(true);
    console.log('Fetching operations for date:', apiDate);
    
    // Fetch operations for this date
    const ops = await fetchDailyOperations(apiDate);
    setSelectedDateOperations(ops);
    console.log('Received operations:', ops);
    
    // Reset filters when opening popup
    setFilter({
      status: 'all',
      phase: 'all',
      date: apiDate
    });
  };

  // Filter operations for main table
  const filteredOperations = operationsData.filter(item => {
    const formattedDate = item.date;
    const matchesDate = filter.date === 'all' || 
                      (filter.date === formattedDate) || 
                      (selectedFilterDate && item.dateObj.toDateString() === selectedFilterDate.toDateString());
    const matchesStatus = filter.status === 'all' || item.statusType === filter.status;
    const matchesPhase = filter.phase === 'all' || item.phase === filter.phase;
    return matchesDate && matchesStatus && matchesPhase;
  });

  // Handle date selection from calendar
  const handleDateSelect = (date) => {
    // Find matching date in the data
    const matchingDate = operationsData.find(item => 
      item.dateObj.toDateString() === date.toDateString()
    );
    
    const formattedDate = matchingDate ? matchingDate.date : format(date, 'yyyy-MM-dd');
    
    setFilter({...filter, date: formattedDate});
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
  const uniquePhases = [...new Set(operationsData.map(item => item.phase))];
  const uniqueDates = [...new Set(operationsData.map(item => item.date))];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F6F6] font-sans p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#7C8DB5]"></div>
          <p className="mt-2 text-gray-600">Chargement des données...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F6F6F6] font-sans p-6 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 shadow-md max-w-md">
          <h2 className="text-xl font-bold text-red-500 mb-2">Erreur</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-[#7C8DB5] text-white px-4 py-2 rounded-lg hover:bg-[#6a7aa1] transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

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
              <h1 className="text-[30px] font-bold text-gray-800">Puit de Adrar #1</h1>
            </div>
            
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Summary Cards - Now with dynamic data */}
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

          {/* Filter Section */}
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
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profondeur</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progrès</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NPT Journalier</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NPT Cumulé</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut Global</th>
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
                          {item.displayDate}
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
                    Opérations pour la date : {selectedDate}
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

                <motion.div 
                  className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200"
                  whileHover={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
                >
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heure Début</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heure Fin</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opération</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durée PR</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedDateOperations.length > 0 ? (
                          selectedDateOperations.map((item, index) => (
                            <motion.tr 
                              key={index} 
                              className="hover:bg-gray-50"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.startTime || 'N/A'}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.endTime || 'N/A'}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.operation || 'N/A'}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.duration || 'N/A'}</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <PopupStatusIndicator status={item.status} />
                              </td>
                            </motion.tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="px-4 py-3 text-center text-sm text-gray-500">
                              Aucune opération trouvée pour cette date
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