module.exports = {
  inputs: {
    programID: { type: 'number' }
  },

  fn: async (inputs, exits) => {
    const { programID } = inputs;

    const kindResults = await ProgramKinds.find({ program: programID });
    const positionResults = await ProgramPosition.find({ program: programID });
    const descriptionResults = await ProgramDescriptions.find({ program: programID });

    return exits.success({
      kindResults,
      positionResults,
      descriptionResults,
    });
  }
};
