import { useState } from 'react';
import { FiFile, FiCalendar, FiEye, FiEdit, FiDownload } from 'react-icons/fi';
import DetailsReport from './DetailsReport';
import { useNavigate } from 'react-router-dom';

const ReportsHistoryPage = () => {
   const navigate = useNavigate(); // Initialisation du hook
  // Données préliminaires vides
  const [reports] = useState([
    {
      id: 1,
      name: "18.xlxs",
      uploadDate: "18/02/2024",
      content: {
        
          
     "mud_information": {
      "LOSSES": {"SCE_LOSSES": null},
     "CENTRIFUGE_SERVICE": {
      "NUMBER": null,
      "HOURS": null,
      "MODEL": null,
      "BRAND": null
    },
    "STATUS": {
      "LOST_CIRC": null,
      "TRIPPING": null,
      "ENCAPSULATION": null,
      "SHAKERS": null
    },
    "VOLUMES_BBL": {
      "AVAILABLE": 432,
      "KILL_MUD": null,
      "RESERVE": 724,
      "ACTIVE": 580
    },
    "MUD_PROPERTIES": {
      "GEL_10_MIN": null,
      "GEL_10_SEC": null,
      "CACL2": null,
      "PV": null,
      "F_API": null,
      "MBT_PPB": null,
      "LGS_PERCENT": null,
      "APP_VIS": null,
      "CL_G_L": null,
      "E_LIME": null,
      "MF": null,
      "WATER_PERCENT": null,
      "WEIGHT": null,
      "HGS_PERCENT": null,
      "F_HPHT": null,
      "CAKE": null,
      "MUD_TYPE": null,
      "SOLIDS_PERCENT": null,
      "SAND_PERCENT": null,
      "FUNNEL": null,
      "PF": null,
      "KCL_PERCENT": null,
      "PH": null,
      "NACL": null,
      "Y_POINT": null,
      "CA_PLUS_PLUS": null
    },
    "MUD_CLEANER_SERVICE": null,
    "PITS": {
      "BEHIND_CSG": null,
      "OTHER_HOLE": null,
      "DUMPED": null,
      "LOST_SURF": null,
      "LOST_HOLE": null
    }
  },
  "operations": {"operations": [
    {
      "start_time": "00:00",
      "initial_depth": "",
      "code": "DESP",
      "rate": "T1",
      "end_time": "01:30",
      "description": "",
      "company": "",
      "final_depth": ""
    },
    {
      "start_time": "01:30",
      "initial_depth": "",
      "code": "TBOP",
      "rate": "T2",
      "end_time": "03:00",
      "description": "",
      "company": "",
      "final_depth": ""
    },
    {
      "start_time": "03:00",
      "initial_depth": "",
      "code": "GERB",
      "rate": "T1",
      "end_time": "06:00",
      "description": "",
      "company": "",
      "final_depth": ""
    },
    {
      "start_time": "06:00",
      "initial_depth": "",
      "code": "DGERB",
      "rate": "T1",
      "end_time": "07:00",
      "description": "",
      "company": "",
      "final_depth": ""
    },
    {
      "start_time": "07:00",
      "initial_depth": "00",
      "code": "DGDC",
      "rate": "T1",
      "end_time": "13:00",
      "description": "",
      "company": "",
      "final_depth": "2661"
    },
    {
      "start_time": "13:00",
      "initial_depth": "2661",
      "code": "REFOR",
      "rate": "T1",
      "end_time": "14:15",
      "description": "",
      "company": "",
      "final_depth": "2750"
    },
    {
      "start_time": "14:15",
      "initial_depth": "2750",
      "code": "FOR",
      "rate": "T1",
      "end_time": "24:00",
      "description": "",
      "company": "",
      "final_depth": "2839"
    },
    {
      "start_time": "",
      "initial_depth": "",
      "code": "",
      "rate": "",
      "end_time": "",
      "description": "",
      "company": "",
      "final_depth": ""
    },
    {
      "start_time": "",
      "initial_depth": "",
      "code": "",
      "rate": "",
      "end_time": "",
      "description": "",
      "company": "",
      "final_depth": ""
    },
    {
      "start_time": "",
      "initial_depth": "",
      "code": "",
      "rate": "",
      "end_time": "",
      "description": "",
      "company": "",
      "final_depth": ""
    },
    {
      "start_time": "",
      "initial_depth": "",
      "code": "",
      "rate": "",
      "end_time": "",
      "description": "",
      "company": "",
      "final_depth": ""
    },
    {
      "start_time": "",
      "initial_depth": "",
      "code": "",
      "rate": "",
      "end_time": "",
      "description": "",
      "company": "",
      "final_depth": ""
    },
    {
      "start_time": "09:30",
      "initial_depth": "",
      "code": "",
      "rate": "",
      "end_time": "",
      "description": "",
      "company": "",
      "final_depth": ""
    },
    {
      "start_time": "",
      "initial_depth": "",
      "code": "",
      "rate": "",
      "end_time": "",
      "description": "",
      "company": "",
      "final_depth": ""
    },
    {
      "start_time": "",
      "initial_depth": "",
      "code": "",
      "rate": "",
      "end_time": "",
      "description": "",
      "company": "",
      "final_depth": ""
    },
    {
      "start_time": "",
      "initial_depth": "",
      "code": "",
      "rate": "",
      "end_time": "",
      "description": "",
      "company": "",
      "final_depth": ""
    },
    {
      "start_time": "00:00",
      "initial_depth": "",
      "code": "",
      "rate": "",
      "end_time": "06:00",
      "description": "",
      "company": "",
      "final_depth": ""
    },
    {
      "start_time": "",
      "initial_depth": "",
      "code": "",
      "rate": "",
      "end_time": "",
      "description": "",
      "company": "",
      "final_depth": ""
    },
    {
      "start_time": "",
      "initial_depth": "",
      "code": "",
      "rate": "",
      "end_time": "",
      "description": "",
      "company": "",
      "final_depth": ""
    },
    {
      "start_time": "",
      "initial_depth": "",
      "code": "",
      "rate": "",
      "end_time": "",
      "description": "",
      "company": "",
      "final_depth": ""
    },
    {
      "start_time": "",
      "initial_depth": "",
      "code": "",
      "rate": "",
      "end_time": "",
      "description": "",
      "company": "",
      "final_depth": ""
    },
    {
      "start_time": "",
      "initial_depth": "",
      "code": "",
      "rate": "",
      "end_time": "",
      "description": "",
      "company": "",
      "final_depth": ""
    },
    {
      "start_time": "",
      "initial_depth": "",
      "code": "",
      "rate": "",
      "end_time": "",
      "description": "",
      "company": "",
      "final_depth": ""
    },
    {
      "start_time": "",
      "initial_depth": "",
      "code": "",
      "rate": "",
      "end_time": "",
      "description": "",
      "company": "",
      "final_depth": ""
    },
    {
      "start_time": "",
      "initial_depth": "",
      "code": "",
      "rate": "",
      "end_time": "",
      "description": "",
      "company": "",
      "final_depth": ""
    },
    {
      "start_time": "",
      "initial_depth": "",
      "code": "",
      "rate": "",
      "end_time": "",
      "description": "",
      "company": "",
      "final_depth": ""
    },
    {
      "start_time": "",
      "initial_depth": "",
      "code": "",
      "rate": "",
      "end_time": "",
      "description": "",
      "company": "",
      "final_depth": ""
    },
    {
      "start_time": "",
      "initial_depth": "",
      "code": "",
      "rate": "",
      "end_time": "",
      "description": "",
      "company": "",
      "final_depth": ""
    },
    {
      "start_time": "",
      "initial_depth": "",
      "code": "",
      "rate": "",
      "end_time": "",
      "description": "",
      "company": "",
      "final_depth": ""
    },
    {
      "start_time": "",
      "initial_depth": "",
      "code": "",
      "rate": "",
      "end_time": "",
      "description": "",
      "company": "",
      "final_depth": ""
    }
  ]},
  "lithology": [],
  "global_info": {
    "cost_metrics": {
      "cumulative_cost": 2599640.1449999996,
      "daily_cost": 76291.67499999999
    },
    "safety_metrics": {
      "last_bop_test": "",
      "accident_free_days": "",
      "actual_day": "",
      "last_safety_meeting": "",
      "planned_day": ""
    },
    "personnel": {
      "superintendent": {
        "name": "Latreche",
        "id": "13"
      },
      "drilling_engineer": {
        "name": "A.ALTUMI",
        "id": "11"
      },
      "geologist": [
        {
          "name": "Azouz",
          "id": "17"
        },
        {
          "name": "Daw",
          "id": "11"
        }
      ]
    }
  },
  "header": {
    "progress_hours": "9.75",
    "progress_ft": "89",
    "casing_top_at_ft": null,
    "report_number": "18",
    "tvd_ft": "2839",
    "last_casing": "/             13\"3/8    61# J55 BTC",
    "well_name": "A",
    "casing_at_ft": "2746",
    "report_date": "10/01/2013",
    "depth_24h_ft": "2839"
  },
  "parameters": {
    "pressure_psi": null,
    "progress_hours": null,
    "rpm_max": null,
    "hsi_hp_sqin": null,
    "deviation_azimuth": null,
    "bit_type": null,
    "tfa_sqin": null,
    "bit_serial": null,
    "flow_gpm": null,
    "wob_min_t": null,
    "rpm_min": null,
    "progress_ft": null,
    "cumulative_ft": null,
    "deviation_depth_ft": null,
    "deviation_inclination": null,
    "bit_size": null,
    "deviation_tvd_ft": null,
    "bit_number": null,
    "wob_max_t": null,
    "nozzles": [],
    "cumulative_hours": null
  },
  "mud_products": {
    "downhole_equipment": [],
    "total_length": null,
    "bha_components": []
  },
  "bha_components": {
    "downhole_equipment": [],
    "total_length": null,
    "bha_components": []
  },
  "remarks": {
    "requirements": [],
    "remarks": {
      "remarks": [
        "DRILLING WITH TOP DRIVE",
        "Daily NPT =  hrs / Cumulative NPT = 0.24 days",
        "NPT distribution : ENTP (5.75hrs) / Hole problems(hrs) / HALLIBURTON (hrs)/SLB(hrs)",
        "Geology:  2750' - 2839'  limestone - Stage: Dembaba   @  2645'",
        "NOTE: the bit  N3  used in B1-95/02 has drilled 3001 ft in 85.75 hr"
      ],
      "Planned_operation": "DRILLING 12''1/4 SECTION"
      }
       }
        
      }
    }
    ,
    // Deuxième rapport (nouveau)
    {
      id: 2,
      name: "17.xlsx",
      uploadDate: "17/02/2024",
      content: {
        "mud_information": {
          "LOSSES": {"SCE_LOSSES": null},
          "CENTRIFUGE_SERVICE": {
            "NUMBER": null,
            "HOURS": null,
            "MODEL": null,
            "BRAND": null
          },
          "STATUS": {
            "LOST_CIRC": null,
            "TRIPPING": null,
            "ENCAPSULATION": null,
            "SHAKERS": null
          },
          "VOLUMES_BBL": {
            "AVAILABLE": null,
            "KILL_MUD": null,
            "RESERVE": null,
            "ACTIVE": null
          },
          "MUD_PROPERTIES": {
            "GEL_10_MIN": null,
            "GEL_10_SEC": 16,
            "CACL2": null,
            "PV": null,
            "F_API": 7.7,
            "MBT_PPB": null,
            "LGS_PERCENT": null,
            "APP_VIS": null,
            "CL_G_L": 22,
            "E_LIME": null,
            "MF": 0.35,
            "WATER_PERCENT": null,
            "WEIGHT": null,
            "HGS_PERCENT": null,
            "F_HPHT": null,
            "CAKE": null,
            "MUD_TYPE": "NC",
            "SOLIDS_PERCENT": null,
            "SAND_PERCENT": null,
            "FUNNEL": 55,
            "PF": 0.2,
            "KCL_PERCENT": null,
            "PH": 9.5,
            "NACL": null,
            "Y_POINT": null,
            "CA_PLUS_PLUS": null
          },
          "MUD_CLEANER_SERVICE": null,
          "PITS": {
            "BEHIND_CSG": null,
            "OTHER_HOLE": null,
            "DUMPED": null,
            "LOST_SURF": null,
            "LOST_HOLE": null
          }
        },
        "operations": {"operations": [
          {
            "start_time": "00:00",
            "initial_depth": "",
            "code": "CIRC",
            "rate": "T1",
            "end_time": "01:45",
            "description": "",
            "company": "ENTP",
            "final_depth": ""
          },
          // ... (autres opérations du deuxième rapport)
        ]},
        "lithology": [],
        "global_info": {
          "cost_metrics": {
            "cumulative_cost": 2523348.4699999997,
            "daily_cost": 93923.6625
          },
          "safety_metrics": {
            "last_bop_test": "",
            "accident_free_days": "",
            "actual_day": "",
            "last_safety_meeting": "",
            "planned_day": ""
          },
          "personnel": {
            "superintendent": {
              "name": "Latreche",
              "id": "12"
            },
            "drilling_engineer": {
              "name": "A.ALTUMI",
              "id": "10"
            },
            "geologist": [
              {
                "name": "Azouz",
                "id": "16"
              },
              {
                "name": "Daw",
                "id": "10"
              }
            ]
          }
        },
        "header": {
          "progress_hours": null,
          "progress_ft": null,
          "casing_top_at_ft": null,
          "report_number": "17",
          "tvd_ft": "2750",
          "last_casing": "/             13\"3/8    61# J55 BTC",
          "well_name": "A",
          "casing_at_ft": "2746",
          "report_date": "09/30/2013",
          "depth_24h_ft": "2750"
        },
        // ... (autres sections du deuxième rapport)
      }
    }
    
  ]);

  const [selectedReport, setSelectedReport] = useState(null);

  const handleDownload = (reportId) => {
    console.log('Télécharger le rapport', reportId);
    // Implémentez la logique de téléchargement ici
  };

  const handleEdit = (reportId) => {
    console.log('Modifier le rapport', reportId);
    // Implémentez la logique d'édition ici
  };

 return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
    <div className="max-w-7xl mx-auto">
      {/* Header avec recherche et bouton d'ajout */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Historique des Rapports</h1>
          <p className="text-gray-500">Consultez et gérez tous vos rapports de forage</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <input
              type="text"
              placeholder="Rechercher un rapport..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 w-full"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
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
          <button
           onClick={() => navigate('/upload')}
           className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center whitespace-nowrap">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nouveau rapport
          </button>
        </div>
      </div>

      {/* Cartes des rapports - version plus large */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {reports.map(report => {
          // Compter le nombre d'opérations disponibles
          const operationsCount = report.content.operations?.operations?.filter(op => op.code).length || 0;
          const needsSpacer = operationsCount < 2;
          
          return (
            <div key={report.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
              {/* En-tête avec numéro de rapport */}
              <div className="px-5 py-4 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-orange-100">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg flex items-center text-gray-800">
                    <FiFile className="mr-3 text-orange-500 min-w-5 text-xl" />
                    <span className="truncate">{report.name || "Sans titre"}</span>
                  </h3>
                  <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded-full shadow-sm">
                    #{report.content.header?.report_number || 'N/A'}
                  </span>
                </div>
              </div>

              {/* Infos détaillées */}
              <div className="px-5 py-4 flex-grow">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div>
                      <p className="text-gray-500">Date du rapport</p>
                      <p className="font-medium">{report.content.header?.report_date || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Puits</p>
                      <p className="font-medium">{report.content.header?.well_name || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-gray-500">Profondeur TVD</p>
                      <p className="font-medium">{report.content.header?.tvd_ft || 'N/A'} ft</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Boue active</p>
                      <p className="font-medium">
                        {report.content.mud_information?.VOLUMES_BBL?.ACTIVE || 'N/A'} bbl
                      </p>
                    </div>
                  </div>
                </div>

                {/* Opérations récentes */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-gray-500 mb-2">Dernières opérations</p>
                  <div className="space-y-1.5">
                    {report.content.operations?.operations
                      ?.filter(op => op.code)
                      .slice(0, 2)
                      .map((op, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="font-medium">{op.code}</span>
                          <span className="text-gray-500">
                            {op.start_time} - {op.end_time}
                          </span>
                        </div>
                      ))}
                    {/* Espace blanc si moins de 2 opérations */}
                    {needsSpacer && (
                      <div className="h-6"></div> // Hauteur équivalente à une ligne d'opération
                    )}
                  </div>
                </div>
              </div>

              {/* Actions - toujours aligné en bas */}
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => handleDownload(report.id)}
                  className="text-gray-600 hover:text-orange-800 p-2 rounded-full hover:bg-blue-50 transition-colors"
                  title="Télécharger"
                >
                  <FiDownload size={18} />
                </button>
                <button
                  onClick={() => handleEdit(report.id)}
                  className="text-gray-600 hover:text-orange-800 p-2 rounded-full hover:bg-blue-50 transition-colors"
                  title="Modifier"
                >
                  <FiEdit size={18} />
                </button>
                <button
                  onClick={() => setSelectedReport(report)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center text-sm"
                >
                  <FiEye className="mr-2" /> Visualiser
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* Modal de détails */}
    {selectedReport && (
      <DetailsReport 
        report={selectedReport} 
        onClose={() => setSelectedReport(null)} 
      />
    )}
  </div>
);
};

export default ReportsHistoryPage;