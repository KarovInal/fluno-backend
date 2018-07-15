/**
 * Kinds.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    index: { type: 'number' },
    groupKindID: { model: 'ProgramKinds' },
    kindDictionaryID: { model: 'kinds_dictionary' }
  },
};
