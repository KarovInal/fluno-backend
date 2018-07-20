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
    age: { type: 'number' }
  },

  fn: async (inputs, exist, { req, res, sails }) => {
    const { trainerID } = inputs;
    console.log('req', req);
    await Trainers
      .update({ id: trainerID })
      .set(omit(inputs, 'trainerID'))
      .fetch();

      exist.success();
  }
};
