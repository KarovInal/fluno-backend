/**
 * CompetitionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const path = require('path');

module.exports = {
  createCompetition: async (req, res) => {
    try {
      let input = req.validate([
        { 'nameCompetition': 'string' },
        { 'deadlineCompetition': 'string' },
        { 'dateStartCompetition': 'string' },
        { 'addressCompetition': 'string' },
        { 'countryCompetition': 'string' },
        { 'cityCompetition': 'string' },
        { 'contactsCompetition': 'json' },
        { 'timelinesCompetition': 'json' },
        { 'financingIndividual?': 'string' },
        { 'financingGroup?': 'string' },
        { 'individualProgramData?': 'json' },
        { 'groupProgramData?': 'json' }
      ]);

      const newCompetition = await Competitions.create(input).fetch();
      const newCompetitionID = newCompetition.id;

      const uploadPromise = fieldName => new Promise((resolve, reject) => {
        req.file(fieldName).upload({
          dirname: path.resolve(sails.config.appPath, `.tmp/competitions/${newCompetitionID}`)
        }, (err, file) => {
          if (err) {
            return reject(err);
          }

          if(!_.isEmpty(file)) {
            const fileName = path.basename(_.get(file, [0, 'fd']));
          }

          return resolve(file);
        });
      });

      const uploadFiles = await Promise.all([
        uploadPromise('coverCompetition'),
        uploadPromise('documentCompetition')
      ]);

      await _.map(uploadFiles, async file => {
        if(!_.isEmpty(file)) {
          const fileName = path.basename(_.get(file, [0, 'fd']));
          const fieldName = _.get(file, [0, 'field']);

          await Competitions
            .update({ id: newCompetitionID })
            .set({ [fieldName]: fileName })
            .fetch();
        }
      });

      res.json(newCompetition);
    } catch(e) {
      console.log(e);
      res.sendStatus(500);
    }
  },

  getCompetitions: async (req, res) => {
    try {
      const listCompetitions = await Competitions
        .find()
        .sort([
          { createdAt: 'DESC' },
        ]);

      res.send(listCompetitions);
    } catch(e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
};

