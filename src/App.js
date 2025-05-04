import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReportPage from './pages/upload';
import Dashboard from './pages/Dashboard.tsx';
import Delays from './pages/Delays.tsx';
import GanttChart from './pages/GanttChart.tsx';
import FinancialRiskDashboard from './pages/AccueilIngenieur.jsx';
import DetailCouts from './pages/details_couts.js';
import DetailDelais from './pages/details_delais.js';
import Puit from './pages/Puit.js';
import Accueil from './pages/Accueil.js';
import Layout from './components/Layout.tsx';


function App() {
  return (
    <Router>
      <Routes>
        {/* Upload sans Layout */}
        <Route path="/" element={<ReportPage />} />
        <Route path="/Upload" element={<ReportPage />} />

        {/* Toutes les autres pages avec Layout */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/delays" element={<Delays />} />
                <Route path="/ganttChart" element={<GanttChart />} />
                <Route path="/Acceuil" element={<Accueil />} />
                <Route path="/puit" element={<Puit />} />
                <Route path="/details_couts" element={<DetailCouts />} />
                <Route path="/details_delai" element={<DetailDelais />} />
                <Route path="/Acceuil_ingenieur" element={<FinancialRiskDashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
