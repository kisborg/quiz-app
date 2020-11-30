const express = require('express');
const gameEndpoint = require('./controllers/gameEndpoint.js');
const questionsEndpoint = require('./controllers/questionsEndpoint.js');

const apiRouter = express();
apiRouter.use('/questions', questionsEndpoint);
apiRouter.use('/game', gameEndpoint);

module.exports = apiRouter;
