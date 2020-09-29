const express = require('express');
const router = express.Router();
const userModel = require('../../models/GUser');

var admin = require('firebase-admin');
const serviceAccount = require('../../config/quaranteam-290713-firebase-adminsdk-owv3x-ece36557e1');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'quaranteam-290713.firebaseio.com',
});

// @route   GET api/auth
// @desc    get user
// @access  Public
router.get('/getUser', async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Register/login user
// @access  Public
router.post('/verifyUser', (req, res, next) => {
  console.log('/api/auth/verifyUser is being called');
  const { user } = req.query;
  verifyAccount(req, function (callback) {
    //CHANGE: NEED TOKEN ID_TOKEN??
    token = JSON.parse(user).stsTokenManager.accessToken;
    res.json({ data: token });
  });
});

verifyAccount = (req, callback) => {
  return new Promise(function (resolve, reject) {
    const { query } = req;
    const { user } = query;

    userJson = JSON.parse(user);

    //    console.log('userJson__________');
    //    console.log(userJson);

    admin
      .auth()
      .verifyIdToken(userJson.stsTokenManager.accessToken)
      .then(function (decodedToken) {
        console.log('verify token__________');
        console.log('user token verified');
        userModel.findOne({ googleId: userJson.uid }).then(function (user) {
          console.log('user found in DB__________');
          if (!user) {
            mUserModel = new userModel({
              name: userJson.displayName,
              email: userJson.email,
              googleId: userJson.uid,
            })
              .save()
              .then(function (error, user) {
                //                console.log('saved user__________');
                if (error) {
                  reject({
                    code: 400,
                    success: false,
                    message: 'denied: rejected the user',
                    error: error,
                  });
                }
                resolve({
                  code: 200,
                  success: true,
                  message: 'confirmed: new user created',
                  user: user,
                });
              });
          } else {
            resolve({
              code: 200,
              success: true,
              message: 'confirmed: existing user',
              user: user,
            });
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  });
};

module.exports = router;