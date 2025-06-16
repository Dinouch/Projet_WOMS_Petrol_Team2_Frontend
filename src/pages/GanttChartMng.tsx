import React, { useEffect, useState } from 'react';
import axios from 'axios';

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const GanttChartMng = () => {
  const [phases, setPhases] = useState<any[]>([]);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8090/test_j2ee/puitsDates');
      const data = res.data;

      const toDateObj = (dateStr: string) => {
        const [year, month, day] = dateStr.split('-').map(Number);
        return { month: month - 1, day };
      };

      const parsed = data.map((item: any) => {
        const startObj = toDateObj(item.dateDebut);
        const endObj = toDateObj(item.dateActuelle);

        return {
          name: `Puit ${item.nomPuit}`,
          forecast: {
            start: startObj,      // Prévisionnel : même que dateDebut
            end: endObj           // Tu peux changer ici si tu veux une fin différente
          },
          actual: {
            start: startObj,      // Réel : même que dateDebut
            end: endObj           // Réel : dateActuelle
          }
        };
      });

      setPhases(parsed);
    } catch (error) {
      console.error("Erreur chargement données Gantt:", error);
    }
  };

  fetchData();
}, []);


  const handleMouseEnter = (
    start: { month: number; day: number },
    end: { month: number; day: number },
    e: React.MouseEvent
  ) => {
    const text = `du ${start.day} ${months[start.month]} au ${end.day} ${months[end.month]}`;
    setHoverText(text);
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setHoverText(null);
    setPosition(null);
  };

  return (
    <div className="relative overflow-x-auto p-6 bg-gray-50 min-h-screen">
      <div className="min-w-[1100px]">
        <div className="grid grid-cols-[200px_repeat(12,minmax(80px,1fr))]">
          <div className="border p-2 font-bold text-center bg-gray-100">Phases</div>
          {months.map((month, idx) => (
            <div key={idx} className="border p-2 text-center font-bold bg-gray-100">{month}</div>
          ))}
        </div>

        {phases.map((phase, idx) => (
          <div key={idx} className="grid grid-cols-[200px_repeat(12,minmax(80px,1fr))] items-center text-sm">
            <div className="border p-2 font-semibold bg-white">{phase.name}</div>

            {months.map((_, monthIdx) => (
              <div key={monthIdx} className="relative border h-14">
                {monthIdx >= phase.forecast.start.month && monthIdx <= phase.forecast.end.month && (
                  <div
                    className="absolute top-3 left-0 right-0 h-2 bg-orange-400 rounded cursor-pointer flex items-center"
                    onMouseEnter={(e) => handleMouseEnter(phase.forecast.start, phase.forecast.end, e)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {monthIdx === phase.forecast.start.month && (
                      <div className="w-3 h-3 bg-green-500 rounded-full -ml-2"></div>
                    )}
                  </div>
                )}
                {monthIdx >= phase.actual.start.month && monthIdx <= phase.actual.end.month && (
                  <div
                    className="absolute bottom-3 left-0 right-0 h-2 bg-blue-400 rounded cursor-pointer"
                    onMouseEnter={(e) => handleMouseEnter(phase.actual.start, phase.actual.end, e)}
                    onMouseLeave={handleMouseLeave}
                  ></div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {hoverText && position && (
        <div
          className="absolute bg-white shadow-lg border rounded px-3 py-2 text-sm z-50"
          style={{ top: position.y + 10, left: position.x + 10 }}
        >
          {hoverText}
        </div>
      )}

      <div className="flex gap-6 mt-8 items-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-2 bg-orange-400 rounded"></div>
          <span>Prévision</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-2 bg-blue-400 rounded"></div>
          <span>Réel</span>
        </div>
      </div>
    </div>
  );
};

export default GanttChartMng;
