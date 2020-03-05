const path = require('path');
const databaseUrl = require('../src/backend/credentials').DBURL;

const serverConfigs = {
    PRODUCTION: process.env.NODE_ENV === 'production',
    PORT: process.env.PORT || 8888,
    ROOT: path.resolve(__dirname, '..'),
    DBURL: databaseUrl,
  };
  
  module.exports = serverConfigs;