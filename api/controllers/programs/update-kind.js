const _ = require('lodash');

module.exports = {
  inputs: {
    newKinds: { type: 'json' },
    programID: { type: 'number' },
    tablePosition: { type: 'number' },
  },

  fn: async function (inputs, exits) {
    let { tablePosition, programID, newKinds } = inputs;
    newKinds = JSON.parse(newKinds);

    let currentProgramKinds = await ProgramKinds.findOne({
      parrentProgramID: programID,
      tablePositionID: tablePosition
    });

    if(_.isEmpty(currentProgramKinds)) {
      // Создаем общий вид для ячейки программы, в который поместим другие виды
      currentProgramKinds = await ProgramKinds
        .create({
          tablePositionID: tablePosition,
          parrentProgramID: programID,
        })
        .fetch();

      // создать упорядоченные виды по ключу currentProgramKinds, то есть родительской группы видов
      _.map(newKinds, async (kindDictionaryID, index) => {
        await Kinds.create({
          index,
          kindDictionaryID,
          groupKindID: currentProgramKinds.id,
        }).fetch();
      });

    } else {
      await Kinds.destroy({
        groupKindID: currentProgramKinds.id
      });

      _.map(newKinds, async (kindDictionaryID, index) => {
        await Kinds.create({
          index,
          kindDictionaryID,
          groupKindID: currentProgramKinds.id,
        }).fetch();
      });
    }

    return exits.success(newKinds);
  }
};
