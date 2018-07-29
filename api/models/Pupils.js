/**
 * Pupils.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    middleName: { type: 'string' },
    yearOfBirth: { type: 'number' },
    avatar: { type: 'string' },
    trainerID: { model: 'Trainers' },
    rank: { model: 'Ranks' },
  },

  customToJSON: function () {
    const pupilData = _.omit(this, ['createdAt', 'updatedAt']);
    const pupilAvatar = _.get(pupilData, 'avatar', '');
    const pupilAvatarURL = pupilAvatar && `${sails.config.custom.host}:${sails.config.port}/pupils/${pupilAvatar}`;

    return {
      ...pupilData,
      avatar: pupilAvatarURL
    }
  },
};
