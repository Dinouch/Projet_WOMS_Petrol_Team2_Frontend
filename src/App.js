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
import LoginPage from './pages/login.js';
import Logout from './pages/logout.js';
import CreateUserPage from './pages/CreateUser.js';
import UsersPage from './pages/userpage.js';
import UserProfilePage from './pages/userprofilepage.js';
import ReportsHistoryPage from './pages/historiquerapport.js';
import ProblemsPage from './pages/probleme.js';
import EngineerAssignmentPage from './pages/affectationpuit.js';
import DrillingReportForm from './pages/upload_manuel.js';
import Uploadonglet from './pages/upload_onglet.js';
import { AuthProvider } from './API/AuthContext';
import DrillingParameters from './components/DrillingParameters.jsx';
import AlertsPage from './pages/alertes.jsx';
import GanttChartMng from './pages/GanttChartMng.tsx';
import PuitOp from './components/PuitOp.jsx';
import ListPuits from './pages/ListPuits.jsx';


function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        {/* Upload sans Layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/creatuser" element={< CreateUserPage/>} />


        {/* Toutes les autres pages avec Layout */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
              <Route path="/listpuit" element={<ListPuits />} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="/puitop" element={<PuitOp/>} />
              <Route path="/alerte" element={<AlertsPage />} />
               <Route path="/Upload" element={<Uploadonglet />} />
              <Route path="/affectation-puits" element={<EngineerAssignmentPage />} />
              <Route path="/probleme-solution" element={<ProblemsPage/>} />
              <Route path="/historique-rapport" element={<ReportsHistoryPage />} />
              
                <Route path="/delays" element={<Delays />} />
                <Route path="/userspage" element={< UsersPage/>} />
                <Route path="/ganttChart" element={<GanttChart />} />
                <Route path="/ganttChartmng" element={<GanttChartMng />} />
                <Route path="/Acceuil" element={<Accueil />} />
                <Route path="/puit/:id" element={<Puit />} />
                <Route path="/details_couts" element={<DetailCouts />} />
                <Route path="/details_delai" element={<DetailDelais />} />
                <Route path="/Acceuil_ingenieur" element={<DrillingParameters />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
