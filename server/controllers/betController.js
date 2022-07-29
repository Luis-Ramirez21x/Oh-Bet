const {User, Bet} = require('../models');

module.exports = {

    async createBet(req,res) {
        await Bet.create(req.body)
            .then((bet) => res.json(bet))
            .catch((err) => res.status(500).json(err));
    },
    async editBet(req,res){
        const { betId ,user1, user2, winner, condition, reward, paidOut} = req.body;
        await Bet.findByIdAndUpdate(
            {_id: betId},
            {
                user1: user1,
                user2: user2,
                winner: winner,
                condition: condition,
                reward: reward,
                paidOut: paidOut

            },
            { new: true}
        ).then((bet) => res.json(bet))
        .catch((err) => res.status(500).json(err));

    },
    async deleteBet(req,res){
       await Bet.findByIdAndDelete({_id: req.body.betId})
            .then((response) => res.json(response))
            .catch((err) => res.status(500).json(err));
    },
    async getAllBets(req,res){
        Bet.find()
            .then((bets) => res.json(bets))
            .catch((err) => res.status(500).json(err));
    },
    async getSingleBet(req,res){
        await Bet.findById({_id: req.body.betId}) 
            .then((bet) => res.json(bet))
            .catch((err) => res.status(500).json(err));
    }

}