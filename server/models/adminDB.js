const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    FirstName: {type:String, required:true, trim:true},
    LastName: {type:String, required:true, trim:true},
    PhoneNumber: {type:Number, required:true, trim:true},
    Address: {type:String, required:true, trim:true},
    Email: {type:String, required:true, trim:true},
    Password: {type:String, required:true, trim:true},
  },
  { timestamps: true },
);

module.exports = new mongoose.model("Admin", AdminSchema);
