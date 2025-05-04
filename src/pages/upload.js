import React, { useState } from "react";
import { FiCalendar, FiUpload, FiX, FiChevronDown } from "react-icons/fi";

const ReportPage = () => {
  // États initiaux vides
  const [formData, setFormData] = useState({
    assurance: "",
    ref: "",
    description: "",
    date: ""
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [files, setFiles] = useState([]);
  const [showRefList, setShowRefList] = useState(false);
  const [uploadHover, setUploadHover] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Données dynamiques
  const refOptions = generateRefOptions();
  const dateOptions = generateDateOptions();

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

  // Gestionnaires d'événements
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateSelect = (dateStr) => {
    setFormData(prev => ({ ...prev, date: dateStr }));
    setShowDatePicker(false);
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles(uploadedFiles);
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

  // Styles constants
  const inputClass = "w-full bg-gray-50 rounded-lg px-4 py-3 border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700";
  const buttonClass = "px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors";

  // Render Date Picker
  const renderDatePicker = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    return (
      <div className="absolute z-10 mt-1 w-64 bg-white border border-orange-300 rounded-lg shadow-lg p-3">
        <div className="flex justify-between items-center mb-2">
          <button 
            onClick={() => navigateMonth('prev')}
            className="p-1 text-orange-600 hover:bg-orange-50 rounded"
          >
            &lt;
          </button>
          <span className="font-medium text-orange-700">
            {currentMonth.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}
          </span>
          <button 
            onClick={() => navigateMonth('next')}
            className="p-1 text-orange-600 hover:bg-orange-50 rounded"
          >
            &gt;
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-xs text-center mb-2 text-orange-600">
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
                className={`h-8 w-8 flex items-center justify-center rounded-full mx-auto ${
                  isSelected ? "bg-orange-500 text-white" : "hover:bg-orange-100 text-orange-700"
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

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Titre fixe orange */}
      <h1 className="text-2xl font-bold  mb-6 border-b-2 border-orange-500 pb-2">
        Titre du rapport
      </h1>

      {/* Assurance */}
      <div className="mb-6">
        <input
          type="text"
          name="assurance"
          value={formData.assurance}
          onChange={handleInputChange}
          placeholder="Est-il d'assurancement du pull Admir / negar"
          className={inputClass}
        />
      </div>

      {/* Ref de puit - Liste déroulante orange */}
      <div className="mb-6 relative">
        <h2 className="text-lg font-semibold mb-2">Ref de puit</h2>
        <div className="relative">
          <input
            type="text"
            value={formData.ref}
            readOnly
            onClick={() => setShowRefList(!showRefList)}
            placeholder="Sélectionnez une référence"
            className={`${inputClass} cursor-pointer pr-10`}
          />
          <FiChevronDown 
            className={`absolute right-3 top-3.5 text-orange-500 transition-transform ${
              showRefList ? "rotate-180" : ""
            }`}
            size={20}
          />
          {showRefList && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-orange-300 rounded-lg shadow-lg max-h-60 overflow-auto">
              {refOptions.map((option, i) => (
                <div
                  key={i}
                  className={`px-4 py-2 hover:bg-orange-50 cursor-pointer ${
                    formData.ref === option ? "bg-orange-100" : ""
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
        <h2 className="text-lg font-semibold  mb-2">Description:</h2>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="À cette option la en va terminer 5-7x au max mais vaut mieux consulter..."
          className={`${inputClass} h-32`}
        />
      </div>

      {/* Date avec picker orange */}
      <div className="mb-6 relative">
        <h2 className="text-lg font-semibold  mb-2">Date:</h2>
        <div className="relative">
          <input
            type="text"
            value={formData.date}
            readOnly
            onClick={() => setShowDatePicker(!showDatePicker)}
            placeholder="JJ/MM/AAAA"
            className={`${inputClass} cursor-pointer pr-10`}
          />
          <FiCalendar 
            className="absolute right-3 top-3.5 text-orange-500"
            size={20}
          />
          {showDatePicker && renderDatePicker()}
        </div>
      </div>

      {/* Upload Projects - Style orange identique */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold  mb-2">Upload Projects</h2>
        <p className="text-gray-600 mb-4">
          Pieuse upload files in pdf, docx or doc format and make sure the file size is under 2.5 MB.
        </p>

        <hr className="border-orange-200 my-4" />

        {files.length === 0 ? (
          <div 
            className={`text-center py-12 border-2 border-dashed rounded-lg transition-all ${
              uploadHover ? "border-orange-400 bg-orange-50" : "border-orange-300 bg-orange-50"
            }`}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setUploadHover(true)}
            onDragLeave={() => setUploadHover(false)}
            onDrop={handleFileDrop}
          >
            <FiUpload className="mx-auto text-orange-400 mb-3" size={24} />
            <p className="font-medium text-orange-500 mb-3">No files Uploaded yet!</p>
            <label className={`${buttonClass} inline-flex items-center px-6 py-2 cursor-pointer`}>
              <FiUpload className="mr-2" />
              Upload
              <input
                type="file"
                className="hidden"
                multiple
                accept=".pdf,.docx,.doc"
                onChange={handleFileUpload}
              />
            </label>
            <p className="text-xs text-orange-500 mt-3">
              Format: pdf, docx, doc & Max file size: 2.8 MB
            </p>
          </div>
        ) : (
          <div className="border border-orange-300 rounded-lg p-4 bg-orange-50">
            <ul className="mb-4">
              {files.map((file, i) => (
                <li key={i} className="flex items-center justify-between py-2 border-b border-orange-200 last:border-b-0">
                  <span className="text-orange-800 truncate max-w-xs">{file.name}</span>
                  <button
                    onClick={() => removeFile(i)}
                    className="text-orange-500 hover:text-orange-700"
                  >
                    <FiX size={18} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setFiles([])}
                className="px-4 py-2 border border-orange-300 text-orange-600 rounded-lg hover:bg-orange-100"
              >
                Cancel
              </button>
              <button className={`${buttonClass} px-6`}>
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportPage;