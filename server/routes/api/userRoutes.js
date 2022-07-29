const router = require('express').Router();
const { createUser, login } =require('../../controllers/userController');

//  /api/users
router.route('/').post(createUser);
router.route('/login').post(login);

module.exports = router;