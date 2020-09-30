const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const userModel = require('../../models/GUser');

// var admin = require('firebase-admin');
// const serviceAccount = require('../../config/quaranteam-290713-firebase-adminsdk-owv3x-ece36557e1');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://quaranteam-290713.firebaseio.com',
// });

// @route   GET api/auth
// @desc    get user
// @access  Public
// router.get('/getUser', async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// @route   POST api/auth
// @desc    Register/login user
// @access  Public
router.post('/verifyUser', auth, async (req, res, next) => {
  userModel.findOne({ googleId: req.user.uid }).then(function (user) {
    if (!user) {
      mUserModel = new userModel({
        name: req.user.name,
        email: req.user.email,
        googleId: req.user.uid,
      }).save();
    }
  });
  const token = req.header('x-auth-token');
  res.json({ token });
});

module.exports = router;

// verifyAccount = (req) => {
//   const { query } = req;
//   const { token } = query;
//   const { user } = query;

//   userJson = JSON.parse(user);

//   admin
//     .auth()
//     .verifyIdToken(token)
//     .then(function (decodedToken) {
//       console.log('decoded token__________________________');
//       console.log(decodedToken);
//       userModel.findOne({ googleId: userJson.uid }).then(function (user) {
//         if (!user) {
//           mUserModel = new userModel({
//             name: userJson.displayName,
//             email: userJson.email,
//             googleId: userJson.uid,
//           }).save();
//         }
//       });
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };
