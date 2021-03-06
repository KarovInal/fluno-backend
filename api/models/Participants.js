/**
 * Participants.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  description: {
    drawIndex: 'Порядковый номер жеребьевки'
  },

  attributes: {
    drawIndex: { type: 'number' },
    team: { model: 'Teams'},
    pupil: { model: 'Pupils' },
    programPosition: { model: 'ProgramPosition' },
  },
};
