const dotenv = require('dotenv');
dotenv.config(); // تحميل القيم من .env

const config = {
  development: {
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000',
    admobKey: process.env.REACT_APP_ADMOB_KEY,
    database: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 27017,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
  },
  production: {
    apiUrl: process.env.REACT_APP_API_URL || 'https://api.myapp.com',
    admobKey: process.env.REACT_APP_ADMOB_KEY,
    database: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 27017,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
  }
};

const env = process.env.NODE_ENV || 'development';
module.exports = config[env];
