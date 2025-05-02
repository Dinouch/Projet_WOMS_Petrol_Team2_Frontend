import React from 'react';
import { Bell, Settings, Trash2, Menu, Search } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="w-full flex items-center justify-between px-4 py-6 shadow-sm bg-white">
  <div className="flex items-center w-full">
    <Menu className="text-gray-500 w-5 h-5 cursor-pointer" onClick={toggleSidebar} />

    {/* Bloc de date au bon endroit */}
    <div className="ml-[60%] flex space-x-4">
      <p className="text-sm text-[#8A8A8A] font-semibold">
        System Date : <span className="font-normal">Feb 23 2023</span>
      </p>
      <p className="text-sm text-[#8A8A8A] font-semibold">
        Calendar Time : <span className="font-normal">Feb 23 2023</span>
      </p>
    </div>
  </div>

  <div className="flex items-center space-x-4">
    <div className="relative ml-[-20px]"> {}
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8A8A8A] w-4 h-4" />
      <input
        type="text"
        placeholder="Search or type a command"
        className="pl-10 pr-4 py-2 w-64 rounded-[10px] bg-gray-100 text-sm text-gray-600 focus:outline-none"
      />
    </div>

    <Bell className="w-5 h-5 text-[#8A8A8A] cursor-pointer" />
    <Settings className="w-5 h-5 text-[#8A8A8A] cursor-pointer" />
    <Trash2 className="w-5 h-5 text-[#8A8A8A] cursor-pointer" />

    <span className="text-sm font-semibold text-orange-600">SR</span>
    {/* 🔁 Agrandissement de la photo de profil */}
    <div className="w-10 h-10 rounded-full bg-gray-300"></div>
  </div>
</header>



  );
};

export default Header;
