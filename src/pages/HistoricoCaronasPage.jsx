import React, { useEffect, useState } from 'react';
import '../css/HistoricoCaronasPage.css';
import Header from '../components/Header/HeaderMenu.jsx';

function HistoricoCaronasPage() {
  const [caronas, setCaronas] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [tipo, setTipo] = useState('motorista'); // 'motorista' ou 'passageiro'
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

      // Tenta parsear JSON se possível
      let dadosJson = null;
      try {
        dadosJson = JSON.parse(textoBruto);
      } catch {
        // Não conseguiu parsear, textoBruto não é JSON
      }

      // Tratar erros de status
      if (!response.ok) {
        // Se recebeu JSON com mensagem, mostra mensagem
        if (dadosJson && dadosJson.message) {
          setErro(dadosJson.message);
        } else {
          // Mensagem genérica caso não seja JSON
          setErro(`Erro ${response.status}: ${textoBruto}`);
        }
        setCaronas([]);
        return;
      }

      // Caso sucesso (status 200)
      if (dadosJson && dadosJson.content) {
        setCaronas(dadosJson.content);
        setErro(null);
        setTotalPaginas(dadosJson.totalPages ?? 1);
      } else {
        // Se não há content, lista vazia
        setCaronas([]);
        setErro('Sem histórico de caronas.');
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
              dataHora = carona.dataHora ?? carona.data_hora;
              status = carona.status;
            } else {
              origem = carona.originDTO;
              destino = carona.destinationDTO;
              dataHora = carona.dataHora || carona.dataSolicitacao || null;
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
      </div>
    </div>
  );
}

export default HistoricoCaronasPage;
