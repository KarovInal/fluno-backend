/**
 * TrainerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const path = require('path');

module.exports = {
  updateTrainer: async (req, res) => {
    try {
      const input = req.validate([
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

      await Trainers
        .update({ id: userID })
        .set(input)
        .fetch();

      const uploadPromise = () => new Promise((resolve, reject) => {
        req.file('photo').upload({
          saveAs: `${userID}.jpg`,
          dirname: path.resolve(sails.config.appPath, '.tmp/avatars')
        }, async (err, file) => {
          if (err) {
            return reject('Не удалось сохранить фото');
          }

          return resolve(file);
        });
      });

      const resultPhoto = await uploadPromise();

      if(!_.isEmpty(resultPhoto)) {
        await Trainers
          .update({ id: userID })
          .set({
            photo: `${userID}.jpg`
          })
          .fetch();
      }

      res.ok('Trainers OK');
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  }
};

