const express = require('express')

const app = express()

var userRouter = require('./userRoutes')

var bodyParser =  require('body-parser')

app.use(bodyParser.json())

app.use((req, res, next) => {
    console.log('Incluído um primeiro Middleware que intercepta as chamadas de APIs')
    next()
}, (req, res, next) => {
    console.log('Incluído um segundo Middleware que intercepta as chamadas de APIs')
    next()
})

app.use('/user', userRouter)

//API com resposta normal
app.get('/', (req, res) => {
    console.log('Nossa primeira API')
    res.send('Welcome to Express.')
})


//Retorna os dados em JSON
app.get('/json/resp', (req, res) => {
    var obj = {
        date: Date.now(),
        resposta: 'Chamada bem sucedida.'
    }
    res.send(obj)
})

//API enviando parametros
//Utilizado para os métodos DELETE e PUT para remoção ou atualização.

app.get('/parametro/:userId', (req, res) => {
    console.log(req, params)
    var obj = {
        idRecebido: req.params.userId,
    }
    res.send(obj)
})

//Utilizado para criação de objetos.
app.post('/incluir', (req, res) => {
    console.log(req.body)
    var obj = {
        nomeRecebido: req.body.nome
    }
    res.send(obj)
})

//Tratamento de erros
var handleErrors = (err, req, res, next) => {
    console.log('Tratar qualquer erro de alto nível aqui.')
    console.log(err)
    res.status(500).json({resposta: 'Algo está errado.'})
}

app.use(handleErrors)

const PORT = 3000
const HOST = 'localhost'
app.listen(PORT, () => {
    console.log('Server in port: 3000')
})