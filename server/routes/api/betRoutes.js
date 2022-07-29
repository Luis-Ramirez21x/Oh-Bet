const router = require('express').Router();
const { 
    createBet, 
    editBet, 
    deleteBet, 
    getSingleBet, 
    getAllBets } = require('../../controllers/betController');

// /api/bets
router.route('/').get(getAllBets).post(createBet).put(editBet).delete(deleteBet);
// /api/bets/singleBet
router.route('/singleBet').post(getSingleBet);

module.exports = router;