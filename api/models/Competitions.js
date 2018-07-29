module.exports = {
  attributes: {
    coverCompetition: { type: 'string' },
    nameCompetition: { type: 'string' },
    dateStartCompetition: { type: 'string' },
    deadlineCompetition: { type: 'string' },
    addressCompetition: { type: 'string' },
    countryCompetition: { type: 'string' },
    cityCompetition: { type: 'string' },
    documentCompetition: { type: 'string' },
    timelinesCompetition: { type: 'json' },
    contactsCompetition: { type: 'json' },
    financingIndividual: { type: 'string' },
    financingGroup: { type: 'string' },
    organizerID: { model: 'Trainers' },
    program: { model: 'Programs' },
    teams: {
      collection: 'Teams',
      via: 'competition'
    }
  },

  customToJSON: function () {
    const competitionData = _.omit(this, ['createdAt', 'updatedAt']);
    const coverCompetition = _.get(competitionData, 'coverCompetition', '');
    const documentCompetition = _.get(competitionData, 'documentCompetition', '');
    const coverCompetitionURL = coverCompetition && `${sails.config.custom.host}:${sails.config.port}/competitions/${competitionData.id}/${coverCompetition}`;
    const documentCompetitionURL = documentCompetition && `${sails.config.custom.host}:${sails.config.port}/competitions/${competitionData.id}/${documentCompetition}`;

    return {
      ...competitionData,
      coverCompetition: coverCompetitionURL,
      documentCompetition: documentCompetitionURL,
    }
  },
};
