const _ = require('lodash');

module.exports = {
  inputs: {
    column: { type: 'number' },
    programID: { type: 'number' }
  },

  fn: async (inputs, exits) => {
    const { column, programID } = inputs

    const fullColumn = await ProgramPosition.find({
      col: column,
      program: programID
    });
    const fullColumnID = _.map(fullColumn, column => column.id);

    _.map(fullColumnID, async (colID) => {
      // чистим записи в ProgramKinds для данной колонки
      await ProgramKinds.destroy({ tablePosition: colID }).fetch();
    });

    await ProgramPosition.destroy({
      id: { in: fullColumnID }
    });

    return exits.success(fullColumn);
  }
};
