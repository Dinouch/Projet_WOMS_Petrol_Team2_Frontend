import { useState } from 'react';
import { FiUser, FiSettings, FiMapPin, FiCheck, FiX, FiChevronDown, FiSearch, FiClock } from 'react-icons/fi';

const EngineerAssignmentPage = () => {
  // Données préliminaires des ingénieurs
  const initialEngineers = [
  { id: 1, name: "Jean Dupont", specialty: "Ingénieur Forage", skills: ["Forage profond", "Géologie structurale", "Sécurité HSE"], experience: "12 ans", assignedWell: null, availability: "Disponible", lastAssignment: "15/03/2023" },
  { id: 2, name: "Marie Lambert", specialty: "Ingénieur Réservoir", skills: ["Analyse pétrophysique", "Simulation numérique", "Optimisation de production"], experience: "8 ans", assignedWell: 3, availability: "En mission", lastAssignment: "10/05/2023" },
  { id: 3, name: "Ahmed Khan", specialty: "Ingénieur Production", skills: ["Maintenance industrielle", "Optimisation des puits", "Instrumentation"], experience: "10 ans", assignedWell: 1, availability: "En congé", lastAssignment: "22/01/2023" },
  { id: 4, name: "Sophie Martin", specialty: "Ingénieur Forage", skills: ["Forage directionnel", "Fluides de forage", "Cimentation"], experience: "5 ans", assignedWell: null, availability: "Disponible", lastAssignment: "05/04/2023" },
  { id: 5, name: "Lucas Moreau", specialty: "Ingénieur Réservoir", skills: ["Modélisation 3D", "Géophysique", "Gestion de réservoir"], experience: "9 ans", assignedWell: 4, availability: "En mission", lastAssignment: "12/04/2023" },
  { id: 6, name: "Chloe Dubois", specialty: "Ingénieur HSE", skills: ["Audit sécurité", "Analyse de risque", "Normes ISO"], experience: "6 ans", assignedWell: null, availability: "Disponible", lastAssignment: "30/03/2023" },
  { id: 7, name: "Mohamed Amine", specialty: "Ingénieur Forage", skills: ["Cimentation", "Forage HPHT", "Sécurité puits"], experience: "11 ans", assignedWell: 5, availability: "En mission", lastAssignment: "01/04/2023" },
  { id: 8, name: "Fatima Zahra", specialty: "Ingénieur Géologue", skills: ["Sédimentologie", "Cartographie", "Échantillonnage"], experience: "4 ans", assignedWell: null, availability: "Disponible", lastAssignment: "14/02/2023" },
  { id: 9, name: "Hugo Lefevre", specialty: "Ingénieur Réservoir", skills: ["Analyse PVT", "Simulation EOR", "Répartition pression"], experience: "7 ans", assignedWell: 2, availability: "En mission", lastAssignment: "28/03/2023" },
  { id: 10, name: "Julie Caron", specialty: "Ingénieur Production", skills: ["Instrumentation", "Gestion pompes", "Séparation triphasique"], experience: "6 ans", assignedWell: 6, availability: "En congé", lastAssignment: "02/03/2023" },
  { id: 11, name: "Rami Benali", specialty: "Ingénieur Forage", skills: ["Casing", "Dynamitage", "Forage horizontal"], experience: "13 ans", assignedWell: null, availability: "Disponible", lastAssignment: "15/01/2023" },
  { id: 12, name: "Leila Bouchareb", specialty: "Ingénieur HSE", skills: ["Sécurité environnement", "Plan d'évacuation", "Analyse ATEX"], experience: "3 ans", assignedWell: null, availability: "Disponible", lastAssignment: "10/02/2023" },
  { id: 13, name: "Antoine Girard", specialty: "Ingénieur Réservoir", skills: ["Géostatistique", "Interprétation logs", "Puits horizontaux"], experience: "14 ans", assignedWell: 8, availability: "En mission", lastAssignment: "18/04/2023" },
  { id: 14, name: "Sarah Benyamina", specialty: "Ingénieur Production", skills: ["Pétrole brut", "Débitmètre", "Traitement eau"], experience: "9 ans", assignedWell: null, availability: "Disponible", lastAssignment: "09/04/2023" },
  { id: 15, name: "Karim Haddad", specialty: "Ingénieur Forage", skills: ["MWD", "LWD", "Prévention des pertes"], experience: "10 ans", assignedWell: 7, availability: "En mission", lastAssignment: "25/03/2023" },
  { id: 16, name: "Maya Bensalem", specialty: "Ingénieur Data", skills: ["Analyse Big Data", "Machine Learning", "Jupyter/Python"], experience: "2 ans", assignedWell: null, availability: "Disponible", lastAssignment: "12/01/2023" },
  { id: 17, name: "Thomas Muller", specialty: "Ingénieur Maintenance", skills: ["Pompes", "Vannes", "Compresseurs"], experience: "8 ans", assignedWell: 9, availability: "En mission", lastAssignment: "03/04/2023" },
  { id: 18, name: "Amel Ziani", specialty: "Ingénieur Sécurité", skills: ["Plans HAZOP", "Risque incendie", "Formation"], experience: "6 ans", assignedWell: null, availability: "Disponible", lastAssignment: "20/02/2023" },
  { id: 19, name: "Ali Meziani", specialty: "Ingénieur Réservoir", skills: ["Analyse de courbes", "Simulation dynamique", "Études de drainage"], experience: "12 ans", assignedWell: 10, availability: "En mission", lastAssignment: "04/04/2023" },
  { id: 20, name: "Isabelle Perrin", specialty: "Ingénieur Géologue", skills: ["Géochimie", "Profilage", "Forage exploratoire"], experience: "5 ans", assignedWell: null, availability: "Disponible", lastAssignment: "27/03/2023" },
  { id: 21, name: "Yacine Boudiaf", specialty: "Ingénieur Production", skills: ["Électropompes", "Séparateurs", "Tests de production"], experience: "7 ans", assignedWell: 1, availability: "En mission", lastAssignment: "11/03/2023" },
  { id: 22, name: "Nadia Chikhi", specialty: "Ingénieur HSE", skills: ["Écologie industrielle", "Conformité réglementaire", "Plan de prévention"], experience: "6 ans", assignedWell: null, availability: "Disponible", lastAssignment: "01/02/2023" },
  { id: 23, name: "Marc Renault", specialty: "Ingénieur Forage", skills: ["Dérivation puits", "Risque surpression", "BOP"], experience: "15 ans", assignedWell: null, availability: "Disponible", lastAssignment: "19/01/2023" },
  { id: 24, name: "Selma Habbassi", specialty: "Ingénieur Réservoir", skills: ["Balance matière", "Modèles Black Oil", "Réservoir fracturé"], experience: "9 ans", assignedWell: 2, availability: "En mission", lastAssignment: "08/04/2023" },
  { id: 25, name: "Julien Morel", specialty: "Ingénieur Production", skills: ["Turbines", "Instrumentation SCADA", "Surveillance en temps réel"], experience: "11 ans", assignedWell: null, availability: "Disponible", lastAssignment: "03/04/2023" }
];


  // Données préliminaires des puits
  const initialWells = [
  { id: 1, name: "Puit Adrar", location: "Bloc Nord-Est", depth: 3500, status: "En production", production: "1200 barils/jour" },
  { id: 2, name: "Puit Tindouf", location: "Bloc Central", depth: 2800, status: "En forage", production: "Nouveau forage" },
  { id: 3, name: "Puit Galma", location: "Bloc Sud-Ouest", depth: 4200, status: "En maintenance", production: "Arrêt technique" },
  { id: 4, name: "Puit Hassi Mesoud", location: "Bloc Ouest", depth: 3100, status: "En développement", production: "Tests en cours" },
  { id: 5, name: "Puit Gherdaia", location: "Bloc Est", depth: 2900, status: "En production", production: "980 barils/jour" },
  { id: 6, name: "Puit Tizaouatine", location: "Bloc Sud", depth: 3300, status: "En test", production: "Analyse en cours" },
  { id: 7, name: "Puit Djanet", location: "Bloc Nord-Ouest", depth: 3700, status: "En forage", production: "En phase initiale" },
  { id: 8, name: "Puit Hassi Rmel", location: "Bloc Central-Est", depth: 3000, status: "En maintenance", production: "Pompe HS" },
  { id: 9, name: "Puit Bechar", location: "Bloc Sud-Est", depth: 4100, status: "En développement", production: "Installation en cours" },
  { id: 10, name: "Puit Biskra", location: "Bloc Nord", depth: 3400, status: "En production", production: "1020 barils/jour" }
];


  const [engineers, setEngineers] = useState(initialEngineers);
  const [wells] = useState(initialWells);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEngineer, setSelectedEngineer] = useState(null);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);

  // Fonctions utilitaires
  const getAssignedWellName = (wellId) => {
    const well = wells.find(w => w.id === wellId);
    return well ? `${well.name} (${well.location})` : 'Non affecté';
  };

  const getWellStatusColor = (status) => {
    switch(status) {
      case 'En production': return 'bg-green-100 text-green-800';
      case 'En forage': return 'bg-orange-100 text-orange-800';
      case 'En maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'En développement': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityColor = (status) => {
    switch(status) {
      case 'Disponible': return 'bg-green-100 text-green-800';
      case 'En mission': return 'bg-orange-100 text-orange-800';
      case 'En congé': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredEngineers = engineers.filter(engineer => {
  const searchLower = searchTerm.toLowerCase();
  return (
    engineer.name.toLowerCase().includes(searchLower) ||
    engineer.specialty.toLowerCase().includes(searchLower) ||
    engineer.skills.some(skill => skill.toLowerCase().includes(searchLower)) ||
    (engineer.assignedWell && getAssignedWellName(engineer.assignedWell).toLowerCase().includes(searchLower))
  );
});

  // Gestion des affectations
  const handleAssignWell = (engineerId, wellId) => {
    setEngineers(prev => 
      prev.map(eng => 
        eng.id === engineerId 
          ? { 
              ...eng, 
              assignedWell: wellId, 
              availability: "En mission",
              lastAssignment: new Date().toLocaleDateString('fr-FR') 
            } 
          : eng
      )
    );
    setShowAssignmentModal(false);
  };

  const handleUnassign = (engineerId) => {
    setEngineers(prev => 
      prev.map(eng => 
        eng.id === engineerId 
          ? { 
              ...eng, 
              assignedWell: null, 
              availability: "Disponible" 
            } 
          : eng
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            <span className="text-orange-600">Affectation</span> des Ingénieurs
          </h1>
          <p className="text-gray-600 mt-1">Gestion des ressources humaines pour les opérations de forage</p>
        </div>

        {/* Barre de recherche */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un ingénieur, spécialité ou compétence..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700"
            />
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500">Total ingénieurs</p>
            <p className="text-2xl font-bold text-orange-600">{engineers.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500">En mission</p>
            <p className="text-2xl font-bold text-orange-600">{engineers.filter(e => e.availability === 'En mission').length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500">Disponibles</p>
            <p className="text-2xl font-bold text-orange-600">{engineers.filter(e => e.availability === 'Disponible').length}</p>
          </div>
        </div>

        {/* Liste des ingénieurs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredEngineers.map(engineer => (
            <div key={engineer.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4">
                {/* En-tête */}
                <div className="flex items-start space-x-3 mb-3">
                  <div className="bg-orange-50 p-2 rounded-full">
                    <FiUser className="text-orange-600" size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 truncate">{engineer.name}</h3>
                    <p className="text-sm text-orange-600 truncate">{engineer.specialty}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getAvailabilityColor(engineer.availability)}`}>
                    {engineer.availability}
                  </span>
                </div>

                {/* Détails */}
                <div className="space-y-2 text-sm mb-3">
                  <p className="text-gray-600 flex items-center">
                    <FiClock className="mr-2 text-orange-500" size={14} />
                    Expérience: <span className="text-gray-800 ml-1">{engineer.experience}</span>
                  </p>
                  {engineer.lastAssignment && (
                    <p className="text-gray-600">
                      Dernière mission: <span className="text-gray-800">{engineer.lastAssignment}</span>
                    </p>
                  )}
                </div>

                {/* Compétences */}
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-1">Compétences:</p>
                  <div className="flex flex-wrap gap-1">
                    {engineer.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Affectation */}
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-600">Puit affecté:</p>
                    <p className="text-sm font-medium text-gray-800">
                      {getAssignedWellName(engineer.assignedWell)}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedEngineer(engineer);
                        setShowAssignmentModal(true);
                      }}
                      className={`flex-1 text-sm py-1.5 rounded-lg flex items-center justify-center ${
                        engineer.assignedWell 
                          ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' 
                          : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                      }`}
                    >
                      {engineer.assignedWell ? 'Modifier' : 'Affecter'}
                    </button>

                    {engineer.assignedWell && (
                      <button
                        onClick={() => handleUnassign(engineer.id)}
                        className="text-sm py-1.5 px-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center"
                      >
                        <FiX size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal d'affectation */}
      {showAssignmentModal && selectedEngineer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Affecter {selectedEngineer.name}
                </h2>
                <button 
                  onClick={() => setShowAssignmentModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Sélectionnez un puit :</p>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {wells.map(well => (
                    <button
                      key={well.id}
                      onClick={() => handleAssignWell(selectedEngineer.id, well.id)}
                      className={`w-full text-left p-3 rounded-lg border ${
                        selectedEngineer.assignedWell === well.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-800">{well.name}</p>
                          <p className="text-sm text-gray-600">{well.location}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getWellStatusColor(well.status)}`}>
                          {well.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Profondeur: {well.depth}m • {well.production}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowAssignmentModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EngineerAssignmentPage;