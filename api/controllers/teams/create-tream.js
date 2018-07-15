module.exports = {
  inputs: {
    teamName: { type: 'string' },
    trainerID: { type: 'number' },
    competitionID: { type: 'number' }
  },

  fn: async (inputs, exits) => {
    const { teamName, trainerID, competitionID } = inputs;

    const newTeam = await Teams.create({
      teamName,
      trainer: trainerID,
      competition: competitionID
    }).fetch();

    return exits.success(newTeam);
  }
};
