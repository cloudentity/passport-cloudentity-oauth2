# Passport strategy for Cloudentity OAuth 2.0

[Passport](http://passportjs.org/) strategy for authenticating with [Cloudentity](https://developer.cloudentity.com/)
using OAuth 2.0 & OIDC specifications. [Cloudentity provides a world class FAPI certified multi tenant OAuth authorization server ](https://developer.cloudentity.com/get_started/cloudentity_overview/) that will allow developers to create secure applications.

This module lets you authenticate using Cloudentity in your Node.js applications. By plugging into Passport, Cloudentity OAuth authentication can be easily and unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including [Express](http://expressjs.com/).

## Install

```bash
npm install @cloudentity/passport-oauth2
```

## Usage

#### Create an Application in Cloudentity

Before using `passport-cloudentity`, you must register an application with Cloudentity. If you have not already done so, a new [application can be created within Cloudentity](https://developer.cloudentity.com/howtos/applications/connecting_and_configuring_client_apps/). If you do not have an account, sign up for a free account at [Cloudentity](https://authz.cloudentity.io/register). Once an application is created, you will be issued a Client Identifier, Client secret , authorization server URL and callback URL which needs to be configured in the strategy as shown below. You will also need to configure a callback URL which matches the route in your application.

#### Configure Strategy in Nodejs application

The Cloudentity OAuth 2.0 authentication strategy authenticates users using [Cloudentity](https://developer.cloudentity.com/get_started/cloudentity_overview/) that utilizes any of the underlying identity providers configured within the Cloudentity platform. Cloudentity platform issues OAuth & OIDC spec based access token and ID tokens to the Nodejs application.  The strategy requires a `verify` callback, which accepts these credentials and calls `done` providing a user, as well as `options` specifying a client ID, client secret, authorization server URL, and callback URL.

Note that `clientSecret` is not required in below configuration, if [PKCE flow](https://datatracker.ietf.org/doc/html/rfc7636) is utilized and is set to true.

```javascript
var CloudentityStrategy = require('@cloudentity/passport-oauth2');

passport.use(new CloudentityStrategy({
    authServerURL: process.env.CLOUDENTITY_AUTH_SERVER,
    clientID: process.env.CLOUDENTITY_CLIENT_ID,
    clientSecret: process.env.CLOUDENTITY_CLIENT_SECRET,
    callbackURL: process.env.CLOUDENTITY_CALLBACK_URL,
    pkce: true,
    passReqToCallback   : true
  },
  function(req, accessToken, refreshToken, params, profile, done) {
    done(err, user);
  }
));
```

#### Authenticate Request in Nodejs application

To authenticate requests within this application, use the `passport.authenticate()` method specifying the `cloudentity` strategy.

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

Developers using the popular Express web framework can refer to the [Express.js sample app](example)  that utilizes `cloudentity` strategy as a starting point for their own web applications.

## License

[The MIT License](http://opensource.org/licenses/MIT)

