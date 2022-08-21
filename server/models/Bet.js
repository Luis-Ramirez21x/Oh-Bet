const { Schema, model } = require("mongoose");

const betSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref:"User",
      
    },
    receiver:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required: false,
        default:null
    },
    approved:{
        type: Boolean,
        required: true
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

  const Bet = model("Bet", betSchema);

  module.exports = Bet;