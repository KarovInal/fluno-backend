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
  'POST /pupils/create':   'pupils/create-pupils',
  'GET  /pupils/:pupilID': 'pupils/get-pupil',
  'POST /pupils/update':   'pupils/update-pupil',
  'POST /pupils/delete':   'pupils/delete-pupil',

  // Competitions CRUD
  'POST /competition/create': 'competition/create-competition',
  'POST /competition/make-draw': 'competition/make-draw',
  'POST /competition/set-points': 'competition/set-points',
  'POST /competition/get-points': 'competition/get-points',
  'POST /competition/download-results': 'competition/download-results',

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
  'POST /participants/update-participants': 'participants/update-participants'
};
