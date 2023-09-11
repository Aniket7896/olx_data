const express=require("express")
const app=express();
const cors=require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./Controller/user.routes");
const { classfiedRourter } = require("./Controller/classified.routes");
const { authentication } = require("./middleware/authentication.middleware");



app.use(express.json())
app.use(cors({
    origin:"*"
}))

app.get("/",(req,res)=>{
    res.send({msg:"this is base API url"})
})
app.use("/user",userRouter)

app.use(authentication)
app.use("/classified",classfiedRourter)

const PORT=process.env.PORT;
app.listen(PORT,async()=>{
   try {
     await connection;
     console.log(`server is listening on ${PORT}`);
   } catch (error) {
    console.log(error)
   }
})