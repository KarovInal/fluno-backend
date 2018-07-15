/**
 * Trainer.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
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
    email: { type: 'string' },
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
    }
  },
};
