const { omit } = require('lodash');

module.exports = {
  inputs: {
    trainerID: { type: 'number', required: true },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    middleName: { type: 'string' },
    workPlace: { type: 'string' },
    country: { type: 'string' },
    city: { type: 'string' },
    phoneNumber: { type: 'string' },
    email: { type: 'string' },
    age: { type: 'number' },
    photo: { type: 'string' }
  },

  fn: async (inputs, exist) => {
    const { trainerID } = inputs;

    await Trainers
      .update({ id: trainerID })
      .set(omit(inputs, 'trainerID'))
      .fetch();

    exist.success();
  }
};
