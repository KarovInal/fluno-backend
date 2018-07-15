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

    const maxRowCount = _.get(rowsDesc, '[0].row', 0) + 1;
    const maxColumnCount = _.get(colsDesc, '[0].col', 0) + 1;

    _.times(maxRowCount, async (i) => {
      await ProgramPosition.create({
        col: maxColumnCount,
        row: i,
        program: programID
      }).fetch();
    });

    return exits.success({ maxRowCount, maxColumnCount });
  }
};
