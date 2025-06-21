import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../css/ConfirmarCaronaMotorista.css';
import HeaderMenu from '../components/Header/HeaderMenu.jsx';

const ConfirmarCarona = () => {
    const navigate = useNavigate();
    const [carona, setCarona] = useState(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState('');
    const [cancelando, setCancelando] = useState(false);
    const [editando, setEditando] = useState(false);
    const [form, setForm] = useState({
        origemCidade: '',
        origemLogradouro: '',
        origemNumero: '',
        origemBairro: '',
        origemCep: '',
        destinoCidade: '',
        destinoLogradouro: '',
        destinoNumero: '',
        destinoBairro: '',
        destinoCep: '',
        vagas: ''
    });

    const buscarCaronaAtiva = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/rides/corridasAtivas', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) throw new Error(await response.text());

            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                setCarona(data[0]);
                console.log("[DEBUG] carona recebida:", data[0]);
                setForm({
                    origemCidade: data[0].origin?.cidade || '',
                    origemLogradouro: data[0].origin?.logradouro || '',
                    origemNumero: data[0].origin?.numero || '',
                    origemBairro: data[0].origin?.bairro || '',
                    origemCep: data[0].origin?.cep || '',
                    destinoCidade: data[0].destination?.cidade || '',
                    destinoLogradouro: data[0].destination?.logradouro || '',
                    destinoNumero: data[0].destination?.numero || '',
                    destinoBairro: data[0].destination?.bairro || '',
                    destinoCep: data[0].destination?.cep || '',
                    vagas: data[0].vagas_disponiveis || ''
                });
            } else {
                setErro('Nenhuma carona ativa encontrada.');
            }
        } catch (error) {
            console.error('Erro ao buscar carona ativa:', error);
            setErro('Erro ao buscar carona ativa.');
        } finally {
            setLoading(false);
        }
    };

    const cancelarCarona = async () => {
        const idDaCarona = carona?.id;
        if (!idDaCarona) return alert('ID da carona inválido.');
        if (!window.confirm('Deseja realmente cancelar a carona?')) return;

        try {
            setCancelando(true);
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/rides/cancelar/${idDaCarona}`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) throw new Error(await response.text());

            alert('Carona cancelada com sucesso!');
            setCarona(null);
        } catch (error) {
            console.error('Erro ao cancelar carona:', error);
            alert('Erro ao cancelar carona.');
        } finally {
            setCancelando(false);
        }
    };

    const validarCEP = async (cep, tipo) => {
        try {
            const cepNumerico = cep.replace(/\D/g, '');
            if (cepNumerico.length !== 8) {
                throw new Error(`CEP ${tipo} deve ter 8 dígitos`);
            }

            const response = await fetch(`https://viacep.com.br/ws/${cepNumerico}/json/`);
            const data = await response.json();
            
            if (data.erro) {
                throw new Error(`CEP ${tipo} não encontrado`);
            }
            
            return {
                cidade: data.localidade,
                logradouro: data.logradouro || '',
                bairro: data.bairro || '',
                cep: data.cep.replace('-', ''),
                uf: data.uf
            };
        } catch (error) {
            console.error(`Erro ao validar CEP ${tipo}:`, error);
            throw error;
        }
    };

    const atualizarCarona = async (e) => {
        e.preventDefault();

        // Validações básicas
        if (!carona?.id) {
            alert("ID da carona não encontrado. Não é possível atualizar.");
            return;
        }

        if (!carona?.vehicle?.id) {
            alert("ID do veículo não encontrado na carona. Atualização abortada.");
            return;
        }

        try {
            // Validação dos CEPs
            const [origemValidada, destinoValidada] = await Promise.all([
                validarCEP(form.origemCep, 'de origem'),
                validarCEP(form.destinoCep, 'de destino')
            ]);

            // Atualizar formulário com dados validados
            const formAtualizado = {
                ...form,
                origemCidade: origemValidada.cidade,
                origemLogradouro: origemValidada.logradouro || form.origemLogradouro,
                origemBairro: origemValidada.bairro || form.origemBairro,
                origemCep: origemValidada.cep,
                destinoCidade: destinoValidada.cidade,
                destinoLogradouro: destinoValidada.logradouro || form.destinoLogradouro,
                destinoBairro: destinoValidada.bairro || form.destinoBairro,
                destinoCep: destinoValidada.cep
            };

            setForm(formAtualizado);

            // Preparar dados para envio
            const corpoRequisicao = {
                originDTO: {
                    cidade: formAtualizado.origemCidade,
                    logradouro: formAtualizado.origemLogradouro,
                    numero: formAtualizado.origemNumero,
                    bairro: formAtualizado.origemBairro,
                    cep: formAtualizado.origemCep,
                    uf: origemValidada.uf
                },
                destinationDTO: {
                    cidade: formAtualizado.destinoCidade,
                    logradouro: formAtualizado.destinoLogradouro,
                    numero: formAtualizado.destinoNumero,
                    bairro: formAtualizado.destinoBairro,
                    cep: formAtualizado.destinoCep,
                    uf: destinoValidada.uf
                },
                vagas_disponiveis: Number(formAtualizado.vagas),
                id_veiculo: carona.vehicle.id,
            };

            // Enviar para a API
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/rides/${carona.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(corpoRequisicao),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao atualizar carona');
            }

            alert('Dados da carona atualizados com sucesso!');
            setEditando(false);
            buscarCaronaAtiva();
        } catch (error) {
            console.error('Erro ao atualizar carona:', error);
            alert(`Erro: ${error.message}`);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const formatarCEP = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 5) {
            value = value.substring(0, 5) + '-' + value.substring(5, 8);
        }
        setForm({ ...form, [e.target.name]: value });
    };

    useEffect(() => {
        buscarCaronaAtiva();
    }, []);

    return (
        <div className="confirmar-carona-page">
            <HeaderMenu />

            <main className="confirmar-carona-conteudo">
                <button className="voltar-btn" onClick={() => navigate(-1)} aria-label="Voltar">
                    <FaArrowLeft /> Voltar
                </button>

                {loading ? (
                    <p className="info-msg">Carregando carona ativa...</p>
                ) : erro ? (
                    <p className="erro-msg">{erro}</p>
                ) : carona ? (
                    <section className="detalhes-carona">
                        <h1>Carona Ativa</h1>
                        <div className="detalhes-info">
                            <p><strong>Origem:</strong> {carona.origin?.logradouro || 'N/A'}, {carona.origin?.numero || '-'}</p>
                            <p><strong>Destino:</strong> {carona.destination?.logradouro || 'N/A'}, {carona.destination?.numero || '-'}</p>
                            <p><strong>Vagas disponíveis:</strong> {carona.vagas_disponiveis || 0}</p>
                            <p><strong>Status:</strong> {carona.status || 'Desconhecido'}</p>
                            <p><strong>Veículo:</strong> {carona.vehicle?.marca || 'N/A'} {carona.vehicle?.modelo || ''} - {carona.vehicle?.placa || ''}</p>
                        </div>

                        <div className="botoes-acao">
                            <button className="btn-cancelar" onClick={cancelarCarona} disabled={cancelando}>
                                {cancelando ? 'Cancelando...' : 'Cancelar Carona'}
                            </button>

                            <button className="btn-atualizar" onClick={() => setEditando(!editando)}>
                                {editando ? 'Fechar Edição' : 'Atualizar Dados'}
                            </button>
                        </div>

                        {editando && (
                            <form className="form-edicao" onSubmit={atualizarCarona}>
                                <h2>Atualizar Carona</h2>
                                
                                <div className="form-grupo">
                                    <label>Origem</label>
                                    <div className="cep-container">
                                        <input 
                                            name="origemCep" 
                                            value={form.origemCep} 
                                            onChange={formatarCEP} 
                                            placeholder="CEP" 
                                            maxLength="9"
                                        />
                                        <span className="cep-format">Formato: 12345-678</span>
                                    </div>
                                    <input name="origemCidade" value={form.origemCidade} onChange={handleChange} placeholder="Cidade" />
                                    <input name="origemLogradouro" value={form.origemLogradouro} onChange={handleChange} placeholder="Logradouro" />
                                    <input name="origemNumero" value={form.origemNumero} onChange={handleChange} placeholder="Número" />
                                    <input name="origemBairro" value={form.origemBairro} onChange={handleChange} placeholder="Bairro" />
                                </div>
                                
                                <div className="form-grupo">
                                    <label>Destino</label>
                                    <div className="cep-container">
                                        <input 
                                            name="destinoCep" 
                                            value={form.destinoCep} 
                                            onChange={formatarCEP} 
                                            placeholder="CEP" 
                                            maxLength="9"
                                        />
                                        <span className="cep-format">Formato: 12345-678</span>
                                    </div>
                                    <input name="destinoCidade" value={form.destinoCidade} onChange={handleChange} placeholder="Cidade" />
                                    <input name="destinoLogradouro" value={form.destinoLogradouro} onChange={handleChange} placeholder="Logradouro" />
                                    <input name="destinoNumero" value={form.destinoNumero} onChange={handleChange} placeholder="Número" />
                                    <input name="destinoBairro" value={form.destinoBairro} onChange={handleChange} placeholder="Bairro" />
                                </div>
                                
                                <div className="form-grupo">
                                    <label>Vagas disponíveis</label>
                                    <input 
                                        name="vagas" 
                                        value={form.vagas} 
                                        onChange={handleChange} 
                                        placeholder="Ex: 3" 
                                        type="number" 
                                        min="1"
                                    />
                                </div>
                                
                                <button type="submit" className="btn-confirmar-edicao">
                                    Salvar Atualizações
                                </button>
                            </form>
                        )}
                    </section>
                ) : (
                    <p className="info-msg">Nenhuma carona ativa no momento.</p>
                )}
            </main>
        </div>
    );
};

export default ConfirmarCarona;