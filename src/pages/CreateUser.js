import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiBriefcase, FiChevronDown } from "react-icons/fi";
import axios from "axios";

const CreateUserPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Ingenieur",
    department: "Exploration"
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showDeptDropdown, setShowDeptDropdown] = useState(false);

  // Options pour les listes déroulantes
  const roleOptions = ["Ingenieur", "Technicien", "Administrateur"];
  const departmentOptions = ["Exploration", "Production", "R&D", "Maintenance"];

  // Styles constants (cohérents avec votre template)
  const inputClass = "w-full bg-gray-50 rounded-lg px-4 py-3 border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700 pl-10";
  const buttonClass = "px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium";
  const dropdownClass = "absolute z-10 mt-1 w-full bg-white border border-orange-300 rounded-lg shadow-lg max-h-60 overflow-auto";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const selectOption = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
    field === "role" ? setShowRoleDropdown(false) : setShowDeptDropdown(false);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Le nom est requis";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Email invalide";
    if (formData.password.length < 6) newErrors.password = "Minimum 6 caractères";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    if (!formData.role) newErrors.role = "Sélectionnez un rôle";
    if (!formData.department) newErrors.department = "Sélectionnez un département";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:8090/test_j2ee/users", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        department: formData.department,
        isConnected: false
      });

      if (response.status === 201) {
        navigate("/acceuil", { 
          state: { 
            message: "Utilisateur créé avec succès",
            user: response.data 
          } 
        });
      }
    } catch (error) {
      console.error("Erreur création utilisateur:", error);
      setErrors({
        submit: error.response?.data?.error || "Erreur lors de la création"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Titre cohérent avec votre template */}
      <h1 className="text-2xl font-bold mb-6 border-b-2 border-orange-500 pb-2">
        Création d'utilisateur
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Nom complet */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Nom complet</label>
          <div className="relative">
            <FiUser className="absolute left-3 top-3.5 text-orange-500" size={20} />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Jean Dupont"
              className={inputClass}
            />
          </div>
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Email</label>
          <div className="relative">
            <FiMail className="absolute left-3 top-3.5 text-orange-500" size={20} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jean.dupont@example.com"
              className={inputClass}
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Mot de passe */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Mot de passe</label>
          <div className="relative">
            <FiLock className="absolute left-3 top-3.5 text-orange-500" size={20} />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={inputClass}
            />
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Confirmation mot de passe */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Confirmer le mot de passe</label>
          <div className="relative">
            <FiLock className="absolute left-3 top-3.5 text-orange-500" size={20} />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={inputClass}
            />
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

        {/* Rôle (dropdown) */}
        <div className="mb-6 relative">
          <label className="block text-lg font-semibold mb-2">Rôle</label>
          <div className="relative">
            <input
              type="text"
              value={formData.role}
              readOnly
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className={`${inputClass} cursor-pointer pr-10`}
            />
            <FiChevronDown 
              className={`absolute right-3 top-3.5 text-orange-500 transition-transform ${
                showRoleDropdown ? "rotate-180" : ""
              }`}
              size={20}
            />
            {showRoleDropdown && (
              <div className={dropdownClass}>
                {roleOptions.map((option, i) => (
                  <div
                    key={i}
                    className={`px-4 py-2 hover:bg-orange-50 cursor-pointer ${
                      formData.role === option ? "bg-orange-100" : ""
                    }`}
                    onClick={() => selectOption("role", option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
        </div>

        {/* Département (dropdown) */}
        <div className="mb-8 relative">
          <label className="block text-lg font-semibold mb-2">Département</label>
          <div className="relative">
            <input
              type="text"
              value={formData.department}
              readOnly
              onClick={() => setShowDeptDropdown(!showDeptDropdown)}
              className={`${inputClass} cursor-pointer pr-10`}
            />
            <FiBriefcase className="absolute left-3 top-3.5 text-orange-500" size={20} />
            <FiChevronDown 
              className={`absolute right-3 top-3.5 text-orange-500 transition-transform ${
                showDeptDropdown ? "rotate-180" : ""
              }`}
              size={20}
            />
            {showDeptDropdown && (
              <div className={dropdownClass}>
                {departmentOptions.map((option, i) => (
                  <div
                    key={i}
                    className={`px-4 py-2 hover:bg-orange-50 cursor-pointer ${
                      formData.department === option ? "bg-orange-100" : ""
                    }`}
                    onClick={() => selectOption("department", option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
          {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
        </div>

        {/* Bouton de soumission */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${buttonClass} flex items-center justify-center min-w-40 ${
              isSubmitting ? "opacity-75" : ""
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Création...
              </>
            ) : "Créer l'utilisateur"}
          </button>
        </div>

        {errors.submit && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg">
            {errors.submit}
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateUserPage;