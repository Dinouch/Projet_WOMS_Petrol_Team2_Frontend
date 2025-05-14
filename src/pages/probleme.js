import React, { useState } from "react";
import { FiSearch, FiX, FiFilter, FiChevronDown, FiChevronUp } from "react-icons/fi";

const ProblemsPage = () => {
  // Données préliminaires des problèmes avec des descriptions et solutions plus longues
  const initialProblems = [
    {
      id: 1,
      type: "Technique",
      description: "Panne majeure du système de pompage principal survenue lors de la maintenance programmée. Le moteur principal a cessé de fonctionner après seulement 2 heures d'utilisation, causant un arrêt complet de la production pendant 8 heures.",
      solution: "Après diagnostic, il s'est avéré que le problème venait d'une surchauffe du moteur due à un défaut du système de refroidissement. Nous avons remplacé le moteur défectueux par un nouveau modèle plus performant (réf. MOT-X4500) et mis à jour le firmware vers la version 2.4.5 qui inclut un meilleur contrôle thermique. Une inspection complète du système de refroidissement a également été effectuée.",
      date: "15/05/2025",
      status: "Résolu"
    },
    {
      id: 2,
      type: "Logistique",
      description: "Retard répété dans la livraison des pièces détachées critiques par notre fournisseur principal. Ce retard a causé l'arrêt de la ligne de production B pendant 3 jours consécutifs, avec un impact estimé à 120 000€ de perte de production.",
      solution: "Nous avons diversifié nos sources d'approvisionnement en signant un contrat avec un nouveau fournisseur local (Société Industrielle du Nord) capable de fournir 60% de nos besoins avec des délais garantis. Parallèlement, nous avons augmenté notre stock de sécurité pour les pièces critiques et mis en place un système de suivi en temps réel des livraisons.",
      date: "10/05/2025",
      status: "En cours"
    },
    {
      id: 3,
      type: "Sécurité",
      description: "Absence totale de signalisation dans la nouvelle zone de travail aménagée pour le projet d'extension. Plusieurs incidents mineurs ont été reportés dont un quasi-accident impliquant un chariot élévateur et un technicien.",
      solution: "Installation immédiate de panneaux de signalisation temporaires suivie d'une signalisation permanente conforme aux normes ISO 7010. Organisation de sessions de formation sécurité pour l'ensemble du personnel concerné (45 personnes) avec une attention particulière sur les nouvelles zones de circulation. Mise en place d'un audit sécurité hebdomadaire.",
      date: "08/05/2025",
      status: "Résolu"
    },
    {
      id: 4,
      type: "Environnement",
      description: "Fuites d'huile importantes détectées près du réservoir de stockage principal. Environ 150 litres d'huile industrielle se sont répandus dans la zone de confinement secondaire, avec un risque potentiel de contamination du sol.",
      solution: "Nettoyage immédiat par une équipe spécialisée avec récupération de 98% du produit. Inspection complète du réservoir révélant une fissure sur la paroi nord. Remplacement du réservoir et mise en place d'un programme d'inspection hebdomadaire renforcé. Formation supplémentaire de l'équipe de maintenance sur les procédures de détection précoce.",
      date: "05/05/2025",
      status: "Résolu"
    },
    {
      id: 5,
      type: "Technique",
      description: "Défaillance complète du système de monitoring environnemental dans le secteur C. Les capteurs de température, pression et qualité de l'air ne transmettent plus de données depuis 72h, empêchant toute surveillance conforme aux normes ISO 14001.",
      solution: "En attente des résultats de l'expertise approfondie par le fabricant du système. Mise en place temporaire de mesures manuelles toutes les 4 heures. Commande passée pour un ensemble de capteurs de remplacement en urgence. Évaluation en cours pour une possible migration vers un nouveau système plus fiable.",
      date: "03/05/2025",
      status: "En attente"
    },
    {
      id: 6,
      type: "Autre",
      description: "Problèmes récurrents de communication entre les équipes de jour et de nuit, entraînant des erreurs dans les transmissions d'information et plusieurs dysfonctionnements opérationnels. Les compte-rendus de poste sont souvent incomplets ou inexacts.",
      solution: "Mise en place de réunions quotidiennes de transition entre équipes avec un template standardisé pour les transmissions. Formation spécifique sur la communication inter-équipes pour 85 collaborateurs. Déploiement d'une application mobile dédiée aux transmissions avec des champs obligatoires. Audit prévu dans 3 mois pour évaluer l'efficacité des mesures.",
      date: "01/05/2025",
      status: "Résolu"
    },
    {
      id: 7,
      type: "Technique",
      description: "Dysfonctionnement intermittent du système de ventilation dans le laboratoire de contrôle qualité. Les variations de température et d'humidité compromettent la fiabilité de certains tests sensibles, avec déjà 3 lots de produits rejetés pour non-conformité.",
      solution: "Remplacement complet des contrôleurs climatiques après identification d'une défaillance électronique. Calibration des nouveaux équipements selon les protocoles stricts du laboratoire. Mise en place d'un enregistrement continu des paramètres environnementaux avec alarmes automatiques en cas de dérive.",
      date: "28/04/2025",
      status: "Résolu"
    },
    {
      id: 8,
      type: "Sécurité",
      description: "Découverte d'une faille dans le système de contrôle d'accès au secteur des archives techniques. Plusieurs employés non autorisés ont pu accéder à des documents classifiés sans être détectés pendant une période estimée à 2 semaines.",
      solution: "Mise à jour urgente du système de contrôle d'accès avec authentification à deux facteurs. Audit complet des droits d'accès et révocation des privilèges excessifs. Formation renforcée du personnel de sécurité. Installation de caméras supplémentaires et mise en place d'un journal de bord physique en complément du système électronique.",
      date: "25/04/2025",
      status: "Résolu"
    }
  ];

  const [problems, setProblems] = useState(initialProblems);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("Tous");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const problemTypes = ["Tous", "Technique", "Logistique", "Sécurité", "Environnement", "Autre"];
  const statusTypes = ["Tous", "Résolu", "En cours", "En attente"];

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = initialProblems.filter(problem => 
      (problem.type.toLowerCase().includes(term) ||
       problem.description.toLowerCase().includes(term) ||
       problem.solution.toLowerCase().includes(term)) &&
      (filterType === "Tous" || problem.type === filterType)
    );
    
    setProblems(filtered);
  };

  const handleFilterByType = (type) => {
    setFilterType(type);
    setShowFilters(false);
    
    if (type === "Tous") {
      setProblems(initialProblems);
    } else {
      const filtered = initialProblems.filter(problem => 
        problem.type === type && 
        (problem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
         problem.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
         problem.solution.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setProblems(filtered);
    }
  };

  const handleFilterByStatus = (status) => {
    if (status === "Tous") {
      setProblems(initialProblems);
    } else {
      const filtered = initialProblems.filter(problem => problem.status === status);
      setProblems(filtered);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterType("Tous");
    setProblems(initialProblems);
  };

  const openProblemDetails = (problem) => {
    setSelectedProblem(problem);
    setShowModal(true);
  };

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Styles constants
  const cardClass = "p-4 border border-gray-200 rounded-lg bg-gray-50 hover:shadow-sm transition-shadow h-full flex flex-col";
  const badgeClass = "text-xs font-medium px-2 py-1 rounded-full";
  const buttonClass = "px-3 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm";

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 pb-2 border-b border-gray-200">
        Liste des problèmes
      </h1>

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
                        className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {(searchTerm || filterType !== "Tous") && (
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
          {problems.length} problème(s) trouvé(s)
        </div>
      </div>

      {/* Liste des problèmes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {problems.length > 0 ? (
          problems.map(problem => (
            <div key={problem.id} className={cardClass}>
              <div className="flex justify-between items-start mb-2">
                <span className={`${badgeClass} ${
                  problem.type === "Technique" ? "bg-blue-100 text-blue-800" :
                  problem.type === "Logistique" ? "bg-purple-100 text-purple-800" :
                  problem.type === "Sécurité" ? "bg-red-100 text-red-800" :
                  problem.type === "Environnement" ? "bg-green-100 text-green-800" :
                  "bg-gray-100 text-gray-800"
                }`}>
                  {problem.type}
                </span>
                <span className={`${badgeClass} ${
                  problem.status === "Résolu" ? "bg-green-100 text-green-800" :
                  problem.status === "En cours" ? "bg-yellow-100 text-yellow-800" :
                  "bg-gray-100 text-gray-800"
                }`}>
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
                <span className="text-xs text-gray-500">{problem.date}</span>
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
                <span className={`${badgeClass} ${
                  selectedProblem.type === "Technique" ? "bg-blue-100 text-blue-800" :
                  selectedProblem.type === "Logistique" ? "bg-purple-100 text-purple-800" :
                  selectedProblem.type === "Sécurité" ? "bg-red-100 text-red-800" :
                  selectedProblem.type === "Environnement" ? "bg-green-100 text-green-800" :
                  "bg-gray-100 text-gray-800"
                }`}>
                  {selectedProblem.type}
                </span>
                <span className={`${badgeClass} ${
                  selectedProblem.status === "Résolu" ? "bg-green-100 text-green-800" :
                  selectedProblem.status === "En cours" ? "bg-yellow-100 text-yellow-800" :
                  "bg-gray-100 text-gray-800"
                }`}>
                  {selectedProblem.status}
                </span>
                <span className="text-sm text-gray-500">
                  {selectedProblem.date}
                </span>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-2">Description complète:</h3>
                <p className="text-gray-700 whitespace-pre-line">{selectedProblem.description}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-2">Solution mise en place:</h3>
                <p className="text-gray-700 whitespace-pre-line">{selectedProblem.solution}</p>
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