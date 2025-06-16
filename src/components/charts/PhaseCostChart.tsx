import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

const PhaseCostChart = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [realCosts, setRealCosts] = useState<number[]>([]);
  const [plannedCosts, setPlannedCosts] = useState<number[]>([]);

  useEffect(() => {
    const fetchPhaseCosts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8090/test_j2ee/analyseCouts?action=sommeParPhase&nomPuit=A'
        );

        if (response.data && response.data.data) {
          const phases: string[] = [];
          const real: number[] = [];
          const planned: number[] = [];

          response.data.data.forEach((item: any) => {
            phases.push(item.phase);
            real.push(parseFloat(item.sommeReel));
            planned.push(parseFloat(item.sommePrevu));
          });

          setLabels(phases);
          setRealCosts(real);
          setPlannedCosts(planned);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des coûts par phase:', error);
      }
    };

    fetchPhaseCosts();
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Prévisions',
        data: plannedCosts,
        backgroundColor: '#3b82f6',
        borderRadius: {
          topLeft: 4,
          topRight: 4,
          bottomLeft: 0,
          bottomRight: 0
        },
        barThickness: 60,
      },
      {
        label: 'Coûts réels',
        data: realCosts,
        backgroundColor: '#94a3b8',
        borderRadius: {
          topLeft: 0,
          topRight: 0,
          bottomLeft: 4,
          bottomRight: 4
        },
        barThickness: 60,
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
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          color: '#6b7280',
          font: { size: 12 },
        }
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
    scales: {
      y: {
        beginAtZero: true,
        display: true,
        stacked: true,
        grid: { color: '#f3f4f6' },
        ticks: {
          callback: (value: number) => value + ' $',
          stepSize: 500,
          color: '#6b7280',
          font: { size: 12 },
        }
      },
      x: {
        stacked: true,
        grid: { display: false },
        ticks: {
          color: '#6b7280',
          font: { size: 12 },
        }
      }
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Coûts des phases</h3>
        </div>
        <div className="h-[400px]">
          <Bar data={data} options={options} />
        </div>
        <p className="text-sm text-gray-500">Graphique des tendances des coûts des phases</p>
      </div>
    </div>
  );
};

export default PhaseCostChart;
