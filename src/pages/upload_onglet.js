import React, { useState } from "react";
import { FiUpload, FiFileText, FiX, FiChevronDown, FiCheck, FiPlus, FiMinus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import DrillingReportForm from "./upload_manuel";
import ReportPage from "./upload";

const Uploadonglet = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("excel"); // 'manual' ou 'excel'
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/acceuil');
    }, 3000);
  };

  // Styles
  const inputClass = "w-full bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-gray-700 transition-colors";
  const buttonClass = "px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-sm";
  const tabButtonClass = "px-4 py-2 font-medium text-sm flex items-center";
  const activeTabClass = "border-b-2 border-orange-500 text-orange-600";

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center animate-fade-in">
            <FiCheck className="mr-2" size={20} />
            <span>Rapport envoyé avec succès! Redirection en cours...</span>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6 text-gray-800 pb-2 border-b border-gray-200">
        Création de rapport de forage
      </h1>

      {/* Onglets */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`${tabButtonClass} ${activeTab === 'excel' ? activeTabClass : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('excel')}
        >
          <FiUpload className="mr-2" />
          Import Excel
        </button>
        <button
          className={`${tabButtonClass} ${activeTab === 'manual' ? activeTabClass : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('manual')}
        >
          <FiFileText className="mr-2" />
          Saisie manuelle
        </button>
      </div>

      {/* Contenu des onglets */}
      <div>
        {activeTab === 'excel' ? (
          <ReportPage />
        ) : (
          <DrillingReportForm />
        )}
      </div>
    </div>
  );
};

export default Uploadonglet;