const {User, Bet, Record} = require('../models');
const { populate } = require('../models/User');

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
        const { _id ,sender, receiver, winner, condition, reward, paidOut,approved} = req.body;
        await Bet.findByIdAndUpdate(
            {_id: _id},
            {   approved:approved,
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
            .populate('winner')
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
    }, 
    async getUserBetRequests(req,res){
        try{
            const user =await User.findById({_id: req.body.userId}).populate({
                path: 'betsPending',
                populate:'sender'
            });
            
            let requests = []
            let betsPending = user.betsPending;
            for(i=0; i<betsPending.length; i++){
                if((JSON.stringify(betsPending[i].sender._id) !== JSON.stringify(user._id)) && betsPending[i].approved === false){
                    requests.push(betsPending[i]);
                }
            }
            res.status(200).json(requests);
        }catch(err){
            res.status(400).json(err);
        }        
    },
    async getUserActiveBets(req,res){' '
        try{
            
            const bets = await Bet.find({receiver : {$ne:null}, winner: null, approved:true})
                    .populate('sender')
                    .populate('receiver')
            let activeBets =[];

            for(i=0; i< bets.length;i++){
                if((JSON.stringify(bets[i].sender._id) === JSON.stringify(req.body.userId)) ||(JSON.stringify(bets[i].receiver._id) === JSON.stringify(req.body.userId) )){
                    activeBets.push(bets[i]);
                }
            }
            
            res.status(200).json(bets);

        }catch(err){
            res.status(400).json(err);
        }
    },
    async getRejectedBet(req,res){
        try{
            const bets = await Bet.find({sender : req.body.userId, winner: null, approved:null}).populate('receiver')
            res.status(200).json(bets);
        }catch(err){
            res.status(400).json(err);
        }
        
    },
    async getSentRequests(req,res){
        try{
            const sentReq = await Bet.find({sender : req.body.userId, winner: null, approved: false}).populate('receiver')
            res.status(200).json(sentReq);
        }catch(err){
            res.status(400).json(err);
        }
            
    },
    async getRecord(req,res){

        try{

            const user = await User.findById({_id: req.body.userId}).populate('record');

            res.status(200).json(user.record);

        }catch(err){
            res.status(400).json(err);
        }

    },
    async acceptBet(req,res){
        
        try{

            const bet = await Bet.findByIdAndUpdate(
                {_id: req.body._id},
                {   
                    approved: true
                },
                { new: true})
            
                //updating 
            const sendingUser = await User.findById({"_id": req.body.sender}).populate("record");
            const sendingRecord = await Record.findByIdAndUpdate(
                {"_id": sendingUser.record._id},
                {
                    "live": sendingUser.record.live + 1
                }
            )

            const recievingUser = await User.findById({"_id": req.body.receiver}).populate("record");
            const recievingRecord = await Record.findByIdAndUpdate(
                {"_id": recievingUser.record._id},
                {
                    "live": recievingUser.record.live + 1
                }
            )

            res.status(200).json(bet);

        }catch(err){
            res.status(400).json(err);
        }
    },
    async declareWinner(req,res){
        try{
            
            const bet = await Bet.findByIdAndUpdate(
                {_id: req.body._id},
                {   
                    "winner": req.body.winner
                },
                { new: true})
            
            const sendingUser = await User.findById({"_id": req.body.sender}).populate("record");
            const recievingUser = await User.findById({"_id": req.body.receiver}).populate("record");

            if(JSON.stringify(sendingUser._id) === JSON.stringify(req.body.winner)){
                const sendingRecord = await Record.findByIdAndUpdate(
                    {"_id": sendingUser.record._id},
                    {
                        "win": sendingUser.record.win + 1,
                        "live": sendingUser.record.live - 1
                    }
                )
                const recievingRecord = await Record.findByIdAndUpdate(
                    {"_id": recievingUser.record._id},
                    {
                        "live": recievingUser.record.live - 1,
                        "loss": recievingUser.record.loss + 1
                    }
                )
            }else{
                const sendingRecord = await Record.findByIdAndUpdate(
                    {"_id": sendingUser.record._id},
                    {
                        "loss": sendingUser.record.loss + 1,
                        "live": sendingUser.record.live - 1
                    }
                )
                const recievingRecord = await Record.findByIdAndUpdate(
                    {"_id": recievingUser.record._id},
                    {
                        "win": recievingUser.record.win + 1,
                        "live": recievingUser.record.live - 1,
                    }
                )
            }

            res.status(200).json(bet);

        }catch(err){
            res.status(400).json(err);
        }
    },
    async getCurrentUsersBetHistory(req,res){
        try{

            let bets = await Bet.find({
                $or:[
                    {
                        sender: req.body.userId
                    },
                    {
                        receiver: req.body.userId
                    }
                ],
                $and: [
                    
                    {
                        approved: true
                    },

                ]
            }).populate('sender').populate('receiver')

            for(i=0; i<bets.length ;i++){
                if(bets[i].winner == null){
                    bets.splice(i,1);
                }
            }



            res.status(200).json(bets);
        }catch(err){
            res.status(400).json(err);
        }
    },
    async getUnpaidBetCount(req,res){
        try{

            let bets = await Bet.find({
                $or:[
                    {
                        sender: req.body.userId
                    },
                    {
                        receiver: req.body.userId
                    }
                ],
                $and: [
                    
                    {
                        approved: true
                    },
                    {
                        paidOut: false
                    }
                ]
            })

            for(i=0; i<bets.length ;i++){
                if(bets[i].winner == null){
                    bets.splice(i,1);
                }
            }

            res.status(200).json(bets.length);
        }catch(err){
            res.status(400).json(err);
        }
    }

}