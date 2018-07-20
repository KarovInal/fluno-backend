/**
 * TrainerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const path = require('path');
const _ = require('lodash');

module.exports = {
  updateTrainer: async (req, res) => {
    try {
      req.validate([
        { 'firstName?': 'string' },
        { 'lastName?': 'string' },
        { 'middleName?': 'string' },
        { 'workPlace?': 'string' },
        { 'country?': 'string' },
        { 'city?': 'string' },
        { 'phoneNumber?': 'string' },
        { 'email?': 'string' },
        { 'age?': 'numeric' }
      ]);

      const user = req.user;
      const userID = _.get(user, 'id');
      const { ...input } = req.body;

      await Trainers
        .update({ id: userID })
        .set(input)
        .fetch();

      const uploadPromise = () => new Promise((resolve, reject) => {
        req.file('photo').upload({
          saveAs: `${userID}.jpg`,
          dirname: path.resolve(sails.config.appPath, '.tmp/avatars')
        }, async (err) => {
          if (err) {
            return reject('Не удалось сохранить фото');
          }

          return resolve();
        });
      });

      await uploadPromise();
      await Trainers
        .update({ id: userID })
        .set({
          photo: `${userID}.jpg`
        })
        .fetch();

      res.ok('Trainers OK');
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  }
};

