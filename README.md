# 🚗 FatecRide - Sistema de Caronas para Estudantes da FATEC Cotia


Facilitando o transporte sustentável e colaborativo entre estudantes.

---

## 📌 Sobre o Projeto

**FatecRide** é uma aplicação web que conecta estudantes da FATEC Cotia, possibilitando o compartilhamento de caronas de forma simples, segura e eficiente. A plataforma permite que alunos cadastrem-se como motoristas ou passageiros, escolham rotas, e visualizem mapas interativos para facilitar os encontros.

---

## 🎯 Objetivos

- Promover o transporte sustentável entre alunos  
- Reduzir custos com deslocamento  
- Incentivar a integração entre estudantes  
- Facilitar a organização e confirmação de caronas

---

## 🛠 Tecnologias Utilizadas

### Frontend

| Tecnologia           | Descrição                                      |
|---------------------|------------------------------------------------|
| React.js            | Biblioteca para construção da interface UI     |
| React Router        | Navegação SPA entre páginas                     |
| Leaflet.js          | Mapas interativos e rotas                       |
| React-Leaflet       | Integração do Leaflet com React                 |
| CSS3                | Estilização visual                              |
| Fetch API           | Comunicação HTTP com backend                     |

### Backend

| Tecnologia           | Descrição                                      |
|---------------------|------------------------------------------------|
| Java Spring Boot    | Framework para criação de APIs RESTful         |
| Hibernate           | Framework ORM para mapeamento objeto-relacional|
| Spring Data JPA     | Abstração para facilitar o uso do Hibernate    |
| **MySQL**           | Banco de dados relacional                       |
| JWT                 | Autenticação baseada em tokens                  |

---

## ⚙️ Requisitos Funcionais

| Requisito                        | Descrição                                                                 | Implementação                                                                 |
|----------------------------------|---------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| Cadastro de usuários             | Inclusão de novos usuários com dados pessoais, endereço e veículo         | Páginas: `CadastroPage`, `CadastroEnderecoPage`, `CadastroVeiculoPage`       |
| Autenticação e perfis            | Login com autenticação JWT e perfis distintos (motorista, passageiro)     | Página: `LoginPage`                                                           |
| CRUD completo                    | Inclusão, edição e exclusão de usuários, veículos, caronas e solicitações | Páginas: `InformacoesUsuarioPage`, `InformacoesCarroPage`, `MotoristaPage`, `PassageiroPage` |
| Atualização e exclusão de veículos | Permite cadastrar mais de um veículo, atualizar dados e excluir veículos  | Páginas: `CadastroVeiculoPage`, `InformacoesCarroPage`                        |
| Paginação                        | Paginação no histórico de caronas e solicitações                          | Página: `HistoricoCaronasPage`                                                |


---

## 🧩 Requisitos Não-Funcionais

- Utilização do padrão REST para comunicação entre frontend e backend  
- Backend estruturado com Spring Boot, Hibernate e Spring Data JPA  
- Frontend construído em React.js separado do backend  
- Segurança com autenticação via JWT  
- Banco de dados MySQL 

---

## ✨ Requisitos Extras Implementados
Funcionais
| Requisito Extra                      | Descrição                                                                                              |
|-------------------------------------|----------------------------------------------------------------------------------------------------------|
| 📧 Confirmação de e-mail             | Durante o cadastro, o sistema valida o formato do e-mail antes do envio                                |
| 🗺️ Exibição de mapa com localização | Utiliza Leaflet para mostrar mapa com rotas entre origem e destino                                     |
| 📍 Marcação de origem e destino      | O usuário escolhe a rua e cidade para definir origem e destino no mapa                                 |
| 🖼️ Foto de perfil via URL           | O usuário pode adicionar sua foto de perfil informando uma URL válida                                  |
| 🔄 Atualização e exclusão de veículo | O usuário pode cadastrar mais de um veículo, editar ou excluir quando quiser                           |

Não-Funcionais
| Requisito Extra                        | Descrição                                           |
| -------------------------------------- | --------------------------------------------------- |
| 🛡️ Autenticação via JWT               | Segurança garantida via token                       |
| 🔑 Criptografia de senha (BCrypt)      | As senhas são armazenadas com criptografia segura   |
| 🚀 Frontend com React                  | Utilização de um framework moderno de UI (React.js) |
| 🧱 Backend com Spring Boot + Hibernate | Uso de frameworks robustos para criação da API REST |
| 🐬 Banco de dados com MySQL            | Sistema persistente baseado em banco relacional     |
| 🔗 Separação entre backend e frontend  | Os projetos são separados e se comunicam via REST   |

---

## 🚀 Como Executar o Projeto

## ⚙️ Pré-requisitos

Antes de iniciar o projeto, é necessário ter os seguintes softwares instalados na sua máquina:

- ✅ [Node.js](https://nodejs.org/) (versão 16 ou superior recomendada)
- ✅ [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- ✅ [Java 17+](https://adoptium.net/) (necessário para executar o backend com Spring Boot)
- ✅ [MySQL](https://www.mysql.com/) (local ou via Docker)
- ✅ [Git](https://git-scm.com/) (para clonar os repositórios)

---

## 📦 Instalação do Projeto

### 📁 Clonando os Repositórios

#### Frontend

```bash
git clone https://github.com/Felipe-SMZ/fatecRide.git
cd fatecRide
npm install
npm start
```

A aplicação frontend estará disponível em: [http://localhost:3000](http://localhost:3000)

## 🖥️ Backend

Para que o frontend funcione corretamente, é **essencial** que o backend esteja configurado e em execução.

### 📥 Clonando o Backend

Clone o repositório do backend do projeto:  
🔗 [Acesse o repositório do backend](https://github.com/rufinoguilherme633/BackendCarona.git)

### ⚙️ Configuração do Banco de Dados

- Certifique-se de ter o **MySQL** instalado e em execução.
- Crie um banco de dados com o nome definido nas propriedades da aplicação.
- Atualize as credenciais de acesso no arquivo `application.properties` ou `application.yml`.

### ▶️ Executando o Backend

- Importe o projeto no **Spring Tool Suite**, **IntelliJ** ou outro IDE compatível.
- Certifique-se de que todas as dependências estão instaladas.
- Rode a aplicação Spring Boot (`FatecRideApplication.java` ou equivalente).

> 📌 Todas as instruções detalhadas de instalação, configuração e testes estão disponíveis no `README.md` do repositório do backend.

---

## 🗂 Estrutura do Projeto Frontend

```
fatecRide/
├── public/                   # Arquivos públicos e estáticos
├── src/
│   ├── components/           # Componentes reutilizáveis
│   ├── pages/                # Páginas do sistema
│   ├── css/                  # Estilos CSS separados
│   ├── App.js                # Componente raiz React
│   ├── index.js              # Entrada da aplicação React
├── package.json              # Dependências e scripts
└── README.md                 # Documentação do projeto
```

---

## 📄 Rotas Principais Frontend

| Rota                 | Componente             | Descrição                                |
| -------------------- | ---------------------- | ---------------------------------------- |
| `/`                  | LoginPage              | Tela de login                            |
| `/cadastro`          | CadastroPage           | Cadastro de usuário                      |
| `/cadastro-endereco` | CadastroEnderecoPage   | Cadastro de endereço                     |
| `/cadastro-veiculo`  | CadastroVeiculoPage    | Cadastro de veículo                      |
| `/motorista`         | MotoristaPage          | Criar e gerenciar caronas como motorista |
| `/passageiro`        | PassageiroPage         | Solicitar caronas                        |
| `/historico`         | HistoricoCaronasPage   | Histórico paginado de caronas            |
| `/info-usuario`      | InformacoesUsuarioPage | Atualizar dados pessoais                 |
| `/info-carro`        | InformacoesCarroPage   | Atualizar dados do veículo               |

---

## ⚠️ Observações Importantes

### 📍 **Busca de Origem e Destino**

As **buscas de endereço** (origem e destino) no sistema devem ser realizadas **apenas com o nome da rua ou avenida e o nome da cidade**.

> Isso garante uma melhor precisão na **geolocalização** através da API utilizada.

---

### 🖼️ **Fotos de Perfil**

A inserção de **fotos de perfil** dos usuários é feita **exclusivamente via URL de imagem**.

> Recomenda-se o uso de links de imagens livres de direitos autorais ou hospedadas externamente (ex: Unsplash, ImgBB etc.).

---

### 🧪 **Testando o Histórico de Caronas**

Para que a **rota `/historico`** exiba corretamente os dados, é necessário **povoar o banco de dados** com caronas e solicitações que estejam no status **"concluída"**.

---

### ⚠️ **ATENÇÃO — Adapte os IDs!**

Os exemplos abaixo são apenas ilustrativos.
Você deve garantir que os **IDs usados realmente existam** no seu banco de dados:

* `id_motorista` → ID de um **usuário do tipo "motorista"**
* `id_origem`, `id_destino` → IDs válidos nas tabelas `origens` e `destinos`
* `id_veiculo` → ID de um veículo já cadastrado para o motorista
* `id_status_carona` = `2` (status "concluída")
* `id_passageiro` → ID de um usuário do tipo "passageiro"
* `id_status_solicitacao` = `5` (status "concluída")

> **Nunca insira valores duplicados ou que não existam no seu banco.**

---

### 🧾 **Etapas de Inserção (Exemplo)**

#### 🚗 Inserir uma Carona com Status “Concluída”

```sql
INSERT INTO caronas (
  id_motorista, 
  id_origem, 
  id_destino, 
  data_hora, 
  vagas_disponiveis, 
  id_status_carona, 
  id_veiculo
) VALUES (
  1,  -- ID do motorista
  1,  -- ID da origem
  1,  -- ID do destino
  NOW(),
  2,
  2,  -- 2 = "concluída"
  1   -- ID do veículo
);
```

#### 👤 Inserir uma Solicitação Relacionada com Status “Concluída”

```sql
INSERT INTO solicitacoes (
  id_carona, 
  id_passageiro, 
  id_origem, 
  id_destino, 
  data_solicitacao, 
  id_status_solicitacao
) VALUES (
  1,  -- ID da carona inserida acima
  2,  -- ID do passageiro
  1,  -- ID da origem
  1,  -- ID do destino
  NOW(),
  5   -- 5 = "concluída"
);
```

---

### ✅ **Como Ver no Sistema**

Após inserir os dados corretamente:

1. Acesse a rota `/historico` no frontend
2. Escolha:

   * 🧍‍♂️ **Caronas Oferecidas** → Histórico do motorista
   * 🧍‍♀️ **Solicitações Feitas** → Histórico do passageiro

---
## 👥 Equipe Desenvolvedora

* Felipe Shimizu - [GitHub](https://github.com/Felipe-SMZ) - [LinkedIn](https://www.linkedin.com/in/felipe-sim%C3%B5es-shimizu-a3bb11321)
* Guilherme Rufino - [GitHub](https://github.com/rufinoguilherme633)
* Marcos Santos - [GitHub](https://github.com/MarcosVVSantos)

---

## 📜 Licença

Este projeto está protegido por direitos autorais e **não possui licença de uso livre**.

**É proibido:**

* Uso comercial sem autorização
* Cópia, modificação e distribuição sem permissão
* Reutilização de partes do código sem autorização

Projeto para fins exclusivamente educacionais. Para uso ou permissão, contate os autores.
