const _ = require('lodash');

module.exports = {
  description: 'Произвести жеребьевку соревнования',

  inputs: {
    competitionID: { type: 'number' }
  },

  fn: async (inputs, exits) => {
    const { competitionID } = inputs;
    /*
      TODO:
      - с помощью номера соревнования, найти программу
      - достать все виды по id программы
      - подтянуть участников по видам
      - провести жеребьевку и уста новить drawIndex в Participants
    */

    const currentCompetition = await Competitions.findOne({ id: competitionID });
    const listOfKinds = await ProgramKinds.find({ parrentProgramID: currentCompetition.program });
    let listOfParticipants = await Promise.all(
      _.map(listOfKinds, async kind=> {
        let participantsResult = await Participants.find({ programPosition: kind.tablePositionID });
        let drawParticipants = _.shuffle(participantsResult);

        return await Promise.all(
          _.map(drawParticipants, async (participant, drawIndex) => {
            await Participants.update({ id: participant.id }).set({ drawIndex }).fetch();
          })
        );
      })
    );

    return exits.success({ listOfParticipants });
  }
};
