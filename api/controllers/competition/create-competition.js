module.exports = {
  inputs: {
    coverCompetition: { type: 'string', required: true },
    nameCompetition: { type: 'string', required: true },
    deadlineCompetition: { type: 'string', required: true },
    addressCompetition: { type: 'string', required: true },
    countryCompetition: { type: 'string', required: true },
    cityCompetition: { type: 'string', required: true },
    documentCompetition: { type: 'string', required: true },
    scheduleCompetition: { type: 'json', required: true },
    contactsCompetition: { type: 'json', required: true },
    financingIndividual: { type: 'number', required: true },
    financingGroup: { type: 'number', required: true },
    organizerID: { type: 'number', required: true },
  },

  fn: async (inputs, exits) => {
    const newCompetition = await Competitions.create(inputs).fetch();

    const newProgram = await Programs.create({
      type: 'individual',
      competition: newCompetition.id
    }).fetch();
    const newProgramID = newProgram.id;

    const newProgramPosition = await ProgramPosition.create({
      col: 0,
      row: 0,
      program: newProgramID
    }).fetch();

    const newProgramDescriptions = await ProgramDescriptions.create({
      program: newProgramID,
      row: 0
    }).fetch();

    const newnewProgramKinds = await ProgramKinds.create({
      tablePosition: newProgramPosition.id,
      program: newProgramID
    }).fetch();

    console.log(
      newProgram,
      newProgramPosition,
      newProgramDescriptions,
      newnewProgramKinds
    );

    return exits.success(newCompetition);
  }
};
