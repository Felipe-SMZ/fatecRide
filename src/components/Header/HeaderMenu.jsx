import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeaderMenu.css';
import logo from '../../assets/images/Logo.png';
import { FiMenu, FiX } from 'react-icons/fi';

const HeaderMenu = () => {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);
  const iconRef = useRef(null);
  const [menuStyle, setMenuStyle] = useState({});

  const toggleMenu = () => {
    setMenuAberto((prev) => !prev);
  };

  const sair = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !iconRef.current.contains(event.target)
      ) {
        setMenuAberto(false);
      }
    };

    if (menuAberto) {
      // Posiciona o menu alinhado com o botão
      const rect = iconRef.current.getBoundingClientRect();
      setMenuStyle({
        position: 'absolute',
        top: `${rect.bottom + window.scrollY + 8}px`,
        left: `${rect.right - 200}px`, // alinhado à direita do botão
      });

      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuAberto]);

  return (
    <header className="app-header">
      <div className="header-content">
        <img src={logo} alt="Logo" className="header-logo" />
        <h1 className="app-title">FatecRide</h1>
        <button className="menu-icon" ref={iconRef} onClick={toggleMenu}>
          {menuAberto ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {menuAberto && (
        <div ref={menuRef} className="dropdown-menu" style={menuStyle}>
          <button onClick={() => { setMenuAberto(false); navigate('/inicio'); }}>Início</button>
          <button onClick={() => { setMenuAberto(false); navigate('/info-usuario'); }}>Informações do Usuário</button>
          <button onClick={() => { setMenuAberto(false); navigate('/info-carro'); }}>Informações do Veículo</button>
          <button onClick={() => { setMenuAberto(false); navigate('/historico'); }}>Histórico de Caronas</button>
          <button
            onClick={() => {
              setMenuAberto(false);
              navigate('/confirmarcaronapassageiro');
            }}
          >
            Verificar Solicitação
          </button>
          <button
            className="deletar"
            onClick={async () => {
              const confirmDelete = window.confirm("Tem certeza que deseja deletar sua conta? Essa ação é irreversível.");
              if (confirmDelete) {
                try {
                  const token = localStorage.getItem("token");
                  const response = await fetch("http://localhost:8080/users", {
                    method: "DELETE",
                    headers: {
                      "Authorization": `Bearer ${token}`,
                    },
                  });

                  if (response.ok) {
                    localStorage.removeItem("token");
                    alert("Conta deletada com sucesso!");
                    navigate("/");
                  } else {
                    const errorText = await response.text();
                    alert("Erro ao deletar conta: " + errorText);
                  }
                } catch (error) {
                  console.error("Erro ao deletar conta:", error);
                  alert("Erro de conexão. Tente novamente.");
                }
              }
            }}
          >
            Deletar Conta
          </button>

          <button className="sair" onClick={sair}>Sair</button>
        </div>
      )}

    </header>
  );
};

export default HeaderMenu;