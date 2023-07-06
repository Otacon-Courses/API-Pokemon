const { Pokemon } = require('../db/sequelize')
const auth = require ('../auth/auth')

module.exports = (app) => {
  app.delete('/api/pokemons/:id', auth, (req, res) => {
    Pokemon.findByPk(req.params.id) // promesse puis si validé on passe au .then qui prend en argument le resultat de la promesse
      .then(pokemon => {   // Toujours récuperer le pokemon pour l'afficher au client avant suppression définitive
        if(pokemon === null) {
          const message = 'le pokemon séléctioné n\'existe pas. Réessayez avec un autre identifiant'
          return res.status(404).json({message})
      }
      const pokemonDeleted = pokemon;
      return Pokemon.destroy({
        where: { id: pokemon.id }
      })
      .then(_ => {
        const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
        res.json({message, data: pokemonDeleted })
      })
      .catch(error => {
        const message = 'Le pokémon séléctioné n\'a pas pu être supprimé. Réessayez dans quelques instants'
        res.status(500).json({message, data: error})
      })
    })
  })
}