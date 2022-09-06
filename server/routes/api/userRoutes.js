const router = require('express').Router();
const { createUser, login, getAllUsers, getSingleUser, getUserRankings, getUsersExcluseCurrent } =require('../../controllers/userController');

//  /api/users
router.route('/').get(getAllUsers).post(createUser);
router.route('/login').post(login);
router.route('/singleUser').post(getSingleUser)
router.route('/userRankings').get(getUserRankings);
router.route('/getUsersExcludeCurrent').post(getUsersExcluseCurrent);

module.exports = router;