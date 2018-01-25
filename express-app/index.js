const express = require('express')

const app = express()

app.get('/', function(req, res){
    console.log('Nossa primeira API')
    res.send('Welcome to Express.')
})

const PORT = 3000
const HOST = 'localhost'
app.listen(PORT, function(){
    console.log('Server in port: 3000')
})