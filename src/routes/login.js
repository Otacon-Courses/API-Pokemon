const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
  
module.exports = (app) => {
  app.post('/api/login', (req, res) => {
  
    User.findOne({ where: { username: req.body.username } }).then(user => { // on récupère un user qui est le même que celui de la requête.
        if(!user){ // si il n'y a pas de user
            const message = 'Le username n\'existe pas'
            return res.status(404).json({message})
        }
      bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
        if(!isPasswordValid) {
          const message = `Le mot de passe est erroné`;
          return res.status(401).json({message})
        }
          // JWT
          const token = jwt.sign(
            {userId: user.id},
            privateKey,
            { expiresIn: '24h'}
          )
            
          const message = `L'utilisateur a été connecté avec succès`;
          return res.json({ message, data: user, token })
        
      })
    })
    .catch(error => {
      const message = `L'utilisateur n'a pas pu être connecté, veuillez réessayer ultérieurement`;
      return res.status(500).json({message, data: error})
    })
  })
}