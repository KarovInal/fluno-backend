module.exports = {
  inputs: {
    pupilID: { type: 'number' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    middleName: { type: 'string' },
    yearOfBirth: { type: 'number' },
    rank: { type: 'number' },
    trainerID: { type: 'number' }
  },

  fn: async (inputs, exits) => {
    const { pupilID } = inputs;

    await Pupils
      .update({ id: pupilID })
      .set(inputs);

    return exits.success();
  }
};
