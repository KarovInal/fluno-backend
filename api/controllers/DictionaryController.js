/**
 * DictionaryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getDictionary: async (req, res) => {
    const ranks = await Ranks.find();
    const kinds = await kinds_dictionary.find();

    res.send({
      ranks,
      kinds
    })
  }
};
