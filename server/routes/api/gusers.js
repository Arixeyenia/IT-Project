const express = require('express');
const router = express.Router();
const userModel = require('../../models/GUser');

var admin = require('firebase-admin');
const serviceAccount = require('../../config/quaranteam-290713-firebase-adminsdk-owv3x-ece36557e1');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://quaranteam-290713.firebaseio.com',
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
  verifyAccount(req, res);
});

verifyAccount = (req, res) => {
  const { query } = req;
  const { token } = query;
  const { user } = query;
  console.log('token from client__________________aaaaaaaaaaaa');
  console.log(token);

  userJson = JSON.parse(user);

  console.log('token from server__________________bbbbbbbbbbbbb');
  console.log(userJson.stsTokenManager.accessToken);

  //    console.log('userJson__________');
  //    console.log(userJson);

  admin
    .auth()
    .verifyIdToken(token)
    .then(function (decodedToken) {
      console.log(token);
      console.log('verify token from client above__________');
      console.log(userJson.stsTokenManager.accessToken);
      console.log('user token verified same??_____________');
      userModel.findOne({ googleId: userJson.uid }).then(function (user) {
        console.log('user found in DB__________');
        if (!user) {
          mUserModel = new userModel({
            name: userJson.displayName,
            email: userJson.email,
            googleId: userJson.uid,
          }).save();
        }
        res.json(token);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

module.exports = router;
