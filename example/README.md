## Sample node.js application that uses Cloudentity Passport.js Strategy

### Preparing the node.js application

In the root of the example folder add the authorization server URL, client ID, allback URL and optionally the client secret. The client secret is not required if using PKCE. However, if not using PKCE client secret is required.

Install dependencies.

```bash
 npm install
```

### Run the application

```bash
 node app.js
```

Verify that you see in the console `Example available at http://localhost:3000` if you left the port in app.js at the default setting. Go to `http://localhost:3000` and verify that you can sign in and receive an access token. 