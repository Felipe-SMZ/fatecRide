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
- Banco de dados MySQL (pode ser via Docker)  

---

## ✨ Requisitos Extras Implementados
Funcionais
| Requisito Extra                      | Descrição                                                                                                                       |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| 📧 Confirmação de e-mail             | Durante o cadastro, o sistema valida o formato do e-mail antes do envio. *(Opcional: pode incluir envio de e-mail futuramente)* |
| 🗺️ Exibição de mapa com localização | Utiliza Leaflet para mostrar mapa com rotas entre origem e destino                                                              |
| 📍 Marcação de origem e destino      | O usuário escolhe a rua e cidade para definir origem e destino no mapa                                                          |
| 🖼️ Foto de perfil via URL           | O usuário pode adicionar sua foto de perfil informando uma URL válida                                                           |
| 🔄 Atualização e exclusão de veículo | O usuário pode cadastrar mais de um veículo, editar ou excluir quando quiser                                                    |
| 🔐 Perfis distintos                  | O sistema reconhece perfis de motorista e passageiro com funcionalidades diferentes                                             |

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
  A inserção de fotos é feita apenas para o **perfil do usuário via URL de imagem**. Veículos não possuem fotos.

* **Teste do histórico:**
  Para testar o histórico de caronas e solicitações, é necessário que o banco esteja **povoado com dados reais** — caso contrário, a lista aparecerá vazia.

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

```


