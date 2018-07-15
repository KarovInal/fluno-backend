module.exports = {
  fn: async function (inputs, exits) {
    const programID = 13;
    const row = 0;
    const newDescription = {
      year: '2015 - 2016',
      rank: 1,
    };

    const programDescription = await ProgramDescriptions.update({
      program: programID,
      row
    }).set(newDescription).fetch();

    return exits.success(programDescription);
  }
};
