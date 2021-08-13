require('dotenv').config();
const express = require("express");
const twilioObj = require("./twilio");
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 3001;

app.post("/login", async(req, res)=>{
    const data = await twilioObj.sendVerify(req.body.to, req.body.channel);
    res.send(data);
 })

 app.post("/test", async(req, res)=>{
    const data = req.body;
    console.log(req);
    res.send(data);
 })
 
 app.post("/verify", async(req, res)=>{
     const data = await twilioObj.verifyCode(req.body.to, req.body.code);
     console.log(data.status);
     res.send(data);
  })

app.listen(PORT, ()=>{
    console.log(`LISTENING ON PORT ${PORT}`);
})