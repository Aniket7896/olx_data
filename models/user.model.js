const mongoose=require("mongoose")

const userShema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel=mongoose.model("user",userShema)
module.exports={UserModel}
