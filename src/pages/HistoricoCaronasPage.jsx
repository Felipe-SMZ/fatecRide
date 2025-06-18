import React, { useEffect, useState } from 'react';
import '../css/HistoricoCaronasPage.css';
import Header from '../components/Header/HeaderMenu.jsx';

function HistoricoCaronasPage() {
  const [caronas, setCaronas] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [tipo, setTipo] = useState('motorista'); // 'motorista' ou 'passageiro'
  const [respostaBruta, setRespostaBruta] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    buscarHistorico();
  }, [pagina, tipo]);

  const buscarHistorico = async () => {
    const rota = tipo === 'motorista' ? 'rides/concluidas' : 'solicitacao/concluidas';

    try {
      const response = await fetch(`http://localhost:8080/${rota}?pagina=${pagina}&itens=5`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      });

      const textoBruto = await response.text();
      console.log('Resposta bruta do backend:', textoBruto);

      try {
        const dadosJson = JSON.parse(textoBruto);
        setRespostaBruta(dadosJson);

        if (dadosJson.content) {
          setCaronas(dadosJson.content);
        } else {
          setCaronas([]);
        }

        setTotalPaginas(dadosJson.totalPages ?? 1);
        setErro(null);

      } catch (errParse) {
        console.error('Erro ao parsear JSON:', errParse);
        setErro('Erro ao interpretar resposta JSON');
        setCaronas([]);
      }

    } catch (erro) {
      console.error('❌ Erro durante a requisição:', erro);
      setErro('Erro na requisição');
      setCaronas([]);
    }
  };

  return (
    <div>
      <Header />
      <div className="historico-container">
        <h2>Histórico de {tipo === 'motorista' ? 'Caronas Oferecidas' : 'Solicitações de Carona'}</h2>

        <div className="switch-container">
          <button
            onClick={() => { setTipo('motorista'); setPagina(0); }}
            className={tipo === 'motorista' ? 'ativo' : ''}
          >
            Caronas Oferecidas
          </button>
          <button
            onClick={() => { setTipo('passageiro'); setPagina(0); }}
            className={tipo === 'passageiro' ? 'ativo' : ''}
          >
            Solicitações Feitas
          </button>
        </div>

        {erro && <p style={{ color: 'red' }}>{erro}</p>}

        <div className="cards-container">
          {caronas.length === 0 && !erro && <p>Nenhuma solicitação encontrada.</p>}
          {caronas.map((carona, index) => {
            let origem, destino, dataHora, status;

            if (tipo === 'motorista') {
              origem = carona.origin;
              destino = carona.destination;
              dataHora = carona.data_hora;
              status = carona.status;
            } else {
              origem = carona.originDTO;
              destino = carona.destinationDTO;
              dataHora = carona.data_hora || carona.dataSolicitacao || null;
              status = 'Concluída'; // Valor fixo já que o DTO não envia
            }

            return (
              <div className="card" key={index}>
                <p><strong>Origem:</strong> {`${origem?.logradouro}, ${origem?.numero} - ${origem?.cidade}`}</p>
                <p><strong>Destino:</strong> {`${destino?.logradouro}, ${destino?.numero} - ${destino?.cidade}`}</p>
                <p><strong>Status:</strong> {status}</p>
                <p><strong>Data:</strong> {dataHora ? new Date(dataHora).toLocaleString('pt-BR') : 'Indisponível'}</p>
              </div>
            );
          })}
        </div>

        <div className="pagination">
          {Array.from({ length: totalPaginas }, (_, i) => (
            <button
              key={i}
              onClick={() => setPagina(i)}
              className={i === pagina ? 'pagina-ativa' : ''}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <hr />
        <h3>Resposta bruta JSON do backend (para debug):</h3>
        <pre style={{
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          maxHeight: '300px',
          overflowY: 'auto',
          backgroundColor: '#f0f0f0',
          padding: '10px'
        }}>
          {JSON.stringify(respostaBruta, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default HistoricoCaronasPage;
