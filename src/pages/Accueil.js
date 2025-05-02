import { useState } from 'react';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import RecruitmentImage from '../Reqruitment.png'; 
import { useNavigate } from 'react-router-dom';

// Enregistrement des composants Chart.js
ChartJS.register(ArcElement);

// Configuration des icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// pour le marker orange
const customOrangeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
  //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  //iconUrl: '/images/markerorangebg.png', 
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png', 
  iconSize: [25, 41], 
  iconAnchor: [12, 41], 
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});



const Accueil = () => {
  const [selectedPuit, setSelectedPuit] = useState('A');
  const [showPuitList, setShowPuitList] = useState(false);
  const [showPuitDetails, setShowPuitDetails] = useState(false);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/puit'); // Rediriger vers la page /puit
  };


  
  // Données des puits
  const puitsData = {
    A: {
      name: "Puit A",
      position: [36.7525, 3.0420], // Alger
      x: '383877,717',
      y: '07°48\'38\'\'71797',
      latitude: '3375030,573',
      longitude: '30°30\'15\'\'12758',
      elevation: 'Z:1215,6m/Z:1255,6m',
      cost: 120000,
      problems: 15,
      progress: 65,
      monthlyCost: 100000,
      globalDelay: 58,
      totalBudget: 1600000
    },
    B: {
      name: "Puit B",
      position: [28.0339, 1.6596], // Sud Algérien
      x: '383878,123',
      y: '07°48\'39\'\'12345',
      latitude: '3375031,321',
      longitude: '30°30\'16\'\'54321',
      elevation: 'Z:1216,2m/Z:1256,8m',
      cost: 95000,
      problems: 8,
      progress: 42,
      monthlyCost: 85000,
      globalDelay: 42,
      totalBudget: 1200000
    },
    C: {
      name: "Puit C",
      position: [34.8828, -1.3167], // Oran
      x: '383879,456',
      y: '07°48\'40\'\'45678',
      latitude: '3375032,456',
      longitude: '30°30\'17\'\'98765',
      elevation: 'Z:1217,0m/Z:1257,5m',
      cost: 110000,
      problems: 12,
      progress: 58,
      monthlyCost: 95000,
      globalDelay: 51,
      totalBudget: 1400000
    }
  };

  // Options des graphiques cercle à 80%
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

  // Fonction pour créer les données des graphiques
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
        
        {/* Contenu centré sur le cercle */}
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
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
  <div className="max-w-7xl mx-auto">
    {/* Section indicateurs */}
    <div
      className="relative rounded-xl overflow-hidden mb-8 bg-cover bg-center"
      style={{ backgroundImage: `url(${RecruitmentImage})` }}
    >
      <div className="p-8 flex flex-col md:flex-row mt-12 justify-center items-center">
        {/* Texte à gauche */}
        <div className="text-white md:w-1/2 mb-6 md:mb-0 md:pr-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Suivez plus facilement vos projets</h1>
          <p className="text-lg text-blue-100 mb-4">
            Explorez les outils de forage et facilitez votre prise d'allégation.
          </p>
          <p className="text-blue-50">
            Suivez plus facilement l'état d'avancement de vos projets de forage et contrôlez coûts et délais !
          </p>
        </div>

            {/* Indicateurs à droite - 2 lignes de 2 indicateurs */}
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              {/* Coût Total - VERT */}
              <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-xs text-gray-500">Coût Total</p>
                    <p className="text-lg font-bold text-green-600">${(puitsData[selectedPuit].totalBudget / 1000000).toFixed(1)}M</p>
                  </div>
                  <CircleChart
                    data={createChartData(puitsData[selectedPuit].totalBudget / 1000000, 4, '#268F00')}
                    value={`${(puitsData[selectedPuit].totalBudget / 1000000).toFixed(1)}M $`}
                    color="#268F00"
                     icon="/images/argent.png"
                     remarque="Excellent"
                  />


                </div>
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-xs text-gray-500">U/UUX Designer Full Time</p>
                  <button className="bg-[#065882] hover:bg-[#054a6b] text-white text-xs font-bold py-2 px-4 rounded-[2%] w-20 flex items-center justify-center">
                    Apply
                  </button>
                </div>
              </div>

              {/* Délai Global - ORANGE */}
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
                  <p className="text-xs text-gray-500">U/UUX Designer Full Time</p>
                  <button className="bg-[#065882] hover:bg-[#054a6b] text-white text-xs font-bold py-2 px-4 rounded-[2%] w-20 flex items-center justify-center">
                    Apply
                  </button>
                </div>
              </div>

              {/* Total problèmes - ROUGE */}
              <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-xs text-gray-500">Total problèmes</p>
                    <p className="text-lg font-bold text-red-500">{puitsData[selectedPuit].problems}</p>
                  </div>
                  <CircleChart
                    data={createChartData(puitsData[selectedPuit].problems, 20, '#ef4444')}
                    value={puitsData[selectedPuit].problems}
                    color="#ef4444"
                  
                  />
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-xs text-gray-500">U/UUX Designer Full Time</p>
                  <button className="bg-[#065882] hover:bg-[#054a6b] text-white text-xs font-bold py-2 px-4 rounded-[2%] w-20 flex items-center justify-center">
                    Apply
                  </button>
                </div>
              </div>

              {/* Plus d'infos - BLEU */}
              <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-xs text-gray-500">Plus d'infos</p>
                    <p className="text-lg font-bold text-blue-500">200+</p>
                  </div>
                  <CircleChart
                    data={createChartData(75, 100, '#3b82f6')}
                    value="200+"
                    color="#3b82f6"
                  />
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-xs text-gray-500">Opportunités</p>
                  <button className="bg-[#065882] hover:bg-[#054a6b] text-white text-xs font-bold py-2 px-4 rounded-[2%] w-20 flex items-center justify-center">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-16">
              <button
                className="bg-[#054a6b] hover:bg-[#065882] text-white font-medium py-2 px-6 rounded-lg shadow"
                onClick={handleClick} // Appeler la fonction handleClick lors du clic
              >
                Voir les détails
              </button>
            </div>


        </div>

        {/* Carte de l'Algérie avec contrôles */}
        <div className="relative mb-8">
          {/* Contrôle de sélection en haut à droite */}
          <div className="absolute top-0 right-0 z-10 mt-4 mr-4">
            <div 
              className="bg-white p-3 shadow-md cursor-pointer rounded-sm w-40"
              onClick={() => setShowPuitList(!showPuitList)}
            >
              <p className="text-sm font-bold text-gray-700 text-center">Sélection</p>
            </div>
            
            {showPuitList && (
              <div className="bg-white shadow-md mt-2 p-2 rounded-sm w-40">
                {Object.keys(puitsData).map(puitId => (
                  <div
                    key={puitId}
                    className={`p-2 text-sm cursor-pointer text-center ${selectedPuit === puitId ? 'bg-blue-50 text-blue-800' : 'hover:bg-gray-50'}`}
                    onClick={() => handlePuitSelect(puitId)}
                  >
                    {puitsData[puitId].name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Détails du puit sélectionné en bas à droite */}
          {showPuitDetails && (
            <div className="absolute bottom-0 right-0 z-10 mb-4 mr-4">
              <div className="bg-white shadow-md p-4 rounded-sm w-64">
                <div className="flex justify-between items-center mb-3 border-b pb-2">
                  <h3 className="font-bold text-gray-800 text-lg">{puitsData[selectedPuit].name}</h3>
                  <button 
                    className="text-gray-500 hover:text-gray-700 font-bold"
                    onClick={() => setShowPuitDetails(false)}
                  >
                    ×
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500 font-medium">Coût</p>
                    <p className="font-mono text-gray-800">${puitsData[selectedPuit].cost.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium">Problèmes</p>
                    <p className="font-mono text-gray-800">{puitsData[selectedPuit].problems}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium">Progression</p>
                    <p className="font-mono text-gray-800">{puitsData[selectedPuit].progress}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium">Budget</p>
                    <p className="font-mono text-gray-800">${(puitsData[selectedPuit].totalBudget / 1000000).toFixed(1)}M</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500 font-medium">Localisation</p>
                    <p className="font-mono text-gray-800 text-xs">{puitsData[selectedPuit].latitude}, {puitsData[selectedPuit].longitude}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Carte */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 h-96 w-full">
            <MapContainer
              center={[28.0339, 1.6596]}
              zoom={5}
              style={{ height: '100%', width: '100%' }}
              className="z-0"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {Object.keys(puitsData).map(puitId => (
                <Marker
                key={puitId}
                position={puitsData[puitId].position}
                icon={customOrangeIcon}
                eventHandlers={{
                  click: () => handlePuitSelect(puitId),
                }}
              />
              
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accueil;