import React, { useState, useEffect } from "react";
import { FiSearch, FiX, FiFilter, FiChevronDown, FiChevronUp } from "react-icons/fi";
import axios from "axios";

const ProblemsPage = () => {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("Tous");
  const [filterStatus, setFilterStatus] = useState("Tous");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const problemTypes = ["Tous", "Technique", "Logistique", "Sécurité", "Environnement", "Autre"];
  const statusTypes = ["Tous", "Résolu", "En cours", "En attente"];

  useEffect(() => {
    // Récupération des données depuis l'API
    const fetchProblems = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8090/test_j2ee/problemes-solutions');
        
        // Transformation des données pour correspondre au format attendu
        const formattedData = response.data.map(item => ({
          id: item.id,
          type: item.typeProbleme,
          description: item.descriptionProbleme,
          solution: item.descriptionSolution,
          date: new Date().toLocaleDateString('fr-FR'), // Date d'aujourd'hui comme fallback
          status: item.etat // Statut par défaut si non fourni par l'API
        }));
        
        setProblems(formattedData);
        setFilteredProblems(formattedData);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des données:", err);
        setError("Impossible de charger les données. Veuillez réessayer plus tard.");
        setLoading(false);
        
        // En cas d'erreur, utiliser des données de démonstration
        const demoData = [
          {
            id: 1,
            type: "Technique",
            description: "Panne majeure du système de pompage principal survenue lors de la maintenance programmée.",
            solution: "Après diagnostic, il s'est avéré que le problème venait d'une surchauffe du moteur due à un défaut du système de refroidissement.",
            date: "15/05/2025",
            status: "Résolu"
          },
          {
            id: 2,
            type: "Sécurité",
            description: "Absence totale de signalisation dans la nouvelle zone de travail aménagée pour le projet d'extension.",
            solution: "Installation immédiate de panneaux de signalisation temporaires suivie d'une signalisation permanente conforme aux normes ISO 7010.",
            date: "08/05/2025",
            status: "En cours"
          }
        ];
        setProblems(demoData);
        setFilteredProblems(demoData);
      }
    };

    fetchProblems();
  }, []);

  useEffect(() => {
    // Appliquer les filtres lorsque searchTerm, filterType ou filterStatus changent
    applyFilters();
  }, [searchTerm, filterType, filterStatus]);

  const applyFilters = () => {
    let result = [...problems];
    
    // Filtre par terme de recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(problem => 
        problem.type.toLowerCase().includes(term) ||
        problem.description.toLowerCase().includes(term) ||
        (problem.solution && problem.solution.toLowerCase().includes(term))
      );
    }
    
    // Filtre par type
    if (filterType !== "Tous") {
      result = result.filter(problem => problem.type === filterType);
    }
    
    // Filtre par statut
    if (filterStatus !== "Tous") {
      result = result.filter(problem => problem.status === filterStatus);
    }
    
    setFilteredProblems(result);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterByType = (type) => {
    setFilterType(type);
    setShowFilters(false);
  };

  const handleFilterByStatus = (status) => {
    setFilterStatus(status);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterType("Tous");
    setFilterStatus("Tous");
  };

  const openProblemDetails = (problem) => {
    setSelectedProblem(problem);
    setShowModal(true);
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Styles constants
  const cardClass = "p-4 border border-gray-200 rounded-lg bg-gray-50 hover:shadow-sm transition-shadow h-full flex flex-col";
  const badgeClass = "text-xs font-medium px-2 py-1 rounded-full";
  const buttonClass = "px-3 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm";

  const getTypeBadgeStyle = (type) => {
    switch(type) {
      case "Technique": return "bg-blue-100 text-blue-800";
      case "Logistique": return "bg-purple-100 text-purple-800";
      case "Sécurité": case "SECURITE": return "bg-red-100 text-red-800";
      case "Environnement": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch(status) {
      case "Résolu": return "bg-green-100 text-green-800";
      case "En cours": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 flex justify-center items-center h-64">
        <p className="text-gray-500">Chargement des problèmes...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 pb-2 border-b border-gray-200">
        Liste des problèmes
      </h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Barre de recherche et filtres */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Rechercher par type, description ou solution..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-gray-700"
            />
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-4 py-2 border rounded-lg ${showFilters ? "border-orange-500 bg-orange-50" : "border-gray-300"}`}
            >
              <FiFilter className="mr-2 text-orange-500" />
              <span className="text-sm text-gray-700">Filtrer</span>
              {showFilters ? <FiChevronUp className="ml-2" /> : <FiChevronDown className="ml-2" />}
            </button>
            
            {showFilters && (
              <div className="absolute right-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-3">
                <div className="mb-3">
                  <p className="text-xs font-medium text-gray-500 mb-1">Type de problème</p>
                  <div className="grid grid-cols-2 gap-1">
                    {problemTypes.map(type => (
                      <button
                        key={type}
                        onClick={() => handleFilterByType(type)}
                        className={`text-xs px-2 py-1 rounded-full text-left ${
                          filterType === type ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-xs font-medium text-gray-500 mb-1">Statut</p>
                  <div className="grid grid-cols-3 gap-1">
                    {statusTypes.map(status => (
                      <button
                        key={status}
                        onClick={() => handleFilterByStatus(status)}
                        className={`text-xs px-2 py-1 rounded-full ${
                          filterStatus === status ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {(searchTerm || filterType !== "Tous" || filterStatus !== "Tous") && (
            <button
              onClick={clearFilters}
              className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100"
            >
              <FiX className="mr-1" />
              Réinitialiser
            </button>
          )}
        </div>
        
        <div className="text-sm text-gray-500">
          {filteredProblems.length} problème(s) trouvé(s)
        </div>
      </div>

      {/* Liste des problèmes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProblems.length > 0 ? (
          filteredProblems.map(problem => (
            <div key={problem.id} className={cardClass}>
              <div className="flex justify-between items-start mb-2">
                <span className={`${badgeClass} ${getTypeBadgeStyle(problem.type)}`}>
                  {problem.type}
                </span>
                <span className={`${badgeClass} ${getStatusBadgeStyle(problem.status)}`}>
                  {problem.status}
                </span>
              </div>
              
              <h3 className="font-medium text-gray-800 mt-2 mb-1">{truncateText(problem.description, 70)}</h3>
              
              {problem.solution && (
                <div className="mt-2 mb-3">
                  <p className="text-xs font-medium text-gray-500 mb-1">Solution:</p>
                  <p className="text-sm text-gray-700">{truncateText(problem.solution, 80)}</p>
                </div>
              )}
              
              <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-200">
                <span className="text-xs text-gray-500">{problem.date || "N/A"}</span>
                <button 
                  onClick={() => openProblemDetails(problem)}
                  className={`${buttonClass} text-xs px-2 py-1`}
                >
                  Voir détails
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">Aucun problème trouvé</p>
            <button 
              onClick={clearFilters}
              className="mt-2 text-orange-500 hover:text-orange-700 text-sm"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      {/* Modal pour afficher les détails complets */}
      {showModal && selectedProblem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-800">{selectedProblem.type}</h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <span className={`${badgeClass} ${getTypeBadgeStyle(selectedProblem.type)}`}>
                  {selectedProblem.type}
                </span>
                <span className={`${badgeClass} ${getStatusBadgeStyle(selectedProblem.status)}`}>
                  {selectedProblem.status}
                </span>
                <span className="text-sm text-gray-500">
                  {selectedProblem.date || "N/A"}
                </span>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-2">Description complète:</h3>
                <p className="text-gray-700 whitespace-pre-line">{selectedProblem.description}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-2">Solution mise en place:</h3>
                <p className="text-gray-700 whitespace-pre-line">{selectedProblem.solution || "Aucune solution enregistrée."}</p>
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className={`${buttonClass} px-4 py-2`}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemsPage;