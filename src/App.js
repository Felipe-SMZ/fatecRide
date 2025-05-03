import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RecuperacaoSenhaPage from './pages/RecuperacaoSenhaPage';
import CadastroPage from './pages/CadastroPage';
import InicioPage from './pages/InicioPage';
import MotoristaPage from './pages/MotoristaPage';
import PassageiroPage from './pages/PassageiroPage';
import './App.css';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/recuperacao-senha" element={<RecuperacaoSenhaPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/inicio" element={<InicioPage />} />
        <Route path="/motorista" element={<MotoristaPage />} />
        <Route path="/passageiro" element={<PassageiroPage />} />
      </Routes>
    </Router>
  );
};

export default App;
