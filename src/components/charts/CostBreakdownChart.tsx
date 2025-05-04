import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const CostBreakdownChart: React.FC = () => {
  const data = {
    labels: ['Labor', 'Equipment', 'Material', 'Other'],
    datasets: [
      {
        data: [35, 35, 30],
        backgroundColor: [
          '#3b82f6',
          '#60a5fa',
          '#93c5fd',
        ],
        borderColor: [
          '#3b82f6',
          '#60a5fa',
          '#93c5fd',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyleWidth: 10,
        },
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#333',
        bodyColor: '#333',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 12,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full">
      <h3 className="text-lg font-medium text-gray-700 mb-4">Cost Breakdown</h3>
      <div className="h-48 flex items-center justify-center">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default CostBreakdownChart;