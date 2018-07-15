const _ = require('lodash');

module.exports = {
  inputs: {
    row: { type: 'number' },
    programID: { type: 'number' }
  },

  fn: async (inputs, exits) => {
    const { row, programID } = inputs;

    const fullRow = await ProgramPosition.find({
      row,
      program: programID
    });
    const fullRowID = _.map(fullRow, row => row.id);

    _.map(fullRowID, async (rowID) => {
      // чистим записи в ProgramKinds для данной колонки
      await ProgramKinds.destroy({ tablePosition: rowID }).fetch();
    });

    await ProgramPosition.destroy({
      id: { in: fullRowID }
    });

    await ProgramDescriptions.destroy({
      row
    });

    return exits.success(fullRow);
  }
};
