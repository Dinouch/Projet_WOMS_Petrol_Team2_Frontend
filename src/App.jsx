import React from 'react';
import DrillingDashboard from './components/DrillingDashboard';
import DrillingParameters from './components/DrillingParameters';
import DrillingGeo from './components/DrillingGeo';
import AccueilIngenieur from './pages/AccueilIngenieur'


function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <AccueilIngenieur />
      </main>
    </div>
  );
}

export default App;