const { query } = require('express');
/* eslint-disable max-len */
/* eslint-disable arrow-parens */
const express = require('express');
const conn = require('../databaseConn.js');

const app = express();

app.get('/', (req, res) => {
  queryAsync('SELECT * from questions;')
    .then(result => res.json(result))
    .catch((err) => {
      console.log(err.message);
      res.sendStatus(500);
    });
});

app.post('/', (req, res) => {
  console.log(req.body);
  const { question, answers } = req.body;
  console.log(answers);
  res.end();
  queryAsync('INSERT INTO questions (question) VALUES (?)', question)
    .then(result => queryAsync('SELECT MAX(id) as id FROM questions'))
    .then(result => {
      console.log(result[0].id);
      console.log(Object.values(answers[0]));
      const queryParams = [];
      answers.forEach((answer) => {
        let values = Object.values(answer);
        values.push(result[0].id);
        queryParams.push(values);
      });
      console.log(queryParams);
      return queryAsync('INSERT INTO answers (answer, is_correct, question_id) VALUES ?', queryParams);
    })
    .then(res.end())
    .catch(err => {
      console.log(err.message);
      res.sendStatus(500);
    });
});

app.delete('/:id', (req, res) => {
  const { id } = req.params;

  queryAsync('DELETE from questions WHERE id = ?', id)
    .then(queryAsync('DELETE FROM answers WHERE question_id = ?', id))
    .then(res.end())
    .catch((err) => {
      console.log(err.message);
      res.sendStatus(500);
    });
});

function queryAsync(sqlQuery, ...params) {
  return new Promise((resolve, reject) => {
    conn.query(sqlQuery, params, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
}

module.exports = app;