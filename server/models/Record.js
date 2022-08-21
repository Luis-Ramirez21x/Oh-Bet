const { Schema, model } = require("mongoose");

const recordSchema = new Schema({
    win:{
        type: Number
    },
    loss:{
        type: Number
    },
    live:{
        type: Number
    }   
  
    
  });

  const Record = model("Record", recordSchema);

  module.exports = Record;