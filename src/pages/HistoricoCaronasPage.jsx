import React, { useEffect, useState } from "react";
import HeaderMenu from "../components/Header/HeaderMenu"; // ajuste o caminho se necessário
import "../css/HistoricoCaronasPage.css";

const HistoricoCaronasPage = () => {
  const [historicoMotorista, setHistoricoMotorista] = useState([]);
  const [historicoPassageiro, setHistoricoPassageiro] = useState([]);
  const token = localStorage.getItem("token");

  const authHeaders = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    fetch("http://localhost:8080/rides/historico", {
      method: "GET",
      headers: authHeaders,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar histórico de caronas oferecidas.");
        }
        return response.json();
      })
      .then((data) => setHistoricoMotorista(data))
      .catch((error) => console.error(error));

    fetch("http://localhost:8080/solicitacao/historico", {
      method: "GET",
      headers: authHeaders,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar histórico de caronas solicitadas.");
        }
        return response.json();
      })
      .then((data) => setHistoricoPassageiro(data))
      .catch((error) => console.error(error));
  }, [token]);

  return (
    <div className="historico-container">
      <HeaderMenu />

      <h2 className="historico-titulo">Histórico de Caronas Oferecidas</h2>
      {historicoMotorista.length > 0 ? (
        historicoMotorista.map((item, idx) => (
          <div key={idx} className="card-historico">
            <p><strong>Origem:</strong> {item.origem}</p>
            <p><strong>Destino:</strong> {item.destino}</p>
            <p><strong>Status:</strong> {item.status}</p>
            <p><strong>Data:</strong> {new Date(item.dataHora).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p className="sem-registro">Não há histórico de caronas oferecidas.</p>
      )}

      <h2 className="historico-titulo">Histórico de Caronas Solicitadas</h2>
      {historicoPassageiro.length > 0 ? (
        historicoPassageiro.map((item, idx) => (
          <div key={idx} className="card-historico">
            <p><strong>Origem:</strong> {item.origem}</p>
            <p><strong>Destino:</strong> {item.destino}</p>
            <p><strong>Status:</strong> {item.status}</p>
            <p><strong>Data:</strong> {new Date(item.dataHora).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p className="sem-registro">Não há histórico de caronas solicitadas.</p>
      )}
    </div>
  );
};

export default HistoricoCaronasPage;
