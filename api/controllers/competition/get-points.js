const _ = require('lodash');

module.exports = {
  friendlyName: 'Get points',

  description: 'Получить данные по виду программы',

  inputs: {
    programKindID: { type: 'number' }
  },

  fn: async (inputs, exits) => {
    const { programKindID } = inputs;

    const { tablePositionID } = await ProgramKinds.findOne({
      parrentProgramID: programKindID
    });

    const listOfParticipants = await Participants
      .find({
        programPosition: tablePositionID
      })
      .populate('pupil');

    const listOfKinds = await Kinds
      .find({
        groupKindID: programKindID
      })
      .sort('index ASC');

    const results = await Promise.all(
      _.map(listOfKinds, async kind =>
        await Results.find({ kindID: kind.id })
      )
    );

    return exits.success({
      listOfParticipants,
      results
    });
  }
};
