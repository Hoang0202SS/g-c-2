// webpack.config.js

const Dotenv = require('dotenv-webpack');

module.exports = {
  // Cấu hình khác của webpack ở đây...
  plugins: [
    new Dotenv()
  ]
};
