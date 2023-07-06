const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemons')
const pokemons = require('./mock-pokemon')
const UserModel = require('../models/user')
const bcrypt = require('bcrypt')

// Création de la base de donnée
const sequelize = new Sequelize('pokedex', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})

// instance du model pokemon
const Pokemon = PokemonModel(sequelize, DataTypes)
// instance du model user
const User = UserModel(sequelize, DataTypes)

// synchronisation du model pokemon avec la bdd
const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    console.log('INIT DB')
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      }).then(pokemon => console.log(pokemon.toJSON()))
    })
    
    bcrypt.hash('pikachu', 10)  // bcrypt.hash('mot de passe', temps d'encryption)
    .then(hash => User.create({username: 'pikachu', password: hash})) // on recupere le mot de passe hashé on créer le user avec
    .then(user => console.log(user.toJSON())) // on récupere le user, on l'affiche en JSON

    console.log('La base de donnée a bien été initialisée !')
  })
}


  
// export du module
module.exports = { 
  initDb, Pokemon, User
}