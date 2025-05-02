import React from "react";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement } from 'chart.js';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

ChartJS.register(ArcElement); // Assure-toi que ceci est bien en haut de ton fichier

const data = [
  { date: "1 jan", depth: 50 },
  { date: "2 jan", depth: 120 },
  { date: "3 jan", depth: 200 },
  { date: "4 jan", depth: 250 },
  { date: "5 jan", depth: 320 },
  { date: "6 jan", depth: 340 },
  { date: "7 jan", depth: 390 },
  { date: "8 jan", depth: 450 },
  { date: "9 jan", depth: 500 },
  { date: "10 jan", depth: 600 },
  { date: "11 jan", depth: 800 },
  { date: "12 jan", depth: 1000 },
  { date: "13 jan", depth: 1200 },
  { date: "14 jan", depth: 1500 },
  { date: "15 jan", depth: 1800 },
  { date: "16 jan", depth: 2000 },
];


// Options des graphiques cercle à 80%
const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    circumference: 288,
    rotation: 216,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    elements: {
      arc: {
        borderWidth: 0,
        borderRadius: 10,
        borderJoinStyle: 'round',
        spacing: 0
      }
    }
  };

  // Fonction pour créer les données des graphiques
  const createChartData = (value, maxValue, color) => {
    const filled = (value / maxValue) * 100;
    return {
      datasets: [{
        data: [filled, 100 - filled],
        backgroundColor: [color, '#f3f4f6'],
        borderWidth: 0
      }]
    };
  };
  
  const CircleChart = ({ value, color, centerText, icon, remarque }) => {
    const filled = parseInt(value); // exemple: 80
    const chartData = {
      datasets: [
        {
          data: [filled, 100 - filled],
          backgroundColor: [color, 'transparent'],
          borderWidth: 0,
        },
      ],
    };
  
    const backgroundData = {
      datasets: [
        {
          data: [100],
          backgroundColor: ['#f3f4f6'],
          borderWidth: 0,
        },
      ],
    };
  
    return (
      <div className="relative w-40 h-40">
        {/* Doughnut de fond (gris et fin) */}
        <Doughnut
          data={backgroundData}
          options={{
            ...doughnutOptions,
            cutout: '85%',
            circumference: 288,
            rotation: 216,
          }}
        />
  
        {/* Doughnut coloré par-dessus (plus épais) */}
        <div className="absolute inset-0">
          <Doughnut data={chartData} options={doughnutOptions} />
        </div>
  
        {/* Texte au centre */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center">
            {icon && (
              <div className="w-8 h-8 mb-1 rounded-full bg-[#ECEAF8] flex items-center justify-center">
                <img src={icon} alt="icon" className="w-5 h-5" />
              </div>
            )}
           <span className="text-lg font-bold text-[#404040]">{centerText}</span>
           <span className="text-xs font-bold text-[#404040] mt-1">{remarque}</span>

          </div>
        </div>

      </div>
    );
  };
  
  
  
  
    

const Puit = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
     

      {/* Conteneur principal blanc */}
      <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-10"> {/* Flex container pour aligner le titre et le bouton */}
        <h1 className="text-2xl font-bold" style={{ color: '#FF8A66' }}>Détails par puit</h1>
        <button className="border border-gray-300 text-[#2C5378] px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100">
          Sélectionner un puit
        </button>
      </div>
      
        {/* Flex container pour les deux colonnes */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Colonne gauche (40%) */}
          <div className="md:w-2/5">
            <h2 className="text-lg font-semibold mb-2">Puit d'Adrar #03002 :</h2>
            <p className="text-gray-700 mb-4">
              Le puits d'Adrar atteint 300m de profondeur<br />
              avec plusieurs tubages. Il contient de la<br />
              saumure et vise les objectifs Dv3, Dv2, Dv1,<br />
              Ord2 et Ord1.
            </p>

            {/* Phase et Opération en ligne */}
            <div className="flex space-x-20 mb-5">
                {/* Phase actuelle */}
                <div className="flex flex-col w-60"> {/* largeur augmentée */}
                  <label className="font-semibold text-gray-800 mb-1">Phase actuelle</label>
                  <div className="border border-gray-300 rounded-md px-3 py-2" style={{ color: '#8A8A8A' }}>
                    phase 1
                  </div>
                </div>

                {/* Opération actuelle */}
                <div className="flex flex-col w-60"> {/* même largeur que l'autre */}
                  <label className="font-semibold text-gray-800 mb-1">Opération actuelle</label>
                  <div className="border border-gray-300 rounded-md px-3 py-2" style={{ color: '#8A8A8A' }}>
                    forage
                  </div>
                </div>
              </div>


            {/* Image du schéma du puits */}
            <div className="bg-white-100 rounded-lg p-4 flex items-center justify-center border border-gray-300">
              <img 
                src="/images/puit.png" 
                alt="Schéma du puits"
                className="max-w-full h-auto"
              />
            </div>
          </div>

          {/* Colonne droite (60%) */}
          <div className="md:w-3/5">
            {/* Graphique */}
            <div className="mb-11">
              <div className="text-center mb-2">
                <p className="text-2xl font-bold">300m</p>
                <p className="text-sm text-gray-500">Votre profondeur totale actuelle</p>
              </div>

              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                 <CartesianGrid stroke="#B1B1B1" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis reversed domain={[0, 500]} tickFormatter={(value) => `${value}m`}  ticks={[50,150,250,350, 500, 1000,1500,2000]} />
                  <Tooltip formatter={(value) => `${value} m`} />
                  <Line type="monotone" dataKey="depth" stroke="#FF7700" strokeWidth={2} dot />
                </LineChart>
              </ResponsiveContainer>
            </div>

           
<div className="flex gap-4 h-1/2 ">
  {/* Coast Performance */}
  <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col w-full border border-gray-300">
    <div className="text-center mb-3">
    <p className="text-sm font-bold" style={{ color: '#2E2E30' }}>Coast Performance</p>

    </div>
    <div className="flex flex-col items-center">
     
      
      <CircleChart
        value="80%"
        color="#268F00"
        centerText="1,6 M $"
        icon="/images/argent.png"
        remarque="Excellent"
      />
    </div>
    <button className="border border-gray-300 rounded-md px-14 py-2 text-sm font-bold self-center mt-2" style={{ color: '#8A8A8A' }}>
  Détails
</button>


  </div>

  {/* Délai Performance */}
  <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col w-full border border-gray-300">
    <div className="text-center mb-3">
    <p className="text-sm font-bold" style={{ color: '#2E2E30' }}>Délai Performance</p>
    </div>
    <div className="flex flex-col items-center">
    
      <CircleChart
        value="33%"
        color="#FF7700"
        centerText="40/120"
         icon="/images/delai.png"
        remarque="Moyen"
        
      />
    </div>
    <button className="border border-gray-300 rounded-md px-14 py-2 text-sm font-bold self-center mt-2" style={{ color: '#8A8A8A' }}>
  Details
</button>
  </div>
</div>


    </div>
        </div>
      </div>

      
    </div>
  );
};

export default Puit;