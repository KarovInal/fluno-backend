/**
 * Pupils.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    middleName: { type: 'string' },
    yearOfBirth: { type: 'number' },
    trainerID: { model: 'Trainers' },
    rank: { model: 'Ranks' }
  },

};
