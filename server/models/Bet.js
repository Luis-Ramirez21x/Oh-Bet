const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    user1: {
        type: Schema.Types.ObjectId,
        ref:"User",
      
    },
    user2:{
        type: Schema.Types.ObjectId,
        ref:"User",
    },
    winner:{
        type: Schema.Types.ObjectId,
        ref:"User",
    },
    condition: {
      type: String,
      required: true,
      
    },
    reward:{
        type: String,
        required: true
    },
    paidOut:{
        type: Boolean,
        required: true
    }
  
    
  });

  const Bet = model("Bet", userSchema);

  module.exports = Bet;