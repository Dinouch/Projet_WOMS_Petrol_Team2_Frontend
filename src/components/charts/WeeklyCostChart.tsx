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

const WeeklyCostChart = () => {
  const [weeklyLabels, setWeeklyLabels] = useState<string[]>([]);
  const [weeklyData, setWeeklyData] = useState<number[]>([]);

  useEffect(() => {
    const fetchWeeklyCosts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8090/test_j2ee/analyseCouts?action=sommeParSemaine&nomPuit=A'
        );

        if (response.data && response.data.data) {
          const labels: string[] = [];
          const data: number[] = [];

          response.data.data.forEach((item: any) => {
            labels.push(`Sem${item.semaineRelative + 1}`);
            data.push(parseFloat(item.sommeReel));
          });

          setWeeklyLabels(labels);
          setWeeklyData(data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données hebdomadaires:', error);
      }
    };

    fetchWeeklyCosts();
  }, []);

  const chartData = {
    labels: weeklyLabels,
    datasets: [
      {
        label: 'Coûts hebdomadaires',
        data: weeklyData,
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
      legend: { display: false },
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
        grid: { display: false },
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
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default WeeklyCostChart;
