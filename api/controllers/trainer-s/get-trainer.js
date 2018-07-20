module.exports = {
  inputs: {
    trainerID: {
      type: 'string'
    }
  },

  fn: async (inputs, exists) => {
    const { trainerID } = inputs;
    const trainerData = await Trainers.findOne({ id: trainerID });

    exists.success(trainerData);
  }
}
