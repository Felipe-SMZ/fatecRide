import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser } from 'react-icons/fa';
import logo from '../assets/images/Logo.png';
import '../css/InformacoesCarroPage.css';

const InformacoesCarroPage = () => {
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

    const deletarConta = () => {
        setMenuAberto(false);
        if (window.confirm('Tem certeza que deseja deletar sua conta? Essa ação não pode ser desfeita.')) {
            alert('Conta deletada com sucesso!');
            navigate('/login');
        }
    };

    const logout = () => {
        setMenuAberto(false);
        alert('Logout efetuado!');
        navigate('/');
    };

     const handleSubmit = (event) => {
        event.preventDefault(); // evita recarregar a página
        alert('Informações salvas!');
        // aqui você pode adicionar lógica para salvar dados em backend, localStorage, etc.
    };

    return (
        <div className="info-carro-page">
            <header className="motorista-header">
                <div className="header-section">
                    <button className="voltar-btn" onClick={() => navigate(-1)}>
                        <FaArrowLeft />
                    </button>
                </div>

                <div className="header-section logo-nome">
                    <img src={logo} alt="Logo" className="logo-header" />
                    <h2>FatecRide</h2>
                </div>

                <div className="header-section usuario-menu-container" ref={menuRef}>
                    <button
                        className="usuario-btn"
                        onClick={() => setMenuAberto(!menuAberto)}
                    >
                        <FaUser />
                    </button>

                    {menuAberto && (
                        <div className="menu-suspenso">
                            <button onClick={() => fecharMenuENavegar('/info-usuario')}>
                                Informações do usuário
                            </button>
                            <button onClick={() => fecharMenuENavegar('/info-carro')}>
                                Informações do carro
                            </button>
                            <button className="deletar-btn" onClick={deletarConta}>
                                Deletar conta
                            </button>
                            <button onClick={logout}>Sair</button>
                        </div>
                    )}
                </div>
            </header>

            <div className="info-conteudo">
                <h1>Informações do Carro</h1>
                <form className="info-form" onSubmit={handleSubmit}>
                    <label>
                        Marca:
                        <input type="text" placeholder="Ex: Toyota" />
                    </label>
                    <label>
                        Modelo:
                        <input type="text" placeholder="Ex: Corolla" />
                    </label>
                    <label>
                        Cor:
                        <input type="text" placeholder="Ex: Prata" />
                    </label>
                    <label>
                        Placa:
                        <input type="text" placeholder="Ex: ABC-1234" />
                    </label>
                    <label>
                        Ano:
                        <input type="number" placeholder="Ex: 2020" />
                    </label>
                    <button type="submit" className="salvar-btn">
                        Salvar Informações
                    </button>
                </form>
            </div>
        </div>
    );
};

export default InformacoesCarroPage;
