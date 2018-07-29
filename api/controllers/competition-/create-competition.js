module.exports = {
  inputs: {
    coverCompetition: { type: 'string' },
    nameCompetition: { type: 'string' },
    deadlineCompetition: { type: 'string' },
    addressCompetition: { type: 'string' },
    countryCompetition: { type: 'string' },
    cityCompetition: { type: 'string' },
    documentCompetition: { type: 'string' },
    scheduleCompetition: { type: 'json' },
    contactsCompetition: { type: 'json' },
    financingIndividual: { type: 'number' },
    financingGroup: { type: 'number' },
    organizerID: { type: 'number' },
  },

  fn: async (inputs, exits) => {
    const newCompetition = await Competitions.create(inputs).fetch();

    const newProgram = await Programs.create({
      type: 'individual',
      competition: newCompetition.id
    }).fetch();

    const newProgramID = newProgram.id;

    await Competitions.update({ id: newCompetition.id }).set({ program: newProgramID }).fetch();

    const newProgramPosition = await ProgramPosition.create({
      col: 0,
      row: 0,
      program: newProgramID
    }).fetch();

    await ProgramDescriptions.create({
      program: newProgramID,
      row: 0
    }).fetch();

    await ProgramKinds.create({
      tablePositionID: newProgramPosition.id,
      parrentProgramID: newProgramID
    }).fetch();

    return exits.success();
  }
};
