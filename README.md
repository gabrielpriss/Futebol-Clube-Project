# Trybe Futebol Clube!

Trybe Futebol Clube foi um projeto back-end individual desenvolvido durante o curso da Trybe. A parte de front-end não foi desenvolvida por mim, apenas a back-end `(./app/backend)`, seus testes `(./app/backend/src/tests)` e arquivos de configuração Docker `(./app/backend/Dockerfile), (./app/backend/Dockerfile)`, `(./app/docker-compose.yml)`.

# Detalhes

<details>
  <summary><strong>💻 O que foi desenvolvido</strong></summary><br />

  O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️

  No desenvolvimento do `TFC`, fiquei responsável por desenvolver uma API (utilizando o método `TDD`) e também integrar *- através do docker-compose -* as aplicações para que elas funcionem consumindo um banco de dados.

  Nesse projeto, construi **um back-end dockerizado utilizando modelagem de dados através do Sequelize**. **A API é capaz de ser consumida por um front-end já provido nesse projeto**

  Para adicionar uma partida é necessário ter um _token_, portanto a pessoa deverá estar logada para fazer as alterações. Teremos um relacionamento entre as tabelas `teams` e `matches` para fazer as atualizações das partidas.

  O back-end implementa regras de negócio para popular adequadamente a tabela disponível no front-end que é exibida para a pessoa usuária do sistema.

</details>

<details>
  <summary><strong>Rodando o projeto</strong></summary><br />

  1. Clone o repositório
    * `git clone https://github.com/gabrielpriss/Futebol-Clube-Project.git`.
    * Entre na pasta do repositório:
      * `cd Futebol-Clube-Project`

  2. Instale as dependências
    * `npm install`
  
  3. Variáveis de ambiente
    
 - Você precisa configurar as variáveis globais do MySQL. 

 - Faça essas configurações também para as variáveis de ambiente usadas nesses arquivos:

  `/app/backend/src/database/config/database.ts`

  ```
  module.exports = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: TRYBE_FUTEBOL_CLUBE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
  };

  ```

  - É essencial usar essas 3 variáveis no arquivo acima:**
	* `host: process.env.DB_HOST`;
	* `user: process.env.DB_USER`;
	* `password: process.env.DB_PASS`.

  4. Iniciar os serviços MySQL e Docker
	* `exemplo`

	* sudo service mysql start
  	* sudo service docker start

  5. Iniciar a aplicação

	* Na pasta raiz rodar o script responsável por iniciar o front e o back-end
	* `npm run compose:up`

</details>

<details>
  <summary><strong>⚠️ Configurações mínimas nas máquinas locais para rodar o projeto</strong></summary><br />

Na sua máquina você deve ter:
	
 - Sistema Operacional Distribuição Unix
 - Node versão 16  
 - Docker
 - Docker-compose versão 1.29.2
	
➡️ O `node` deve ter versão igual ou superior à `16.15.0 LTS`. 

➡️ O`docker-compose` deve ter versão igual ou superior à`ˆ1.29.2`:

</details>

<details>
  <summary><strong> Estrutura do projeto</strong></summary><br />

O projeto é composto de 4 entidades em sua estrutura:

1️⃣ **Banco de dados:**
  - Tem o papel de fornecer dados para o serviço _back-end_. Durante os testes sempre vai ser acessado pelo `sequelize` e via porta `3002` do `localhost`; 

2️⃣ **Back-end:**
 - Roda na porta `3001`, pois o front-end faz requisições para ele na porta `3001` por padrão;
 - A aplicação é inicializada a partir do arquivo `app/backend/src/server.ts`;
  
3️⃣ **Front-end:**
  - Não foi desenvolvido por mim, roda localmente no site `http://localhost:3000/`; 
  - Esse site faz requisições para o back-end na porta `3001` para acessar e modificar os dados do banco.

4️⃣ **Docker:**
  - O Docker entra com o papel de unir todas as partes e subir um projeto completo com um comando só via o `docker-compose`;
  
 </details>

<details>

<br/>
<summary><strong>Funções do Projeto</strong></summary><br />
	
# Funções do Projeto

###  `/app/backend/src/database` nas pastas correspondentes estão migrations, models e seeders para a tabela de `teams, matches, users`

## 1 - Login

- Rota (`/login`);

- A rota recebe os campos `email` e `password` e esses campos são validados no banco de dados:
  - O campo `email` deve receber um email válido;
  - O Campo `password` deve ter mais de 6 caracteres.

- As senhas que existem no banco de dados estão encriptadas. Essa é a forma segura de guardar senhas, foi usadoo `bcryptjs` para comparar a senha do banco com a recebida no corpo da requisição.

- O body da requisição deve conter o seguinte formato:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

### O endpoint `/login` no back-end permite o acesso com dados válidos no front-end

  - A rota é do tipo `POST`;

- Se o login foi feito com sucesso, o resultado retornado é similar ao exibido abaixo, com um status http `200`:
	
  ```json
  {
    "user": {
      "id": 1,
      "username": "Admin",
      "role": "admin",
      "email": "admin@admin.com"
    },
    "token": "123.456.789" // Aqui é o token gerado pelo backend.
  }
  ```

### O endpoint `/login/validate` no back-end retorna os dados corretamente no front-end

  - É uma rota `GET` que receba um `header` com parâmetro `authorization`, onde fica armazenado o token gerado no login;

  - A resposta é um status `200` com uma `string` contendo a `role` do *user* se o token for válido.:
	

### O endpoint `/teams` no back-end retorna todos os times

  - É uma rota `GET` com resposta com status `200` e com um `json` contendo o retorno no seguinte modelo:

```json
[
	{
		"id": 1,
		"teamName": "Avaí/Kindermann"
	},
	{
		"id": 2,
		"teamName": "Bahia"
	},
	{
		"id": 3,
		"teamName": "Botafogo"
	},
	...
]
```

### O endpoint `/teams/:id` no back-end retorna dados de um time específico

  - É uma rota `GET` com resposta com status `200` e com um `json` contendo o retorno no seguinte modelo:

```json
{
	"id": 5,
	"teamName": "Cruzeiro"
}
```

### No endpoint `/matches` os dados apareçam corretamente na tela de partidas no front-end.

  - A rota é um `GET` e retorna uma lista de partidas;

    Exemplo de retorno:
    ```json
    [
      {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Grêmio"
        }
      },
      ...
      {
        "id": 41,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Internacional"
        }
      }
    ]
    ```

### No endpoint `/matches` é possível filtrar as partidas em andamento na tela de partidas do front-end

  - É uma rota do tipo `GET` e retorna uma lista de partidas filtradas;

  - Essa requisição usa `query string` para definir o parâmetro.
    ex: `matches?inProgress=true`

  Exemplo de retorno da requisição:
  ```json
  [
    {
      "id": 41,
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Internacional"
      }
    },
    {
      "id": 42,
      "homeTeam": 6,
      "homeTeamGoals": 1,
      "awayTeam": 1,
      "awayTeamGoals": 0,
      "inProgress": true,
      "teamHome": {
        "teamName": "Ferroviária"
      },
      "teamAway": {
        "teamName": "Avaí/Kindermann"
      }
    }
  ]
  ```

### O endpoint `/matches` filtra as partidas finalizadas na tela de partidas do front-end

  - É uma rota do tipo `GET` e retorna uma lista de partidas filtradas;

  - Essa requisição usa `query string` para definir o parâmetro:
    ex: `matches?inProgress=false`

## Adicionar Partidas

### Na rota `/matches` é possível salvar uma partida com o status de inProgress como true no banco de dados

  - A rota é do tipo `POST` e retorna a partida inserida no banco de dados;

  - A partida só pode ser criada com token JWT validado;

  - O corpo da requisição terá o seguinte formato:
	
  ```json
  {
    "homeTeam": 16, // O valor deve ser o id do time
    "awayTeam": 8, // O valor deve ser o id do time
    "homeTeamGoals": 2,
    "awayTeamGoals": 2, 
    // a partida é criada como em progresso por padrão se "inProgress" não for passado.
  }
  ```

### No endpoint `/matches` não é possível inserir uma partida com times iguais

  - Não deve é possível criar uma partida com o mesmo time, por exemplo: Barcelona x Barcelona. Caso isso ocorra, retorna um status `401`

### No endpoint `/matches` não é possível inserir uma partida com um time que não existe na tabela teams

  - Caso algum dos times não esteja cadastrado no banco de dados, é retornado com um status `404,`;

## Editar Partidas

### No endpoint `/matches/:id` é possível atualizar partidas em andamento

  - O endpoint é do tipo `PATCH`;

  - É recebido o `id` pelo parâmetro da URL;

  - O corpo da requisição tem o seguinte formato:
  ```json
  {
    "homeTeamGoals": 3,
    "awayTeamGoals": 1
  }
  ```

### No endpoint `/matches/:id` é possível finalizar partidas em andamento

  - O endpoint é do tipo `PATCH`;

  - É recebido o `id` pelo parâmetro da url com qualquer corpo;

## Leaderboards (placares)

  - O resultado é ordenado sempre de forma decrescente, levando em consideração a quantidade de pontos que o time acumulou.

### No endpoint `/leaderboard/home` é possível filtrar as classificações dos times da casa na tela de classificação do front-end com os dados iniciais do banco de dados

  - O endpoint é tipo `GET`;

  - Ao fazer a requisição ao endpoint `/leaderboard/home` são retornados os campos e valores corretos, considerando os dados iniciais do banco de dados.

  
## Testes

### No diretório `/tests` estão os testes de integração. É possível testar todas as rotas e operações back-end com os dados do banco de dados mockados

  - Iniciar a aplicação back-end rodando o script **npm start** no diretório **./app/backend**

  - Depois que a aplicação estiver rodando, em outra aba do terminal, rode o script **npm test** também no diretório **./app/backend**
