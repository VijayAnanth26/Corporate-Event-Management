import { createContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        
        if (token && userData && userData.id) {
          setUser(userData);
          setIsAuthenticated(true);
          setIsAdmin(userData.role === 'ADMIN');
        } else {
          setUser(null);
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Clear potentially corrupted data
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        localStorage.removeItem('username');
        
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    
    initAuth();
  }, []);
  
  const login = (userData, token) => {
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('username', userData.email || '');
    
    setUser(userData);
    setIsAuthenticated(true);
    setIsAdmin(userData.role === 'ADMIN');
  };
  
  const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };
  
  const updateUser = (updatedUserData) => {
    const newUserData = { ...user, ...updatedUserData };
    localStorage.setItem('user', JSON.stringify(newUserData));
    setUser(newUserData);
    setIsAdmin(newUserData.role === 'ADMIN');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated,
        isAdmin,
        loading,
        login,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Export the context as default
export default AuthContext; 