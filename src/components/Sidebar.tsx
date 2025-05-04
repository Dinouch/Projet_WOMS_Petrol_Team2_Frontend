import React from 'react';
import { Home, BarChart3, Clock, FileText, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-[220px] bg-white border-r border-gray-200 h-screen hidden md:flex flex-col transition-all duration-300 shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <button className="p-2 rounded-md hover:bg-gray-100">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <NavItem to="/Acceuil" icon={<Home size={20} />} label="Accueil" isActive={location.pathname === '/costs'} />
        <NavItem to="/puit" icon={<BarChart3 size={20} />} label="Carte des puits" isActive={location.pathname === '/wells'} />
        <NavItem to="/dashboard" icon={<FileText size={20} />} label="Coûts" isActive={location.pathname === '/'} />
        <NavItem to="/ganttChart" icon={<Clock size={20} />} label="Délais" isActive={location.pathname === '/ganttChart'} />
        <NavItem to="/delays" icon={<Settings size={20} />} label="Gestion des puits" isActive={location.pathname === '/delays'} />
      </nav>
    </div>
  );
};

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  to: string;
};

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive = false, to }) => {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
        isActive ? 'bg-gray-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <div className="flex-shrink-0">
        {icon}
      </div>
      <span className="font-medium text-sm">{label}</span>
    </Link>
  );
};

export default Sidebar;