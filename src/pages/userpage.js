import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUser, FiMail, FiPhone, FiBriefcase, FiMapPin, FiClock } from 'react-icons/fi';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Configuration Axios
  const api = axios.create({
    baseURL: 'http://localhost:8090/test_j2ee',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (err) {
        setError('Erreur lors du chargement des utilisateurs');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
          <button 
            onClick={() => window.location.reload()}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 mb-8">
          <div className="bg-orange-600 py-4 px-6">
            <h1 className="text-white text-2xl font-bold">Liste des Utilisateurs</h1>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map(user => (
                <div key={user.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                    <h3 className="font-bold text-lg text-gray-800 flex items-center">
                      <FiUser className="mr-2 text-orange-500" />
                      {user.name}
                      <span className="ml-auto bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {user.role}
                      </span>
                    </h3>
                  </div>

                  <div className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <FiMail className="mt-1 mr-3 text-orange-500 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="text-gray-800">{user.email}</p>
                        </div>
                      </div>

                      {user.phone && (
                        <div className="flex items-start">
                          <FiPhone className="mt-1 mr-3 text-orange-500 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">Téléphone</p>
                            <p className="text-gray-800">{user.phone}</p>
                          </div>
                        </div>
                      )}

                      {user.department && (
                        <div className="flex items-start">
                          <FiBriefcase className="mt-1 mr-3 text-orange-500 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">Département</p>
                            <p className="text-gray-800">{user.department}</p>
                          </div>
                        </div>
                      )}

                      {user.location && (
                        <div className="flex items-start">
                          <FiMapPin className="mt-1 mr-3 text-orange-500 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">Localisation</p>
                            <p className="text-gray-800">{user.location}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-start">
                        <FiClock className="mt-1 mr-3 text-orange-500 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Statut</p>
                          <p className="text-gray-800">
                            <span className={`inline-block w-3 h-3 rounded-full mr-2 ${user.isConnected ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                            {user.isConnected ? 'Connecté' : 'Déconnecté'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;