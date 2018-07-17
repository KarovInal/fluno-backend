/**
 * Trainer.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt-nodejs');

module.exports = {
  attributes: {
    username: { type: 'string', },
    password: { type: 'string', required: true },
    email: { type: 'string', unique: true },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    middleName: { type: 'string' },
    workPlace: {
      type: 'string',
      description: 'Место работы/спорт школа'
    },
    country: { type: 'string' },
    city: { type: 'string' },
    phoneNumber: { type: 'string' },
    age: { type: 'number' },
    pupils: {
      collection: 'Pupils',
      via: 'trainerID'
    },
    competitions: {
      collection: 'Competitions',
      via: 'organizerID'
    },
    teams: {
      collection: 'Teams',
      via: 'trainer'
    },
  },

  customToJSON() {
    return _.omit(this, ['password'])
  },

  beforeCreate(user, cb) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, null, function(err, hash){
        if(err) return cb(err);

        user.password = hash;

        return cb();
      });
    });
  }
};
