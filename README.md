# 🚗 FatecRide - Sistema de Caronas para Estudantes da FATEC Cotia

**FatecRide** é uma aplicação web desenvolvida para facilitar o transporte de alunos da FATEC Cotia. A plataforma permite que estudantes se cadastrem como **motoristas** ou **passageiros**, combinem caronas com base em seus trajetos e utilizem um mapa interativo com rotas em tempo real para facilitar o encontro.

---

## 🎯 Objetivo

O projeto tem como objetivo oferecer uma solução acessível e sustentável para o deslocamento de estudantes até a faculdade, promovendo:

- Compartilhamento de caronas seguras
- Redução de custos com transporte
- Diminuição da emissão de poluentes
- Integração entre alunos de diferentes cursos

---

## 🧰 Tecnologias Utilizadas

A seguir estão as principais tecnologias empregadas neste frontend:

- **React.js** – Construção da interface de usuário
- **React Router** – Navegação entre as páginas do sistema
- **Leaflet.js** – Exibição e manipulação de mapas interativos
- **React-Leaflet** – Integração do Leaflet com React
- **HTML5 + CSS3** – Estrutura e estilo visual das páginas
- **Fetch API (JavaScript)** – Comunicação com o backend via requisições HTTP

> ⚠️ **Importante:** não utilizamos bibliotecas como Axios ou Tailwind neste projeto.

---

## ⚙️ Dependências Externas (Backend e Banco de Dados)

> ⚠️ **ATENÇÃO:** Para que o sistema frontend funcione corretamente, é **obrigatório que o backend em Java (Spring Boot)** e o **banco de dados (ex: PostgreSQL)** estejam devidamente iniciados e configurados.

As instruções completas para execução do backend e do banco de dados estão disponíveis no repositório backend correspondente ao projeto. O frontend depende de endpoints que devem estar acessíveis na porta `8080` por padrão.

---

## 🚀 Como Executar o Frontend

### 1. Pré-requisitos

Antes de iniciar o projeto, você precisa ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (recomendado v16+)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

---

### 2. Clonando o Projeto

```bash
# Clonar o repositório
git clone https://github.com/Felipe-SMZ/fatecRide.git

# Acessar o diretório do projeto
cd fatecRide
```

---

### 3. Instalando as Dependências

```bash
# Usando npm
npm install

# ou usando yarn
yarn install
```

---

### 4. Iniciando o Projeto

```bash
# Iniciar o servidor de desenvolvimento
npm start
```

> A aplicação será automaticamente aberta no navegador no endereço:  
📍 http://localhost:3000

Caso não abra automaticamente, acesse esse endereço manualmente.

---

## 🗂️ Estrutura do Projeto

```
fatecRide/
├── public/                  # Arquivos públicos e estáticos
├── src/
│   ├── components/          # Componentes reutilizáveis (Ex: cabeçalho, botões, cards)
│   ├── pages/               # Páginas principais (Login, Cadastro, Motorista, Passageiro etc.)
│   ├── css/                 # Estilizações separadas por página
│   ├── App.js               # Componente principal da aplicação
│   ├── App.css              # Estilos globais
│   └── index.js             # Ponto de entrada do React
├── package.json             # Dependências e scripts
└── README.md                # Documentação do projeto
```

---

## 🧪 Funcionalidades Principais

- Cadastro de usuários com dados pessoais, endereço e veículo
- Escolha de perfil como **motorista** ou **passageiro**
- Exibição de mapa interativo com **Leaflet**
- Seleção de ponto de partida e destino
- Cálculo de rota e exibição no mapa
- Envio de carona (motorista)
- Solicitação de carona (passageiro)
- Interface responsiva e amigável


---

## 📬 Contato

Desenvolvido por [Felipe SMZ](https://github.com/Felipe-SMZ)  
📧 Email: felipe@exemplo.com  
🔗 LinkedIn: [linkedin.com/in/seudominio](https://linkedin.com/in/seudominio)

---

## 📄 Licença

Este projeto está protegido por direitos autorais e **não possui uma licença de uso livre**.

É **estritamente proibido**:

- Utilizar este código para fins comerciais
- Copiar, modificar ou distribuir total ou parcialmente este projeto
- Reutilizar partes do código em outros projetos sem autorização

Este software foi desenvolvido exclusivamente para fins educacionais e acadêmicos.  
Para obter permissão de uso, entre em contato com o autor.
