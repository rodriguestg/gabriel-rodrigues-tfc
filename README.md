# Boas vindas ao repositório do Trybe Futebol Clube!

<summary><strong>👨‍💻 O que foi desenvolvido</strong></summary><br />

  Exemplos:

  O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️

  Este projeto consiste em uma API (onde utilizei o método `TDD`) e também integrei *- através do docker-compose -* as aplicações para que elas funcionasse consumindo um banco de dados.

  Foi construído **um back-end dockerizado utilizando modelagem de dados através do Sequelize**. **Respeitando regras de negócio** que foram estabelcidas no projeto e **a API sendo capaz de ser consumida por um front-end que já veio junto com o projeto**.

  Para adicionar uma partida é necessário ter um _token_, portanto a pessoa deverá estar logada para fazer as alterações.

  O back-end implementa regras de negócio para popular adequadamente a tabela disponível no front-end que o usuária vê.

<details>

<summary><strong> Estrutura do projeto</strong></summary><br />

O projeto é composto por 4 entidades importantes em sua estrutura:

1️⃣ **Banco de dados:**
  - É um container docker MySQL que já está configurado no docker-compose através de um serviço definido como `db`.
  - Tem o papel de fornecer dados para o serviço de _backend_.

2️⃣ **Back-end:**
 - É o ambiente onde realizado a maior parte das implementações exigidas.
 - Deve rodar na porta `3001`, pois o front-end faz requisições para ele nessa porta por padrão;

3️⃣ **Front-end:**
  - O front já havia sido desenvolvido, não foi necessário realizar modificações no mesmo. A única exceção foi o seu Dockerfile que precisou ser configurado.

4️⃣ **Docker:**
  - O `docker-compose` tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando `npm run compose:up` ou `npm run compose:up:dev`;

</details>

<details>
  <summary><strong>Os Testes de cobertura </strong></summary><br/>

  A construção de testes de cobertura foi feita em *TypeScript*, utilizando `mocha`, `chai` e `sinon`, na pasta `app/backend/src/tests/`, cubrindo aproximadamente 50% da aplicação.

</details>

# Sobre o projeto desenvolvido

Esse projeto é composto por 4 seções principais:
1. Users e Login
2. Times
3. Partidas
4. Placar

## Seção 1: Users e Login

<details>
  <summary><strong> Introdução </strong></summary>

- A rota de login recebe os campos `email` e `password` e esses campos são validados no banco de dados:
  - O campo `email` deve receber um email válido;
  - O Campo `password` deve ter mais de 6 caracteres.
  - Após o login é gerado um token válidado em JWT

</details>

## Seção 2: Times

<details>
  <summary><strong> Introdução </strong></summary>

 - Retorna os nomes de todos os times associados à partida na renderização do front-end apartir da rota `/teams`.
 - Retorna o nome do time associado ao id apartir da rota `/teams/1`.

</details>

## Seção 3: Partidas

<details>
  <summary><strong> Introdução </strong></summary>

  - Na criação de partidas, foi implementado um model e algumas rotas relacionadas a entidade Match.
  - Existe a opção para filtrar partidas em andamento e finalizadas.
  - É possível alterar os gols de uma partida.
  - Alterar o status de uma partida de 'Em andamento' para 'Finalizada'.
  - E criar uma nova partidade, como validações dos dados, precisando ser válidos.
  
</details>

## Seção 4: Leaderboards (placares)

<details>
  <summary><strong> Introdução </strong></summary>

  ▶️ Para construir a classificação dos times, foi seguido as seguintes regras de negócios:

    - `Classificação`: Posição na classificação;
    - `Time`: Nome do time;
    - `P`: Total de Pontos;
    - `J`: Total de Jogos;
    - `V`: Total de Vitórias;
    - `E`: Total de Empates;
    - `D`: Total de Derrotas;
    - `GP`: Gols marcados a favor;
    - `GC`: Gols sofridos;
    - `SG`: Saldo total de gols;
    - `%`: Aproveitamento do time.

    Observações:
    - A tabela só renderiza partidas finalizadas.
    - Para o campo `Aproveitamento do time (%)`, que é a porcentagem de jogos ganhos, foi usado a seguinte fórmula: `[P / (J * 3)] * 100`.
    - Para calcular `Saldo de Gols` foi usado a seguinte fórmula: `GP - GC`.
    - Em caso de empate no `Total de Pontos`, foi levado em consideração os seguintes critérios para desempate:

  **Ordem para desempate**
  1º Total de Vitórias; 2º Saldo de gols; 3º Gols a favor; 4º Gols sofridos.

</details>

<summary><strong>🕵️ Linter</strong></summary><br />

Para garantir a qualidade do código, usamos o [ESLint](https://eslint.org/) para fazer a sua análise estática.

<summary><strong>🔐 Criptografia de senhas </strong></summary><br />

⚠️ A biblioteca utilizada para criptografar a senha no banco de dados é a `bcryptjs` [bcryptjs npm](https://www.npmjs.com/package/bcryptjs).

## Caso deseje conhecer o projeto em sua máquina:

<summary><strong> 🔰 Baixar o projeto </strong></summary><br />

  1. Clone o repositório `Usar link SSH`

- Entre na pasta do repositório que você acabou de clonar:
  * `cd pasta-do-repositório`

  2. Instale as dependências `npm install`
  
  3. `npm run compose:up`
  
  4. `npm run build` na pasta do back-end.

<details>
<summary><strong> ⚠️ Configurações mínimas para execução do projeto</strong></summary><br />

Na sua máquina você deve ter:

 - Sistema Operacional Distribuição Unix
 - Node versão 16
 - Docker
 - Docker-compose versão >=1.29.2

➡️ O `node` deve ter versão igual ou superior à `16.14.0 LTS`.

➡️ O`docker-compose` deve ter versão igual ou superior à`ˆ1.29.2`.

</details>

<!-- Olá, Tryber!
Esse é apenas um arquivo inicial para o README do seu projeto no qual você pode customizar e reutilizar todas as vezes que for executar o trybe-publisher.

Para deixá-lo com a sua cara, basta alterar o seguinte arquivo da sua máquina: ~/.student-repo-publisher/custom/_NEW_README.md

É essencial que você preencha esse documento por conta própria, ok?
Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!
:warning: IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.
-->
