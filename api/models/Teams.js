/**
 * Teams.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    teamName: { type: 'string' },
    trainer: { model: 'Trainers' },
    competition: { model: 'Competitions' },
    participants: {
      collection: 'Participants',
      via: 'team'
    }
  },
};
