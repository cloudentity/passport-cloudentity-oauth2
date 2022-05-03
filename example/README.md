## Sample node.js application that uses Cloudentity Passport.js Strategy

#### Create an Application in Cloudentity

Before using `@cloudentity/passport-cloudentity`, you must register an application with Cloudentity. If you have not already done so, a new [application can be created within Cloudentity](https://developer.cloudentity.com/howtos/applications/connecting_and_configuring_client_apps/). If you do not have an account, sign up for a free account at [Cloudentity](https://authz.cloudentity.io/register). Once an application is created, you will be issued a Client Identifier, Client secret , authorization server URL and callback URL which needs to be configured in the strategy as shown below. You will also need to configure a callback URL which matches the route in your application.

### Preparing the node.js application

In the root of the example folder add the authorization server URL, client ID, callback URL and optionally the client secret to .env. The client secret is not required if using PKCE. However, if not using PKCE client secret is required.

Install dependencies.

```bash
 npm install @cloudentity/passport-oauth2
```

### Run the application

```bash
 node app.js
```

Verify that you see in the console `Example available at http://localhost:3000` if you left the port in app.js at the default setting. Go to `http://localhost:3000` and verify that you can sign in and receive an access token. 