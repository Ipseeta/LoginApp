const User = require('../models/user'),
    SHA256 = require('crypto-js/sha256');
/**
 * Signup will check the existing user, or will create a new one.
 */
exports.signup = function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    User.count({
        username: username
    }, function (err, count) {
        if (count > 0) {
            return res.status(403).end();
        }
        new User({
            username: username,
            password: SHA256(password),
            email: email,
            firstName: firstName,
            lastName: lastName
        }).save(function (err, user) {
            req.login(user, () => {
                res.redirect('/');
            });
        });
    });
}

/**
 * updateUser will update the existing user, or will create a new one.
 */
exports.updateUser = function (req, res) {

    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    User.updateOne({ _id: req.params.id }, { $set: {email: email, firstName: firstName, lastName: lastName}}).exec(function(err, user){
        if(err) {
            return res.status(403).end();
        }
        res.status(200).end();
     });
}