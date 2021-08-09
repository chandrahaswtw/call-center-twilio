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

app.get("/login", async(req, res)=>{
    const data = await twilioObj.sendVerify("+919962533422", "sms");
    res.send(data);
 })
 
 app.get("/verify", async(req, res)=>{
     const data = await twilioObj.verifyCode("+919962533422", req.query.code);
     res.send(data);
  })

app.listen(PORT, ()=>{
    console.log(`LISTENING ON PORT ${PORT}`);
})