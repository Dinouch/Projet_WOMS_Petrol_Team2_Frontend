import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeeklyCostChart: React.FC = () => {
  const data = {
    labels: ['Sem1', 'Sem2', 'Sem3', 'Sem4', 'Sem5', 'Sem6'],
    datasets: [
      {
        label: 'Coûts hebdomadaires',
        data: [15000, 22000, 18000, 28000, 21000, 25000],
        borderColor: '#a5b4fc',
        backgroundColor: '#a5b4fc',
        pointBackgroundColor: 'white',
        pointBorderColor: '#333',
        pointBorderWidth: 1,
        pointRadius: 4,
        tension: 0.4,
        fill: false,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#333',
        bodyColor: '#333',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
      }
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full">
      <h3 className="text-lg font-medium text-purple-300 mb-4">Coûts hebdomadaires</h3>
      <div className="h-48">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default WeeklyCostChart;