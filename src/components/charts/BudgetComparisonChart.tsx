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
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const BudgetComparisonChart: React.FC = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  
  const data = {
    labels: months,
    datasets: [
      {
        label: 'Budget Réel',
        data: [8000, 15000, 20000, 25000, 28000, 25000, 22000],
        borderColor: '#4b5563',
        backgroundColor: 'transparent',
        tension: 0.4,
        borderWidth: 2,
      },
      {
        label: 'Budget prévu',
        data: [10000, 14000, 16000, 20000, 25000, 28000, 30000],
        borderColor: '#d1d5db',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        tension: 0.4,
        borderWidth: 2,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          padding: 20,
        }
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#333',
        bodyColor: '#333',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 12,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(tickValue: number | string) {
            return tickValue + 'K';
          }
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-700">Budgets et coûts</h3>
      </div>
      <div className="h-48">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default BudgetComparisonChart;