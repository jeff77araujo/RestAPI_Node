const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')

const rotaProdutos = require('./Rotas/produtos');
const rotaPedidos = require('./Rotas/pedidos');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false})); // Aceita apenas dados simples
app.use(bodyParser.json());  // Aceita somente json de entrada no body.

app.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origin', '*');
    res.header('Acess-Control-Allow-Header', 'Origin, X-REquerested-With, Content-Type, Accept, Authorization')

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow_Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();
})

app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);

// QUANDO NÃO ENCONTRA ROTA, ENTRA AQUI:
app.use((req, res, next) => {
    const erro = new Error("Não encontrado");
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
});

// app.use('/teste', (req, res, next) => {
//     res.status(200).send({
//         mensagem: 'OK, deu certo'
//     })
// });

module.exports = app;