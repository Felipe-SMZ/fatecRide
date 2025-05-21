import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/Logo.png';
import '../App.css';

const ConfirmacaoCadastroPage = () => {
  const navigate = useNavigate();

  return (
    <div className="pagina-recuperar-senha"> {/* Reutilizando classe para manter estilo */}
      <header className="cabecalho">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="app-nome">FatecRide</h1>
      </header>

      <main className="conteudo-confirmacao">
        <h2>Cadastro concluído com sucesso!</h2>
        <p>Agora você pode fazer login para acessar o aplicativo.</p>
        <button className="botao-principal" onClick={() => navigate('/')}>
          Voltar para Login
        </button>
      </main>

    </div>
  );
};

export default ConfirmacaoCadastroPage;
