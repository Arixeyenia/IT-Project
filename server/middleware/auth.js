var admin = require('firebase-admin');
const serviceAccount = require('../config/quaranteam-290713-firebase-adminsdk-owv3x-ece36557e1');

//initialize firebase admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://quaranteam-290713.firebaseio.com',
});

//export auth
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  // console.log('here is google id token____________________________________');
  // console.log(token);

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  //verify token and decode token to get user info
  admin
    .auth()
    .verifyIdToken(token)
    .then(function (decodedToken) {
      //now req.user has {name: 'xxx', uid:'xxx', picture:'httpxxxxx', email:'xxx', iss:'xxx'...........}
      req.user = decodedToken;
      next();
    })
    .catch(function (error) {
      console.log(error);
    });
};
