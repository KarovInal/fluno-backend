module.exports = {
  inputs: {
    trainerID: {
      type: 'string',
      required: true
    }
  },

  fn: async (inputs, exist) => {
    const { trainerID } = inputs;

    const trainerData = await Trainers.destroy({ id: trainerID });

    exist.success(trainerData);
  }
}