import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import HeaderMenu from '../components/Header/HeaderMenu';
import '../css/MotoristaPage.css';

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

  const [enderecoPartidaDados, setEnderecoPartidaDados] = useState(null);
  const [enderecoFinalDados, setEnderecoFinalDados] = useState(null);

  const [loading, setLoading] = useState(false);

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
        if (data.length > 0) {
          setVeiculos(data);
          const primeiroVeiculoId = data[0].id_veiculo || data[0].idVeiculo || data[0].id;
          setIdVeiculo(primeiroVeiculoId);
        } else {
          alert('Nenhum veículo encontrado. Cadastre um veículo primeiro.');
        }
      } catch (error) {
        console.error('❌ Erro ao buscar veículos:', error);
      }
    };

    buscarVeiculos();
  }, []);

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

      const cidade = data.cidade || data.address?.city || data.address?.town || data.address?.village || '';
      const logradouro = data.logradouro || data.address?.road || '';
      const numero = data.numero || '';
      const bairro = data.bairro || data.address?.suburb || '';
      const cep = data.cep || data.address?.postcode || '';

      return {
        lat: parseFloat(data.lat),
        lon: parseFloat(data.lon),
        cidade,
        logradouro,
        numero,
        bairro,
        cep,
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
    setPontoPartidaCoords(null);
    setPontoFinalCoords(null);

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

    setEnderecoPartidaDados(partida);
    setEnderecoFinalDados(destino);

    setPontoPartidaCoords({ lat: partida.lat, lon: partida.lon });
    setPontoFinalCoords({ lat: destino.lat, lon: destino.lon });

    console.log('🛣️ [DEBUG] Endereço partida:', partida);
    console.log('🛣️ [DEBUG] Endereço destino:', destino);
  };

  const criarCarona = async () => {
    console.log("🔷 [DEBUG] Corpo da requisição para criar carona:", {
      originDTO: {
        cidade: enderecoPartidaDados?.cidade || '',
        logradouro: enderecoPartidaDados?.logradouro || '',
        numero: enderecoPartidaDados?.numero || '',
        bairro: enderecoPartidaDados?.bairro || '',
        cep: enderecoPartidaDados?.cep || '',
      },
      destinationDTO: {
        cidade: enderecoFinalDados?.cidade || '',
        logradouro: enderecoFinalDados?.logradouro || '',
        numero: enderecoFinalDados?.numero || '',
        bairro: enderecoFinalDados?.bairro || '',
        cep: enderecoFinalDados?.cep || '',
      },
      vagas_disponiveis: Number(vagas),
      id_veiculo: idVeiculo,
    });

    if (!pontoPartida || !pontoFinal || !vagas || !idVeiculo) {
      alert('Preencha todos os campos e aguarde o carregamento do veículo.');
      return;
    }

    if (
      !enderecoPartidaDados?.cidade ||
      !enderecoFinalDados?.cidade ||
      !enderecoPartidaDados?.logradouro ||
      !enderecoFinalDados?.logradouro
    ) {
      alert('Endereços incompletos. Gere a rota para atualizar os dados de endereço.');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:8080/rides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          originDTO: {
            cidade: enderecoPartidaDados.cidade,
            logradouro: enderecoPartidaDados.logradouro,
            numero: enderecoPartidaDados.numero,
            bairro: enderecoPartidaDados.bairro,
            cep: enderecoPartidaDados.cep,
          },
          destinationDTO: {
            cidade: enderecoFinalDados.cidade,
            logradouro: enderecoFinalDados.logradouro,
            numero: enderecoFinalDados.numero,
            bairro: enderecoFinalDados.bairro,
            cep: enderecoFinalDados.cep,
          },
          vagas_disponiveis: Number(vagas),
          id_veiculo: idVeiculo,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erro completo do backend:', errorText);
        alert('Erro ao criar carona: ' + errorText);
        return;
      }

      alert('✅ Carona criada com sucesso!');
      navigate('/confirmarcarona', {
        state: {
          origem: pontoPartida,
          destino: pontoFinal,
          vagas,
        },
      });

    } catch (error) {
      console.error('❌ Erro ao criar carona (exception):', error);
      alert('Erro inesperado ao criar carona. Verifique o console para detalhes.');
    }
  };

  return (
    <div>
      <HeaderMenu />

      <div className="motorista-page">
        <div className="motorista-conteudo">
          {/* Mapa */}
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

          {/* Formulário */}
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
          </div>

          {/* Cards de endereço */}
          <div className="cards-container">
            {enderecoPartidaDados && (
              <div className="card-endereco">
                <h3>Endereço de Partida</h3>
                <p><strong>Rua:</strong> {enderecoPartidaDados.logradouro || '-'}</p>
                <p> <strong>Número:</strong> {enderecoPartidaDados.numero || '-'}</p>
                <p><strong>Bairro:</strong> {enderecoPartidaDados.bairro || '-'}</p>
                <p><strong>Cidade:</strong> {enderecoPartidaDados.cidade || '-'}</p>
                <p><strong>CEP:</strong> {enderecoPartidaDados.cep || '-'}</p>
              </div>
            )}

            {enderecoFinalDados && (
              <div className="card-endereco">
                <h3>Endereço de Destino</h3>
                <p><strong>Rua:</strong> {enderecoFinalDados.logradouro || '-'} </p>
                <p> <strong>Número:</strong> {enderecoFinalDados.numero || '-'}</p>
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
