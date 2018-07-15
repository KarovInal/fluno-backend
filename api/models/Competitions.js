module.exports = {
  attributes: {
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
    organizerID: { model: 'Trainers' },
    program: { model: 'Programs' },
    teams: {
      collection: 'Teams',
      via: 'competition'
    }
  },
};
