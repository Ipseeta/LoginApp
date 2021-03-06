const express = require('express'),
    router = express.Router(),
    UserController = require('../controllers/user.controller'),
    LocalStrategy = require('passport-local').Strategy,
    SHA256 = require('crypto-js/sha256'),
    User = require('../models/user');

module.exports = function (passport) {

    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
        },
        function (username, password, done) {
            User.findOne({
                username: username
            }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                if (SHA256(password).toString() !== user.password) {
                    return done(null, false);
                }

                user.password = ''; // unset password so that it's not accidentally leaked anywhere. Note: Password has been hashed already.
                return done(null, user);
            });
        }
    ));
    /**
     * Stores data of the user object in the session
     */
    passport.serializeUser(function (user, cb) {
        cb(null, user.id);
    });
    /**
     * Fetches user using the key id and stores as req.user
     */
    passport.deserializeUser(function (id, cb) {
        User.findById(id, function (err, user) {
            if (err) {
                return cb(err);
            }
            if (user) {
                user.password = '';
            }
            cb(null, user);
        });
    });
    /**
     * Loads signup page for non-loggedin user
     */
    router.get('/signup', function (req, res) {
        if (req.user) {
            return res.redirect('/user');
        }
        res.render('signup.ejs');
    });
    /**
     * Loads startup page for login App
     */
    router.get('/', function (req, res) {
        if (req.user) {
            return res.redirect('/user');
        }
        res.redirect('/signin');
    });

    /**
     * Loads user page
     */
    router.get('/user', function (req, res) {
        if (req.user) {
            return res.render('user.ejs', {
                user: req.user
            });
        }
        res.redirect('/signin');
    });

    /**
     * Loads signin page for non-loggedin user
     */
    router.get('/signin', function (req, res) {
        if (req.user) {
            return res.redirect('/user');
        }
        res.render('signin.ejs', {
            invalidCredentials: !!req.query['invalid_credentials']
        });
    });
    /**
     * Signups an user
     */
    router.route('/signup').post(UserController.signup);

    /**
     * Verifies username and password, if fails then redirects to /signin else takes to home page
     */
    router.post('/signin', passport.authenticate('local', {
        failureRedirect: '/signin?invalid_credentials=true'
    }), function (req, res) {
        res.redirect('/user');
    });
    /**
     * Update an user
     */
    router.route('/user/:id').put(UserController.updateUser);

    /**
     * Logout user
     */
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/signin');
    });

    return router;
};