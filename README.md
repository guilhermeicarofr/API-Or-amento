# API de orçamento
- Autor: Guilherme Real [@guilhermeicarofr](https://www.github.com/guilhermeicarofr)
- Tecnologias utilizadas: Node.js, Typescript, Javascript, Docker, Express.js, Jest, Supertest, Axios, ESLint, Joi

#

## Como rodar:
- Clonar esse repositório

````
git clone https://github.com/guilhermeicarofr/API-Orcamento
````

### Rodar em um container Docker (recomendado):
- Com docker e docker-compose instalado na máquina, rodar o comando dentro da pasta do projeto. Pode ser necessário autorização de superusuário.

```
sudo docker-compose up
```

`ou`

```
npm run container:up ( necessário npm instalado na máquina )
```

- A aplicação estará disponível no endpoint http://localhost:4000/

### Rodar localmente (sem Docker):
- Necessário instalação do Node e NPM na máquina (v19+ recomendado).
- Rodar instalação dos pacotes Node dentro da pasta do projeto:

```
npm i
```

- Executar aplicação:

```
npm run start
```

- A aplicação estará disponível no endpoint http://localhost:5000/

#

## Como usar:
- Requisições http a seguir para o endpoint correspondente ao método usado para rodar a aplicação
### GET /users
- Vai retornar uma lista com todos os usuários fornecidos pelo mockend no formato:
```
{
  id: 1
  name: 'usuário'
  tax: 85
}
```
### GET /products
- Vai retornar uma lista com todos os produtos fornecidos pelo mockend no formato:
```
{
  id: 1
  name: 'Produto'
  price: 2500
}
```

### GET /purchase/estimate/user/:userId
- O parâmetro userId deve ser um número inteiro maior que 0, referente à um usuário existente.

- Deve ser enviado um body json com o formato de exemplo: 
```
{
  products: [ 1, 2 ]
}
```
- Sendo products um array de números inteiros maiores que 0, correspondentes à um id de produto existente.

- A requisição vai retornar um objeto json de orçamento, contendo id e nome do usuário, preço total do orçamento (somatória dos produtos) e uma lista com todos os produtos orçados com seus respectivos ids, nomes e preços orçados (baseados na taxa do usuário). Exemplo: 
```
{
  userId: 1,
  userName: 'Guilherme',
  purchasePrice: 3000,
  purchaseProducts: [ 
      {
        id: 1,
        name: 'Produto',
        price: 2000
      },
      {
        id: 2,
        name: 'OutroProduto',
        price: 1000
      }
  ]
}
```

#

## Outros Scripts:
- Scripts npm para rodar testes e outras funcionalidades (apenas rodando no modo local sem Docker).

#### Rodar em Desenvolvimento 
- Alterações nos arquivos irão reinicializar o node automaticamente
```
npm run start:dev
```
#### Interromper container docker
- Interrompe a execução do container apagando o volume associado
```
npm run container:down
```
#### Rodar testes
- Roda todos os testes com Jest
```
npm run test
```
#### Rodar testes em monitoramento
- Roda testes com Jest monitorando alterações de arquivos fonte e repetindo automaticamente os testes associados as alterações
```
npm run test:watch
```
#### Testar e gerar relatório de cobertura 
- Roda todos os testes e gera relatório de cobretura de código acessível na pasta /coverage/
```
npm run test:coverage
```
#### Verificar padrões de lint 
- Verifica toda a aplicação por problemas de formatação e organização definidos pelo ESLint e gera erros e avisos
```
npm run lint
```
#### Corrigir padrões de lint 
- Verifica toda a aplicação por problemas de padrão definidos pelo ESLint e corrige os que forem possíveis
```
npm run lint:fix
```
