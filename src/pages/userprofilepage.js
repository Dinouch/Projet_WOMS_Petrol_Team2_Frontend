import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { 
  FiUser, FiMail, FiPhone, FiBriefcase, 
  FiMapPin, FiClock, FiEdit, FiLogOut 
} from 'react-icons/fi';

const UserProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Configuration Axios
  const api = axios.create({
    baseURL: 'http://localhost:8090/test_j2ee',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Gestion automatique de la déconnexion
  const handleAutoLogout = () => {
    localStorage.removeItem('user');
    setUserData(null);
    navigate('/login', { state: { message: 'Session expirée', type: 'warning' } });
  };

  // Intercepteur pour les erreurs 401
  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        handleAutoLogout();
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = location.state?.userId || JSON.parse(localStorage.getItem('user'))?.id;
        
        if (!userId) {
          navigate('/login');
          return;
        }

        const response = await api.get(`/users/${userId}`);
        setUserData(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      } catch (err) {
        if (err.response?.status === 401) {
          handleAutoLogout();
        } else {
          setError('Erreur lors du chargement du profil');
          console.error('Error:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, location]);

  const handleLogout = async () => {
    try {
      if (!userData?.id) return;

      await api.put(`/users/logout/${userData.id}`);
      
      localStorage.removeItem('user');
      setUserData(null);
      
      navigate('/login', { 
        state: { 
          message: 'Déconnexion réussie',
          type: 'success'
        } 
      });
    } catch (err) {
      console.error('Logout error:', err);
      
      // Déconnexion forcée même si l'API échoue
      localStorage.removeItem('user');
      setUserData(null);
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => window.location.reload()}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded"
            >
              Réessayer
            </button>
            <button 
              onClick={handleLogout}
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
          <p className="text-gray-700 mb-4">Session expirée ou non authentifiée</p>
          <button 
            onClick={() => navigate('/login')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded"
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          {/* Header avec boutons */}
          <div className="bg-orange-600 py-4 px-6 flex justify-between items-center">
            <h1 className="text-white text-2xl font-bold">Mon Profil</h1>
            <div className="flex gap-2">
              <button 
                onClick={() => navigate('/edit-profile', { state: { user: userData } })}
                className="flex items-center text-white bg-orange-700 hover:bg-orange-800 px-4 py-2 rounded-lg transition-colors"
              >
                <FiEdit className="mr-2" />
                Modifier
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
              >
                <FiLogOut className="mr-2" />
                Déconnexion
              </button>
            </div>
          </div>

          {/* Contenu du profil */}
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Section gauche - Photo et infos basiques */}
              <div className="md:w-1/3 flex flex-col items-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                  {userData.photo ? (
                    <img 
                      src={userData.photo} 
                      alt="Photo de profil" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiUser size={48} className="text-gray-500" />
                  )}
                </div>
                
                <h2 className="text-xl font-bold text-gray-800 text-center">{userData.name}</h2>
                <p className="text-orange-600 font-medium text-center">{userData.role}</p>
                
                <div className="mt-4 w-full bg-gray-100 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FiClock className="text-orange-500 mr-2" />
                    <span className={`font-medium ${userData.isConnected ? 'text-green-600' : 'text-gray-600'}`}>
                      {userData.isConnected ? 'En ligne' : 'Hors ligne'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    Membre depuis {new Date(userData.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>

              {/* Section droite - Détails */}
              <div className="md:w-2/3">
                <div className="space-y-6">
                  {/* Informations personnelles */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                      Informations personnelles
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <FiMail className="mt-1 mr-3 text-orange-500 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="text-gray-800 font-medium">{userData.email}</p>
                        </div>
                      </div>

                      {userData.phone && (
                        <div className="flex items-start">
                          <FiPhone className="mt-1 mr-3 text-orange-500 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">Téléphone</p>
                            <p className="text-gray-800 font-medium">{userData.phone}</p>
                          </div>
                        </div>
                      )}

                      {userData.department && (
                        <div className="flex items-start">
                          <FiBriefcase className="mt-1 mr-3 text-orange-500 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">Département</p>
                            <p className="text-gray-800 font-medium">{userData.department}</p>
                          </div>
                        </div>
                      )}

                      {userData.location && (
                        <div className="flex items-start">
                          <FiMapPin className="mt-1 mr-3 text-orange-500 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">Localisation</p>
                            <p className="text-gray-800 font-medium">{userData.location}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Section compétences */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                      Compétences
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {userData.skills?.length > 0 ? (
                        userData.skills.map((skill, index) => (
                          <span 
                            key={index} 
                            className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500">Aucune compétence renseignée</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;