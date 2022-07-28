const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    admin:{
        type: Boolean,
        required:true,
    },
    username:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    password: {
      type: String,
      required: true,
      
    },
    bets:[
        {
        type:Schema.Types.ObjectId,
        ref:"Bet"
        }
    ]
  
    
  });

  // hash user password
userSchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("password")) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });

  const User = model("User", userSchema);

  module.exports = User;