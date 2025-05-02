import React from 'react';
import { X } from 'lucide-react';


export default function Sidebar({ onClose }) {
  return (
    <div className="fixed inset-0 z-40 flex">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>

      {/* Sidebar */}
      <div className="relative w-64 bg-white h-full shadow-md z-50 pt-10 px-4">
        {/* Button de fermeture fixé en haut à gauche */}
        <button onClick={onClose} className="absolute top-4 left-4">
          <X className="w-6 h-6" />
        </button>

        {/* Navigation avec padding en haut */}
        <nav className="mt-12">
          <ul className="space-y-6">
            <li className="flex items-center space-x-2">
              {/* Icône Accueil */}
              <img src="/images/accueilIcon.png" alt="Accueil" className="w-4 h-4" />
              <a href="#">Accueil</a>
            </li>
            <li className="flex items-center space-x-2">
              {/* Icône Carte des puits */}
              <img src="/images/carte.png" alt="Carte des puits" className="w-6 h-6" />
              <a href="#">Carte des puits</a>
            </li>
            <li className="flex items-center space-x-2">
              {/* Icône Coûts */}
              <img src="/images/couts.png" alt="Coûts" className="w-4 h-4" />
              <a href="#">Coûts</a>
            </li>
            <li className="flex items-center space-x-2">
              {/* Icône Délai */}
              <img src="/images/delais.png" alt="Délai" className="w-4 h-4" />
              <a href="#">Delais</a>
            </li>
            <li className="flex items-center space-x-2">
              {/* Icône Gestion des puits */}
              <img src="/images/gestion.png" alt="Gestion des puits" className="w-4 h-4" />
              <a href="#">Gestion des puits</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
