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

const Delays: React.FC = () => {




  const data = {
    labels: ['Progress', 'RPM_moy', 'Pressure'],
    datasets: [
      {
        label: 'Valeurs',
        data: [85, 1500, 250],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
        borderRadius: 8,
        barThickness: 40,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
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
          stepSize: 50
        }
      }
    }
  };








  const projectProgress = {
    labels: ['0%', '20%', '40%', '60%', '80%', '100%'],
    datasets: [
      {
        label: 'Réel',
        data: [30, 35, 45, 80, 90, 95],
        borderColor: '#3b82f6',
        backgroundColor: 'transparent',
        tension: 0.4,
      },
      {
        label: 'Planifié',
        data: [20, 30, 40, 60, 80, 100],
        borderColor: '#94a3b8',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        tension: 0.4,
      }
    ]
  };

  const problemTrend = {
    labels: ['Sem1', 'Sem2', 'Sem3', 'Sem4'],
    datasets: [
      {
        label: 'Nb problèmes',
        data: [4, 6, 3, 5],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99,102,241,0.1)',
        tension: 0.4,
        fill: true,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
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
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: number) {
            return value + ' %';
          },
        },
      },
    },
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-6">

        {/* Partie Gauche */}
        <div className="flex flex-col gap-6">
          
          {/* Avancement du projet */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-medium mb-4">Avancement du projet</h2>
            <div className="h-[250px]">
              <Line data={projectProgress} options={chartOptions} />
            </div>
          </div>

          {/* Tendance des problèmes */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-medium mb-4">Tendance des problèmes</h2>
            <div className="h-[250px]">
              <Line data={problemTrend} options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  legend: { display: false },
                },
              }} />
            </div>
          </div>





     
        </div>

        {/* Partie Droite */}
        <div className="flex flex-col gap-2">

          {/* KPIs */}
          <div className="flex gap-2 justify-between">
            {[
              { title: "ROP", value: "5.98", change: "+3%" },
              { title: "Couts", value: "39.76", change: "+3%" },
              { title: "NPT", value: "1.50", change: "+3%" },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center justify-center w-60">
                <h3 className="text-2xl font-bold">{item.value}</h3>
                <p className="text-gray-500">{item.title}</p>
                <span className="text-green-500 text-sm">{item.change} ↑</span>
              </div>
            ))}
          </div>

{/* Overall Efficiency */}
<div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center justify-center">
  <div className="relative w-60 h-30">
    <svg className="w-full h-full" viewBox="0 0 200 100">
      {/* Red arc */}
      <path d="M10,100 A90,90 0 0,1 70,20" fill="none" stroke="#E60000" strokeWidth="20" strokeLinecap="round" />
      {/* Yellow arc */}
      <path d="M70,20 A90,90 0 0,1 130,20" fill="none" stroke="#facc15" strokeWidth="20" strokeLinecap="round" />
      {/* Green arc */}
      <path d="M130,20 A90,90 0 0,1 190,100" fill="none" stroke="#16a34a" strokeWidth="20" strokeLinecap="round" />
      
      {/* Needle */}
      <line x1="100" y1="100" x2="130" y2="40" stroke="#0f172a" strokeWidth="7" strokeLinecap="round" />
      {/* Center circle */}
      <circle cx="100" cy="100" r="6" fill="#0f172a" />
    </svg>
  </div>
  <h2 className="text-lg font-medium mt-4 text-slate-900">Overall Efficiency</h2>
</div>


          
      <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-medium mb-4">Dashbored qualité </h2>
      <div className="h-[300px]">
        <Line data={data} options={options} />
      </div>
    </div>

        </div>
      </div>
    </div>
  );
};

export default Delays;
