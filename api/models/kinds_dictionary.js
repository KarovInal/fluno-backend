/**
 * Kinds_dictionary.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    kinds: {
      collection: 'kinds',
      via: 'kindDictionaryID'
    },
    description: { type: 'string' }
  },
};
