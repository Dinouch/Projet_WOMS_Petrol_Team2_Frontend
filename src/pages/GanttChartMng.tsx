import React, { useState } from 'react';

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const phases = [
  {
    name: "Puit A",
    forecast: { start: { month: 0, day: 5 }, end: { month: 0, day: 26 } },
    actual: { start: { month: 0, day: 7 }, end: { month: 1, day: 10 } },
  },
  {
    name: "Puit B",
    forecast: { start: { month: 5, day: 1 }, end: { month: 7, day: 20 } },
    actual: { start: { month: 5, day: 5 }, end: { month: 8, day: 15 } },
  },
  {
    name: "Puit C",
    forecast: { start: { month: 9, day: 5 }, end: { month: 11, day: 26 } },
    actual: { start: { month: 9, day: 7 }, end: { month: 12, day: 10 } },
  },
  {
    name: "Puit D",
    forecast: { start: { month: 5, day: 1 }, end: { month: 7, day: 20 } },
    actual: { start: { month: 5, day: 5 }, end: { month: 8, day: 15 } },
  }
];

const GanttChartMng = () => {
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

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
        {/* Header */}
        <div className="grid grid-cols-[200px_repeat(12,minmax(80px,1fr))]">
          <div className="border p-2 font-bold text-center bg-gray-100">Phases</div>
          {months.map((month, idx) => (
            <div key={idx} className="border p-2 text-center font-bold bg-gray-100">{month}</div>
          ))}
        </div>

        {/* Rows */}
        {phases.map((phase, idx) => (
          <div key={idx} className="grid grid-cols-[200px_repeat(12,minmax(80px,1fr))] items-center text-sm">
            {/* Phase name */}
            <div className="border p-2 font-semibold bg-white">{phase.name}</div>

            {/* Timeline */}
            {months.map((_, monthIdx) => (
              <div key={monthIdx} className="relative border h-14">
                {/* Forecast (Prévision) */}
                {monthIdx >= phase.forecast.start.month && monthIdx <= phase.forecast.end.month && (
                  <div
                    className="absolute top-3 left-0 right-0 h-2 bg-orange-400 rounded cursor-pointer flex items-center"
                    onMouseEnter={(e) => handleMouseEnter(phase.forecast.start, phase.forecast.end, e)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Green flag au début */}
                    {monthIdx === phase.forecast.start.month && (
                      <div className="w-3 h-3 bg-green-500 rounded-full -ml-2"></div>
                    )}
                  </div>
                )}
                {/* Actual (Réel) */}
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

      {/* Tooltip on hover */}
      {hoverText && position && (
        <div
          className="absolute bg-white shadow-lg border rounded px-3 py-2 text-sm z-50"
          style={{ top: position.y + 10, left: position.x + 10 }}
        >
          {hoverText}
        </div>
      )}

      {/* Légende */}
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