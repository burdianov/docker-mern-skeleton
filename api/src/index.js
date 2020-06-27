const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const { connectDB } = require('./helpers/db');
const { HOST, PORT, DB, AUTH_API_URL } = require('./configuration');

const app = express();

const postSchema = new mongoose.Schema({
  name: String
});
const Post = mongoose.model('Post', postSchema);

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`On host ${HOST}`);
    console.log(`Database ${DB}`);

    Post.find((err, posts) => {
      if (err) return console.error(err);
      console.log('posts', posts);
    });

    const newPost = new Post({ name: 'Super Post' });
    newPost.save((err, post) => {
      if (err) return console.error(err);
      console.log('post', post);
    });
  });
};

app.get('/test', (req, res) => {
  res.send('All good, mudium ha-ha!');
});

app.get('/api/test-api-data', (req, res) => {
  res.json({
    testWithAPI: true
  });
});

app.get('/test-with-current-user', (req, res) => {
  axios.get(AUTH_API_URL + '/current-user').then((response) => {
    res.json({
      testWithCurrentUser: true,
      currentUserFromAuth: response.data
    });
  });
});

connectDB()
  .on('error', console.log)
  .on('disconnected', connectDB)
  .once('open', startServer);
