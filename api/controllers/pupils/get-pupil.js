module.exports = {
  inputs: {
    pupilID: {
      type: 'number',
      required: true
    }
  },

  fn: async (inputs, exits) => {
    const { pupilID } = inputs;
    
    const pupilData = await Pupils.findOne({ id: pupilID }).populate('rank');

    return exits.success(pupilData);
  }
};
