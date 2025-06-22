import React, { useState, useEffect } from "react";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import puitop from '../photos/puitop.png'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

ChartJS.register(ArcElement);

const Puit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [costData, setCostData] = useState({
        statutGlobal: "Vert",
        totalReel: "0.00",
        pourcentageConsomme: "0"
    });

    const [delaiData, setDelaiData] = useState({
        statutGlobalDelai: "Vert",
        nbrJourX: 0,
        totalJour: 0,
        totalPrevuReste: 120,
        totalNonPrevu: 0
    });

    const [puitInfo, setPuitInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch puit info
                const puitResponse = await axios.get(
                    `http://localhost:8090/test_j2ee/puits/${id}`
                );
                setPuitInfo(puitResponse.data);

                // Fetch cost data
                const costResponse = await axios.get(
                    `http://localhost:8090/test_j2ee/analyseCouts?action=statistiquesGlobales&nomPuit=A`
                );
                if (costResponse.data.success) {
                    setCostData({
                        statutGlobal: costResponse.data.statutGlobal,
                        totalReel: costResponse.data.totalReel,
                        pourcentageConsomme: costResponse.data.pourcentageConsomme
                    });
                }

                // Fetch delai data
                const delaiResponse = await axios.get(
                    `http://localhost:8090/test_j2ee/analyseDelais?action=statistiquesGlobales&nomPuit=A`
                );
                if (delaiResponse.data.success) {
                    setDelaiData({
                        statutGlobalDelai: delaiResponse.data.statutGlobalDelai,
                        nbrJourX: delaiResponse.data.nbrJourX,
                        totalJour: delaiResponse.data.totalJour,
                        totalPrevuReste: delaiResponse.data.totalPrevuReste,
                        totalNonPrevu: delaiResponse.data.totalNonPrevu
                    });
                }

                setLoading(false);
            } catch (error) {
                console.error("Erreur:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const getCostColor = () => {
        switch(costData.statutGlobal) {
            case "Vert": return "#268F00";
            case "Orange": return "#FF7700";
            case "Rouge": return "#FF0000";
            default: return "#268F00";
        }
    };

    const getDelaiColor = () => {
        switch(delaiData.statutGlobalDelai) {
            case "Vert": return "#268F00";
            case "Orange": return "#FF7700";
            case "Rouge": return "#FF0000";
            default: return "#268F00";
        }
    };

    const getCostStatusText = () => {
        switch(costData.statutGlobal) {
            case "Vert": return "Excellent";
            case "Orange": return "Moyen";
            case "Rouge": return "Mauvais";
            default: return "Excellent";
        }
    };

    const getDelaiStatusText = () => {
        switch(delaiData.statutGlobalDelai) {
            case "Vert": return "Excellent";
            case "Orange": return "Moyen";
            case "Rouge": return "Mauvais";
            default: return "Excellent";
        }
    };

    const formatMontant = (montant) => {
        const num = parseFloat(montant);
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)} M $`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)} K $`;
        return `${num.toFixed(2)} $`;
    };

    const getDelaiPercentage = () => {
        return (delaiData.nbrJourX / 120) * 100;
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="bg-white p-6 rounded-xl shadow">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-2xl font-bold" style={{ color: '#FF8A66' }}>
                        {puitInfo ? `Puit ${puitInfo.nom_puit} #${puitInfo.id_puit}` : 'Détails par puit'}
                    </h1>
                    <button className="border border-gray-300 text-[#2C5378] px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100">
                        Sélectionner un puit
                    </button>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-2/5">
                        <h2 className="text-lg font-semibold mb-2">
                            {puitInfo ? `Puit ${puitInfo.nom_puit} #${puitInfo.id_puit}` : 'Chargement...'}
                        </h2>
                        <p className="text-gray-700 mb-4">
                            {puitInfo ? (
                                <>
                                    Le puits de {puitInfo.zone.wilaya} atteint {puitInfo.zone.elevation}m de profondeur<br />
                                    avec plusieurs tubages. Il contient de la<br />
                                    saumure et vise les objectifs Dv3, Dv2, Dv1,<br />
                                    Ord2 et Ord1.
                                </>
                            ) : 'Chargement des informations...'}
                        </p>

                        <div className="flex space-x-20 mb-5">
                            <div className="flex flex-col w-60">
                                <label className="font-semibold text-gray-800 mb-1">Phase actuelle</label>
                                <div className="border border-gray-300 rounded-md px-3 py-2" style={{ color: '#8A8A8A' }}>
                                    20"
                                </div>
                            </div>

                            <div className="flex flex-col w-60">
                                <label className="font-semibold text-gray-800 mb-1">Opération actuelle</label>
                                <div className="border border-gray-300 rounded-md px-3 py-2" style={{ color: '#8A8A8A' }}>
                                    LOGGING
                                </div>
                            </div>
                        </div>

                        <div className="bg-white-100 rounded-lg p-4 flex items-center justify-center border border-gray-300">
                            <img 
                                src={puitop}
                                alt="Schéma du puits"
                                className="max-w-full h-auto"
                            />
                        </div>
                    </div>

                    <div className="md:w-3/5">
                        <div className="mb-11">
                            <div className="text-center mb-2">
                                <p className="text-2xl font-bold">
                                    {puitInfo ? `${puitInfo.zone.elevation}m` : '0m'}
                                </p>
                                <p className="text-sm text-gray-500">Votre profondeur totale actuelle</p>
                            </div>

                            <ResponsiveContainer width="100%" height={220}>
                                <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid stroke="#B1B1B1" vertical={false} />
                                    <XAxis dataKey="date" />
                                    <YAxis 
                                        reversed 
                                        domain={[0, 500]} 
                                        tickFormatter={(value) => `${value}m`}  
                                        ticks={[50,150,250,350, 500, 1000,1500,2000]} 
                                    />
                                    <Tooltip formatter={(value) => `${value} m`} />
                                    <Line 
                                        type="monotone" 
                                        dataKey="depth" 
                                        stroke="#FF7700" 
                                        strokeWidth={2} 
                                        dot 
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="flex gap-4 h-1/2">
                            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col w-full border border-gray-300">
                                <div className="text-center mb-3">
                                    <p className="text-sm font-bold" style={{ color: '#2E2E30' }}>Cost Performance</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    {loading ? (
                                        <div className="w-40 h-40 flex items-center justify-center">Chargement...</div>
                                    ) : (
                                        <CircleChart
                                            value={costData.pourcentageConsomme}
                                            color={getCostColor()}
                                            centerText={formatMontant(costData.totalReel)}
                                            icon="/images/argent.png"
                                            remarque={getCostStatusText()}
                                        />
                                    )}
                                </div>
                                <button 
                                    onClick={() => navigate(`/details_couts`)}
                                    className="border border-gray-300 rounded-md px-14 py-2 text-sm font-bold self-center mt-2" 
                                    style={{ color: '#8A8A8A' }}
                                >
                                    Détails
                                </button>
                            </div>

                            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col w-full border border-gray-300">
                                <div className="text-center mb-3">
                                    <p className="text-sm font-bold" style={{ color: '#2E2E30' }}>Délai Performance</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    {loading ? (
                                        <div className="w-40 h-40 flex items-center justify-center">Chargement...</div>
                                    ) : (
                                        <CircleChart
                                            value={getDelaiPercentage()}
                                            color={getDelaiColor()}
                                            centerText={`${delaiData.nbrJourX}/120`}
                                            icon="/images/delai.png"
                                            remarque={getDelaiStatusText()}
                                        />
                                    )}
                                </div>
                                <button
                                    onClick={() => navigate(`/details_delai`)}
                                    className="border border-gray-300 rounded-md px-14 py-2 text-sm font-bold self-center mt-2" 
                                    style={{ color: '#8A8A8A' }}
                                >
                                    Détails
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CircleChart = ({ value, color, centerText, icon, remarque }) => {
    const filled = parseFloat(value);
    const chartData = {
        datasets: [{
            data: [filled, 100 - filled],
            backgroundColor: [color, 'transparent'],
            borderWidth: 0,
        }],
    };

    const backgroundData = {
        datasets: [{
            data: [100],
            backgroundColor: ['#f3f4f6'],
            borderWidth: 0,
        }],
    };

    return (
        <div className="relative w-40 h-40">
            <Doughnut
                data={backgroundData}
                options={{
                    cutout: '85%',
                    circumference: 288,
                    rotation: 216,
                    plugins: { legend: { display: false } }
                }}
            />
            <div className="absolute inset-0">
                <Doughnut 
                    data={chartData} 
                    options={{
                        cutout: '70%',
                        circumference: 288,
                        rotation: 216,
                        plugins: { legend: { display: false } }
                    }} 
                />
            </div>
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

export default Puit;