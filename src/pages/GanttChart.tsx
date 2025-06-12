import React, { useState } from 'react';
import { Search, Plus, Upload, FileText, ChevronDown, Filter, Settings2 } from 'lucide-react';

// Fonction pour obtenir la date du jour au format DD/MM/YYYY
const getCurrentDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
};

// Fonction pour obtenir le numéro de la semaine actuelle
const getCurrentWeek = () => {
  const today = new Date();
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  const pastDaysOfYear = (today.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

// Générer les dates des 5 prochaines semaines (cette semaine + 4 suivantes)
const currentWeek = getCurrentWeek();
const weeks = Array.from({ length: 5 }, (_, i) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + (i * 7));
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);
  return {
    weekNum: currentWeek + i,
    startDate: startDate.toLocaleDateString('fr-FR'),
    endDate: endDate.toLocaleDateString('fr-FR'),
    label: `Semaine ${currentWeek + i} (${startDate.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })} - ${endDate.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })})`
  };
});

// Calculer la position du jour actuel dans la semaine (0 = lundi, 6 = dimanche)
const getCurrentDayPosition = () => {
  const today = new Date();
  return (today.getDay() + 6) % 7; // Ajustement pour lundi=0 à dimanche=6
};

const phases = [
  {
    name: "Site Preparation",
    startDate: weeks[0].startDate,
    endDate: weeks[1].endDate,
    color: "bg-gray-300",
    position: { start: 0, width: 1.5 }
  },
  {
    name: "Drilling", 
    startDate: weeks[1].startDate,
    endDate: weeks[3].endDate,
    color: "bg-blue-400",
    position: { start: 7, width: 3 }
  },
  {
    name: "Mud Logging",
    startDate: weeks[1].endDate,
    endDate: weeks[3].startDate, 
    color: "bg-orange-400",
    position: { start: 10, width: 1.5 }
  },
  {
    name: "Casing",
    startDate: weeks[2].endDate,
    endDate: weeks[4].startDate,
    color: "bg-green-400", 
    position: { start: 14, width: 2 }
  },
  {
    name: "Well Testing",
    startDate: weeks[3].startDate,
    endDate: weeks[4].endDate,
    color: "bg-purple-400",
    position: { start: 21, width: 2 }
  }
];

const GanttChart = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const currentDate = getCurrentDate();
  const currentDayPosition = getCurrentDayPosition();

  return (
    <div className="bg-white min-h-screen">

      {/* Date Range */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-700">Période de forage:</span>
          <span className="font-medium">{weeks[0].startDate}</span>
          <span className="text-gray-500">→</span>  
          <span className="font-medium">{weeks[4].endDate}</span>
          <span className="ml-4 text-gray-600">(5 semaines: {weeks[0].label} à {weeks[4].label})</span>
        </div>
      </div>

      {/* Gantt Chart */}
      <div className="overflow-x-auto">
        <div className="min-w-[1000px]">
          {/* Timeline Header */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-[300px_repeat(5,1fr)] text-xs">
              <div className="border-r border-gray-200 p-3"></div>
              {weeks.map((week, idx) => (
                <div key={idx} className="border-r border-gray-200 p-2 text-center">
                  <div className="font-medium text-gray-700">{week.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Table Header */}
          <div className="bg-white border-b border-gray-200">
            <div className="grid grid-cols-[300px_repeat(5,1fr)] text-sm">
              <div className="border-r border-gray-200 p-3 bg-gray-50">
                <div className="font-medium text-gray-700 mb-1">Phase de forage</div>
                <div className="flex gap-6 text-xs text-gray-500">
                  <span>Date de début</span>
                  <span>Date de fin</span>
                </div>
              </div>
              {weeks.map((_, idx) => (
                <div key={idx} className="border-r border-gray-200 h-16 relative bg-gray-50">
                  {/* Ligne rouge pour la date actuelle (seulement dans la première semaine) */}
                  {idx === 0 && (
                    <div 
                      className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
                      style={{ left: `${(currentDayPosition / 7) * 100}%` }}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Phase Rows */}
          {phases.map((phase, idx) => (
            <div key={idx} className="border-b border-gray-100 hover:bg-gray-50">
              <div className="grid grid-cols-[300px_repeat(5,1fr)] items-center text-sm">
                <div className="border-r border-gray-200 p-3">
                  <div className="font-medium text-gray-900 mb-1 truncate">{phase.name}</div>
                  <div className="flex gap-6 text-xs text-gray-500">
                    <span>{phase.startDate}</span>
                    <span>{phase.endDate}</span>
                  </div>
                </div>
                
                {weeks.map((_, weekIdx) => (
                  <div key={weekIdx} className="border-r border-gray-200 h-14 relative bg-white">
                    {/* Ligne rouge pour la date actuelle (seulement dans la première semaine) */}
                    {weekIdx === 0 && (
                      <div 
                        className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
                        style={{ left: `${(currentDayPosition / 7) * 100}%` }}
                      ></div>
                    )}
                    
                    {/* Barre de phase */}
                    {weekIdx === Math.floor(phase.position.start / 7) && (
                      <div
                        className={`absolute top-1/2 transform -translate-y-1/2 h-4 rounded ${phase.color} shadow-sm`}
                        style={{
                          left: `${((phase.position.start % 7) / 7) * 100}%`,
                          width: `${(phase.position.width / 7) * 100}%`,
                        }}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GanttChart;