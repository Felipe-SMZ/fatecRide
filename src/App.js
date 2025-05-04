import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import EscolhaPerfilPage from './pages/EscolhaPerfilPage';
import RecuperacaoSenhaPage from './pages/RecuperacaoSenhaPage';
import CadastroPage from './pages/CadastroPage';
import VeiculoPage from './pages/VeiculoPage';
import InicioPage from './pages/InicioPage';
import MotoristaPage from './pages/MotoristaPage';
import PassageiroPage from './pages/PassageiroPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/escolha-perfil" element={<EscolhaPerfilPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/veiculo" element={<VeiculoPage />} />
        <Route path="/inicio" element={<InicioPage />} />
        <Route path="/motorista" element={<MotoristaPage />} />
        <Route path="/passageiro" element={<PassageiroPage />} />
        <Route path="/recuperacao-senha" element={<RecuperacaoSenhaPage />} />
      </Routes>
    </Router>
  );
};

export default App;