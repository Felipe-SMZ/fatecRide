# 🚗 App de Caronas FATEC - Frontend

Este é o frontend do aplicativo de caronas desenvolvido para estudantes da FATEC Cotia.  
Permite que motoristas e passageiros se conectem para compartilhar caronas com praticidade, utilizando um mapa interativo e rotas calculadas em tempo real.

## 🎯 Objetivo

Facilitar o transporte de alunos da FATEC por meio de um sistema seguro, intuitivo e acessível, reduzindo custos e promovendo a sustentabilidade.

## 🧪 Tecnologias utilizadas

- [React.js](https://reactjs.org/) — Biblioteca JavaScript para construção de interfaces
- [React Router](https://reactrouter.com/) — Navegação entre páginas
- [Leaflet.js](https://leafletjs.com/) — Biblioteca de mapas
- [React-Leaflet](https://react-leaflet.js.org/) — Integração do Leaflet com React
- [Axios](https://axios-http.com/) — Requisições HTTP
- [Tailwind CSS](https://tailwindcss.com/) — Estilização responsiva e moderna

## 📸 Funcionalidades

- Tela de login
- Cadastro de usuário (nome, curso, telefone, etc.)
- Cadastro de veículo e endereço
- Escolha de perfil (passageiro ou motorista)
- Mapa interativo com seleção de ponto de partida e destino
- Envio de carona com número de vagas
- Interface responsiva com identidade visual azul e branca

## 🛠️ Instalação e execução

### Pré-requisitos

- Node.js (v16+)
- npm ou yarn
- Git

### Passos:

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/seu-repo-frontend.git
cd seu-repo-frontend

# Instale as dependências
npm install

# Inicie o projeto
npm start

# A aplicação será aberta no navegador em http://localhost:3000

```
## Estrutura de Pastas
```bash
src/
├── components/         # Componentes reutilizáveis (ex: botão, cabeçalho)
├── pages/              # Páginas principais (Login, Cadastro, Motorista, Passageiro)
├── App.js              # Componente principal
├── App.css             # Estilos globais
└── index.js            # Ponto de entrada
```
