import React, { useState, useEffect } from "react";
import "../css/InformacoesUsuarioPage.css";
import HeaderMenu from "../components/Header/HeaderMenu";

const tiposUsuario = [
  { id: 1, nome: "Passageiro" },
  { id: 2, nome: "Motorista" },
  { id: 3, nome: "Ambos" },
];

const generos = [
  { id: 1, nome: "Masculino" },
  { id: 2, nome: "Feminino" },
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
  const [idCurso, setIdCurso] = useState("");
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token não encontrado, faça login");
      setLoading(false);
      return;
    }

    // Busca dados do usuário
    fetch("http://localhost:8080/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) throw new Error("Sessão expirada. Faça login novamente.");
        if (!res.ok) throw new Error("Erro ao buscar usuário");
        return res.json();
      })
      .then((data) => {
        setNome(data.nome || "");
        setSobrenome(data.sobrenome || "");
        setEmail(data.email || "");
        setTelefone(data.telefone || "");
        setFoto(data.foto || "");

        setIdTipoUsuario(data.userTypeId?.toString() || "");
        setIdGenero(data.genderId?.toString() || "");
        setIdCurso(data.courseId?.toString() || "");

        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    // Busca cursos
    fetch("http://localhost:8080/courses", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar cursos");
        return res.json();
      })
      .then((data) => {
        setCursos(data);
      })
      .catch((err) => {
        console.error("Erro ao carregar cursos:", err);
      });
  }, []);

  const handleAtualizar = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token não encontrado, faça login");
      return;
    }

    // Validação senha obrigatória
    if (senha.trim() === "") {
      alert("Por favor, preencha a senha atual ou uma nova.");
      return;
    }

    const userBaseDTO = {
      nome,
      sobrenome,
      email,
      senha,  // inclui senha obrigatoriamente
      telefone,
      foto,
      userTypeId: idTipoUsuario === "" ? null : Number(idTipoUsuario),
      genderId: idGenero === "" ? null : Number(idGenero),
      courseId: idCurso === "" ? null : Number(idCurso),
    };

    console.log("🔄 Enviando dados para atualização:", userBaseDTO);

    fetch("http://localhost:8080/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userBaseDTO),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao atualizar usuário");
        return res.json();
      })
      .then(() => alert("Usuário atualizado com sucesso!"))
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <HeaderMenu />
      <div className="usuario-conteudo">
        <h2>Informações do Usuário</h2>

        <div className="campo-info">
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>

        <div className="campo-info">
          <label>Sobrenome:</label>
          <input type="text" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
        </div>

        <div className="campo-info">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="campo-info">
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite a senha"
            required
          />
        </div>

        <div className="campo-info">
          <label>Telefone:</label>
          <input type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        </div>

        <div className="campo-info">
          <label>Foto (URL):</label>
          <input type="text" value={foto} onChange={(e) => setFoto(e.target.value)} />
          {foto && (
            <img
              src={foto}
              alt="Foto do usuário"
              style={{ width: 100, height: 100, marginTop: 10, borderRadius: "50%" }}
            />
          )}
        </div>

        <div className="campo-info">
          <label>Tipo Usuário:</label>
          <select value={idTipoUsuario} onChange={(e) => setIdTipoUsuario(e.target.value)}>
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

        <div className="campo-info">
          <label>Curso:</label>
          <select value={idCurso} onChange={(e) => setIdCurso(e.target.value)}>
            <option value="">Selecione</option>
            {cursos.map((curso) => (
              <option key={curso.id} value={curso.id}>
                {curso.nome || curso.name}
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
