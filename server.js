const path = require('path')
const mongoose = require('mongoose');
const express = require('express')
const serverConfigs = require('./configs/serverConfig');

mongoose.connect(serverConfigs.DBURL,{
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(() => console.log('DB Connected!'))
.catch(err => {
console.log(err);
});

const app = express();

require('./src/backend/express')(app,serverConfigs);

app.listen(serverConfigs.PORT, (error) => {
    if (error) throw error;
    console.log('Server running on port: ' + serverConfigs.PORT);
  });