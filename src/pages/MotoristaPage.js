import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import '../components/UserMenu/UserMenu.css';
import '../css/MotoristaPage.css';
import HeaderMenu from '../components/Header/HeaderMenu';

// Corrige o caminho dos ícones padrão do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const RoutingMachine = ({ pontoPartidaCoords, pontoFinalCoords }) => {
  const map = useMap();
  const routingRef = useRef(null);

  useEffect(() => {
    if (pontoPartidaCoords && pontoFinalCoords && map) {
      if (routingRef.current) {
        routingRef.current.getPlan().setWaypoints([]);
        routingRef.current.remove();
      }

      routingRef.current = L.Routing.control({
        waypoints: [
          L.latLng(pontoPartidaCoords.lat, pontoPartidaCoords.lon),
          L.latLng(pontoFinalCoords.lat, pontoFinalCoords.lon),
        ],
        routeWhileDragging: false,
        show: false,
      }).addTo(map);
    }
  }, [pontoPartidaCoords, pontoFinalCoords, map]);

  return null;
};

const MotoristaPage = () => {
  const navigate = useNavigate();
  const [pontoPartida, setPontoPartida] = useState('');
  const [pontoFinal, setPontoFinal] = useState('');
  const [vagas, setVagas] = useState(1);

  const [pontoPartidaCoords, setPontoPartidaCoords] = useState(null);
  const [pontoFinalCoords, setPontoFinalCoords] = useState(null);

  // Função para buscar coordenadas do backend
  const buscarCoordenadasNoBackend = async (endereco) => {
    if (!endereco.trim()) return null;

    try {
      const response = await fetch(`http://localhost:8080/local?local=${encodeURIComponent(endereco)}`);
      if (!response.ok) throw new Error('Erro ao buscar localização');
      const data = await response.json();
      
      // Se o backend retornar null ou vazio, trata aqui
      if (!data || !data.lat || !data.lon) return null;

      return {
        lat: parseFloat(data.lat),
        lon: parseFloat(data.lon)
      };
    } catch (error) {
      console.error('Erro na busca do backend:', error);
      return null;
    }
  };

  const gerarRota = async () => {
    const partidaCoords = await buscarCoordenadasNoBackend(pontoPartida);
    const finalCoords = await buscarCoordenadasNoBackend(pontoFinal);

    if (!partidaCoords) {
      alert('Ponto de partida inválido ou não encontrado.');
      return;
    }
    if (!finalCoords) {
      alert('Ponto final inválido ou não encontrado.');
      return;
    }

    setPontoPartidaCoords(partidaCoords);
    setPontoFinalCoords(finalCoords);
  };

  return (
    <div>
      <HeaderMenu />

      <div className="motorista-page">
        <button
          className="voltar-btn"
          onClick={() => navigate('/inicio')}
          style={{ margin: '10px', padding: '8px 12px', fontSize: '16px' }}
        >
          <FaArrowLeft /> Voltar
        </button>

        <div className="motorista-conteudo">
          <div className="mapa-container" style={{ height: '400px', width: '100%' }}>
            <MapContainer center={[-23.6009, -46.8805]} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />

              {pontoPartidaCoords && (
                <Marker position={[pontoPartidaCoords.lat, pontoPartidaCoords.lon]}>
                  <Popup>Ponto de Partida</Popup>
                </Marker>
              )}

              {pontoFinalCoords && (
                <Marker position={[pontoFinalCoords.lat, pontoFinalCoords.lon]}>
                  <Popup>Ponto Final</Popup>
                </Marker>
              )}

              {pontoPartidaCoords && pontoFinalCoords && (
                <RoutingMachine
                  pontoPartidaCoords={pontoPartidaCoords}
                  pontoFinalCoords={pontoFinalCoords}
                />
              )}
            </MapContainer>
          </div>

          <div className="formulario-container">
            <h1>Para onde vamos?</h1>
            <input
              type="text"
              placeholder="Ponto de Partida (ex: Fatec Cotia)"
              value={pontoPartida}
              onChange={(e) => setPontoPartida(e.target.value)}
            />
            <input
              type="text"
              placeholder="Ponto Final (ex: Avenida Paulista)"
              value={pontoFinal}
              onChange={(e) => setPontoFinal(e.target.value)}
            />
            <div className="form-group">
              <label htmlFor="vagas">Total de vagas disponíveis:</label>
              <input
                id="vagas"
                type="number"
                placeholder="Vagas disponíveis"
                min="1"
                max="5"
                value={vagas}
                onChange={(e) => setVagas(e.target.value)}
              />
            </div>
            <button className="gerar-rota-btn" onClick={gerarRota}>
              Gerar Rota
            </button>
            <button
              className="enviar-btn"
              onClick={() =>
                navigate('/confirmarcarona', {
                  state: {
                    origem: pontoPartida,
                    destino: pontoFinal,
                    vagas: vagas,
                  },
                })
              }
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotoristaPage;
