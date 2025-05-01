import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Delays from './pages/Delays';
import GanttChart from './pages/GanttChart';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/delays" element={<Delays />} />
          <Route path="/ganttChart" element={<GanttChart />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;