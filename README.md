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

| Requisito                         | Descrição                                          | Implementação                                    |
|----------------------------------|--------------------------------------------------|-------------------------------------------------|
| Cadastro de usuários             | Inclusão de novos usuários com dados pessoais, endereço e veículo | Páginas: CadastroPage, CadastroEnderecoPage, CadastroVeiculoPage |
| Autenticação e perfis           | Login com autenticação JWT e perfis distintos (motorista, passageiro) | Página: LoginPage                                 |
| CRUD completo                   | Inclusão, edição e exclusão para usuários, veículos, caronas e solicitações | Páginas: InformacoesUsuarioPage, InformacoesCarroPage, MotoristaPage, PassageiroPage |
| Atualização e exclusão de veículos | Permite cadastrar mais de um veículo, atualizar dados e excluir veículos | Páginas: CadastroVeiculoPage, InformacoesCarroPage |
| Paginação                      | Paginação no histórico de caronas e solicitações | Página: HistoricoCaronasPage                      |

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
| Requisito Extra                      | Descrição                                                                                                                       |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| 📧 Confirmação de e-mail             | Durante o cadastro, o sistema valida o formato do e-mail antes do envio. 
                                              |
| 🗺️ Exibição de mapa com localização | Utiliza Leaflet para mostrar mapa com rotas entre origem e destino                                                              |
| 📍 Marcação de origem e destino      | O usuário escolhe a rua e cidade para definir origem e destino no mapa                                                          |
| 🖼️ Foto de perfil via URL           | O usuário pode adicionar sua foto de perfil informando uma URL válida                                                           |
| 🔄 Atualização e exclusão de veículo | O usuário pode cadastrar mais de um veículo, editar ou excluir quando quiser                                                    |

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

### Pré-requisitos

- Node.js (v16+ recomendado)  
- npm ou yarn  
- Java 17+ (para backend)  
- MySQL instalado ou via Docker  
- Git  

### Frontend

```bash
git clone https://github.com/Felipe-SMZ/fatecRide.git
cd fatecRide
npm install
npm start
````

A aplicação frontend estará disponível em: [http://localhost:3000](http://localhost:3000)

### Backend

Clone o repositório backend (inserir link do repositório backend)

Configure o banco MySQL e rode a aplicação Spring Boot.

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

* **Busca de origem e destino:**
  As buscas devem ser feitas apenas pelo **nome da rua/avenida e cidade**, para garantir melhor precisão na geolocalização.

* **Fotos:**
  A inserção de fotos é feita apenas para o perfil do usuário via URL de imagem. 

* **Teste do histórico:**
[⚠️ Suspicious Content] 🧪 Inserção Manual de Caronas Concluídas no Banco de Dados
Para testar a exibição do histórico de caronas (motorista e passageiro) no sistema, é necessário que existam caronas com status "concluída" no banco de dados, assim como solicitações vinculadas a essas caronas.

⚠️ ATENÇÃO — Adapte os IDs!
Os exemplos abaixo são ilustrativos. É fundamental que você:

Use IDs válidos já existentes em sua base para:

id_motorista (usuário com tipo "motorista")

id_origem e id_destino (endereços previamente cadastrados nas tabelas origens e destinos)

id_status_carona com valor correspondente a "concluída"

id_veiculo (veículo do motorista)

id_passageiro (usuário do tipo "passageiro")

Não use os mesmos valores se já estiverem ocupados no seu banco

📌 Etapas da Inserção
1. Inserir uma Carona com Status “Concluída”
sql
Copiar
Editar
INSERT INTO caronas (
  id_motorista, 
  id_origem, 
  id_destino, 
  data_hora, 
  vagas_disponiveis, 
  id_status_carona, 
  id_veiculo
) VALUES (
  1,       -- ID do motorista (usuarios)
  1,       -- ID da origem (origens)
  1,       -- ID do destino (destinos)
  '2025-06-04 08:00:00', 
  2, 
  2,       -- 2 = 'concluída' (status_carona)
  1        -- ID do veículo (veiculos)
);
2. Inserir uma Solicitação Relacionada com Status “Concluída”
sql
Copiar
Editar
INSERT INTO solicitacoes (
  id_carona, 
  id_passageiro, 
  id_origem, 
  id_destino, 
  data_solicitacao, 
  id_status_solicitacao
) VALUES (
  1,       -- ID da carona inserida acima
  2,       -- ID do passageiro (usuarios)
  1,       -- ID da origem
  1,       -- ID do destino
  NOW(), 
  5        -- 5 = 'concluída' (status_solicitacao)
);
✅ Exibição no Sistema
Depois de inserir os dados corretamente, acesse a rota /historico no frontend e selecione:

Caronas Oferecidas para ver o histórico como motorista

Solicitações Feitas para ver o histórico como passageiro
---

## 👥 Equipe Desenvolvedora

* Felipe SMZ - [GitHub](https://github.com/Felipe-SMZ) - [LinkedIn](https://www.linkedin.com/in/felipe-sim%C3%B5es-shimizu-a3bb11321)
* MarcosVVSantos - [GitHub](https://github.com/MarcosVVSantos)

---

## 📜 Licença

Este projeto está protegido por direitos autorais e **não possui licença de uso livre**.

**É proibido:**

* Uso comercial sem autorização
* Cópia, modificação e distribuição sem permissão
* Reutilização de partes do código sem autorização

Projeto para fins exclusivamente educacionais. Para uso ou permissão, contate os autores.
