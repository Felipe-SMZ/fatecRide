import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RecuperacaoSenhaPage from './pages/RecuperacaoSenhaPage';
import CadastroPage from './pages/CadastroPage';
import InicioPage from './pages/InicioPage';
import MotoristaPage from './pages/MotoristaPage';
import PassageiroPage from './pages/PassageiroPage';
import EscolhaPerfilPage from './pages/EscolhaPerfilPage';
import CadastroVeiculoPage from './pages/CadastroVeiculoPage';
import CadastroEnderecoPage from './pages/CadastroEnderecoPage';
import InformacoesUsuarioPage from './pages/InformacoesUsuarioPage';
import InformacoesCarroPage from './pages/InformacoesCarroPage';
import ConfirmarCaronaMotorista from './pages/ConfirmarCaronaMotorista';
import CadastroConcluidoPage from './pages/CadastroConcluidoPage';
import UserMenu from './components/UserMenu/UserMenu';
import ConfirmarCaronaPassageiro from './pages/ConfirmarCaronaPassageiro';
import './components/UserMenu/UserMenu.css';
import './App.css';
import 'leaflet/dist/leaflet.css';


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
        <Route path="/escolha-perfil" element={<EscolhaPerfilPage />} />
        <Route path="/cadastro-veiculo" element={<CadastroVeiculoPage />} />
        <Route path="/cadastro-endereco" element={<CadastroEnderecoPage />} />
        <Route path="/info-usuario" element={<InformacoesUsuarioPage />} />
        <Route path='/info-carro' element={<InformacoesCarroPage />} />
        <Route path='/confirmarcarona' element={<ConfirmarCaronaMotorista />} />
        <Route path="/cadastro-concluido" element={<CadastroConcluidoPage />} />
        <Route path='/useermenu' element={<UserMenu />} />
        <Route path='/confirmarcaronapassageiro' element={<ConfirmarCaronaPassageiro />} />
      </Routes>
    </Router>
  );
};

export default App;
