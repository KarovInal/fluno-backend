/**
 * Results.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    pupilsID: { model: 'Pupils' },
    kindID: { model: 'Kinds' },
    'D1,2': { type: 'number' },
    'D3,4': { type: 'number' },
    'E1,2': { type: 'number' },
    'E3': { type: 'number' },
    'E5': { type: 'number' },
    'E6': { type: 'number' }
  },
};