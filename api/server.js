// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')
const fs = require('fs');
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

const data = {
    "columns": [
        {
            "id": 1,
            "name": "To do"
        },
        {
            "id": 2,
            "name": "Doing"
        },
        {
            "id": 3,
            "name": "Done"
        }
    ],
    "categories": [
        {
            "id": 1,
            "name": "Financeiro",
            "color": "#3bf73b"
        },
        {
            "id": 2,
            "name": "Estudos",
            "color": "#1763de"
        }
    ],
    "tasks": [
        {
            "id": 1,
            "title": "Pagar contas fixas",
            "description": "Realizar o pagamento das contas fixas do mês(Água, luz, telefone, etc.)",
            "dtForecast": "2023-06-12",
            "order": 1,
            "columnId": 2,
            "categoryId": 1
        },
        {
            "id": 2,
            "title": "Pagar contas variáveis, contas fixas e organizar finanlas",
            "description": "Pagamento de contas variáveis como Mercado, cabeleireiro, etc.",
            "dtForecast": "2023-06-15",
            "order": 1,
            "columnId": 1,
            "categoryId": 1
        },
        {
            "id": 3,
            "title": "Estudar para prova de Angular",
            "description": "",
            "dtForecast": "2023-06-12",
            "order": 2,
            "columnId": 1,
            "categoryId": 2
        }
    ]
};

fs.writeFile('db.json', JSON.stringify(data), { mode: 0o644 }, (err) => {
  if (err) {
    console.error('Erro ao criar db.json:', err);
    return;
  }
  console.log('db.json criado com sucesso!');
});

// Export the Server API
module.exports = server
