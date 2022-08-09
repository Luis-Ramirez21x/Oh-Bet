const router = require('express').Router();
const { createUser, login, getAllUsers } =require('../../controllers/userController');

//  /api/users
router.route('/').get(getAllUsers).post(createUser);
router.route('/login').post(login);

module.exports = router;