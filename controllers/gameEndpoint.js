/* eslint-disable prefer-template */
/* eslint-disable no-undef */
const express = require('express');
const conn = require('../databaseConn.js');

const app = express();

const usedQuestions = [];

app.get('/', async (req, res) => {
  const question = {
    id: '',
    question: '',
    answers: [],
  };
  queryAsync('SELECT id, question FROM questions ORDER BY RAND() LIMIT 1')
    .then((result) => {
      question.id = result[0].id;
      question.question = result[0].question;
      return queryAsync('SELECT * FROM answers WHERE question_id = ?', question.id);
    })
    .then((result) => {
      result.forEach((item) => {
        question.answers.push(item);
      });
      res.json(question);
    })
    .catch(error => res.sendStatus(500));
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
