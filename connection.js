var monk = require('monk');
var db = monk(process.env.MONGOLAB_URI || 'localhost:27017/js-emails');

module.exports = db;
