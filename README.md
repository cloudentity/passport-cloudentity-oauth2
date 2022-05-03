# Passport strategy for Cloudentity OAuth 2.0

[Passport](http://passportjs.org/) strategies for authenticating with [Cloudentity](https://developer.cloudentity.com/)
using OAuth 2.0 & OIDC. [Cloudentity provides a world class FAPI certified multi tenant OAuth authorization server ](https://developer.cloudentity.com/get_started/cloudentity_overview/) that will meet all the needs of secure app development.

This module lets you authenticate using Cloudentity in your Node.js applications.
By plugging into Passport, Cloudentity OAuth authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

```bash
 npm install @cloudentity/passport-oauth2
```
## Usage

#### Create Application in Cloudentity
Before using `@cloudentity/passport-oauth2`, you need an [account with Cloudentity](https://developer.cloudentity.com/get_started/cloudentity_overview/). You can sign up for a free account at [Cloudentity](https://authz.cloudentity.io/register).

[Configure a client app](https://developer.cloudentity.com/howtos/applications/connecting_and_configuring_client_apps/).

#### Configure Strategy in Nodejs application

The Cloudentity OAuth 2.0 authentication strategy authenticates users using [Cloudentity](https://developer.cloudentity.com/get_started/cloudentity_overview/) that utilizes any of the underlying identity providers configured within the Cloudentity platform. Cloudentity platform issues OAuth & OIDC spec based access token and ID tokens to the nodejs application.  The strategy requires a `verify` callback, which accepts these credentials and calls `done` providing a user, as well as `options` specifying a client ID, client secret, authorization server URL, and callback URL.

```javascript
var CloudentityStrategy = require( 'passport-cloudentity' ).Strategy;

passport.use(new CloudentityStrategy({
    authServerURL: process.env.CLOUDENTITY_AUTH_SERVER,
    clientID: process.env.CLOUDENTITY_CLIENT_ID,
    clientSecret: process.env.CLOUDENTITY_CLIENT_SECRET,
    callbackURL: process.env.CLOUDENTITY_CALLBACK_URL,
    pcke: true,
    passReqToCallback   : true
  },
  function(req, accessToken, refreshToken, params, profile, done) {
    done(err, user);
  }
));
```

The `clientSecret` is required if not using PKCE and it is optional if using PKCE.

#### Authenticate Request in Nodejs application

To authenticate requests within this application, use the passport.authenticate() method within the Cloudentity strategy.

```javascript
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

A complete Express.js sample app  that utilizes Cloudentity strategy can be found here [Cloudentity OAuth 2.0 example](example).

## License

[The MIT License](http://opensource.org/licenses/MIT)

