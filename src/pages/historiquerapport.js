import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FiFile, FiCalendar, FiEye, FiEdit, FiDownload, FiSearch, FiPlus, FiLoader } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ReportsHistoryPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const navigate = useNavigate();

  // Configuration Axios
  const api = axios.create({
    baseURL: 'http://localhost:8090/test_j2ee',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Fonction fetchReports stable
  const fetchReports = useCallback(async () => {
    try {
      const response = await api.get('/reports');
      setReports(response.data);
    } catch (err) {
      setError('Erreur lors du chargement des rapports');
      console.error('Error fetching reports:', err);
    } finally {
      setLoading(false);
    }
  }, [api]);

  // Appel de fetchReports dans useEffect
  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  // Filtrage des rapports
  const filteredReports = reports.filter(report => {
    const searchLower = searchTerm.toLowerCase();
    return (
      report.filename?.toLowerCase().includes(searchLower) ||
      report.puits?.toLowerCase().includes(searchLower) ||
      report.derniereOperation?.toLowerCase().includes(searchLower)
    );
  });

  // Handlers


  const handleViewReport = async (reportId) => {
    setLoadingDetails(true);
    try {
      const response = await api.get(`/full-report-details?id=${reportId}`);
      setSelectedReport(response.data);
    } catch (err) {
      setError('Erreur lors du chargement des détails du rapport');
      console.error('Error fetching report details:', err);
    } finally {
      setLoadingDetails(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Historique des Rapports</h1>
            <p className="text-gray-500">Consultez et gérez tous vos rapports de forage</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <input
                type="text"
                placeholder="Rechercher un rapport..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={() => navigate('/upload')}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center whitespace-nowrap"
            >
              <FiPlus className="mr-2" />
              Nouveau rapport
            </button>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map(report => (
            <div key={report.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
              <div className="px-5 py-4 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-orange-100">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg flex items-center text-gray-800">
                    <FiFile className="mr-3 text-orange-500 min-w-5 text-xl" />
                    <span className="truncate">{report.filename || "Sans titre"}</span>
                  </h3>
                  <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded-full shadow-sm">
                    #{report.id}
                  </span>
                </div>
              </div>

              <div className="px-5 py-4 flex-grow">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div>
                      <p className="text-gray-500">Date du rapport</p>
                      <p className="font-medium">{report.dateRapport || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Date d'upload</p>
                      <p className="font-medium">{report.dateUpload || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-gray-500">Puits</p>
                      <p className="font-medium">{report.puits || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Profondeur TVD</p>
                      <p className="font-medium">{report.profondeurTVD || 'N/A'} ft</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-gray-500 mb-2">Dernière opération</p>
                  <div className="text-sm">
                    {report.derniereOperation || 'Aucune opération enregistrée'}
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
            
                <button
                  onClick={() => handleViewReport(report.id)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center text-sm"
                  disabled={loadingDetails}
                >
                  {loadingDetails ? (
                    <FiLoader className="mr-2 animate-spin" />
                  ) : (
                    <FiEye className="mr-2" />
                  )}
                  {loadingDetails ? 'Chargement...' : 'Visualiser'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-auto">
            <div className="bg-orange-600 py-4 px-6 sticky top-0 z-10">
              <div className="flex justify-between items-center">
                <h2 className="text-white text-xl font-bold">
                  Détails complets du rapport: {selectedReport.filename}
                </h2>
                <button 
                  onClick={() => setSelectedReport(null)}
                  className="text-white hover:text-gray-200 text-2xl"
                >
                  &times;
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Informations de base */}
              <div className="mb-8 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg text-gray-800 mb-4 border-b pb-2">
                  Informations de base
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">ID du rapport</p>
                    <p className="font-medium">{selectedReport.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nom du fichier</p>
                    <p className="font-medium">{selectedReport.filename}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date d'upload</p>
                    <p className="font-medium">{selectedReport.dateUpload}</p>
                  </div>
                </div>
              </div>

              {/* Header */}
              {selectedReport.header && (
                <div className="mb-8">
                  <h3 className="font-bold text-lg text-gray-800 mb-3 border-b pb-2">HEADER</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(selectedReport.header).map(([key, value]) => (
                        <div key={key} className="bg-white p-3 rounded shadow-sm">
                          <p className="text-sm text-gray-500 capitalize">{key.replace(/_/g, ' ')}</p>
                          <p className="font-medium">{value || 'N/A'}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Operations */}
              {selectedReport.operations?.operations && (
                <div className="mb-8">
                  <h3 className="font-bold text-lg text-gray-800 mb-3 border-b pb-2">OPERATIONS</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left">Start Time</th>
                          <th className="px-4 py-2 text-left">End Time</th>
                          <th className="px-4 py-2 text-left">Code</th>
                          <th className="px-4 py-2 text-left">Description</th>
                          <th className="px-4 py-2 text-left">Initial Depth</th>
                          <th className="px-4 py-2 text-left">Final Depth</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedReport.operations.operations
                          .filter(op => op.code || op.description)
                          .map((op, index) => (
                            <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                              <td className="px-4 py-2">{op.start_time || '-'}</td>
                              <td className="px-4 py-2">{op.end_time || '-'}</td>
                              <td className="px-4 py-2">{op.code || '-'}</td>
                              <td className="px-4 py-2">{op.description || '-'}</td>
                              <td className="px-4 py-2">{op.initial_depth || '-'}</td>
                              <td className="px-4 py-2">{op.final_depth || '-'}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Mud Information */}
              {selectedReport.mud_information && (
                <div className="mb-8">
                  <h3 className="font-bold text-lg text-gray-800 mb-3 border-b pb-2">MUD INFORMATION</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Volumes */}
                    {selectedReport.mud_information.VOLUMES_BBL && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-700 mb-3">Volumes (BBL)</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(selectedReport.mud_information.VOLUMES_BBL).map(([key, value]) => (
                            <div key={key} className="bg-white p-2 rounded shadow-xs">
                              <p className="text-xs text-gray-500">{key}</p>
                              <p className="font-medium">{value || 'N/A'}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Mud Properties */}
                    {selectedReport.mud_information.MUD_PROPERTIES && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-700 mb-3">Mud Properties</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(selectedReport.mud_information.MUD_PROPERTIES).map(([key, value]) => (
                            <div key={key} className="bg-white p-2 rounded shadow-xs">
                              <p className="text-xs text-gray-500">{key}</p>
                              <p className="font-medium">{value || 'N/A'}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Status */}
                    {selectedReport.mud_information.STATUS && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-700 mb-3">Status</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(selectedReport.mud_information.STATUS).map(([key, value]) => (
                            <div key={key} className="bg-white p-2 rounded shadow-xs">
                              <p className="text-xs text-gray-500">{key}</p>
                              <p className="font-medium">{value || 'N/A'}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Lithology */}
              {selectedReport.lithology && (
                <div className="mb-8">
                  <h3 className="font-bold text-lg text-gray-800 mb-3 border-b pb-2">LITHOLOGY</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left">From (ft)</th>
                          <th className="px-4 py-2 text-left">To (ft)</th>
                          <th className="px-4 py-2 text-left">Stage</th>
                          <th className="px-4 py-2 text-left">WOC</th>
                          <th className="px-4 py-2 text-left">WC</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedReport.lithology.map((item, index) => (
                          <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-2">{item.from_ft || '-'}</td>
                            <td className="px-4 py-2">{item.to_ft || '-'}</td>
                            <td className="px-4 py-2">{item.stage || '-'}</td>
                            <td className="px-4 py-2">{item.woc || '-'}</td>
                            <td className="px-4 py-2">{item.wc || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Données brutes */}
    
            </div>

            <div className="bg-gray-100 px-6 py-3 flex justify-end sticky bottom-0">
              <button
                onClick={() => setSelectedReport(null)}
                className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsHistoryPage;