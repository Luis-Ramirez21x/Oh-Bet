const {User, Bet} = require('../models');

module.exports = {

    async createBet(req,res) {
        const {sender, receiver} = req.body; 
        
        try{
             const newBet = await Bet.create(req.body);

             await User.findByIdAndUpdate(
                {_id:sender},
                {$addToSet:{ betsPending: newBet._id}}
             );
             if(receiver){
             await User.findByIdAndUpdate(
                {_id:receiver},
                {$addToSet:{ betsPending: newBet._id}}
             );
             }
             res.status(200).json(newBet);

        }catch(err){
            res.status(400).json(err);
        }
    },
    async editBet(req,res){
        const { betId ,sender, receiver, winner, condition, reward, paidOut} = req.body;
        await Bet.findByIdAndUpdate(
            {_id: betId},
            {
                sender: sender,
                receiver: receiver,
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
            .populate('sender')
            .populate('receiver')
            .then((bets) => res.json(bets))
            .catch((err) => res.status(500).json(err));
    },
    async getSingleBet(req,res){
        await Bet.findById({_id: req.body.betId}) 
            .populate('sender')
            .populate('receiver')
            .then((bet) => res.json(bet))
            .catch((err) => res.status(500).json(err));
    },
    async getTossUpBets(req,res){
        await Bet.find({receiver:null})
            .populate('sender')
            .then((bet) => res.json(bet))
            .catch((err) => res.status(500).json(err));
    },
    async getActiveBets(req,res){
        await Bet.find({receiver : {$ne:null}, winner: null})
            .populate('sender')
            .populate('receiver')
            .then((bet) => res.json(bet))
            .catch((err) => res.status(500).json(err));
    },
    async getCompletedBets(req,res){
        await Bet.find({winner: {$ne:null}})
            .populate('sender')
            .populate('receiver')
            .then((bet) => res.json(bet))
            .catch((err) => res.status(500).json(err));
    }

}