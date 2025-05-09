import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: 'http://localhost:8090/test_j2ee',
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
  });

  // Charger l'utilisateur au démarrage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Connexion
  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await api.put('/users/auth', credentials);
      
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
      
      if (response.data.role === 'Ingenieur') {
        navigate('/Acceuil_ingenieur');
      } else {
        navigate('/Acceuil');
      }
      
      return response.data;
    } catch (error) {
      setError(error.response?.data?.error || 'Erreur de connexion');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Création de compte
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await api.post('/users', {
        ...userData,
        isConnected: false
      });
      
      navigate('/login', { 
        state: { success: 'Compte créé avec succès! Veuillez vous connecter.' } 
      });
      
      return response.data;
    } catch (error) {
      setError(error.response?.data?.error || 'Erreur lors de la création du compte');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Déconnexion
  const logout = async () => {
    try {
      if (user?.id) {
        await api.put(`/users/logout/${user.id}`);
      }
      
      localStorage.removeItem('user');
      setUser(null);
      navigate('/login', { state: { message: 'Déconnexion réussie' } });
    } catch (error) {
      setError('Erreur lors de la déconnexion');
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error, 
      login, 
      register, 
      logout,
      setError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);