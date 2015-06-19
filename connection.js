var monk = require('monk');
var db = monk(process.env.MONGOLAB_URI || 'localhost:27017/emails');

module.exports = db;
