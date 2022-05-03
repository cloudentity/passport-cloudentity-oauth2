require('dotenv').config()
var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    passport = require('passport'),
    session = require('express-session'),
    app = express(),
    CloudentityStrategy = require('passport-cloudentity-oauth2');

/**
 * Configure `CloudentityStrategy` by setting the values in .env
 */
passport.use(new CloudentityStrategy({
    authServerURL: "<authorization server URL goes here>",
    clientID: "<client ID goes here>",
    clientSecret: "<client secret goes here>",
    callbackURL: "http://localhost:3000/callback",
    passReqToCallback: true
}, function(req, accessToken, refreshToken, params, profile, done) {
    var user = {
        accessToken: accessToken,
        idToken: params['id_token'],
        profile: profile
    }
    done(null, user);
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'asecret',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.authenticate('session'));

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/login', passport.authenticate('cloudentity', {
    session: true,
    successReturnToOrRedirect: '/',
    scope: ['email', 'profile', 'openid']
}));

app.get('/callback', passport.authenticate('cloudentity', {
    session: true,
    successRedirect: '/api/v1/',
    failureRedirect: '/'
}));

app.post('/logout', function(req, res) {
    req.session.destroy(() => {
        res.redirect('/');
    });

    req.logout();
});

app.get('/api/v1/', ensureLoggedIn, function(req, res) {
    res.render('index', { user: req.user });
})

function ensureLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

var port = 3000;

app.listen(port, () => {
    console.log(`Example available at http://localhost:${port}`);
})

module.exports = app