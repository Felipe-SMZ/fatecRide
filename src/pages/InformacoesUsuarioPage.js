import React, { useState, useEffect } from "react";
import "../css/InformacoesUsuarioPage.css";
import logo from "../assets/images/Logo.png";
import { FaArrowLeft } from 'react-icons/fa';

// Novo import do menu reutilizável
import UserMenu from "../components/UserMenu/UserMenu";
import "../components/UserMenu/UserMenu.css";

const tiposUsuario = [
  { id: 1, nome: "Passageiro" },
  { id: 2, nome: "Motorista" },
  { id: 3, nome: "Ambos" },
];

const generos = [
  { id: 1, nome: "Masculino" },
  { id: 2, nome: "Feminino" }
];

const InformacoesUsuarioPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [foto, setFoto] = useState("");
  const [idTipoUsuario, setIdTipoUsuario] = useState("");
  const [idGenero, setIdGenero] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token não encontrado, faça login");
      setLoading(false);
      return;
    }

    fetch("http://localhost:8080/usuario/logado", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar usuário");
        return res.json();
      })
      .then((data) => {
        setNome(data.nome || "");
        setSobrenome(data.sobrenome || "");
        setEmail(data.email || "");
        setSenha(""); // senha não deve ser preenchida
        setTelefone(data.telefone || "");
        setFoto(data.foto || "");
        setIdTipoUsuario(
          data.idTipoUsuario !== undefined && data.idTipoUsuario !== null
            ? data.idTipoUsuario.toString()
            : ""
        );
        setIdGenero(
          data.idGenero !== undefined && data.idGenero !== null
            ? data.idGenero.toString()
            : ""
        );
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAtualizar = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token não encontrado, faça login");
      return;
    }

    const userDTO = {
      nome,
      sobrenome,
      email,
      senha: senha.trim() === "" ? null : senha,
      telefone,
      foto,
      idTipoUsuario: idTipoUsuario === "" ? null : Number(idTipoUsuario),
      idGenero: idGenero === "" ? null : Number(idGenero),
      vehicle: null,
    };

    fetch("http://localhost:8080/usuario/logado", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userDTO),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao atualizar usuário");
        return res.text();
      })
      .then((msg) => alert(msg || "Atualizado com sucesso!"))
      .catch((err) => alert(err.message));
  };

  if (loading) return <p>Carregando dados...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <>
      <header className="passageiro-header">
        <div className="header-section">
          <button className="voltar-btn" onClick={() => window.history.back()}>
            <FaArrowLeft />
          </button>
        </div>

        <div className="header-section">
          <div className="logo-nome">
            <img src={logo} alt="Logo" className="logo-header" />
            <h2>FatecRide</h2>
          </div>
        </div>

        <div className="header-section usuario-menu-container">
          <UserMenu />
        </div>
      </header>

      <div className="usuario-conteudo">
        <h2>Informações do Usuário</h2>

        <div className="campo-info">
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>

        <div className="campo-info">
          <label>Sobrenome:</label>
          <input
            type="text"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
          />
        </div>

        <div className="campo-info">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="campo-info">
          <label>Senha (deixe em branco para não alterar):</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="********"
          />
        </div>

        <div className="campo-info">
          <label>Telefone:</label>
          <input
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>

        <div className="campo-info">
          <label>Foto (URL):</label>
          <input type="text" value={foto} onChange={(e) => setFoto(e.target.value)} />
        </div>

        <div className="campo-info">
          <label>Tipo Usuário:</label>
          <select
            value={idTipoUsuario}
            onChange={(e) => setIdTipoUsuario(e.target.value)}
          >
            <option value="">Selecione</option>
            {tiposUsuario.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="campo-info">
          <label>Gênero:</label>
          <select value={idGenero} onChange={(e) => setIdGenero(e.target.value)}>
            <option value="">Selecione</option>
            {generos.map((genero) => (
              <option key={genero.id} value={genero.id}>
                {genero.nome}
              </option>
            ))}
          </select>
        </div>

        <button className="botao-principal" onClick={handleAtualizar}>
          Atualizar
        </button>
      </div>
    </>
  );
};

export default InformacoesUsuarioPage;
