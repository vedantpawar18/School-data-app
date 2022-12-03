const express=require("express");
const app=express();
var cors = require('cors')

app.use(express.json());
app.use(cors());

var logRouter=require("./Routes/Login.route");
var studentRouter=require("./Routes/Student.route")

const Connection=require("./Config/db")

app.use("/auth",logRouter);
app.use("/student",studentRouter);

app.get("/", (req,res)=>{
    res.send("Welcome to homepage");
});

app.listen(8080,async()=>{
    try{
        await Connection;
        console.log("port started at 8080");
    }
    catch(err){
        console.log(err)
    }
})