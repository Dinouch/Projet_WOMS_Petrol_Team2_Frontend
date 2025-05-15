import React from 'react';
import { 
  Home, 
  DollarSign, 
  Clock, 
  BarChart2, 
  FileText, 
  AlertCircle
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const SidebarIng: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-[220px] bg-white border-r border-gray-200 h-screen hidden md:flex flex-col transition-all duration-300 shadow-sm">
      <div className="p-4 border-b border-gray-200 flex justify-center">
        <img 
          src="../images/esisonatrach.png" 
          className="h-20 w-40" 
          alt="Logo Entreprise"
        />
      </div>
      
      <nav className="flex-1 p-4 space-y-3"> {/* Espacement augmenté */}
        {/* Accueil */}
        <NavItem 
          to="/puit" 
          icon={<Home size={20} />} 
          label="Accueil" 
          isActive={location.pathname === '/puit'} 
        />
        
        {/* Coûts */}
        <NavItem 
          to="/details_couts" 
          icon={<DollarSign size={20} />} 
          label="Coûts" 
          isActive={location.pathname === '/details_couts'} 
        />
        
        {/* Délais */}
        <NavItem 
          to="/ganttChart" 
          icon={<Clock size={20} />} 
          label="Délais" 
          isActive={location.pathname === '/ganttChart'} 
        />
        
        {/* Dashboard des puits */}
        <NavItem 
          to="/acceuil_ingenieur" 
          icon={<BarChart2 size={20} />} 
          label="Dashboard des puits" 
          isActive={location.pathname === '/acceuil_ingenieur'} 
        />
        
        {/* Mes rapports */}
        <NavItem 
          to="/historique-rapport" 
          icon={<FileText size={20} />} 
          label="Mes rapports" 
          isActive={location.pathname === '/historique-rapport'} 
        />
        
        {/* Problèmes sur le terrain */}
        <NavItem 
          to="/probleme-solution" 
          icon={<AlertCircle size={20} />} 
          label="Problèmes terrain" 
          isActive={location.pathname === '/probleme-solution'} 
        />
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

export default SidebarIng;