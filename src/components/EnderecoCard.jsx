import React from "react";

function montarEnderecoDTO(enderecoDados) {
  const address = enderecoDados.address || {};

  return {
    cidade: address.city || address.town || address.village || address.county || "",
    logradouro: address.road || "",
    numero: address.house_number || "",
    bairro: address.suburb || address.neighbourhood || "",
    cep: address.postcode || ""
  };
}

export default function EnderecoCard({ enderecoDados, titulo }) {
  const endereco = montarEnderecoDTO(enderecoDados);

  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "16px",
      margin: "12px 0",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      maxWidth: "320px",
      backgroundColor: "#f9f9f9",
      fontFamily: "Arial, sans-serif"
    }}>
      <h3 style={{ marginBottom: "12px", color: "#007bff" }}>{titulo}</h3>
      <p><strong>Rua:</strong> {endereco.logradouro}{endereco.numero ? `, ${endereco.numero}` : ""}</p>
      <p><strong>Bairro:</strong> {endereco.bairro || "Não informado"}</p>
      <p><strong>Cidade:</strong> {endereco.cidade || "Não informado"}</p>
      <p><strong>CEP:</strong> {endereco.cep || "Não informado"}</p>
    </div>
  );
}
