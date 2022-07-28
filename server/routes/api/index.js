const router = require('express').Router();

//route var
const userRoutes = require('./userRoutes');
const betRoutes = require('./betRoutes');

//routes
router.use('/bets', betRoutes );
router.use('/users', userRoutes);

module.exports = router;