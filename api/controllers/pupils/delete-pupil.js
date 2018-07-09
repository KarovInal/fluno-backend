module.exports = {
  inputs: {
    pupilID: { type: 'number' }
  },

  fn: async (inputs, exits) => {
    const { pupilID } = inputs;
    await Pupils.destroy({ id: pupilID });

    return exits.success();
  }
};
