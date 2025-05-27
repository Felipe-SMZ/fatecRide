import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import './UserMenu.css';

const UserMenu = () => {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickFora = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(false);
      }
    };
    document.addEventListener('mousedown', handleClickFora);
    return () => {
      document.removeEventListener('mousedown', handleClickFora);
    };
  }, []);

  const fecharMenuENavegar = (rota) => {
    setMenuAberto(false);
    navigate(rota);
  };

  const handleDeletarConta = async () => {
    setMenuAberto(false);
    if (window.confirm('Tem certeza que deseja deletar sua conta? Essa ação não pode ser desfeita.')) {
      try {
        const idUsuario = localStorage.getItem('idUsuario');
        const token = localStorage.getItem('token');

        if (!idUsuario) {
          alert('Usuário não autenticado');
          return;
        }

        const response = await fetch(`http://localhost:8080/usuario/${idUsuario}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erro ao deletar conta');
        }

        alert('Conta deletada com sucesso!');
        // Limpa dados locais após deletar conta
        localStorage.removeItem('token');
        localStorage.removeItem('idUsuario');
        navigate('/');
      } catch (error) {
        alert(`Falha ao deletar conta: ${error.message}`);
      }
    }
  };

  const handleLogout = () => {
    setMenuAberto(false);
    // Limpa token e dados locais
    localStorage.removeItem('token');
    localStorage.removeItem('idUsuario');
    alert('Logout efetuado!');
    navigate('/');
  };

  return (
    <div className="usuario-menu-container" ref={menuRef}>
      <button
        className="usuario-btn"
        onClick={() => setMenuAberto(!menuAberto)}
        aria-haspopup="true"
        aria-expanded={menuAberto}
        aria-label="Menu do usuário"
      >
        <FaUser />
      </button>

      {menuAberto && (
        <div className="menu-suspenso" role="menu">
          <button onClick={() => fecharMenuENavegar('/info-usuario')} role="menuitem">
            Informações do usuário
          </button>
          <button onClick={() => fecharMenuENavegar('/info-carro')} role="menuitem">
            Informações do carro
          </button>
          <button className="deletar-btn" onClick={handleDeletarConta} role="menuitem">
            Deletar conta
          </button>
          <button onClick={handleLogout} role="menuitem">
            Sair
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
