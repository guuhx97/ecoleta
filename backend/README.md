<h1 align="center">
    <img alt="Ecoleta" width="400px" src="../.github/logo.svg" />
</h1>

<h4 align="center">
  🚀 Next Level Week 01 by Rocketseat
</h4>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/guuhx97/ecoleta">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
</p>

## 📰 Back-end

No back-end ou API, é onde de fato as funções de cadastro, busca, entre outras são executadas. É responsabilidade dele também realizar a integração com bando de dados insirindo e buscando informações. Por default, a API está utilizando a porta `3333`, mas que pode ser alterada no arquivo **server.js**.

## 🌱 Rotas

| Rota          | Método | Função                  | Descrição                                            |
| :------------ | :----- | :---------------------- | :--------------------------------------------------- |
| `/points`     | `POST` | `PointController.store` | `Cadastra pontos de coleta no banco de dados`        |
| `/points`     | `GET`  | `PointController.index` | `Busca todos os pontos de coletas no banco de dados` |
| `/points/:id` | `GET`  | `PointController.show`  | `Busca um ponto de coleta especifico pelo {id}`      |
| `/items`      | `GET`  | `ItemController.store`  | `Cadastra os items para coleta.`                     |

---

## 🔄 Executar

- Entrar na pasta `backend`;
- Executar `yarn knex:migrate` para criar as tabelas do banco;
- Executar `yarn knex:seed` para preencher items no banco;
- Executar `yarn install` para instalar dependências do projeto;
- Executar `yarn dev` para que o projeto seja executado;

## 📝 Licença

Este projeto está sobre a licença MIT. Veja o arquivo [LICENSE](../LICENSE.md) para mais detalhes.

---

<h4 align="center">
  Feito com ❤️ by Gustavo Souza
</h4>
