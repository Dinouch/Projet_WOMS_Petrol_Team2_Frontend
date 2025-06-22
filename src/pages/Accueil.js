import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import RecruitmentImage from '../photos/Reqruitment.png'; 
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

ChartJS.register(ArcElement);

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const customOrangeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png', 
  iconSize: [25, 41], 
  iconAnchor: [12, 41], 
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function ZoomToMarker({ position, selectedPuit }) {
  const map = useMap();

  useEffect(() => {
    if (selectedPuit && position) {
      map.flyTo(position, 8, {
        duration: 1.5
      });
    }
  }, [selectedPuit, position, map]);

  return null;
}

const Accueil = () => {
  const [puitsData, setPuitsData] = useState({});
  const [selectedPuit, setSelectedPuit] = useState(null);
  const [showPuitList, setShowPuitList] = useState(false);
  const [showPuitDetails, setShowPuitDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPuits, setFilteredPuits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);

  const navigate = useNavigate();

  const handleClick = (puitId) => {
    navigate(`/puit/${puitId}`);
  };

  const generateRandomIndicators = (id) => {
    const seed = id;
    return {
      cost: 100000 + (seed * 20000),
      problems: seed % 10,
      progress: 30 + (seed * 10) % 70,
      monthlyCost: 50000 + (seed * 5000),
      globalDelay: 20 + (seed * 5) % 80,
      totalBudget: 500000 + (seed * 100000),
      startDate: new Date(2023, seed % 12, (seed % 28) + 1).toLocaleDateString(),
      endDate: new Date(2024, seed % 12, (seed % 28) + 1).toLocaleDateString(),
      status: ['En cours', 'Terminé', 'En retard'][seed % 3],
      team: `Équipe ${String.fromCharCode(65 + (seed % 5))}`,
      equipment: `Foreuse XT-${2000 + (seed % 100)}`
    };
  };

  useEffect(() => {
    const fetchPuits = async () => {
      try {
        const response = await axios.get('http://localhost:8090/test_j2ee/puits');
        
        const transformedData = response.data.reduce((acc, puit) => {
          const uniqueId = `${puit.nom_puit}-${puit.id_puit}`;
          
          acc[uniqueId] = {
            id: puit.id_puit,
            uniqueId: uniqueId,
            name: `Puit ${puit.nom_puit}-${puit.id_puit}`,
            position: getPositionByWilaya(puit.zone.wilaya),
            x: puit.zone.x,
            y: puit.zone.y,
            status: puit.statut_delai,
            statut_cout: puit.statut_cout,
            latitude: puit.zone.x,
            longitude: puit.zone.y,
            elevation: `Z:${puit.zone.elevation}m`,
            wilaya: puit.zone.wilaya,
            nom_puit: puit.nom_puit,
            ...generateRandomIndicators(puit.id_puit)
          };
          return acc;
        }, {});

        setPuitsData(transformedData);
        
        if (response.data.length > 0) {
          const firstPuitId = `${response.data[0].nom_puit}-${response.data[0].id_puit}`;
          setSelectedPuit(firstPuitId);
        }
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Erreur lors de la récupération des puits:', err);
      }
    };

    fetchPuits();
  }, []);

  const getPositionByWilaya = (wilaya) => {
    const positions = {
      'Alger': [36.7525, 3.0420],
      'ORAN': [35.6971, -0.6337],
      'Constantine': [36.3650, 6.6147],
    };
    return positions[wilaya] || [28.0339, 1.6596];
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    circumference: 288,
    rotation: 216,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    elements: {
      arc: {
        borderWidth: 0,
        borderRadius: 10,
        borderJoinStyle: 'round',
        spacing: 0
      }
    }
  };

  const createChartData = (value, maxValue, color) => {
    const filled = (value / maxValue) * 100;
    return {
      datasets: [{
        data: [filled, 100 - filled],
        backgroundColor: [color, '#f3f4f6'],
        borderWidth: 0
      }]
    };
  };

  const CircleChart = ({ data, value, color, icon, remarque }) => {
    return (
      <div className="relative w-28 h-28">
        <Doughnut data={data} options={doughnutOptions} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-1.5">
          {icon && (
            <div className="w-5 h-5 rounded-full bg-[#ECEAF8] flex items-center justify-center mt-2">
              <img src={icon} alt="icon" className="w-4 h-4" />
            </div>
          )}
          <span className="text-xs font-bold text-gray-900">{value}</span>
          <span className="text-[10px] font-bold text-[#404040]">{remarque}</span>
        </div>
      </div>
    );
  };

  const handlePuitSelect = (puitId) => {
    setSelectedPuit(puitId);
    setShowPuitList(false);
    setShowPuitDetails(true);
    
    if (mapRef.current && puitsData[puitId]) {
      mapRef.current.flyTo(puitsData[puitId].position, 12, {
        duration: 1.5
      });
    }
  };

  useEffect(() => {
    const results = Object.keys(puitsData).filter(puitId =>
      puitsData[puitId].name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      puitsData[puitId].wilaya.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPuits(results);
  }, [searchTerm, puitsData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des données des puits...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md">
          <strong className="font-bold">Erreur! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (!selectedPuit || Object.keys(puitsData).length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Aucun puit disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative rounded-xl overflow-hidden mb-8 bg-cover bg-center"
          style={{ backgroundImage: `url(${RecruitmentImage})` }}
        >
          <div className="p-8 flex flex-col md:flex-row mt-12 justify-center items-center">
            <div className="text-white md:w-1/2 mb-6 md:mb-0 md:pr-8 text-center">
              <h1 className="text-3xl font-bold mb-2">Suivez plus facilement vos projets</h1>
              <p className="text-lg text-blue-100 mb-4">
                Explorez les outils de forage et facilitez votre prise d'allégation.
              </p>
              <p className="text-blue-50">
                Suivez plus facilement l'état d'avancement de vos projets de forage et contrôlez coûts et délais !
              </p>
            </div>

            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-xs text-gray-500">Coût Total</p>
                    <p className="text-lg font-bold text-green-600">{(puitsData[selectedPuit].totalBudget / 100000).toFixed(1)}M</p>
                  </div>
                  <CircleChart
                    data={createChartData(puitsData[selectedPuit].totalBudget / 100000, 4, '#268F00')}
                    value={`${(puitsData[selectedPuit].totalBudget / 100000).toFixed(1)}M DZD`}
                    color="#268F00"
                    icon="/images/argent.png"
                    remarque="Excellent"
                  />
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-xs text-gray-500">Pour plus d'infos</p>
                  <button 
                    onClick={() => handleClick(puitsData[selectedPuit].id)}
                    className="bg-[#065882] hover:bg-[#054a6b] text-white text-xs font-bold py-2 px-4 rounded-[2%] w-20 flex items-center justify-center"
                  >
                    Détails
                  </button>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-xs text-gray-500">Délai Global</p>
                    <p className="text-lg font-bold text-orange-500">{puitsData[selectedPuit].globalDelay}/100</p>
                  </div>
                  <CircleChart
                    data={createChartData(puitsData[selectedPuit].globalDelay, 100, '#FF7700')}
                    value={puitsData[selectedPuit].globalDelay}
                    color="#FF7700"
                    icon="/images/delai.png"
                    remarque="Moyen"
                  />
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-xs text-gray-500">Pour plus d'infos</p>
                  <button 
                    onClick={() => handleClick(puitsData[selectedPuit].id)}
                    className="bg-[#065882] hover:bg-[#054a6b] text-white text-xs font-bold py-2 px-4 rounded-[2%] w-20 flex items-center justify-center"
                  >
                    Détails
                  </button>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-xs text-gray-500">Total problèmes</p>
                    <p className="text-lg font-bold text-red-500">09</p>
                  </div>
                  <CircleChart
                    data={createChartData(puitsData[selectedPuit].problems, 20, '#ef4444')}
                    value= '09'
                    color="#ef4444"
                  />
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-xs text-gray-500">Pour plus d'infos</p>
                  <button 
                    onClick={() => handleClick(puitsData[selectedPuit].id)}
                    className="bg-[#065882] hover:bg-[#054a6b] text-white text-xs font-bold py-2 px-4 rounded-[2%] w-20 flex items-center justify-center"
                  >
                    Détails
                  </button>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-xs text-gray-500">Efficacité</p>
                    <p className="text-lg font-bold text-blue-500">200+</p>
                  </div>
                  <CircleChart
                    data={createChartData(75, 100, '#3b82f6')}
                    value="200+"
                    color="#3b82f6"
                  />
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-xs text-gray-500">Efficacité globale</p>
                  <button 
                    onClick={() => handleClick(puitsData[selectedPuit].id)}
                    className="bg-[#065882] hover:bg-[#054a6b] text-white text-xs font-bold py-2 px-4 rounded-[2%] w-20 flex items-center justify-center"
                  >
                    Détails
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#054a6b] hover:bg-[#065882] text-white font-medium py-2 px-6 rounded-lg shadow"
              onClick={() => handleClick(puitsData[selectedPuit].id)}
            >
              Voir les détails
            </motion.button>
          </div>
        </div>

        <div className="relative mb-8">
          <div className="absolute top-0 right-0 z-10 mt-4 mr-4">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white p-3 shadow-md cursor-pointer rounded-lg w-48"
              onClick={() => setShowPuitList(!showPuitList)}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-gray-700">Sélectionner un puit</p>
                <svg 
                  className={`w-4 h-4 text-gray-500 transition-transform ${showPuitList ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </motion.div>
            
            <AnimatePresence>
              {showPuitList && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white shadow-lg mt-2 rounded-lg w-48 overflow-hidden"
                >
                  <div className="p-2 border-b">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Rechercher..."
                        className="w-full pl-8 pr-3 py-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <svg
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="max-h-60 overflow-y-auto">
                    {filteredPuits.length > 0 ? (
                      filteredPuits.map(puitId => (
                        <motion.div
                          key={puitId}
                          whileHover={{ backgroundColor: '#f8fafc' }}
                          className={`p-3 text-sm cursor-pointer flex items-center ${selectedPuit === puitId ? 'bg-gray-100 text-gray-800' : 'hover:bg-gray-50'}`}
                          onClick={() => handlePuitSelect(puitId)}
                        >
                          <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
                          {puitsData[puitId].name}
                        </motion.div>
                      ))
                    ) : (
                      <div className="p-3 text-sm text-gray-500 text-center">Aucun résultat</div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {showPuitDetails && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-0 right-0 z-10 mb-4 mr-4"
              >
                <div className="bg-white shadow-xl rounded-lg overflow-hidden w-80 border border-gray-200">
                  <div className="bg-gradient-to-r from-gray-700 to-gray-600 p-4 text-white">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-lg">{puitsData[selectedPuit].name}</h3>
                      <button 
                        className="text-white hover:text-gray-200 font-bold text-xl"
                        onClick={() => setShowPuitDetails(false)}
                      >
                        ×
                      </button>
                    </div>
                    <p className="text-sm opacity-90 mt-1">Wilaya: {puitsData[selectedPuit].wilaya}</p>
                    <p className="text-sm opacity-90">Localisation: {puitsData[selectedPuit].latitude}, {puitsData[selectedPuit].longitude}</p>
                  </div>
                  
                  <div className="p-4">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-600 border border-gray-100">Coût</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-orange-600 border border-gray-100">${puitsData[selectedPuit].cost.toLocaleString()}</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-600 border border-gray-100">Problèmes</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-orange-600 border border-gray-100">{puitsData[selectedPuit].problems}</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-600 border border-gray-100">Progression</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-orange-600 border border-gray-100">{puitsData[selectedPuit].progress}%</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-600 border border-gray-100">Budget total</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-orange-600 border border-gray-100">${(puitsData[selectedPuit].totalBudget / 1000000).toFixed(1)}M</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-600 border border-gray-100">Date début</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 border border-gray-100">{puitsData[selectedPuit].startDate}</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-600 border border-gray-100">Date fin prévue</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 border border-gray-100">{puitsData[selectedPuit].endDate}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                        <div className="border border-gray-100 p-2 rounded">
                          <span className="font-medium">X:</span> {puitsData[selectedPuit].x}
                        </div>
                        <div className="border border-gray-100 p-2 rounded">
                          <span className="font-medium">Y:</span> {puitsData[selectedPuit].y}
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-600 border border-gray-100 p-2 rounded">
                        <span className="font-medium">Élévation:</span> {puitsData[selectedPuit].elevation}
                      </div>
                      <div className="mt-2 text-xs text-gray-600 border border-gray-100 p-2 rounded">
                        <span className="font-medium">Statut:</span> {puitsData[selectedPuit].status}
                      </div>
                      <div className="mt-2 text-xs text-gray-600 border border-gray-100 p-2 rounded">
                        <span className="font-medium">statut couts:</span> {puitsData[selectedPuit].statut_cout}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 h-96 w-full">
            <MapContainer
              center={[28.0339, 1.6596]}
              zoom={5}
              style={{ height: '100%', width: '100%' }}
              className="z-0"
              whenCreated={(map) => { mapRef.current = map; }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <ZoomToMarker position={puitsData[selectedPuit]?.position} selectedPuit={selectedPuit} />
              {Object.keys(puitsData).map(puitId => (
                <Marker
                  key={puitId}
                  position={puitsData[puitId].position}
                  icon={customOrangeIcon}
                  eventHandlers={{
                    click: () => handlePuitSelect(puitId),
                  }}
                >
                  <Popup className="custom-popup">
                    <div className="font-bold text-gray-800">{puitsData[puitId].name}</div>
                    <div className="text-xs text-gray-600 mt-1">Wilaya: {puitsData[puitId].wilaya}</div>
                    <div className="text-xs text-gray-600">Progression: {puitsData[puitId].progress}%</div>
                    <div className="text-xs text-gray-600">Statut {puitsData[puitId].status}</div>
                    <div className="text-xs text-gray-600">Coût: ${puitsData[puitId].cost.toLocaleString()}</div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accueil;