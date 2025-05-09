import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';


const Logout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState(null);

  const api = axios.create({
    baseURL: 'http://localhost:8090/test_j2ee',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setError(null);
    
    try {
      if (user && user.id) {
        await api.put(`/users/logout/${user.id}`);
      }
      
      // Redirection vers la page de login après déconnexion
      navigate('/login', { 
        state: { 
          message: 'Vous avez été déconnecté avec succès' 
        } 
      });
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      setError('Échec de la déconnexion. Veuillez réessayer.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="logout-container">
      <div className="logout-content">
        <h2>Êtes-vous sûr de vouloir vous déconnecter ?</h2>
        {error && <div className="error-message">{error}</div>}
        
        <button 
          onClick={handleLogout} 
          className="logout-button"
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <>
              <span className="spinner"></span>
              Déconnexion en cours...
            </>
          ) : (
            'Se déconnecter'
          )}
        </button>
      </div>
    </div>
  );
};

export default Logout;