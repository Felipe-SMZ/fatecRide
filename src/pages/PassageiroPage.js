import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import HeaderMenu from '../components/Header/HeaderMenu';
import EnderecoCard from '../components/EnderecoCard';

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

const PassageiroPage = () => {
  const navigate = useNavigate();
  const [pontoPartida, setPontoPartida] = useState('');
  const [pontoFinal, setPontoFinal] = useState('');
  const [pontoPartidaCoords, setPontoPartidaCoords] = useState(null);
  const [pontoFinalCoords, setPontoFinalCoords] = useState(null);
  const [enderecoPartidaDados, setEnderecoPartidaDados] = useState(null);
  const [enderecoFinalDados, setEnderecoFinalDados] = useState(null);
  const [caronasDisponiveis, setCaronasDisponiveis] = useState([]);

  const buscarCoordenadasNoBackend = async (endereco) => {
    if (!endereco.trim()) return null;

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:8080/local?local=${encodeURIComponent(endereco)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Erro ao buscar localização');
      const data = await response.json();

      if (!data || !data.lat || !data.lon) return null;

      return {
        lat: parseFloat(data.lat),
        lon: parseFloat(data.lon),
        address: data.address,
      };
    } catch (error) {
      console.error('Erro na busca do backend:', error);
      return null;
    }
  };

  const gerarRota = async () => {
    const partidaDados = await buscarCoordenadasNoBackend(pontoPartida);
    const finalDados = await buscarCoordenadasNoBackend(pontoFinal);

    if (!partidaDados) {
      alert('Ponto de partida inválido ou não encontrado.');
      return;
    }
    if (!finalDados) {
      alert('Ponto final inválido ou não encontrado.');
      return;
    }

    setPontoPartidaCoords({ lat: partidaDados.lat, lon: partidaDados.lon });
    setPontoFinalCoords({ lat: finalDados.lat, lon: finalDados.lon });

    setEnderecoPartidaDados(partidaDados);
    setEnderecoFinalDados(finalDados);

    // Após gerar rota, buscar caronas disponíveis
    buscarCaronasDisponiveis(partidaDados, finalDados);
  };

  const buscarCaronasDisponiveis = async (partidaDados, finalDados) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Você precisa estar logado para buscar caronas.');
      return;
    }

    try {
      const url = `http://localhost:8080/solicitacao/proximos`;

      const passengerSearchRequest = {
        origemLatitude: partidaDados.lat,
        origemLongitude: partidaDados.lon,
        destinoLatitude: finalDados.lat,
        destinoLongitude: finalDados.lon,
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passengerSearchRequest),
      });

      if (!response.ok) {
        alert('Erro ao buscar caronas disponíveis.');
        return;
      }

      const caronas = await response.json();
      setCaronasDisponiveis(caronas);
    } catch (error) {
      console.error('Erro ao buscar caronas:', error);
      alert('Erro na busca das caronas.');
    }
  };


  const solicitarCarona = (carona) => {
    // Navega para a página de confirmação passando a carona
    navigate('/confirmarcaronapassageiro', { state: { caronaSelecionada: carona, enderecoPartidaDados, enderecoFinalDados } });
  };

  return (
    <div>
      <HeaderMenu />
      <div className="passageiro-page">
        <div className="mapa-container" style={{ height: '400px', width: '100%' }}>
          <MapContainer center={[-23.6009, -46.8805]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
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
            {pontoPartidaCoords && pontoFinalCoords && <RoutingMachine pontoPartidaCoords={pontoPartidaCoords} pontoFinalCoords={pontoFinalCoords} />}
          </MapContainer>
        </div>

        <div className="formulario-container">
          <h2>Informe o ponto de partida e destino</h2>
          <input
            type="text"
            placeholder="Ponto de Partida (ex: Fatec Cotia)"
            value={pontoPartida}
            onChange={(e) => setPontoPartida(e.target.value)}
            className="input-text"
          />
          <input
            type="text"
            placeholder="Ponto Final (ex: Avenida Paulista)"
            value={pontoFinal}
            onChange={(e) => setPontoFinal(e.target.value)}
            className="input-text"
          />
          <button onClick={gerarRota} className="gerar-rota-btn">
            Gerar Rota e Buscar Caronas
          </button>

          {enderecoPartidaDados && <EnderecoCard enderecoDados={enderecoPartidaDados} titulo="Endereço de Partida" />}
          {enderecoFinalDados && <EnderecoCard enderecoDados={enderecoFinalDados} titulo="Endereço Final" />}

          <h3>Caronas disponíveis:</h3>
          {caronasDisponiveis.length === 0 && <p>Nenhuma carona disponível para a rota informada.</p>}
          <ul>
            {caronasDisponiveis.map((carona) => (
              <li key={carona.id} style={{ marginBottom: '15px', border: '1px solid #ccc', padding: '10px' }}>
                <p><b>Motorista:</b> {carona.motoristaNome}</p>
                <p><b>Origem:</b> {carona.origemLogradouro}, {carona.origemCidade}</p>
                <p><b>Destino:</b> {carona.destinoLogradouro}, {carona.destinoCidade}</p>
                <p><b>Vagas disponíveis:</b> {carona.vagasDisponiveis}</p>
                <button onClick={() => solicitarCarona(carona)}>Solicitar esta Carona</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PassageiroPage;
