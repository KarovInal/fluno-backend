/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');
const { LOGIN, REGISTRATION, EVENTS } = sails.config.constants.routes;

module.exports = {
  register: async (req, res) => {
    try{
      const trainer = await Trainers.create(req.body).fetch();
      req.login(trainer, async err => {
        if (err) throw Error(err);

        const trainerDataForClient = await Trainers.findOne({ id: trainer.id });

        return res.json(trainerDataForClient);
      });
    } catch(e) {
      sails.log(e);
      res.serverError({ message: 'Выбранный вами логин или пароль существует...' });
    }
  },

  login: async (req, res, next) => {
    passport.authenticate('local', (err, trainer, info) => {
      try {
        if (err || !trainer) throw Error('Не верный логин или пароль');

        req.login(trainer, async err => {
          if (err) throw Error('Не верный логин или пароль');

          const trainerDataForClient = await Trainers.findOne({ id: trainer.id });

          return res.json(trainerDataForClient);
        });
      } catch(err) {
        sails.log(err);
        res.status(401);
        return res.send({ message: err.message });
      }
    })(req, res, next);
  },

  checkAuth: async (req, res) => {
    if(!req.user) {
      return res.sendStatus(401);
    }

    const trainerDataForClient = await Trainers.findOne({ id: req.user.id });

    return res.json(trainerDataForClient);
  },

  logout: async (req, res) => {
    req.logout();
    res.json('Bi');
  }
};
