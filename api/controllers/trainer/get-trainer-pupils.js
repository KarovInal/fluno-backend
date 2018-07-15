module.exports = {
  inputs: {
    trainerID: { type: 'number' }
  },

  fn: async (inputs, exits) => {
    const { trainerID } = inputs;
    const pupilsByTrainer = await Trainers.findOne({ id: trainerID }).populateAll();

    console.log('pupilsByTrainer', pupilsByTrainer);

    return exits.success(pupilsByTrainer);
  }
};
