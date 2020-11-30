const express = require('express');
const router = require('./router.js');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

router.route(app);

app.listen(PORT, () => {
  console.log('App is listening on port ' + PORT);
});
