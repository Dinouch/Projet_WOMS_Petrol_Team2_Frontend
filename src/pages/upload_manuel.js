import React, { useState } from "react";
import { FiCalendar, FiUpload, FiX, FiChevronDown, FiCheck, FiPlus, FiMinus, FiArrowRight, FiArrowLeft,FiFile } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const DrillingReportForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Initial state based on the provided JSON structure
  const [formData, setFormData] = useState({
    header: {
      well_name: "",
      report_number: "",
      report_date: "",
      depth_24h_ft: "",
      tvd_ft: "",
      progress_ft: "",
      progress_hours: "",
      casing_at_ft: "",
      casing_top_at_ft: "",
      last_casing: ""
    },
    global_info: {
      personnel: {
        superintendent: { name: "", id: "" },
        drilling_engineer: { name: "", id: "" },
        geologist: [{ name: "", id: "" }]
      },
      safety_metrics: {
        last_bop_test: "",
        last_safety_meeting: "",
        accident_free_days: "",
        planned_day: "",
        actual_day: ""
      },
      cost_metrics: {
        daily_cost: "",
        cumulative_cost: ""
      }
    },
    parameters: {
      bit_size: "",
      bit_type: "",
      bit_number: "",
      bit_serial: "",
      tfa_sqin: "",
      nozzles: [],
      wob_min_t: "",
      wob_max_t: "",
      rpm_min: "",
      rpm_max: "",
      flow_gpm: "",
      pressure_psi: "",
      hsi_hp_sqin: "",
      deviation_depth_ft: "",
      deviation_inclination: "",
      deviation_azimuth: "",
      deviation_tvd_ft: "",
      progress_ft: "",
      progress_hours: "",
      cumulative_ft: "",
      cumulative_hours: ""
    },
    mud_information: {
      MUD_PROPERTIES: {
        MUD_TYPE: "",
        WEIGHT: "",
        F_API: "",
        F_HPHT: "",
        PV: "",
        Y_POINT: "",
        GEL_10_SEC: "",
        GEL_10_MIN: "",
        PH: "",
        E_LIME: "",
        MF: "",
        CL_G_L: "",
        CA_PLUS_PLUS: "",
        CACL2: "",
        KCL_PERCENT: "",
        NACL: "",
        MBT_PPB: "",
        SOLIDS_PERCENT: "",
        HGS_PERCENT: "",
        LGS_PERCENT: "",
        SAND_PERCENT: "",
        WATER_PERCENT: "",
        FUNNEL: "",
        APP_VIS: "",
        PF: "",
        CAKE: ""
      },
      VOLUMES_BBL: {
        ACTIVE: "",
        RESERVE: "",
        KILL_MUD: "",
        AVAILABLE: ""
      },
      STATUS: {
        SHAKERS: "",
        LOST_CIRC: "",
        TRIPPING: "",
        ENCAPSULATION: ""
      },
      CENTRIFUGE_SERVICE: {
        NUMBER: "",
        HOURS: "",
        MODEL: "",
        BRAND: ""
      },
      MUD_CLEANER_SERVICE: "",
      PITS: {
        BEHIND_CSG: "",
        OTHER_HOLE: "",
        DUMPED: "",
        LOST_SURF: "",
        LOST_HOLE: ""
      },
      LOSSES: {
        SCE_LOSSES: ""
      }
    },
    operations: {
      operations: Array(30).fill().map(() => ({
        start_time: "",
        end_time: "",
        code: "",
        rate: "",
        description: "",
        company: "",
        initial_depth: "",
        final_depth: ""
      }))
    },
    bha_components: {
      bha_components: [],
      downhole_equipment: [],
      total_length: ""
    },
    mud_products: {
      bha_components: [],
      downhole_equipment: [],
      total_length: ""
    },
    lithology: [],
    remarks: {
      remarks: {
        remarks: [],
        Planned_operation: ""
      },
      requirements: []
    }
  });

  const [files, setFiles] = useState([]);
  const [uploadHover, setUploadHover] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Common styles
  const inputClass = "w-full bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-gray-700 transition-colors";
  const buttonClass = "px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-sm";
  const sectionTitleClass = "text-lg font-semibold mb-3 text-gray-800 border-l-4 border-orange-500 pl-3";
  const stepButtonClass = "flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-medium";
  const inactiveStepButtonClass = "flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600 font-medium";

  const handleInputChange = (e, section, subsection, field) => {
    const { value } = e.target;
    
    setFormData(prev => {
      const newData = {...prev};
      
      if (subsection) {
        if (Array.isArray(newData[section][subsection])) {
          // Handle array fields (like geologist)
          const index = field.split('_')[1];
          const subfield = field.split('_')[2];
          newData[section][subsection][index][subfield] = value;
        } else if (typeof newData[section][subsection] === 'object') {
          // Handle nested objects
          newData[section][subsection][field] = value;
        }
      } else {
        // Handle top-level fields
        newData[section][field] = value;
      }
      
      return newData;
    });
  };

  const handleOperationChange = (e, index, field) => {
    const { value } = e.target;
    
    setFormData(prev => {
      const newData = {...prev};
      newData.operations.operations[index][field] = value;
      return newData;
    });
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

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(direction === 'prev' ? prev.getMonth() - 1 : prev.getMonth() + 1);
      return newMonth;
    });
  };

  const handleDateSelect = (dateStr) => {
    setFormData(prev => ({ 
      ...prev, 
      header: { ...prev.header, report_date: dateStr } 
    }));
    setShowDatePicker(false);
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
            <div key={`empty-${i}`}className="h-8"></div>
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
  const day = i + 1;
  const dateStr = `${day.toString().padStart(2, '0')}/${(month + 1)
    .toString()
    .padStart(2, '0')}/${year}`;
  const isSelected = formData.header.report_date === dateStr;

  return (
    <button
      key={day}
      onClick={() => handleDateSelect(dateStr)}
      className={`h-8 w-8 flex items-center justify-center rounded-full mx-auto text-sm ${
        isSelected
          ? "bg-orange-500 text-white"
          : "hover:bg-gray-100 text-gray-700"
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/puit');
    }, 3000);
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 7));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Step 1: Header Information
  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Informations d'en-tête</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-2">Nom du puits</label>
          <input
            type="text"
            value={formData.header.well_name}
            onChange={(e) => handleInputChange(e, 'header', null, 'well_name')}
            className={inputClass}
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Numéro de rapport</label>
          <input
            type="text"
            value={formData.header.report_number}
            onChange={(e) => handleInputChange(e, 'header', null, 'report_number')}
            className={inputClass}
            required
          />
        </div>
        
        <div className="relative">
          <label className="block text-gray-700 mb-2">Date du rapport</label>
          <div className="relative">
           <input
  type="text"
  value={formData.header.report_date}
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
        
        <div>
          <label className="block text-gray-700 mb-2">Profondeur 24h (ft)</label>
          <input
            type="number"
            value={formData.header.depth_24h_ft}
            onChange={(e) => handleInputChange(e, 'header', null, 'depth_24h_ft')}
            className={inputClass}
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">TVD (ft)</label>
          <input
            type="number"
            value={formData.header.tvd_ft}
            onChange={(e) => handleInputChange(e, 'header', null, 'tvd_ft')}
            className={inputClass}
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Progrès (ft)</label>
          <input
            type="number"
            value={formData.header.progress_ft}
            onChange={(e) => handleInputChange(e, 'header', null, 'progress_ft')}
            className={inputClass}
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Progrès (heures)</label>
          <input
            type="number"
            step="0.01"
            value={formData.header.progress_hours}
            onChange={(e) => handleInputChange(e, 'header', null, 'progress_hours')}
            className={inputClass}
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Casing à (ft)</label>
          <input
            type="number"
            value={formData.header.casing_at_ft}
            onChange={(e) => handleInputChange(e, 'header', null, 'casing_at_ft')}
            className={inputClass}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Top de casing à (ft)</label>
          <input
            type="number"
            value={formData.header.casing_top_at_ft}
            onChange={(e) => handleInputChange(e, 'header', null, 'casing_top_at_ft')}
            className={inputClass}
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-gray-700 mb-2">Dernier casing</label>
          <input
            type="text"
            value={formData.header.last_casing}
            onChange={(e) => handleInputChange(e, 'header', null, 'last_casing')}
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );

  // Step 2: Global Information
  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Informations générales</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className={sectionTitleClass}>Personnel</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Superintendant</label>
              <input
                type="text"
                value={formData.global_info.personnel.superintendent.name}
                onChange={(e) => handleInputChange(e, 'global_info', 'personnel', 'superintendent_name')}
                placeholder="Nom"
                className={inputClass}
              />
             <input
  type="text"
  value={formData.global_info.personnel.superintendent.id}
  onChange={e => handleInputChange(e, 'global_info', 'personnel', 'superintendent_id')}
  placeholder="ID"
  className={`${inputClass} mt-2`}
/>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Ingénieur forage</label>
              <input
                type="text"
                value={formData.global_info.personnel.drilling_engineer.name}
                onChange={(e) => handleInputChange(e, 'global_info', 'personnel', 'drilling_engineer_name')}
                placeholder="Nom"
                className={inputClass}
              />
             <input
  type="text"
  value={formData.global_info.personnel.drilling_engineer.id}
  onChange={e => handleInputChange(e, 'global_info', 'personnel', 'drilling_engineer_id')}
  placeholder="ID"
  className={`${inputClass} mt-2`}
/>

            </div>
            
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Géologue(s)</label>
              {formData.global_info.personnel.geologist.map((geo, index) => (
                <div key={index} className="flex space-x-4 mb-2">
                 <input
  type="text"
  value={geo.name}
  onChange={e => handleInputChange(e, 'global_info', 'personnel', `geologist_${index}_name`)}
  placeholder="Nom"
  className={`${inputClass} flex-1`}
/>
                  <input
  type="text"
  value={geo.id}
  onChange={e => handleInputChange(e, 'global_info', 'personnel', `geologist_${index}_id`)}
  placeholder="ID"
  className={`${inputClass} flex-1`}
/>

                  {index === formData.global_info.personnel.geologist.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => {
                          const newData = {...prev};
                          newData.global_info.personnel.geologist.push({ name: "", id: "" });
                          return newData;
                        });
                      }}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      <FiPlus />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => {
                          const newData = {...prev};
                          newData.global_info.personnel.geologist.splice(index, 1);
                          return newData;
                        });
                      }}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      <FiMinus />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <h3 className={sectionTitleClass}>Métriques de sécurité</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Dernier test BOP</label>
              <input
                type="text"
                value={formData.global_info.safety_metrics.last_bop_test}
                onChange={(e) => handleInputChange(e, 'global_info', 'safety_metrics', 'last_bop_test')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Dernière réunion sécurité</label>
              <input
                type="text"
                value={formData.global_info.safety_metrics.last_safety_meeting}
                onChange={(e) => handleInputChange(e, 'global_info', 'safety_metrics', 'last_safety_meeting')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Jours sans accident</label>
              <input
                type="number"
                value={formData.global_info.safety_metrics.accident_free_days}
                onChange={(e) => handleInputChange(e, 'global_info', 'safety_metrics', 'accident_free_days')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Jour prévu</label>
              <input
                type="text"
                value={formData.global_info.safety_metrics.planned_day}
                onChange={(e) => handleInputChange(e, 'global_info', 'safety_metrics', 'planned_day')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Jour réel</label>
              <input
                type="text"
                value={formData.global_info.safety_metrics.actual_day}
                onChange={(e) => handleInputChange(e, 'global_info', 'safety_metrics', 'actual_day')}
                className={inputClass}
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className={sectionTitleClass}>Métriques de coût</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Coût journalier</label>
              <input
                type="number"
                step="0.01"
                value={formData.global_info.cost_metrics.daily_cost}
                onChange={(e) => handleInputChange(e, 'global_info', 'cost_metrics', 'daily_cost')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Coût cumulé</label>
              <input
                type="number"
                step="0.01"
                value={formData.global_info.cost_metrics.cumulative_cost}
                onChange={(e) => handleInputChange(e, 'global_info', 'cost_metrics', 'cumulative_cost')}
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 3: Parameters
  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Paramètres de forage</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-2">Taille du trépan (in)</label>
          <input
            type="number"
            step="0.01"
            value={formData.parameters.bit_size}
            onChange={(e) => handleInputChange(e, 'parameters', null, 'bit_size')}
            className={inputClass}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Type de trépan</label>
          <input
            type="text"
            value={formData.parameters.bit_type}
            onChange={(e) => handleInputChange(e, 'parameters', null, 'bit_type')}
            className={inputClass}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Numéro de trépan</label>
          <input
            type="text"
            value={formData.parameters.bit_number}
            onChange={(e) => handleInputChange(e, 'parameters', null, 'bit_number')}
            className={inputClass}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Série du trépan</label>
          <input
            type="text"
            value={formData.parameters.bit_serial}
            onChange={(e) => handleInputChange(e, 'parameters', null, 'bit_serial')}
            className={inputClass}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">TFA (in²)</label>
          <input
            type="number"
            step="0.01"
            value={formData.parameters.tfa_sqin}
            onChange={(e) => handleInputChange(e, 'parameters', null, 'tfa_sqin')}
            className={inputClass}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">WOB min (t)</label>
          <input
            type="number"
            step="0.01"
            value={formData.parameters.wob_min_t}
            onChange={(e) => handleInputChange(e, 'parameters', null, 'wob_min_t')}
            className={inputClass}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">WOB max (t)</label>
          <input
            type="number"
            step="0.01"
            value={formData.parameters.wob_max_t}
            onChange={(e) => handleInputChange(e, 'parameters', null, 'wob_max_t')}
            className={inputClass}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">RPM min</label>
          <input
            type="number"
            value={formData.parameters.rpm_min}
            onChange={(e) => handleInputChange(e, 'parameters', null, 'rpm_min')}
            className={inputClass}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">RPM max</label>
          <input
            type="number"
            value={formData.parameters.rpm_max}
            onChange={(e) => handleInputChange(e, 'parameters', null, 'rpm_max')}
            className={inputClass}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Débit (gpm)</label>
          <input
            type="number"
            value={formData.parameters.flow_gpm}
            onChange={(e) => handleInputChange(e, 'parameters', null, 'flow_gpm')}
            className={inputClass}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Pression (psi)</label>
          <input
            type="number"
            value={formData.parameters.pressure_psi}
            onChange={(e) => handleInputChange(e, 'parameters', null, 'pressure_psi')}
            className={inputClass}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">HSI (hp/in²)</label>
          <input
            type="number"
            step="0.01"
            value={formData.parameters.hsi_hp_sqin}
            onChange={(e) => handleInputChange(e, 'parameters', null, 'hsi_hp_sqin')}
            className={inputClass}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Profondeur déviation (ft)</label>
          <input
            type="number"
            value={formData.parameters.deviation_depth_ft}
            onChange={(e) => handleInputChange(e, 'parameters', null, 'deviation_depth_ft')}
            className={inputClass}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Inclinaison déviation</label>
          <input
            type="number"
            step="0.01"
            value={formData.parameters.deviation_inclination}
            onChange={(e) => handleInputChange(e, 'parameters', null, 'deviation_inclination')}
            className={inputClass}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Azimuth déviation</label>
          <input
            type="number"
            step="0.01"
            value={formData.parameters.deviation_azimuth}
            onChange={(e) => handleInputChange(e, 'parameters', null, 'deviation_azimuth')}
            className={inputClass}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">TVD déviation (ft)</label>
          <input
            type="number"
            value={formData.parameters.deviation_tvd_ft}
            onChange={(e) => handleInputChange(e, 'parameters', null, 'deviation_tvd_ft')}
            className={inputClass}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Progrès (ft)</label>
          <input
            type="number"
            value={formData.parameters.progress_ft}
            onChange={(e) => handleInputChange(e, 'parameters', null, 'progress_ft')}
            className={inputClass}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Progrès (heures)</label>
          <input
            type="number"
            step="0.01"
            value={formData.parameters.progress_hours}
            onChange={(e) => handleInputChange(e, 'parameters', null, 'progress_hours')}
            className={inputClass}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Cumulé (ft)</label>
          <input
            type="number"
            value={formData.parameters.cumulative_ft}
            onChange={(e) => handleInputChange(e, 'parameters', null, 'cumulative_ft')}
            className={inputClass}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Cumulé (heures)</label>
          <input
            type="number"
            step="0.01"
            value={formData.parameters.cumulative_hours}
            onChange={(e) => handleInputChange(e, 'parameters', null, 'cumulative_hours')}
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );

  // Step 4: Mud Information
  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Informations sur la boue</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className={sectionTitleClass}>Propriétés de la boue</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Type de boue</label>
              <input
                type="text"
                value={formData.mud_information.MUD_PROPERTIES.MUD_TYPE}
                onChange={(e) => handleInputChange(e, 'mud_information', 'MUD_PROPERTIES', 'MUD_TYPE')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Poids (ppg)</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.MUD_PROPERTIES.WEIGHT}
                onChange={(e) => handleInputChange(e, 'mud_information', 'MUD_PROPERTIES', 'WEIGHT')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Filtrat API (ml)</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.MUD_PROPERTIES.F_API}
                onChange={(e) => handleInputChange(e, 'mud_information', 'MUD_PROPERTIES', 'F_API')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Filtrat HPHT (ml)</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.MUD_PROPERTIES.F_HPHT}
                onChange={(e) => handleInputChange(e, 'mud_information', 'MUD_PROPERTIES', 'F_HPHT')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">PV (cP)</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.MUD_PROPERTIES.PV}
                onChange={(e) => handleInputChange(e, 'mud_information', 'MUD_PROPERTIES', 'PV')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Point d'écoulement (lb/100ft²)</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.MUD_PROPERTIES.Y_POINT}
                onChange={(e) => handleInputChange(e, 'mud_information', 'MUD_PROPERTIES', 'Y_POINT')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Gel 10 sec (lb/100ft²)</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.MUD_PROPERTIES.GEL_10_SEC}
                onChange={(e) => handleInputChange(e, 'mud_information', 'MUD_PROPERTIES', 'GEL_10_SEC')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Gel 10 min (lb/100ft²)</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.MUD_PROPERTIES.GEL_10_MIN}
                onChange={(e) => handleInputChange(e, 'mud_information', 'MUD_PROPERTIES', 'GEL_10_MIN')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">pH</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.MUD_PROPERTIES.PH}
                onChange={(e) => handleInputChange(e, 'mud_information', 'MUD_PROPERTIES', 'PH')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Excès de chaux (lb/bbl)</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.MUD_PROPERTIES.E_LIME}
                onChange={(e) => handleInputChange(e, 'mud_information', 'MUD_PROPERTIES', 'E_LIME')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">MF (ml)</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.MUD_PROPERTIES.MF}
                onChange={(e) => handleInputChange(e, 'mud_information', 'MUD_PROPERTIES', 'MF')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Chlorures (g/l)</label>
              <input
                type="number"
                step="0.1"
value={formData.mud_information.MUD_PROPERTIES.CL_G_L}
                onChange={(e) => handleInputChange(e, 'mud_information', 'MUD_PROPERTIES', 'CL_G_L')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Ca++ (mg/l)</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.MUD_PROPERTIES.CA_PLUS_PLUS}
                onChange={(e) => handleInputChange(e, 'mud_information', 'MUD_PROPERTIES', 'CA_PLUS_PLUS')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">CaCl2 (%)</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.MUD_PROPERTIES.CACL2}
                onChange={(e) => handleInputChange(e, 'mud_information', 'MUD_PROPERTIES', 'CACL2')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">KCl (%)</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.MUD_PROPERTIES.KCL_PERCENT}
                onChange={(e) => handleInputChange(e, 'mud_information', 'MUD_PROPERTIES', 'KCL_PERCENT')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">NaCl</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.MUD_PROPERTIES.NACL}
                onChange={(e) => handleInputChange(e, 'mud_information', 'MUD_PROPERTIES', 'NACL')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">MBT (ppb)</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.MUD_PROPERTIES.MBT_PPB}
                onChange={(e) => handleInputChange(e, 'mud_information', 'MUD_PROPERTIES', 'MBT_PPB')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Solides (%)</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.MUD_PROPERTIES.SOLIDS_PERCENT}
                onChange={(e) => handleInputChange(e, 'mud_information', 'MUD_PROPERTIES', 'SOLIDS_PERCENT')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">HGS (%)</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.MUD_PROPERTIES.HGS_PERCENT}
                onChange={(e) => handleInputChange(e, 'mud_information', 'MUD_PROPERTIES', 'HGS_PERCENT')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">LGS (%)</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.MUD_PROPERTIES.LGS_PERCENT}
                onChange={(e) => handleInputChange(e, 'mud_information', 'MUD_PROPERTIES', 'LGS_PERCENT')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Sable (%)</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.MUD_PROPERTIES.SAND_PERCENT}
                onChange={(e) => handleInputChange(e, 'mud_information', 'MUD_PROPERTIES', 'SAND_PERCENT')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Eau (%)</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.MUD_PROPERTIES.WATER_PERCENT}
                onChange={(e) => handleInputChange(e, 'mud_information', 'MUD_PROPERTIES', 'WATER_PERCENT')}
                className={inputClass}
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className={sectionTitleClass}>Volumes (bbl)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Actif</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.VOLUMES_BBL.ACTIVE}
                onChange={(e) => handleInputChange(e, 'mud_information', 'VOLUMES_BBL', 'ACTIVE')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Réserve</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.VOLUMES_BBL.RESERVE}
                onChange={(e) => handleInputChange(e, 'mud_information', 'VOLUMES_BBL', 'RESERVE')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Boue de tuage</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.VOLUMES_BBL.KILL_MUD}
                onChange={(e) => handleInputChange(e, 'mud_information', 'VOLUMES_BBL', 'KILL_MUD')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Disponible</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.VOLUMES_BBL.AVAILABLE}
                onChange={(e) => handleInputChange(e, 'mud_information', 'VOLUMES_BBL', 'AVAILABLE')}
                className={inputClass}
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className={sectionTitleClass}>Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Tamis vibrants</label>
              <input
                type="text"
                value={formData.mud_information.STATUS.SHAKERS}
                onChange={(e) => handleInputChange(e, 'mud_information', 'STATUS', 'SHAKERS')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Perte de circulation</label>
              <input
                type="text"
                value={formData.mud_information.STATUS.LOST_CIRC}
                onChange={(e) => handleInputChange(e, 'mud_information', 'STATUS', 'LOST_CIRC')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Manœuvres</label>
              <input
                type="text"
                value={formData.mud_information.STATUS.TRIPPING}
                onChange={(e) => handleInputChange(e, 'mud_information', 'STATUS', 'TRIPPING')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Encapsulation</label>
              <input
                type="text"
                value={formData.mud_information.STATUS.ENCAPSULATION}
                onChange={(e) => handleInputChange(e, 'mud_information', 'STATUS', 'ENCAPSULATION')}
                className={inputClass}
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className={sectionTitleClass}>Service centrifugeuse</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Numéro</label>
              <input
                type="text"
                value={formData.mud_information.CENTRIFUGE_SERVICE.NUMBER}
                onChange={(e) => handleInputChange(e, 'mud_information', 'CENTRIFUGE_SERVICE', 'NUMBER')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Heures</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.CENTRIFUGE_SERVICE.HOURS}
                onChange={(e) => handleInputChange(e, 'mud_information', 'CENTRIFUGE_SERVICE', 'HOURS')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Modèle</label>
              <input
                type="text"
                value={formData.mud_information.CENTRIFUGE_SERVICE.MODEL}
                onChange={(e) => handleInputChange(e, 'mud_information', 'CENTRIFUGE_SERVICE', 'MODEL')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Marque</label>
              <input
                type="text"
                value={formData.mud_information.CENTRIFUGE_SERVICE.BRAND}
                onChange={(e) => handleInputChange(e, 'mud_information', 'CENTRIFUGE_SERVICE', 'BRAND')}
                className={inputClass}
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className={sectionTitleClass}>Nettoyeur de boue</h3>
          <input
            type="text"
            value={formData.mud_information.MUD_CLEANER_SERVICE}
            onChange={(e) => handleInputChange(e, 'mud_information', null, 'MUD_CLEANER_SERVICE')}
            className={inputClass}
          />
        </div>
        
        <div>
          <h3 className={sectionTitleClass}>Puits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Derrière tubage</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.PITS.BEHIND_CSG}
                onChange={(e) => handleInputChange(e, 'mud_information', 'PITS', 'BEHIND_CSG')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Autre trou</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.PITS.OTHER_HOLE}
                onChange={(e) => handleInputChange(e, 'mud_information', 'PITS', 'OTHER_HOLE')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Déversé</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.PITS.DUMPED}
                onChange={(e) => handleInputChange(e, 'mud_information', 'PITS', 'DUMPED')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Pertes en surface</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.PITS.LOST_SURF}
                onChange={(e) => handleInputChange(e, 'mud_information', 'PITS', 'LOST_SURF')}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Pertes en fond de trou</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.PITS.LOST_HOLE}
                onChange={(e) => handleInputChange(e, 'mud_information', 'PITS', 'LOST_HOLE')}
                className={inputClass}
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className={sectionTitleClass}>Pertes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Pertes SCE</label>
              <input
                type="number"
                step="0.1"
                value={formData.mud_information.LOSSES.SCE_LOSSES}
                onChange={(e) => handleInputChange(e, 'mud_information', 'LOSSES', 'SCE_LOSSES')}
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 5: Operations
  const renderStep5 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Opérations</h2>
      
      <div className="bg-white p-2 rounded-lg shadow-sm">
        <div className="grid grid-cols-8 gap-2 p-2 bg-gray-100 rounded-md font-medium text-gray-700 text-sm">
          <div className="col-span-1">Heure début</div>
          <div className="col-span-1">Heure fin</div>
          <div className="col-span-1">Code</div>
          <div className="col-span-1">Taux</div>
          <div className="col-span-2">Description</div>
          <div className="col-span-1">Entreprise</div>
          <div className="col-span-1">Prof. finale</div>
        </div>
        
        {formData.operations.operations.slice(0, 15).map((op, index) => (
          <div key={index} className="grid grid-cols-8 gap-2 p-2 border-b border-gray-100 text-sm">
            <div className="col-span-1">
              <input
                type="text"
                value={op.start_time}
                onChange={(e) => handleOperationChange(e, index, 'start_time')}
                className="w-full border border-gray-200 rounded px-2 py-1"
                placeholder="HH:MM"
              />
            </div>
            <div className="col-span-1">
              <input
                type="text"
                value={op.end_time}
                onChange={(e) => handleOperationChange(e, index, 'end_time')}
                className="w-full border border-gray-200 rounded px-2 py-1"
                placeholder="HH:MM"
              />
            </div>
            <div className="col-span-1">
              <input
                type="text"
                value={op.code}
                onChange={(e) => handleOperationChange(e, index, 'code')}
                className="w-full border border-gray-200 rounded px-2 py-1"
              />
            </div>
            <div className="col-span-1">
              <input
                type="text"
                value={op.rate}
                onChange={(e) => handleOperationChange(e, index, 'rate')}
                className="w-full border border-gray-200 rounded px-2 py-1"
              />
            </div>
            <div className="col-span-2">
              <input
                type="text"
                value={op.description}
                onChange={(e) => handleOperationChange(e, index, 'description')}
                className="w-full border border-gray-200 rounded px-2 py-1"
              />
            </div>
            <div className="col-span-1">
              <input
                type="text"
                value={op.company}
                onChange={(e) => handleOperationChange(e, index, 'company')}
                className="w-full border border-gray-200 rounded px-2 py-1"
              />
            </div>
            <div className="col-span-1">
              <input
                type="number"
                value={op.final_depth}
                onChange={(e) => handleOperationChange(e, index, 'final_depth')}
                className="w-full border border-gray-200 rounded px-2 py-1"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Step 6: BHA Components
  const renderStep6 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Composants BHA</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className={sectionTitleClass}>Composants BHA</h3>
          <div className="mb-4">
            <button
              type="button"
              onClick={() => {
                setFormData(prev => {
                  const newData = {...prev};
                  newData.bha_components.bha_components.push({
                    item: "",
                    description: "",
                    serial_no: "",
                    length: "",
                    diameter: "",
                    weight: ""
                  });
                  return newData;
                });
              }}
              className="flex items-center text-gray-700 bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-lg"
            >
              <FiPlus className="mr-2" /> Ajouter composant
            </button>
          </div>
          
          {formData.bha_components.bha_components.length > 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="grid grid-cols-6 gap-2 p-3 bg-gray-100 font-medium text-gray-700 text-sm">
                <div>Élément</div>
                <div>Description</div>
                <div>N° de série</div>
                <div>Longueur</div>
                <div>Diamètre</div>
                <div>Poids</div>
              </div>
              
              {formData.bha_components.bha_components.map((comp, index) => (
                <div key={index} className="grid grid-cols-6 gap-2 p-3 border-t border-gray-100">
                  <div>
                    <input
                      type="text"
                      value={comp.item || ""}
                      onChange={(e) => {
                        setFormData(prev => {
                          const newData = {...prev};
                          newData.bha_components.bha_components[index].item = e.target.value;
                          return newData;
                        });
                      }}
                      className="w-full border border-gray-200 rounded px-2 py-1"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={comp.description || ""}
                      onChange={(e) => {
                        setFormData(prev => {
                          const newData = {...prev};
                          newData.bha_components.bha_components[index].description = e.target.value;
                          return newData;
                        });
                      }}
                      className="w-full border border-gray-200 rounded px-2 py-1"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={comp.serial_no || ""}
                      onChange={(e) => {
                        setFormData(prev => {
                          const newData = {...prev};
                          newData.bha_components.bha_components[index].serial_no = e.target.value;
                          return newData;
                        });
                      }}
                      className="w-full border border-gray-200 rounded px-2 py-1"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={comp.length || ""}
                      onChange={(e) => {
                        setFormData(prev => {
                          const newData = {...prev};
                          newData.bha_components.bha_components[index].length = e.target.value;
                          return newData;
                        });
                      }}
                      className="w-full border border-gray-200 rounded px-2 py-1"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={comp.diameter || ""}
                      onChange={(e) => {
                        setFormData(prev => {
                          const newData = {...prev};
                          newData.bha_components.bha_components[index].diameter = e.target.value;
                          return newData;
                        });
                      }}
                      className="w-full border border-gray-200 rounded px-2 py-1"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={comp.weight || ""}
                      onChange={(e) => {
                        setFormData(prev => {
                          const newData = {...prev};
                          newData.bha_components.bha_components[index].weight = e.target.value;
                          return newData;
                        });
                      }}
                      className="w-full border border-gray-200 rounded px-2 py-1 mr-2"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => {
                          const newData = {...prev};
                          newData.bha_components.bha_components.splice(index, 1);
                          return newData;
                        });
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiX size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic text-center py-4">Aucun composant BHA ajouté</p>
          )}
        </div>
        
        <div>
          <h3 className={sectionTitleClass}>Équipement de fond</h3>
          <div className="mb-4">
            <button
              type="button"
              onClick={() => {
                setFormData(prev => {
                  const newData = {...prev};
                  newData.bha_components.downhole_equipment.push({
                    item: "",
                    description: "",
                    serial_no: "",
                    length: "",
                    diameter: ""
                  });
                  return newData;
                });
              }}
              className="flex items-center text-gray-700 bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-lg"
            >
              <FiPlus className="mr-2" /> Ajouter équipement
            </button>
          </div>
          
          {formData.bha_components.downhole_equipment.length > 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="grid grid-cols-5 gap-2 p-3 bg-gray-100 font-medium text-gray-700 text-sm">
                <div>Élément</div>
                <div>Description</div>
                <div>N° de série</div>
                <div>Longueur</div>
                <div>Diamètre</div>
              </div>
              
              {formData.bha_components.downhole_equipment.map((equip, index) => (
                <div key={index} className="grid grid-cols-5 gap-2 p-3 border-t border-gray-100">
                  <div>
                    <input
                      type="text"
                      value={equip.item || ""}
                      onChange={(e) => {
                        setFormData(prev => {
                          const newData = {...prev};
                          newData.bha_components.downhole_equipment[index].item = e.target.value;
                          return newData;
                        });
                      }}
                      className="w-full border border-gray-200 rounded px-2 py-1"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={equip.description || ""}
                      onChange={(e) => {
                        setFormData(prev => {
                          const newData = {...prev};
                          newData.bha_components.downhole_equipment[index].description = e.target.value;
                          return newData;
                        });
                      }}
                      className="w-full border border-gray-200 rounded px-2 py-1"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={equip.serial_no || ""}
                      onChange={(e) => {
                        setFormData(prev => {
                          const newData = {...prev};
                          newData.bha_components.downhole_equipment[index].serial_no = e.target.value;
                          return newData;
                        });
                      }}
                      className="w-full border border-gray-200 rounded px-2 py-1"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={equip.length || ""}
                      onChange={(e) => {
                        setFormData(prev => {
                          const newData = {...prev};
                          newData.bha_components.downhole_equipment[index].length = e.target.value;
                          return newData;
                        });
                      }}
                      className="w-full border border-gray-200 rounded px-2 py-1"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={equip.diameter || ""}
                      onChange={(e) => {
                        setFormData(prev => {
                          const newData = {...prev};
                          newData.bha_components.downhole_equipment[index].diameter = e.target.value;
                          return newData;
                        });
                      }}
                      className="w-full border border-gray-200 rounded px-2 py-1 mr-2"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => {
                          const newData = {...prev};
                          newData.bha_components.downhole_equipment.splice(index, 1);
                          return newData;
                        });
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiX size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic text-center py-4">Aucun équipement de fond ajouté</p>
          )}
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Longueur totale</label>
          <input
            type="number"
            step="0.01"
            value={formData.bha_components.total_length}
            onChange={(e) => {
              setFormData(prev => {
                const newData = {...prev};
                newData.bha_components.total_length = e.target.value;
                return newData;
              });
            }}
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );

  // Step 7: Uploads & Remarks
  const renderStep7 = () => (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Pièces jointes & Remarques</h2>
      
      <div>
        <h3 className={sectionTitleClass}>Documents & fichiers</h3>
        <div 
          className={`border-2 ${uploadHover ? 'border-orange-500 bg-orange-50' : 'border-gray-300 bg-gray-50'} border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors`}
          onDragOver={(e) => {
            e.preventDefault();
            setUploadHover(true);
          }}
          onDragLeave={() => setUploadHover(false)}
          onDrop={handleFileDrop}
          onClick={() => document.getElementById('file-upload').click()}
        >
          <input
            id="file-upload"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileUpload}
          />
          <div className="flex flex-col items-center justify-center space-y-2">
            <FiUpload className="text-gray-500" size={24} />
            <p className="text-gray-700">
              <span className="text-orange-500 font-medium">Cliquez pour télécharger</span> ou glissez-déposez vos fichiers
            </p>
            <p className="text-gray-500 text-sm">Formats supportés: PDF, JPG, PNG, DOCX</p>
          </div>
        </div>
        
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="font-medium text-gray-700">Fichiers sélectionnés:</h4>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FiFile className="text-gray-500" />
                    <span className="text-gray-700 truncate max-w-xs">{file.name}</span>
                    <span className="text-gray-500 text-sm">({(file.size / 1024).toFixed(1)} KB)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <FiX size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div>
        <h3 className={sectionTitleClass}>Remarques</h3>
        <textarea
          className={`${inputClass} min-h-[120px]`}
          placeholder="Ajoutez des remarques supplémentaires..."
          value={formData.remarks.remarks.remarks.join('\n')}
          onChange={(e) => {
            setFormData(prev => ({
              ...prev,
              remarks: {
                ...prev.remarks,
                remarks: {
                  ...prev.remarks.remarks,
                  remarks: e.target.value.split('\n')
                }
              }
            }));
          }}
        />
      </div>
      
      <div>
        <h3 className={sectionTitleClass}>Opérations prévues</h3>
        <textarea
          className={`${inputClass} min-h-[80px]`}
          placeholder="Décrivez les opérations prévues..."
          value={formData.remarks.remarks.Planned_operation}
          onChange={(e) => {
            setFormData(prev => ({
              ...prev,
              remarks: {
                ...prev.remarks,
                remarks: {
                  ...prev.remarks.remarks,
                  Planned_operation: e.target.value
                }
              }
            }));
          }}
        />
      </div>
      
      <div>
        <h3 className={sectionTitleClass}>Exigences</h3>
        <div className="space-y-2">
          {formData.remarks.requirements.map((req, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={req}
                onChange={(e) => {
                  setFormData(prev => {
                    const newData = {...prev};
                    newData.remarks.requirements[index] = e.target.value;
                    return newData;
                  });
                }}
                className={`${inputClass} flex-1`}
                placeholder="Exigence..."
              />
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => {
                    const newData = {...prev};
                    newData.remarks.requirements.splice(index, 1);
                    return newData;
                  });
                }}
                className="p-2 text-red-500 hover:bg-red-50 rounded-full"
              >
                <FiX size={18} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              setFormData(prev => ({
                ...prev,
                remarks: {
                  ...prev.remarks,
                  requirements: [...prev.remarks.requirements, ""]
                }
              }));
            }}
            className="flex items-center text-orange-500 hover:text-orange-600 mt-2"
          >
            <FiPlus className="mr-1" /> Ajouter une exigence
          </button>
        </div>
      </div>
    </div>
  );

  // Render success message
  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <FiCheck className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Rapport soumis avec succès!</h3>
          <p className="text-gray-500 mb-6">Vous serez redirigé vers l'accueil dans quelques secondes.</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Nouveau rapport de forage</h1>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => navigate('/acceuil')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className={`${buttonClass} flex items-center`}
            >
              Enregistrer
              <FiCheck className="ml-2" />
            </button>
          </div>
        </div>
        
        {/* Stepper */}
        <div className="flex justify-between items-center mb-8 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
          {[1, 2, 3, 4, 5, 6, 7].map(step => (
            <div key={step} className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => setCurrentStep(step)}
                className={step <= currentStep ? stepButtonClass : inactiveStepButtonClass}
              >
                {step}
              </button>
              <span className={`text-xs mt-2 ${step <= currentStep ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                {step === 1 && 'En-tête'}
                {step === 2 && 'Général'}
                {step === 3 && 'Paramètres'}
                {step === 4 && 'Boue'}
                {step === 5 && 'Opérations'}
                {step === 6 && 'BHA'}
                {step === 7 && 'Fichiers'}
              </span>
            </div>
          ))}
        </div>
        
        {/* Form steps */}
        <div className="space-y-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
          {currentStep === 6 && renderStep6()}
          {currentStep === 7 && renderStep7()}
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`${buttonClass} flex items-center ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <FiArrowLeft className="mr-2" /> Précédent
          </button>
          
          {currentStep < 7 ? (
            <button
              type="button"
              onClick={nextStep}
              className={`${buttonClass} flex items-center`}
            >
              Suivant <FiArrowRight className="ml-2" />
            </button>
          ) : (
            <button
              type="submit"
              className={`${buttonClass} flex items-center bg-green-500 hover:bg-green-600`}
            >
              Soumettre <FiCheck className="ml-2" />
            </button>
          )}
        </div>
      </form>
    </div>
  );

}

export default DrillingReportForm;