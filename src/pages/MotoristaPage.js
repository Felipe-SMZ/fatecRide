import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import Cards from "../components/EnderecoCard.jsx";
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
  const [veiculos, setVeiculos] = useState([]);
  const [idVeiculo, setIdVeiculo] = useState('');

  const [pontoPartidaCoords, setPontoPartidaCoords] = useState(null);
  const [pontoFinalCoords, setPontoFinalCoords] = useState(null);

  const [loading, setLoading] = useState(false);
  const [enderecoPartidaDados, setEnderecoPartidaDados] = useState(null);
  const [enderecoFinalDados, setEnderecoFinalDados] = useState(null);

  // Buscar lista de veículos do backend
  useEffect(() => {
    const buscarVeiculos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/veiculos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("🚗 [DEBUG] Lista de veículos:", data);

        if (data.length > 0) {
          setVeiculos(data);
          setIdVeiculo(data[0].id_veiculo || data[0].idVeiculo || data[0].id);
        } else {
          alert('Nenhum veículo encontrado. Cadastre um veículo primeiro.');
        }
      } catch (error) {
        console.error('❌ Erro ao buscar veículos:', error);
      }
    };

    buscarVeiculos();
  }, []);

  // Debug: acompanhar quando endereço de partida muda
  useEffect(() => {
    if (enderecoPartidaDados) {
      console.log('🟢 [DEBUG] enderecoPartidaDados atualizado:', enderecoPartidaDados);
    }
  }, [enderecoPartidaDados]);

  // Debug: acompanhar quando endereço final muda
  useEffect(() => {
    if (enderecoFinalDados) {
      console.log('🟢 [DEBUG] enderecoFinalDados atualizado:', enderecoFinalDados);
    }
  }, [enderecoFinalDados]);

  const buscarCoordenadasNoBackend = async (endereco) => {
    if (!endereco.trim()) return null;

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/local?local=${encodeURIComponent(endereco)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Erro ao buscar localização');

      const data = await response.json();
      console.log('📍 [DEBUG] Resposta do backend para o endereço:', data);

      if (!data || !data.lat || !data.lon) return null;

      return {
        lat: parseFloat(data.lat),
        lon: parseFloat(data.lon),
        ...data,
      };
    } catch (error) {
      console.error('❌ Erro na busca do backend:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const gerarRota = async () => {
    setEnderecoPartidaDados(null);
    setEnderecoFinalDados(null);

    const partida = await buscarCoordenadasNoBackend(pontoPartida);
    if (!partida) {
      alert('Ponto de partida inválido ou não encontrado.');
      return;
    }

    const destino = await buscarCoordenadasNoBackend(pontoFinal);
    if (!destino) {
      alert('Ponto final inválido ou não encontrado.');
      return;
    }

    setPontoPartidaCoords({ lat: partida.lat, lon: partida.lon });
    setPontoFinalCoords({ lat: destino.lat, lon: destino.lon });

    setEnderecoPartidaDados(partida);
    setEnderecoFinalDados(destino);

    console.log('🛣️ [DEBUG] Dados do endereço de partida:', partida);
    console.log('🛣️ [DEBUG] Dados do endereço de destino:', destino);
  };

  const criarCarona = async () => {
    console.log("📝 [DEBUG] Criando carona com os seguintes dados:");
    console.log("🔹 pontoPartida:", pontoPartida);
    console.log("🔹 pontoFinal:", pontoFinal);
    console.log("🔹 vagas:", vagas);
    console.log("🔹 idVeiculo:", idVeiculo);

    if (!pontoPartida || !pontoFinal || !vagas || !idVeiculo) {
      alert('Preencha todos os campos e aguarde o carregamento do veículo.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/caronas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          originDTO: {
            cidade: enderecoPartidaDados?.cidade || "",
            logradouro: enderecoPartidaDados?.logradouro || "",
            numero: enderecoPartidaDados?.numero || "",
            bairro: enderecoPartidaDados?.bairro || "",
            cep: enderecoPartidaDados?.cep || "",
          },
          destinationDTO: {
            cidade: enderecoFinalDados?.cidade || "",
            logradouro: enderecoFinalDados?.logradouro || "",
            numero: enderecoFinalDados?.numero || "",
            bairro: enderecoFinalDados?.bairro || "",
            cep: enderecoFinalDados?.cep || "",
          },
          vagas_disponiveis: Number(vagas),
          id_veiculo: idVeiculo,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert('Erro ao criar carona: ' + (errorData.message || response.statusText));
        return;
      }

      alert('Carona criada com sucesso!');
      navigate('/confirmarcarona', {
        state: {
          origem: pontoPartida,
          destino: pontoFinal,
          vagas: vagas,
        },
      });
    } catch (error) {
      console.error('❌ Erro ao criar carona:', error);
      alert('Erro ao criar carona. Tente novamente mais tarde.');
    }
  };

  return (
    <div>
      <HeaderMenu />

      <div className="motorista-page">
        <div className="motorista-conteudo">
          <div className="mapa-container" style={{ height: '100%', width: '100%' }}>
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
                <RoutingMachine pontoPartidaCoords={pontoPartidaCoords} pontoFinalCoords={pontoFinalCoords} />
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
              className="input-text"
            />
            <input
              type="text"
              placeholder="Ponto Final (ex: Avenida Paulista)"
              value={pontoFinal}
              onChange={(e) => setPontoFinal(e.target.value)}
              className="input-text"
            />

            <div className="form-group">
              <label htmlFor="veiculoSelect">Selecione o veículo:</label>
              <select
                id="veiculoSelect"
                value={idVeiculo}
                onChange={(e) => setIdVeiculo(e.target.value)}
                className="input-select"
              >
                {veiculos.map((veiculo) => {
                  const nomeVeiculo = veiculo.modelo || veiculo.nome || `Veículo ${veiculo.id_veiculo || veiculo.idVeiculo || veiculo.id}`;
                  const id = veiculo.id_veiculo || veiculo.idVeiculo || veiculo.id;
                  return (
                    <option key={id} value={id}>
                      {nomeVeiculo}
                    </option>
                  );
                })}
              </select>
            </div>

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
                className="input-number"
              />
            </div>

            <button className="gerar-rota-btn" onClick={gerarRota} disabled={loading}>
              {loading ? 'Carregando...' : 'Gerar Rota'}
            </button>
            <button className="enviar-btn" onClick={criarCarona} disabled={loading}>
              Criar Carona
            </button>

            {enderecoPartidaDados && (
              <div className="card-endereco">
                <h3>Endereço de Partida</h3>
                <p><strong>Rua:</strong> {enderecoPartidaDados.logradouro || '-'}, <strong>Número:</strong> {enderecoPartidaDados.numero || '-'}</p>
                <p><strong>Bairro:</strong> {enderecoPartidaDados.bairro || '-'}</p>
                <p><strong>Cidade:</strong> {enderecoPartidaDados.cidade || '-'}</p>
                <p><strong>CEP:</strong> {enderecoPartidaDados.cep || '-'}</p>
              </div>
            )}

            {enderecoFinalDados && (
              <div className="card-endereco">
                <h3>Endereço de Destino</h3>
                <p><strong>Rua:</strong> {enderecoFinalDados.logradouro || '-'}, <strong>Número:</strong> {enderecoFinalDados.numero || '-'}</p>
                <p><strong>Bairro:</strong> {enderecoFinalDados.bairro || '-'}</p>
                <p><strong>Cidade:</strong> {enderecoFinalDados.cidade || '-'}</p>
                <p><strong>CEP:</strong> {enderecoFinalDados.cep || '-'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotoristaPage;
