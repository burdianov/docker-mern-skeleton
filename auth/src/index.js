const express = require('express');
const axios = require('axios');

const { connectDB } = require('./helpers/db');
const { HOST, PORT, DB, API_URL } = require('./configuration');

const app = express();

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Auth server listening on port ${PORT}`);
    console.log(`On host ${HOST}`);
    console.log(`Database ${DB}`);
  });
};

app.get('/test', (req, res) => {
  res.send('Auth server is functioning perfectly!');
});

app.get('/test-with-api-data', (req, res) => {
  axios.get(API_URL + '/test-api-data').then((response) => {
    res.json({
      testApiData: response.data
    });
  });
});

app.get('/api/current-user', (req, res) => {
  res.json({
    id: 1234,
    email: 'foo@gmail.com'
  });
});

connectDB()
  .on('error', console.log)
  .on('disconnected', connectDB)
  .once('open', startServer);
