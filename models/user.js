const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const userSchema = mongoose.Schema({

      image : String,
      email : String,
      name : String 
})


module.exports  =mongoose.model('user', userSchema);