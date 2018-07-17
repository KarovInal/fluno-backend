/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');

module.exports = {
  register: async (req, res) => {
    try{
      const trainer = await Trainers.create(req.body).fetch();

      req.login(trainer, err => {
        if (err) throw Error(err);

        return res.ok();
      });
    } catch(e) {
      sails.log(e);
      res.serverError({ message: 'Выбранный вами логин или пароль существует...' });
    }
  },

  login: async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      try {
        if (err || !user) throw Error('Не верный логин или пароль');
  
        req.login(user, err => {
          if (err) throw Error('Не верный логин или пароль');

          return res.ok();
        });
      } catch(err) {
        sails.log(err);
        res.status(401);
        return res.send({ message: err.message });
      }
    })(req, res, next);
  },

  logout: async (req, res) => {
    req.logout();
    res.ok('Bi');
  }
};
