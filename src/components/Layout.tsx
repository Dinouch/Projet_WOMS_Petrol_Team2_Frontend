import React from 'react';
import { useAuth } from '../API/AuthContext'; // Importez votre contexte d'authentification
import SidebarIng from '../components/SidebarIng.tsx'; // Sidebar pour les ingénieurs
import SidebarMng from '../components/SidebarMng.tsx'; // Sidebar pour les managers
import Header from './Header.tsx';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth(); // Accédez à l'utilisateur depuis le contexte
  console.log('auth'+user?.role)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Affichez la sidebar appropriée selon le rôle de l'utilisateur */}
      {user?.role === 'Ingenieur' ? <SidebarIng /> : <SidebarMng />},
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;