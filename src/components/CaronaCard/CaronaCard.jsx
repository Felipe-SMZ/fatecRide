import React from 'react';
import { FaUser, FaMapMarkerAlt, FaCar, FaChair } from 'react-icons/fa';
import './CaronaCard.css';

const CaronaCard = ({ carona, onSelecionar }) => {
  return (
    <div className="carona-card">
      <div className="carona-header">
        <FaUser />
        <span className="motorista-nome">{carona.nome} {carona.sobrenome}</span>
      </div>

      <div className="carona-info">
        <div className="info-item">
          <FaMapMarkerAlt />
          <span>{carona.logradouroOrigem}, {carona.cidadeOrigem}</span>
        </div>
        <div className="info-item">
          <FaMapMarkerAlt />
          <span>{carona.logradouroDestino}, {carona.cidadeDestino}</span>
        </div>
        <div className="info-item">
          <FaCar />
          <span>{carona.marcaCarro} {carona.modeloCarro} ({carona.anoCarro})</span>
        </div>
        <div className="info-item">
          <FaChair />
          <span>Vagas disponíveis: {carona.vagasDisponiveis}</span>
        </div>
      </div>

      <button className="btn-solicitar" onClick={() => onSelecionar(carona)}>
        Solicitar Carona
      </button>
    </div>
  );
};

export default CaronaCard;
