module.exports = {
  inputs: {
    teamID: { type: 'number' }
  },

  fn: async function (inputs, exits) {
    const { teamID } = inputs;
    
    await Participants.destroy({
      team: teamID
    });

    await Teams.destroy({
      id: teamID
    });

    return exits.success();
  }
};
