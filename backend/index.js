const express=require("express");
const app=express();
app.use(express.json());


app.get("/", (req,res)=>{
    res.send("Welcome to homepage");
});

app.listen(8080,()=>{
    console.log("port started at 8080")
})