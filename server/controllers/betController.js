const {User, Bet} = require('../models');
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

        const user = JSON.stringify(req.body.userId);

        try{

            const bets = await Bet.find({
                $or:[{
                sender:req.body.userId
            },
            {
                receiver: req.body.userId
            }]})

            //logic for W/L
            let record = {win:0, loss:0, live:0};

            for(i=0; i<bets.length; i++){
                let winner = bets[i].winner;
                
                if( JSON.stringify(winner) === user){
                    record.win ++;
                }else if( winner == null && bets[i].approved){
                    record.live++;
                }else if(winner != null ){
                    record.loss++;
                }
            }
            

            res.status(200).json(record);

        }catch(err){
            res.status(400).json(err);
        }

    }   

}