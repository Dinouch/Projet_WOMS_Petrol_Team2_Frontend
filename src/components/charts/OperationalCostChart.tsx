import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OperationalCostChart: React.FC = () => {
  const data = {
    labels: [
      'IT actives',
      'Oper technique & supervision',
      'Coûts d\'indisponibilité',
      'Route & contrôle sécurité',
      'Logging & services associés',
      'Gouvernance',
      'Sécurité'
    ],
    datasets: [
      {
        label: 'Coûts',
        data: [13281, 3620, 3466, 20019, 1665, 1770, 1360],
        backgroundColor: '#3b82f6',
        borderRadius: 4,
        barThickness: 30,
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
        callbacks: {
          label: function(context: any) {
            return `${context.parsed.y.toLocaleString()} $`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6',
        },
        ticks: {
          callback: function(value: number) {
            return value.toLocaleString() + ' $';
          },
          color: '#6b7280',
          font: {
            size: 12,
          },
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
            maxRotation: 45,
            minRotation: 45
          },
        }
      }
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Coûts de support et d'indisponibilité opérationnelle</h3>
        <div className="h-[400px]">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default OperationalCostChart;