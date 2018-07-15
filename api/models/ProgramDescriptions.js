/**
 * ProgramDescription.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    year: { type: 'string', defaultsTo: '' },
    rank: { type: 'number', defaultsTo: 0 },
    row: { type: 'number' },
    program: { model: 'Programs' }
  },
};
