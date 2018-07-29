const _ = require('lodash');

module.exports = {
  friendlyName: 'Set points',

  description: 'Выставление баллов для определенного вида',

  inputs: {
    kindID: { type: 'number' },
    pupilID: { type: 'number' },
    points: { type: 'json' },
  },

  fn: async (inputs, exits) => {
    let { kindID, pupilID, points } = inputs;

    const currentResults = await Results.findOne({
      kindID,
      pupilsID: pupilID
    });

    if(_.isEmpty(currentResults)) {
      await Results.create({
        kindID,
        pupilsID: pupilID,
        ...points
      }).fetch();

    } else {
      await Results.update({
        kindID,
        pupilsID: pupilID
      }).set({
        ...points
      }).fetch();

    }

    return exits.success(await Results.findOne({
      kindID,
      pupilsID: pupilID
    }));
  }
};
