import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Configuration Axios avec intercepteurs
  const api = axios.create({
    baseURL: 'http://localhost:8090/test_j2ee',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });

  // Intercepteur de requête
  api.interceptors.request.use(config => {
    console.log('Envoi requête:', config.method?.toUpperCase(), config.url);
    return config;
  }, error => {
    return Promise.reject(error);
  });

  // Intercepteur de réponse
  api.interceptors.response.use(response => {
    console.log('Réponse reçue:', response.status, response.data);
    return response;
  }, error => {
    if (error.response) {
      console.error('Erreur API:', error.response.status, error.response.data);
    } else {
      console.error('Erreur réseau:', error.message);
    }
    return Promise.reject(error);
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Tous les champs sont obligatoires');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Veuillez entrer un email valide');
      return false;
    }

    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await api.put('/users/auth', formData, {
        validateStatus: status => status < 500
      });
      localStorage.setItem('user', JSON.stringify(response.data));

      if (response.status === 200) {
        if (response.data.role === 'Ingenieur' && response.data.isConnected) {
          navigate('/acceuil', { 
            state: { 
              user: response.data,
              authTime: new Date().toISOString()
            } 
          });
        } else {
          
          navigate('/listpuit', { 
            state: { 
              user: response.data,
              authTime: new Date().toISOString()
            } 
          });
        }
      } else {
        handleApiError(response);
      }
    } catch (err) {
      handleNetworkError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiError = (response) => {
    const errorMessages = {
      400: 'Requête invalide',
      401: 'Email ou mot de passe incorrect',
      403: 'Accès non autorisé',
      404: 'Utilisateur non trouvé'
    };
    
    setError(errorMessages[response.status] || `Erreur serveur (${response.status})`);
  };

  const handleNetworkError = (err) => {
    const errorMessages = {
      'ECONNABORTED': 'Le serveur ne répond pas - temps dépassé',
      'Network Error': 'Impossible de se connecter au serveur',
      'default': 'Une erreur inattendue est survenue'
    };

    setError(errorMessages[err.code || err.message.includes('Network') ? 
      (err.code || 'Network Error') : 'default']);
    
    console.error('Détails erreur:', err);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="bg-orange-600 py-5 px-6">
          <h2 className="text-white text-2xl font-bold text-center">Connexion Ingénieur</h2>
        </div>

        <form onSubmit={handleLogin} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md animate-fade-in">
              <p className="font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email professionnel
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
              autoComplete="email"
              required
              placeholder="prenom.nom@entreprise.com"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 pr-12"
                autoComplete="current-password"
                required
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-orange-600 transition-colors"
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-3 px-4 rounded-lg shadow-sm text-lg font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all ${isLoading ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-md'}`}
            >
              {isLoading ? (
                <>
                  <SpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Connexion en cours...
                </>
              ) : (
                'Se connecter'
              )}
            </button>
          </div>
        </form>

        <div className="bg-gray-50 px-6 py-4 text-center border-t border-gray-200">
  <p className="text-sm text-gray-600">
    Pas encore de compte ?{' '}
    <button 
      onClick={() => navigate('/creatuser')}
      className="font-medium text-orange-600 hover:text-orange-500 focus:outline-none"
    >
      Créer un compte
    </button>
  </p>
  <p className="text-xs text-gray-500 mt-1">
    Système sécurisé © {new Date().getFullYear()} - Tous droits réservés
  </p>
</div>
      </div>
    </div>
  );
};

// Composants d'icônes
const EyeIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

const SpinnerIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default LoginPage;