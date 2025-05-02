import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Header from './pages/Header';
import Layout from './pages/Layout';
import Puit from './pages/Puit';

function App() {
  return (
    <Router>
      <Layout />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/puit" element={<Puit />} />
      </Routes>
    </Router>
  );
}

export default App;
