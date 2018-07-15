/**
 * ProgramPosition.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    col: { type: 'number' },
    row: { type: 'number' },
    program: { model: 'Programs' },
  },
};
