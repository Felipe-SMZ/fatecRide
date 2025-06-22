import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import '../css/PassageiroPage.css';
import CaronaCard from '../components/CaronaCard/CaronaCard.jsx';
import HeaderMenu from '../components/Header/HeaderMenu';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const extrairCidadeEDistrito = (address, displayName) => {
  let cidade = address.city || address.town || address.village || address.municipality || null;
  let bairro = address.suburb || address.neighbourhood || null;

  if (!cidade || !bairro) {
    const partes = displayName.split(',').map(p => p.trim());
    if (!bairro && partes.length >= 2) bairro = partes[1];
    if (!cidade && partes.length >= 3) cidade = partes[2];
  }

  return { cidade, bairro };
};

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
  const [buscando, setBuscando] = useState(false);

  const token = localStorage.getItem('token');

  const buscarCoordenadasNoBackend = async (endereco) => {
    if (!endereco.trim()) return null;

    try {
      console.log("🔎 Buscando coordenadas para:", endereco);
      const response = await fetch(`http://localhost:8080/local?local=${encodeURIComponent(endereco)}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Erro ao buscar localização');

      const data = await response.json();
      console.log("✅ Resposta da API de localização:", data);

      if (!data || !data.lat || !data.lon) return null;

      return {
        lat: parseFloat(data.lat),
        lon: parseFloat(data.lon),
        address: data.address,
        display_name: data.display_name
      };
    } catch (error) {
      console.error('❌ Erro na busca do backend:', error);
      return null;
    }
  };

  const gerarRota = async () => {
    setBuscando(true);
    const partidaDados = await buscarCoordenadasNoBackend(pontoPartida);
    const finalDados = await buscarCoordenadasNoBackend(pontoFinal);

    if (!partidaDados) {
      alert('Ponto de partida inválido ou não encontrado.');
      setBuscando(false);
      return;
    }
    if (!finalDados) {
      alert('Ponto final inválido ou não encontrado.');
      setBuscando(false);
      return;
    }

    setPontoPartidaCoords({ lat: partidaDados.lat, lon: partidaDados.lon });
    setPontoFinalCoords({ lat: finalDados.lat, lon: finalDados.lon });

    setEnderecoPartidaDados(partidaDados);
    setEnderecoFinalDados(finalDados);

    await buscarCaronasDisponiveis(partidaDados, finalDados);
    setBuscando(false);
  };

  const buscarCaronasDisponiveis = async (partidaDados, finalDados) => {
    if (!token) {
      alert('Você precisa estar logado para buscar caronas.');
      return;
    }

    try {
      const passengerSearchRequest = {
        latitudeOrigem: partidaDados.lat,
        longitudeOrigem: partidaDados.lon,
        latitudeDestino: finalDados.lat,
        longitudeDestino: finalDados.lon,
      };

      console.log("📡 Enviando dados de busca de carona:", passengerSearchRequest);

      const response = await fetch(`http://localhost:8080/solicitacao/proximos`, {
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
      console.log("🚗 Caronas recebidas:", caronas);
      setCaronasDisponiveis(caronas);
    } catch (error) {
      console.error('❌ Erro ao buscar caronas:', error);
    }
  };

  const solicitarCarona = async (carona) => {
    if (!enderecoPartidaDados || !enderecoFinalDados) {
      alert('Endereços de partida e destino não encontrados.');
      return;
    }

    try {
      const { cidade: cidadePartida, bairro: bairroPartida } = extrairCidadeEDistrito(
        enderecoPartidaDados.address,
        enderecoPartidaDados.display_name
      );

      const { cidade: cidadeDestino, bairro: bairroDestino } = extrairCidadeEDistrito(
        enderecoFinalDados.address,
        enderecoFinalDados.display_name
      );

      const payload = {
        id_carona: carona.idCarona,
        originDTO: {
          cidade: cidadePartida || '',
          logradouro: enderecoPartidaDados.address.road || '',
          numero: enderecoPartidaDados.address.house_number || '',
          bairro: bairroPartida || '',
          cep: enderecoPartidaDados.address.postcode || '',
        },
        destinationDTO: {
          cidade: cidadeDestino || '',
          logradouro: enderecoFinalDados.address.road || '',
          numero: enderecoFinalDados.address.house_number || '',
          bairro: bairroDestino || '',
          cep: enderecoFinalDados.address.postcode || '',
        },
      };

      console.log("📤 Enviando solicitação de carona:", payload);

      const response = await fetch('http://localhost:8080/solicitacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar solicitação');
      }

      const data = await response.json();
      console.log("✅ Solicitação criada:", data);

      localStorage.setItem('id_solicitacao', data.id);

      navigate('/confirmarcaronapassageiro', {
        state: {
          caronaSelecionada: carona,
          solicitacao: data,
        }
      });
    } catch (error) {
      console.error('❌ Erro ao solicitar carona:', error);
      alert('Erro ao solicitar carona');
    }
  };

  return (
    <div>
      <HeaderMenu />
      <div className="passageiro-page">
        <div className="mapa-container">
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
            {pontoPartidaCoords && pontoFinalCoords && (
              <RoutingMachine
                pontoPartidaCoords={pontoPartidaCoords}
                pontoFinalCoords={pontoFinalCoords}
              />
            )}
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
          <button onClick={gerarRota} className="gerar-rota-btn" disabled={buscando}>
            {buscando ? 'Buscando...' : 'Gerar Rota e Buscar Caronas'}
          </button>

          <h3>Caronas disponíveis:</h3>

          {caronasDisponiveis.length === 0 ? (
            <div className="sem-caronas-container">
              <p className="sem-caronas-texto">Nenhuma carona disponível para a rota informada.</p>
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                alt="Nenhuma carona"
                className="sem-caronas-imagem"
              />
            </div>
          ) : (
            <div className="caronas-grid">
              {caronasDisponiveis.map((carona) => (
                <CaronaCard key={carona.id} carona={carona} onSelecionar={solicitarCarona} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PassageiroPage;
