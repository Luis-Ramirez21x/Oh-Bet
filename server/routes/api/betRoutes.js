const router = require('express').Router();
const { 
    createBet, 
    editBet, 
    deleteBet, 
    getSingleBet, 
    getAllBets, 
    getTossUpBets,
    getActiveBets,
    getCompletedBets,
    getUserBetRequests,
    getUserActiveBets} = require('../../controllers/betController');

// /api/bets
router.route('/').get(getAllBets).post(createBet).put(editBet).delete(deleteBet);
// /api/bets/singleBet
router.route('/singleBet').post(getSingleBet);
router.route('/tossUpBets').get(getTossUpBets);
router.route('/activeBets').get(getActiveBets);
router.route('/completedBets').get(getCompletedBets);
router.route('/pendingBets').post(getUserBetRequests);
router.route('/userActiveBets').post(getUserActiveBets);
module.exports = router;