module.exports = {
    
    'facebookAuth' : {
        'clientID'      : process.env.clientIDFb, // your App ID
        'clientSecret'  : process.env.clientSecretFb, // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
    }

    // 'googleAuth' : {
    //     'clientID'      : 'your-secret-clientID-here',
    //     'clientSecret'  : 'your-client-secret-here',
    //     'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    // }
    };