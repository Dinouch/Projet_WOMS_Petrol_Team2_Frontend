import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Truck, Calendar, Users, FileText, Building, DollarSign, Bell, Plus, Edit3, X } from 'lucide-react';
import puitop from '../photos/puitop.png'
const ListPuits = () => {
  const mapRef = useRef(null);
  const [selectedWell, setSelectedWell] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
   const navigate = useNavigate();

  // Données des puits pétroliers avec ingénieurs
  const wells = [
    { id: 1, name: 'A', status: 'active', profondeur: '89', operator: 'Sonatrach', region: 'Adrar', discovered: '1956', engineer: 'TAIBI Ryad' },
    { id: 2, name: 'B', status: 'active', profondeur: '100', operator: 'Sonatrach', region: 'Adrar', discovered: '1961', engineer: 'Fatima Khelifi' },
    { id: 3, name: 'In Amenas', status: 'maintenance', profondeur: '52', operator: 'BP-Sonatrach', region: 'Illizi', discovered: '2002', engineer: 'Mohamed Larbi' },
    { id: 4, name: 'In Salah', status: 'active', profondeur: '67', operator: 'BP-Sonatrach', region: 'Tamanrasset', discovered: '1989', engineer: 'Amina Boudjemaa' },
    { id: 5, name: 'Ourhoud', status: 'active', profondeur: '95', operator: 'Sonatrach', region: 'Ouargla', discovered: '1994', engineer: 'Karim Meziani' },
    { id: 6, name: 'Berkine', status: 'inactive', profondeur: '31', operator: 'Sonatrach', region: 'Ouargla', discovered: '2008', engineer: 'Sarah Hamidi' },
    { id: 7, name: 'Tin Fouye Tabankort', status: 'active', profondeur: '168', operator: 'Eni-Sonatrach', region: 'Illizi', discovered: '2004', engineer: 'Omar Bencheikh' },
    { id: 8, name: 'Menzel Ledjmet', status: 'active', profondeur: '210', operator: 'Sonatrach', region: 'Ouargla', discovered: '1999', engineer: 'Nadia Zerrouki' }
  ];

  // Filtrage des puits basé sur la recherche
  const filteredWells = wells.filter(well => 
    well.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    well.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
    well.engineer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Initialisation de la carte pour le puits sélectionné
  useEffect(() => {
    if (!mapRef.current || !selectedWell) return;

    const mapContainer = mapRef.current;
    mapContainer.innerHTML = '';
    
    // Container pour la carte stylisée
    const mapDiv = document.createElement('div');
    mapDiv.style.cssText = `
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%);
      position: relative;
      border-radius: 8px;
      overflow: hidden;
    `;

    // Ajout de lignes de grille
    for (let i = 0; i < 8; i++) {
      const line = document.createElement('div');
      line.style.cssText = `
        position: absolute;
        background: rgba(255,255,255,0.4);
        ${i % 2 === 0 ? 'width: 100%; height: 1px; top: ' + (i * 12.5) + '%' : 'height: 100%; width: 1px; left: ' + (i * 12.5) + '%'};
      `;
      mapDiv.appendChild(line);
    }

    // Marqueur centré pour le puits sélectionné
    const marker = document.createElement('div');
    marker.style.cssText = `
      position: absolute;
      width: 32px;
      height: 32px;
      background: #ea580c;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.4);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: white;
      font-weight: bold;
      animation: pulse 2s infinite;
    `;
    marker.innerHTML = '🛢️';
    
    // Animation CSS
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% { box-shadow: 0 4px 12px rgba(0,0,0,0.4), 0 0 0 0 rgba(234, 88, 12, 0.7); }
        70% { box-shadow: 0 4px 12px rgba(0,0,0,0.4), 0 0 0 15px rgba(234, 88, 12, 0); }
        100% { box-shadow: 0 4px 12px rgba(0,0,0,0.4), 0 0 0 0 rgba(234, 88, 12, 0); }
      }
    `;
    document.head.appendChild(style);
    
    mapDiv.appendChild(marker);
    mapContainer.appendChild(mapDiv);
  }, [selectedWell]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-400';
      case 'maintenance': return 'bg-orange-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'inactive': return 'Inactif';
      case 'maintenance': return 'Maintenance';
      default: return 'Inconnu';
    }
  };

  return (
    <div className="min-h-screen bg-orange-50">
      <div className="flex h-screen">
        {/* Liste des puits - Ajustement de la largeur */}
        <div className={`${selectedWell ? 'w-1/2' : 'w-full'} bg-white border-r border-gray-200 overflow-y-auto transition-all duration-300`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Liste des Puits Pétroliers</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Actif ({wells.filter(w => w.status === 'active').length})</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Maintenance ({wells.filter(w => w.status === 'maintenance').length})</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span>Inactif ({wells.filter(w => w.status === 'inactive').length})</span>
                </div>
              </div>
            </div>

            {/* Barre de recherche */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher par nom, région ou ingénieur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 placeholder-gray-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              {searchTerm && (
                <div className="mt-2 text-sm text-gray-600">
                  {filteredWells.length} résultat{filteredWells.length !== 1 ? 's' : ''} trouvé{filteredWells.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>

            {/* Grille des puits */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWells.map((well) => (
                <div
                  key={well.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    selectedWell?.id === well.id
                      ? 'border-orange-500 bg-orange-50 shadow-lg'
                      : 'border-gray-200 hover:border-orange-300 bg-white'
                  }`}
                  onClick={() => setSelectedWell(selectedWell?.id === well.id ? null : well)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(well.status)}`}></div>
                    <span className="text-xs text-gray-500 uppercase font-medium">
                      {getStatusText(well.status)}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">{well.name}</h3>
                    <p className="text-sm text-gray-600">{well.region}</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Progression:</span>
                      <span className="font-medium text-gray-900">{well.profondeur} ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Ingénieur:</span>
                      <span className="font-medium text-gray-900 text-xs">{well.engineer}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-center">
                    <div className="text-2xl">🛢️</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message si aucun résultat */}
            {filteredWells.length === 0 && searchTerm && (
              <div className="text-center py-8">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun puits trouvé</h3>
                <p className="text-gray-600">Essayez avec d'autres termes de recherche</p>
              </div>
            )}
          </div>
        </div>

        {/* Panneau de détails - Plus large maintenant */}
        {selectedWell && (
          <div className="w-1/2 bg-white overflow-y-auto border-l border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Détails du Puits</h3>
                <button 
                  onClick={() => setSelectedWell(null)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Informations principales */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-2xl font-semibold text-gray-900 mb-2">{selectedWell.name}</h4>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className={`w-4 h-4 rounded-full ${getStatusColor(selectedWell.status)}`}></div>
                    <span className="text-lg font-medium">{getStatusText(selectedWell.status)}</span>
                  </div>
                </div>

                {/* Statistiques principales */}
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6">
                  <h5 className="font-semibold text-gray-900 mb-4 text-lg">Informations Techniques</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4">
                      <span className="text-gray-600 text-sm">Progression</span>
                      <div className="font-bold text-xl text-orange-600">{selectedWell.profondeur} ft</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <span className="text-gray-600 text-sm">Découvert</span>
                      <div className="font-bold text-xl text-gray-900">{selectedWell.discovered}</div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Opérateur:</span>
                      <span className="font-medium">{selectedWell.operator}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Région:</span>
                      <span className="font-medium">{selectedWell.region}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ingénieur responsable:</span>
                      <span className="font-medium text-orange-600">{selectedWell.engineer}</span>
                    </div>
                  </div>
                </div>

                {/* Carte du puits sélectionné */}
                <div className="bg-white rounded-lg border border-orange-200 p-4">
                  <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                    Progression
                  </h5>
                  <img 
                      src={puitop}
                      alt="Logo WOMS" 
                      className="h-[70%] w-[70%]" // Ajustez la taille selon vos besoins
                    />
                    <div className="h-10 w-[70%]"> </div>
                  <button 
  onClick={() => navigate('/puit/1')}
  class="align-sub px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl shadow-md transition duration-300"
>
  Voir plus de détails
</button>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListPuits;