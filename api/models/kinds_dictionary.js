/**
 * Kinds_dictionary.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    title: { type: 'string', unique: true },
    description: { type: 'string' },
  },

  customToJSON: function () {
    const kindsData = _.omit(this, ['createdAt', 'updatedAt']);
    const kindTitle = _.get(kindsData, 'title', '');
    const kindIconURL = kindTitle && `${sails.config.custom.host}:${sails.config.port}/kinds/${kindTitle}.svg`;

    return {
      ...kindsData,
      icon: kindIconURL
    }
  },
};
