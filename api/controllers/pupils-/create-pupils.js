module.exports = {
  inputs: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    middleName: { type: 'string' },
    yearOfBirth: { type: 'number' },
    rank: { type: 'number' }
  },

  fn: async (inputs, exist) => {
    const newPupils = await Pupils.create(inputs).fetch();

    console.log('newPupils', newPupils);

    exist.success();
  }
};
