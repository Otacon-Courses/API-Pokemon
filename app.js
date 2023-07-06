const express = require('express') // import express
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express() // ouvre instance 
const port = process.env.PORT || 3000 // défini port ou ecoute PORT heroku  


// MiddleWare
app
    .use(favicon(__dirname + '/favicon.ico')) // appel le favicon
    //.use(morgan('dev')) affiche les requetes
    .use(bodyParser.json())

sequelize.initDb()

app.get('/', (req, res) => {
    res.json('Hello Heroku !')
})

// Ici, nous placerons nos futurs endpoint.
require('./src/routes/findAllPokemons')(app) // pont de terminaison qui est une fonction avec en params notre app
require('./src/routes/findPokemonsByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)

// gestion des erreurs 404
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée, vous pouvez essayer une autre URL.'
    res.status(404).json({message})
})


app.listen(port, () => console.log (`Notre application Node est démarrée sur : http://localhost:${port}`))

