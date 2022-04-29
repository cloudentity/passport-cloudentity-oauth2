// Load modules.
var OAuth2Strategy = require('passport-oauth2'),
    util = require('util'),
    Profile = require('./profile/profile'),
    InternalOAuthError = require('passport-oauth2').InternalOAuthError,
    UserInfoError = require('./errors/userinfoerror');

/**
 * `Strategy` constructor.
 * 
 * The Cloudentity authentication strategy authenticates requests by delegating to
 * Cloudentity using the OAuth 2.0 protocol.
 * 
 * Options:
 *   - `
 *   - `authServerURL`     URL of the authorization server
 *   - `clientID`          identifies client to service provider
 *   - `clientSecret`      secret used to establish ownership of the client identifer
 *   - `callbackURL`       URL to which the service provider will redirect the user after obtaining authorization
 * 
 * Examples:
 * 
 *  passport.use(new CloudentityStrategy({
 *      clientID: 'my-client-id',
 *      clientSecret: 'my-secret',
 *      callbackURL: 'https://www.example.com/callback',
 *      authServerURL: '`https://cloudentity-mytenant.us.authz.cloudentity.io/cloudentity-mytenant/my-example-app
 *     },
 *      function(accessToken, refreshToken, profile, cb) {
 *          User.findOrCreate(..., function (err, user) {
 *              cb(err, user)
 *          });
 *      }
 *  ))
 * 
 * @constructor
 * @param {Object} options
 * @param {Function} verify
 * @access public
 */
function Strategy(options, verify) {
    options = options || {}

    if (!verify) {
        throw new TypeError('CloudentityStrategy requires a verify callback')
    }
    if (!options.authServerURL) { throw new TypeError('CloudentityStrategy requires an authorization URL option') }
    if (!options.clientID) { throw new TypeError('CloudentityStrategy requires a client ID option') }
    if (!options.callbackURL) { throw new TypeError('CloudentityStrategy requires an callback URL option') }
    if (!options.clientSecret && !options.pkce) { throw new TypeError('CloudentityStrategy requires a client secret URL option when not using pkce') }
    if (options.pkce && !options.state) { throw new TypeError("CloudentityStrategy requires requires state when using pkce") }


    options.authorizationURL = options.authServerURL + '/oauth2/authorize'
    options.tokenURL = options.authServerURL + '/oauth2/token'

    OAuth2Strategy.call(this, options, verify);
    this.name = 'cloudentity'
    this._clientSecret = options.clientSecret
    this._userProfileURL = options.authServerURL + '/userinfo'
}

// Inherit from `OAuth2Strategy`.
util.inherits(Strategy, OAuth2Strategy);

/**
 * Authenticate request by delegating to Cloudentity using OAuth 2.0.
 * 
 * @param {Object} req 
 * @param {Object} options
 * @access protected 
 */
Strategy.prototype.authenticate = function(req, options) {
    options.loginHint = req.query.login_hint
    OAuth2Strategy.prototype.authenticate.call(this, req, options);
}

/**
 * Return extra Cloudentity-specific parameters to be included in the authorization
 * request.
 *
 * @param {Object} options
 * @return {Object}
 * @api protected
 */
Strategy.prototype.authorizationParams = function(options) {
    var params = {};
    if (options.loginHint) {
        params['login_hint'] = options.loginHint;
    }

    return params;
};

/**
 * Retrieve user profile.
 *
 * @param {string} accessToken
 * @param {function} done
 * @access protected
 */
Strategy.prototype.userProfile = function(accessToken, done) {
    var self = this;
    this._oauth2.get(this._userProfileURL, accessToken, function(err, body, res) {
        var json;

        if (err) {
            if (err.data) {
                try {
                    json = JSON.parse(err.data);
                } catch (_) {}
            }

            if (json && json.error && json.error_description) {
                return done(new UserInfoError(json.error_description, json.error));
            }
            return done(new InternalOAuthError('Failed to fetch user profile', err));
        }

        try {
            json = JSON.parse(body);
        } catch (ex) {
            return done(new Error('Failed to parse user profile'));
        }

        var profile = Profile.parse(json);

        profile._raw = body;
        profile._json = json;

        done(null, profile);
    });
}

// Expose constructor.
module.exports = Strategy;