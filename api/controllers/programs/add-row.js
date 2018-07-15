const _ = require('lodash');

module.exports = {
  inputs: {
    programID: { type: 'number' }
  },

  fn: async (inputs, exits) => {
    const { programID } = inputs;

    const rowsDesc = await ProgramPosition.find({
      where: { program: programID },
      sort: 'row DESC'
    });
    const colsDesc = await ProgramPosition.find({
      where: { program: programID },
      sort: 'col DESC'
    });

    const maxRowCount = _.get(rowsDesc, '[0].row');
    const maxColumnCount = _.get(colsDesc, '[0].col', 0) + 1;
    const newRowIndex = maxRowCount + 1;

    // добавляем новый description
    const newDescription = await ProgramDescriptions.create({
      program: programID,
      row: newRowIndex
    }).fetch();

    _.times(maxColumnCount, async (i) => {
      await ProgramPosition.create({
        col: i,
        row: newRowIndex,
        program: programID
      }).fetch();
    });

    return exits.success({ maxRowCount, maxColumnCount });
  }
};
