[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/junior201110/crawler)

# crawler

Projeto montado para mapear produtos do Mercado Livre. 

## Executando
Para executar o projeto, clone o projeto na sua maquina e instale as dependencias 

```
yarn install 
```
ou
```
npm  install
```

Depois execute o comando 

```
yarn start
```

ou 

```
npm start
```
Para os teste, basta executar o comando

```
yarn test
```
ou
```
npm run test
```
Se você estiver usando o VS Code, você pode usar a ferramenta de debug dele. 
As configurações foram submetidas junto com o projeto.

## Docker

Para rodar o projeto usando o docker, basta usar o docker-compose na pasta raiz do projeto.

```
docker-compose up
```

## Buscar produtos

Endpoint usado para buscar os produtos:

> O endpoint deve ser chamado via POST

```
http://localhost:3000/products/search
```

Exemplo do body

```json

{
    "search": "cadeado",
    "limit": 10
}

```

