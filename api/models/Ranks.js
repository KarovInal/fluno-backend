/**
 * Ranks.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    shortDescription: {
      type: 'string',
      required: true
    },
    fullDescription: {
      type: 'string',
      required: true
    }
  },

  customToJSON: function () {
    const ranksData = _.omit(this, ['createdAt', 'updatedAt']);

    return ranksData;
  },
};
