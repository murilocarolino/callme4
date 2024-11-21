import React, { useContext } from "react";
import { AuthContext } from './Contexts/AuthContext';
import '/src/css/App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";  
import Login from '/src/pages/Login.jsx';
import Cadastro from '/src/pages/Cadastro.jsx';
import ChatScreen from '/src/pages/AppChat.jsx';
import Dashboard from "./src/pages/DashboardChat.jsx";
import AjudaScreen from '/src/pages/Autoajuda.jsx';
import Estatistica from '/src/pages/Estatistica.jsx'; 
import Doacao from '/src/pages/Doacao.jsx'; 
import PasswordRecovery1 from '/src/pages/PasswordRecoveryMailSend.jsx'; 
import PasswordRecovery2 from '/src/pages/PasswordRecoveryNewPass.jsx'; 
import Profile from '/src/pages/Profile.jsx';
import Notas from '/src/pages/MenuScreen.jsx';
import DefaultPage from '/src/pages/DefaultPage.jsx';  

const App = () => {
  const { auth } = React.useContext(AuthContext); // Access auth context

  // Private Route Wrapper
  const PrivateRoute = ({ children }) => {
    return auth.isAuthenticated ? children : <Navigate to="/login" />;
  };  
    

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<DefaultPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/passwordRecoveryMailSend" element={<PasswordRecovery1 />} />
        <Route path="/passwordRecoveryNewPass" element={<PasswordRecovery2 />} />

        {/* Private Routes (Authenticated Users Only) */}
        <Route path="/notas" element={<PrivateRoute><Notas /></PrivateRoute>} />
        <Route path="/chat" element={<PrivateRoute><ChatScreen /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/autoajuda" element={<PrivateRoute><AjudaScreen /></PrivateRoute>} />
        <Route path="/estatistica" element={<PrivateRoute><Estatistica /></PrivateRoute>} />
        <Route path="/doacao" element={<PrivateRoute><Doacao /></PrivateRoute>} />
        <Route path="/perfil" element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
