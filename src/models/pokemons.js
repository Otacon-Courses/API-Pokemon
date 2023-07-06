const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée', 'Psy']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : {
          msg : 'Le nom est déjà pris.'
        },
        validate: {
          notEmpty : {msg :'Vous devez obligatoirement renseigner ce champs'},
          notNull : {msg: 'ce champs ne peut pas être null'}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'Utilisez uniquement des nombres entier pour les points de vie.'},
          notNull: { msg: 'Les points de vie sont une propriété requise.'},
          min : {
            args : [0],
            msg : 'le nombre doit être supérieur ou égale à 0'
          },
          max : {
            args : [999],
            msg : 'le nombre doit être inférieur ou égale à 999'
          }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt : {msg :'Vous devez obligatoirement renseigner un nombre'},
          notNull : {msg: 'ce champs ne peut pas être null'},
          min : {
            args : [0],
            msg : 'le nombre doit être supérieur ou égale à 0'
          },
          max : {
            args : [99],
            msg : 'le nombre doit être inférieur ou égale à 99'
          }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl : {msg :'Vous devez obligatoirement renseigner un URL'},
          notNull : {msg: 'ce champs ne peut pas être null'}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false, 
        get(){
          return this.getDataValue('types').split(',')
        },
        set(types){
          return this.setDataValue('types', types.join())
        },
        validate : {
          isTypesValid(value){
            if(!value){
              throw new Error('Un pokemon doit avoir au moins un types.')
            }
            if(value.split(',').length > 3) {
              throw new Error('Un pokemon ne peut pas avoir plus de 3 types')
            }
            value.split(',').forEach( type => {
              if(!validTypes.includes(type)) {
                throw new Error(`Vous devez indiquez un types valide, appartenant à la liste suivante : ${validTypes}`)
              }
            })
          }

        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  } 