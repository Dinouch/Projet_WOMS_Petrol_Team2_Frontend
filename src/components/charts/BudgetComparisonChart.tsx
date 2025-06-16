import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
  const [labels, setLabels] = useState<string[]>([]);
  const [realCosts, setRealCosts] = useState<number[]>([]);
  const [plannedCosts, setPlannedCosts] = useState<number[]>([]);

  useEffect(() => {
    const fetchMonthlyCosts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8090/test_j2ee/analyseCouts?action=sommeParMois&nomPuit=A'
        );

        if (response.data && response.data.data) {
          const labelArray: string[] = [];
          const realArray: number[] = [];
          const plannedArray: number[] = [];

          response.data.data.forEach((item: any) => {
            labelArray.push(`${item.mois} ${item.annee}`);
            realArray.push(parseFloat(item.sommeReel));
            plannedArray.push(parseFloat(item.sommePrevu));
          });

          setLabels(labelArray);
          setRealCosts(realArray);
          setPlannedCosts(plannedArray);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données mensuelles:', error);
      }
    };

    fetchMonthlyCosts();
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Budget Réel',
        data: realCosts,
        borderColor: '#4b5563',
        backgroundColor: 'transparent',
        tension: 0.4,
        borderWidth: 2,
      },
      {
        label: 'Budget Prévu',
        data: plannedCosts,
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
            return tickValue + ' $';
          },
          color: '#6b7280',
          font: { size: 12 },
        },
        grid: { color: '#f3f4f6' },
      },
      x: {
        grid: { display: false },
        ticks: {
          color: '#6b7280',
          font: { size: 12 },
        }
      }
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-700">Budgets et Coûts</h3>
      </div>
      <div className="h-48">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default BudgetComparisonChart;
