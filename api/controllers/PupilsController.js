/**
 * PupilsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const path = require('path');

module.exports = {
  createPupil: async (req, res) => {
    try {
      let input = req.validate([
        { 'firstName?': 'string' },
        { 'lastName?': 'string' },
        { 'middleName?': 'string' },
        { 'yearOfBirth?': 'numeric' },
        { 'rank?': 'numeric' }
      ]);

      const user = req.user;
      const userID = _.get(user, 'id');
      input['trainerID'] = userID;

      const newPupil = await Pupils.create(input).fetch();

      const uploadPromise = () => new Promise((resolve, reject) => {
        req.file('avatar').upload({
          saveAs: `${newPupil.id}.jpg`,
          dirname: path.resolve(sails.config.appPath, '.tmp/pupils')
        }, (err, file) => {
          if (err) {
            return reject('Не удалось сохранить фото');
          }

          return resolve(file);
        });
      });

      const resultAvatar = await uploadPromise();

      if(!_.isEmpty(resultAvatar)) {
        await Pupils
          .update({ id: newPupil.id })
          .set({
            avatar: `${newPupil.id}.jpg`
          })
          .fetch();
      }

      res.ok('Pupils OK');
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  },

  getSelfPupils: async (req, res) => {
    const user = req.user;
    const userID = _.get(user, 'id');

    const listOfSelfPupils = await Pupils
      .find({ trainerID: userID })
      .populate('rank')
      .sort([
        { createdAt: 'DESC' },
      ]);

    res.send(listOfSelfPupils);
  },

  deletePupil: async (req, res) => {
    try {
      let input = req.validate([
        { 'pupilID?': 'numeric' }
      ]);
      const user = req.user;
      const userID = _.get(user, 'id');

      // проверить есть ли у тренра такой ученик
      const deletePupil = await Pupils.findOne({ trainerID: userID, id: input.pupilID });

      // если нет отправить ошибку доступа
      if(_.isEmpty(deletePupil)) {
        return res.sendStatus(403)
      }

      // если есть удалить
      await Pupils.destroy({ trainerID: userID, id: input.pupilID });
      return res.sendStatus(200);
    } catch(e) {
      console.log(e);
      res.sendStatus(500);
    }
  },

  updatePupil: async (req, res) => {
    try {
      let input = req.validate([
        { 'pupilID?': 'numeric' },
        { 'firstName?': 'string' },
        { 'lastName?': 'string' },
        { 'middleName?': 'string' },
        { 'yearOfBirth?': 'numeric' },
        { 'rank?': 'numeric' }
      ]);
      const user = req.user;
      const userID = _.get(user, 'id');

      // проверить есть ли у тренра такой ученик
      const updatePupil = await Pupils.findOne({ trainerID: userID, id: input.pupilID });

      // если нет отправить ошибку доступа
      if(_.isEmpty(updatePupil)) {
        return res.sendStatus(403)
      }

      const uploadPromise = () => new Promise((resolve, reject) => {
        req.file('avatar').upload({
          saveAs: `${updatePupil.id}.jpg`,
          dirname: path.resolve(sails.config.appPath, '.tmp/pupils')
        }, (err, file) => {
          if (err) {
            return reject('Не удалось сохранить фото');
          }

          return resolve(file);
        });
      });

      const resultAvatar = await uploadPromise();

      if(!_.isEmpty(resultAvatar)) {
        await Pupils
          .update({ id: updatePupil.id })
          .set({
            avatar: `${updatePupil.id}.jpg`
          })
          .fetch();
      }

      // Обновить данные ученика
      await Pupils
        .update({ id: updatePupil.id })
        .set(input);

      return res.sendStatus(200);
    } catch(e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
};

