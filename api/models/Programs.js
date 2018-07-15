/**
 * Programs.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    type: 'string',
    positions: {
      collection: 'ProgramPosition',
      via: 'program'
    },
    kinds: {
      collection: 'ProgramKinds',
      via: 'parrentProgramID'
    },
    descriptions: {
      collection: 'ProgramDescriptions',
      via: 'program'
    },
    competition: {
      model: 'competitions'
    }
  },
};
