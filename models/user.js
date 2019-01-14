var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: { type: 'String', required: true },
    password: { type: 'String', required: true },
    email: { type: 'String', required: true },
    firstName: { type: 'String', required: true },
    lastName: { type: 'String' },
});

module.exports = mongoose.model('User', userSchema);
