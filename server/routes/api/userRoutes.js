const router = require('express').Router();
const { createUser, login, getAllUsers, getSingleUser } =require('../../controllers/userController');

//  /api/users
router.route('/').get(getAllUsers).post(createUser);
router.route('/login').post(login);
router.route('/singleUser').post(getSingleUser)
module.exports = router;