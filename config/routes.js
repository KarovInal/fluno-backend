const path = require('path');

module.exports.routes = {
  // Trainer CRUD
  // 'POST /trainer/create':     'trainer/create-trainer',
  // 'GET /trainer/:trainerID/': 'trainer/get-trainer',
  'POST /trainer/update':        'TrainerController.updateTrainer',
  // 'POST /trainer/delete':     'trainer/delete-trainer',
  // 'POST /trainer/get-pupils': 'trainer/get-trainer-pupils',

  // Auth CRUD
  'POST /auth/register': 'AuthController.register',
  'POST /auth/login': 'AuthController.login',
  'POST /auth/check-auth': 'AuthController.checkAuth',
  'POST /auth/logout': 'AuthController.logout',
  
  // Pulpils CRUD
  'POST /pupils/create':            'PupilsController.createPupil',
  'POST /pupils/get-self-pupils':   'PupilsController.getSelfPupils',
  'POST /pupils/delete':            'PupilsController.deletePupil',
  'POST /pupils/update':            'PupilsController.updatePupil',

  // Competitions CRUD
  'POST /competition/create': 'CompetitionController.createCompetition',
  'POST /competitions': 'CompetitionController.getCompetitions',
  // 'POST /competition/make-draw': 'competition/make-draw',
  // 'POST /competition/set-points': 'competition/set-points',
  // 'POST /competition/get-points': 'competition/get-points',
  // 'POST /competition/download-results': 'competition/download-results',

  // Program CRUD
  'GET /program/:programID': 'programs/get-program',
  'POST /program/update-kind': 'programs/update-kind',
  'GET /program/update-description': 'programs/update-description',
  'GET /program/remove-column/:programID/:column': 'programs/remove-column',
  'GET /program/remove-row/:programID/:row': 'programs/remove-row',
  'GET /program/add-row/:programID/': 'programs/add-row',
  'GET /program/add-column/:programID/': 'programs/add-column',

  // Team CRUD
  'POST /teams/create-team': 'teams/create-tream',
  'POST /teams/remove-team': 'teams/remove-tream',

  // Participants CRUD
  'POST /participants/update-participants': 'participants/update-participants',

  // Dictionary
  'GET /dictionary': 'DictionaryController.getDictionary',
  'GET *': {
    skipAssets: true,
    fn: function(req, res) {
      return res.sendFile(path.resolve('assets/index.html'));
    }
  },
};
