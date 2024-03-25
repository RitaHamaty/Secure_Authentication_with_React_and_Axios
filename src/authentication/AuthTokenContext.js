import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [ access, setAccess ] = useState('');
  const [ userType, setUserType ] = useState('admin');

  return (
    <AuthContext.Provider value={{ access, setAccess, userType, setUserType }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};