import React, { useState } from "react";
import axios from "axios";
import { 
  FiCalendar, 
  FiUpload, 
  FiX, 
  FiChevronDown, 
  FiCheck, 
  FiPlus, 
  FiMinus,
  FiFile
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ReportPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titre: "",
    ref: "",
    description: "",
    date: "",
    problems: []
  });

  // Configuration Axios
  const api = axios.create({
    baseURL: 'http://localhost:8090/test_j2ee',
    withCredentials: true,
    headers: {
      'Accept': 'application/json'
    }
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [files, setFiles] = useState([]);
  const [showRefList, setShowRefList] = useState(false);
  const [uploadHover, setUploadHover] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentProblem, setCurrentProblem] = useState({
    type: "",
    description: "",
    solution: ""
  });
  const [showSolution, setShowSolution] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const refOptions = generateRefOptions();
  const problemTypes = [
    "Technique",
    "Logistique",
    "Sécurité",
    "Environnement",
    "Autre"
  ];

  function generateRefOptions() {
    return Array.from({ length: 12 }, (_, i) => {
      const month = (i + 1).toString().padStart(2, '0');
      return `${month}/2025`;
    });
  }

  function generateDateOptions() {
    const options = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      options.push({
        value: `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}/${year}`,
        label: `${day}/${month + 1}/${year}`
      });
    }
    return options;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProblemChange = (e) => {
    const { name, value } = e.target;
    setCurrentProblem(prev => ({ ...prev, [name]: value }));
  };

  const addProblem = () => {
    if (currentProblem.type && currentProblem.description) {
      setFormData(prev => ({
        ...prev,
        problems: [...prev.problems, currentProblem]
      }));
      setCurrentProblem({
        type: "",
        description: "",
        solution: ""
      });
      setShowSolution(false);
    }
  };

  const removeProblem = (index) => {
    setFormData(prev => ({
      ...prev,
      problems: prev.problems.filter((_, i) => i !== index)
    }));
  };

  const handleDateSelect = (dateStr) => {
    setFormData(prev => ({ ...prev, date: dateStr }));
    setShowDatePicker(false);
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    const validFiles = uploadedFiles.filter(file => 
      file.name.match(/\.(xlsx|xls)$/i)
    );
    
    if (validFiles.length !== uploadedFiles.length) {
      setError("Seuls les fichiers .xlsx et .xls sont acceptés");
    } else {
      setFiles(prev => [...prev, ...validFiles]);
      setError(null);
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
    setUploadHover(false);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const selectRef = (ref) => {
    setFormData(prev => ({ ...prev, ref }));
    setShowRefList(false);
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(direction === 'prev' ? prev.getMonth() - 1 : prev.getMonth() + 1);
      return newMonth;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      
      // Ajouter les fichiers
      files.forEach(file => {
        formDataToSend.append('excelFile', file);
      });
      
      // Ajouter les données du formulaire
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'problems') {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, value);
        }
      });

      console.log("Envoi des données:", formData);
      console.log("Fichiers à envoyer:", files.map(f => f.name));

      // Envoyer une requête 
      const response = await api.post('/upload-excel', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("Réponse du serveur:", response.data);

      setShowSuccess(true);
      setTimeout(() => {
        navigate('/acceuil');
      }, 3000);
    } catch (err) {
      console.error('Erreur:', err);
      setError(err.response?.data?.message || "Une erreur est survenue lors de l'envoi");
    } finally {
      setUploading(false);
    }
  };

  const renderDatePicker = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    return (
      <div className="absolute z-10 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        <div className="flex justify-between items-center mb-2">
          <button 
            onClick={() => navigateMonth('prev')}
            className="p-1 text-gray-600 hover:bg-gray-100 rounded"
          >
            &lt;
          </button>
          <span className="font-medium text-gray-700">
            {currentMonth.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}
          </span>
          <button 
            onClick={() => navigateMonth('next')}
            className="p-1 text-gray-600 hover:bg-gray-100 rounded"
          >
            &gt;
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-xs text-center mb-2 text-gray-500">
          {['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'].map(day => (
            <div key={day} className="py-1">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array(firstDay).fill().map((_, i) => (
            <div key={`empty-${i}`} className="h-8"></div>
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const dateStr = `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}/${year}`;
            const isSelected = formData.date === dateStr;
            
            return (
              <button
                key={day}
                onClick={() => handleDateSelect(dateStr)}
                className={`h-8 w-8 flex items-center justify-center rounded-full mx-auto text-sm ${
                  isSelected ? "bg-orange-500 text-white" : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Styles
  const inputClass = "w-full bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-gray-700 transition-colors";
  const buttonClass = "px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-sm disabled:opacity-50";
  const sectionTitleClass = "text-lg font-semibold mb-3 text-gray-800 border-l-4 border-orange-500 pl-3";

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center animate-fade-in">
            <FiCheck className="mr-2" size={20} />
            <span>Rapport envoyé avec succès! Redirection en cours...</span>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6 text-gray-800 pb-2 border-b border-gray-200">
        Nouveau Rapport de Forage
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Titre */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Titre Du Rapport</label>
          <input
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleInputChange}
            placeholder="Entrez le titre de votre rapport"
            className={inputClass}
            required
          />
        </div>

        {/* Référence de puit */}
        <div className="mb-6 relative">
          <label className={sectionTitleClass}>Référence de puit</label>
          <div className="relative">
            <input
              type="text"
              value={formData.ref}
              readOnly
              onClick={() => setShowRefList(!showRefList)}
              placeholder="Sélectionnez une référence"
              className={`${inputClass} cursor-pointer pr-10`}
              required
            />
            <FiChevronDown 
              className={`absolute right-3 top-3 text-gray-500 transition-transform ${
                showRefList ? "rotate-180" : ""
              }`}
              size={18}
            />
            {showRefList && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                {refOptions.map((option, i) => (
                  <div
                    key={i}
                    className={`px-4 py-2 hover:bg-gray-50 cursor-pointer ${
                      formData.ref === option ? "bg-orange-50 text-orange-600" : "text-gray-700"
                    }`}
                    onClick={() => selectRef(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className={sectionTitleClass}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Décrivez les activités de forage..."
            className={`${inputClass} h-32`}
            required
          />
        </div>

        {/* Date */}
        <div className="mb-6 relative">
          <label className={sectionTitleClass}>Date</label>
          <div className="relative">
            <input
              type="text"
              value={formData.date}
              readOnly
              onClick={() => setShowDatePicker(!showDatePicker)}
              placeholder="JJ/MM/AAAA"
              className={`${inputClass} cursor-pointer pr-10`}
              required
            />
            <FiCalendar 
              className="absolute right-3 top-3 text-gray-500"
              size={18}
            />
            {showDatePicker && renderDatePicker()}
          </div>
        </div>

        {/* Problèmes rencontrés */}
        <div className="mb-6">
          <label className={sectionTitleClass}>Problèmes rencontrés</label>
          
          {formData.problems.map((problem, index) => (
            <div key={index} className="mb-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-800">{problem.type}</p>
                  <p className="text-gray-600 mt-1 text-sm">{problem.description}</p>
                  {problem.solution && (
                    <div className="mt-2">
                      <p className="font-medium text-green-600 text-sm">Solution proposée:</p>
                      <p className="text-gray-600 text-sm">{problem.solution}</p>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeProblem(index)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={16} />
                </button>
              </div>
            </div>
          ))}

          {/* Formulaire pour ajouter un problème */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h3 className="font-medium text-gray-700 mb-3">Ajouter un problème</h3>
            
            <div className="mb-3">
              <label className="block text-gray-700 mb-1 text-sm">Type de problème</label>
              <select
                name="type"
                value={currentProblem.type}
                onChange={handleProblemChange}
                className={`${inputClass} text-sm py-2`}
              >
                <option value="">Sélectionnez un type</option>
                {problemTypes.map((type, i) => (
                  <option key={i} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="block text-gray-700 mb-1 text-sm">Description</label>
              <textarea
                name="description"
                value={currentProblem.description}
                onChange={handleProblemChange}
                className={`${inputClass} h-20 text-sm`}
                placeholder="Décrivez le problème rencontré..."
              />
            </div>

            <button
              type="button"
              onClick={() => setShowSolution(!showSolution)}
              className="flex items-center text-orange-600 mb-3 text-sm"
            >
              {showSolution ? <FiMinus className="mr-1" size={14} /> : <FiPlus className="mr-1" size={14} />}
              {showSolution ? "Masquer la solution" : "Ajouter une solution"}
            </button>

            {showSolution && (
              <div className="mb-3">
                <label className="block text-gray-700 mb-1 text-sm">Solution proposée</label>
                <textarea
                  name="solution"
                  value={currentProblem.solution}
                  onChange={handleProblemChange}
                  className={`${inputClass} h-20 text-sm`}
                  placeholder="Décrivez la solution proposée..."
                />
              </div>
            )}

            <button
              type="button"
              onClick={addProblem}
              className={`${buttonClass} flex items-center text-sm px-3 py-1.5`}
              disabled={!currentProblem.type || !currentProblem.description}
            >
              <FiPlus className="mr-1" size={14} />
              Ajouter le problème
            </button>
          </div>
        </div>

        {/* Upload de fichiers */}
        <div className="mb-6">
          <label className={sectionTitleClass}>Fichiers Excel</label>
          <p className="text-gray-600 mb-4 text-sm">
            Veuillez uploader des fichiers au format .xls ou .xlsx
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <hr className="border-gray-200 my-4" />

          {files.length === 0 ? (
            <div 
              className={`text-center py-12 border-2 border-dashed rounded-lg transition-all ${
                uploadHover ? "border-orange-300 bg-orange-50" : "border-gray-300 bg-gray-50"
              }`}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={() => setUploadHover(true)}
              onDragLeave={() => setUploadHover(false)}
              onDrop={handleFileDrop}
            >
              <FiUpload className="mx-auto text-orange-400 mb-3" size={24} />
              <p className="font-medium text-gray-600 mb-3">Aucun fichier uploadé</p>
              <label className={`${buttonClass} inline-flex items-center px-5 py-1.5 text-sm cursor-pointer`}>
                <FiUpload className="mr-1" size={14} />
                Sélectionner des fichiers
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                />
              </label>
              <p className="text-xs text-gray-500 mt-3">
                Ou glissez-déposez vos fichiers ici
              </p>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <ul className="mb-4">
                {files.map((file, i) => (
                  <li key={i} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                    <div className="flex items-center">
                      <FiFile className="mr-2 text-gray-500" size={16} />
                      <span className="text-gray-700 text-sm truncate max-w-xs">{file.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FiX size={16} />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end space-x-3">
                <button 
                  type="button"
                  onClick={() => setFiles([])}
                  className="px-3 py-1.5 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 text-sm"
                >
                  Tout supprimer
                </button>
                <label className={`${buttonClass} px-4 py-1.5 text-sm cursor-pointer`}>
                  <FiPlus className="mr-1" size={14} />
                  Ajouter d'autres fichiers
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Bouton de soumission */}
        <div className="flex justify-end mt-8 pt-4 border-t border-gray-200">
          <button
            type="submit"
            className={`${buttonClass} px-6 py-2.5 text-sm font-medium flex items-center`}
            disabled={uploading || showSuccess || files.length === 0}
          >
            {uploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Envoi en cours...
              </>
            ) : (
              <>
                <FiUpload className="mr-2" size={16} />
                Envoyer le rapport
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportPage;