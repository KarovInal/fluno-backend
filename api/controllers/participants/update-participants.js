const _ = require('lodash');

module.exports = {
  inputs: {
    add: { type: 'json' },
    remove: { type: 'json' },
    teamID: { type: 'number' },
    positionID: { type: 'number' },
  },

  fn: async function (inputs, exits) {
    let {
      add,
      remove,
      teamID,
      positionID,
    } = inputs;

    add = JSON.parse(add);
    remove = JSON.parse(remove);

    let addedParticipants;

    if (!_.isEmpty(add)) {
      addedParticipants = _.map(add, async (participantID) => {
        console.log(participantID);
        await Participants.create({
          team: teamID,
          pupil: participantID,
          programPosition: positionID
        }).fetch();
      });
    }

    if (!_.isEmpty(remove)) {
      _.map(remove, async (participantID) => {
        await Participants.destroy({
          team: teamID,
          pupil: participantID,
          programPosition: positionID
        });
      });
    }

    return exits.success(addedParticipants);
  }
};
