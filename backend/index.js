const express=require("express");
const app=express();
app.use(express.json());

const Connection=require("./Config/db")


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