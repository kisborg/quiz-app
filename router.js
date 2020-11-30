const path = require('path');
const apiRouter = require('./apiRouter.js');

const route = (app) => {
  app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, './public/routes/game.html'));
  });
  app.get('/questions', (req, res) => {
    res.sendFile(path.join(__dirname, './public/routes/questions.html'));
  });
  app.use('/api', apiRouter);
};

module.exports = { route };
