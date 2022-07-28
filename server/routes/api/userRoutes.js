const router = require('express').Router();
const { createUser } =require('../../controllers/userController');

//  /api/users
router.route('/').post(createUser);

module.exports = router;