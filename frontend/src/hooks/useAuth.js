import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);

export default useAuth; 