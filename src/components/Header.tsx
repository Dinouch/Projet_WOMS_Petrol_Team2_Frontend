import React, { useState, useEffect } from 'react';
import { Search, Bell, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formattedDate = currentDate.toLocaleDateString('fr-FR', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
  
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center text-gray-500 gap-6">
        <span>System Date: {formattedDate}</span>
        <span>Calendar Time: {formattedDate}</span>
      </div>
      
      <div className="relative flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search or type a command"
            className="py-2 pl-10 pr-4 w-64 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            size={18} 
          />
        </div>
        
        <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
          <Bell size={20} />
        </button>
        
        <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
          <Settings size={20} />
        </button>
        
        <div className="flex items-center gap-2">
          <span className="font-medium text-orange-500">SR</span>
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <button 
          onClick={() => navigate('/profile')}
          className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer"
          aria-label="Voir les utilisateurs"
        >
          <User size={20} className="text-gray-500" />
        </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;