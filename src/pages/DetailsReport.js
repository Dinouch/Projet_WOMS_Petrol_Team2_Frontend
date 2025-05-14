import { useState } from 'react';
import { 
  FiX, 
  FiFileText, 
  FiDroplet, 
  FiActivity, 
  FiUsers, 
  FiTool, 
  FiAlertCircle,
  FiDollarSign,
  FiBarChart,
  FiClock,
  FiInfo
} from 'react-icons/fi';

const DetailsReport = ({ report, onClose }) => {
  const [activeTab, setActiveTab] = useState('general');

  if (!report) return null;

  const displayData = (value) => value || 'N/A';

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-white text-xl font-bold">{report.name}</h2>
            <p className="text-orange-100 text-sm">#{report.content.header?.report_number || 'N/A'}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-orange-200 transition-colors p-1 rounded-full"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Onglets */}
        <div className="border-b border-gray-200 px-6">
          <nav className="flex space-x-4">
            {[
              { id: 'general', icon: FiInfo, label: 'Général' },
              { id: 'operations', icon: FiActivity, label: 'Opérations' },
              { id: 'mud', icon: FiDroplet, label: 'Boue' },
              { id: 'remarks', icon: FiAlertCircle, label: 'Remarques' }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-3 py-3 text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab.id 
                      ? 'text-orange-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <Icon className="mr-2" />
                    {tab.label}
                  </div>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 animate-underline" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Contenu */}
        <div className="p-6 overflow-y-auto">
          {/* Section Générale */}
          {activeTab === 'general' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Carte Détails */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-medium text-lg flex items-center mb-4 text-gray-800">
                    <FiFileText className="mr-3 text-orange-500" />
                    Détails du Rapport
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Numéro</span>
                      <span className="font-medium">{displayData(report.content.header?.report_number)}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Date</span>
                      <span className="font-medium">{displayData(report.content.header?.report_date)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Puits</span>
                      <span className="font-medium">{displayData(report.content.header?.well_name)}</span>
                    </div>
                  </div>
                </div>

                {/* Carte Statistiques */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-medium text-lg flex items-center mb-4 text-gray-800">
                    <FiBarChart className="mr-3 text-orange-500" />
                    Statistiques
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Profondeur TVD</span>
                      <span className="font-medium">{displayData(report.content.header?.tvd_ft)} ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Progression 24h</span>
                      <span className="font-medium">{displayData(report.content.header?.progress_ft)} ft</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Carte Coûts */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-medium text-lg flex items-center mb-4 text-gray-800">
                    <FiDollarSign className="mr-3 text-orange-500" />
                    Coûts
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Cumulé</span>
                      <span className="font-medium">${displayData(report.content.global_info?.cost_metrics?.cumulative_cost?.toLocaleString())}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Quotidien</span>
                      <span className="font-medium">${displayData(report.content.global_info?.cost_metrics?.daily_cost?.toLocaleString())}</span>
                    </div>
                  </div>
                </div>

                {/* Carte Personnel */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-medium text-lg flex items-center mb-4 text-gray-800">
                    <FiUsers className="mr-3 text-orange-500" />
                    Personnel
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Superintendant</span>
                      <span className="font-medium">{displayData(report.content.global_info?.personnel?.superintendent?.name)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Ingénieur</span>
                      <span className="font-medium">{displayData(report.content.global_info?.personnel?.drilling_engineer?.name)}</span>
                    </div>
                  </div>
                </div>

                {/* Carte Volumes */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-medium text-lg flex items-center mb-4 text-gray-800">
                    <FiDroplet className="mr-3 text-orange-500" />
                    Volumes
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-500">Actif</span>
                      <span className="font-medium">{displayData(report.content.mud_information?.VOLUMES_BBL?.ACTIVE)} bbl</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Disponible</span>
                      <span className="font-medium">{displayData(report.content.mud_information?.VOLUMES_BBL?.AVAILABLE)} bbl</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section Opérations */}
          {activeTab === 'operations' && (
            <div className="animate-fadeIn">
              <h3 className="font-medium text-lg flex items-center mb-4 text-gray-800">
                <FiClock className="mr-3 text-orange-500" />
                Opérations Journalières
              </h3>
              <div className="space-y-3">
                {report.content.operations?.operations?.filter(op => op?.code).map((op, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center">
                      <span className="font-medium bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">
                        {op.code}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {displayData(op.start_time)} - {displayData(op.end_time)}
                      </span>
                    </div>
                    {op.final_depth && (
                      <div className="mt-2 text-sm text-gray-600">
                        Profondeur: {displayData(op.final_depth)} ft
                      </div>
                    )}
                    {op.company && (
                      <div className="mt-1 text-xs text-gray-500">
                        Société: {displayData(op.company)}
                      </div>
                    )}
                  </div>
                ))}
                {(!report.content.operations?.operations || report.content.operations.operations.filter(op => op?.code).length === 0) && (
                  <div className="text-center py-8 text-gray-400">
                    Aucune opération enregistrée
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Section Boue */}
          {activeTab === 'mud' && (
            <div className="animate-fadeIn">
              <h3 className="font-medium text-lg flex items-center mb-4 text-gray-800">
                <FiTool className="mr-3 text-orange-500" />
                Propriétés de la Boue
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.entries(report.content.mud_information?.MUD_PROPERTIES || {}).map(([key, value]) => (
                  value !== null && (
                    <div key={key} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-sm text-gray-500 capitalize">{key.replace(/_/g, ' ').toLowerCase()}</div>
                      <div className="font-medium mt-1">{displayData(value)}</div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Section Remarques */}
          {activeTab === 'remarks' && (
            <div className="animate-fadeIn">
              <h3 className="font-medium text-lg flex items-center mb-4 text-gray-800">
                <FiAlertCircle className="mr-3 text-orange-500" />
                Remarques
              </h3>
              <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                <ul className="space-y-3">
                  {report.content.remarks?.remarks?.remarks?.map((remark, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 text-orange-500 mt-1 mr-2">•</span>
                      <span>{displayData(remark)}</span>
                    </li>
                  ))}
                  {(!report.content.remarks?.remarks?.remarks || report.content.remarks.remarks.remarks.length === 0) && (
                    <li className="text-gray-400">Aucune remarque disponible</li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors font-medium"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsReport;