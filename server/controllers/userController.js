const {User, Bet} = require('../models');
const { signToken } = require('../utils/auth');


module.exports = {

    async createUser(req,res) {
        let {name, admin, username, password} = req.body

        try{
            const user = await User.create({
                "name":name,
                "admin": false,
                "username": username,
                "password": password
            })
            const token = signToken(user);
            res.status(200).json({user, token});
        } 
        catch(err){
            res.status(400).json(err);
        }
    },
    async login(req,res){
        try{
            const user = await User.findOne({username: req.body.username})
            if(!user){
                res.status(404).send('No account found with this username!');
            }

            const correctPW = await user.isCorrectPassword(req.body.password)
            if(!correctPW){
                res.status(403).send('Incorrect credentials');
            }

            const token = signToken(user);
            res.status(200).json({user, token});
        } 
        catch(err){
            res.status(400).json(err);
        }
    },
    async getAllUsers(req,res){
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    async getSingleUser(req,res){
        await User.findById({_id: req.body.userId}) 
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    }

}