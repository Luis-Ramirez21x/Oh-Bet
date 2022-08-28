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
    getUserActiveBets,
    getRejectedBet,
    getSentRequests,
    getRecord,
    acceptBet} = require('../../controllers/betController');

// /api/bets
router.route('/').get(getAllBets).post(createBet).put(editBet);
// /api/bets/singleBet
router.route('/singleBet').post(getSingleBet);
router.route('/tossUpBets').get(getTossUpBets);
router.route('/activeBets').get(getActiveBets);
router.route('/completedBets').get(getCompletedBets);
router.route('/pendingBets').post(getUserBetRequests);
router.route('/userActiveBets').post(getUserActiveBets);
router.route('/rejectedBets').post(getRejectedBet);
router.route('/deleteBet').post(deleteBet);
router.route('/sentRequests').post(getSentRequests);
router.route('/getRecord').post(getRecord);
router.route('/acceptBet').post(acceptBet);
module.exports = router;