'use strict';

const express = require('express');
const path = require('path');

var app = express();
const static_path = __dirname;
app.use(express.static(static_path));

app.listen(6004, function () {
  if (!this.address) {
    return;
  }
  console.log('Server started at 6004');
});
app.get('*', function (req, res) {
  res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});