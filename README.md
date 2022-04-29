# Passport strategy for Cloudentity OAuth 2.0

[Passport](http://passportjs.org/) strategies for authenticating with [Cloudentity](https://cloudentity.com/)
using ONLY OAuth 2.0.

This module lets you authenticate using Cloudentity Authorization Control Plane in your Node.js applications.
By plugging into Passport, Cloudentity authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install @cloudentity/passport-oauth2

## Usage

#### Create an Application
Before using `passport-cloudentity-oauth2`, you need an account with Cloudentity. You can sign up for a free account at [Cloudentity](https://authz.cloudentity.io/register).
After you have an account [sign in](https://authz.cloudentity.io/), choose or create a workspace and then create a client application. Once you have
created an application you will need the client secret and client ID which can be found your application overview. Next, you will need to add a callback URI to your application which can be created in your application overview. Finally, you will need your authorization server URL which can be found under `Auth Settings->OAuth`. More detailed instructions can be found at [Creating and Configuring Applications](https://docs.authorization.cloudentity.com/guides/developer/protect/application/create_app/?q=create).

#### Configure Strategy

The Cloudentity OAuth 2.0 authentication strategy authenticates users using a [Cloudentity
account](https://authz.cloudentity.io/register) and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which
accepts these credentials and calls `done` providing a user, as well as
`options` specifying a client ID, client secret, authorization server URL, and callback URL.

```Javascript
var CloudentityStrategy = require( 'passport-cloudentity' ).Strategy;

passport.use(new GoogleStrategy({
    authServerURL: process.env.CLOUDENTITY_AUTH_SERVER,
    clientID: process.env.CLOUDENTITY_CLIENT_ID,
    clientSecret: process.env.CLOUDENTITY_CLIENT_SECRET,
    callbackURL: process.env.CLOUDENTITY_CALLBACK_URL,
    passReqToCallback   : true
  },
  function(req, accessToken, refreshToken, params, profile, done) {
    done(err, user);
  }
));
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'cloudentity'` strategy, to
authenticate requests.

```Javascript
app.get('/login',
  passport.authenticate('cloudentity', { 
    session: true,
    successReturnToOrRedirect: '/',
    scope: ['email', 'profile', 'openid']
  }
));

app.get( '/callback',
	passport.authenticate('cloudentity', {
		successRedirect: '/api/v1',
		failureRedirect: '/'
}));
```

## Examples

A complete Express.js sample app can be found at [OAuth 2.0 example](example).

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

