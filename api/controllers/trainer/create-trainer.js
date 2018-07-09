/**
 * TrainerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  inputs: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    middleName: { type: 'string' },
    work_place: { type: 'string' },
    country: { type: 'string' },
    city: { type: 'string' },
    phoneNumber: { type: 'string' },
    email: { type: 'string' },
    age: { type: 'number' },
  },

  fn: async (inputs, exist) => {
    const newTrainer = await Trainers.create(inputs);

    exist.success('OK');
  }
};
