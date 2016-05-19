var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
// setup global middleware here
// one version had var override = require('method-override'); // something to do with put and patch


module.exports = function(app) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
};
