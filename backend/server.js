require("dotenv").config();
const express = require("express");
const twilioObj = require("./twilio");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const socket = require("socket.io");

// Initialize the express
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize the server
const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 3001;

io.on("connection", (client) => {
  console.log("Socket on", client.id);
  client.on("disconnect", () => {
    console.log("Disconnected", client.id);
  });
});

app.post("/login", async (req, res) => {
  const data = await twilioObj.sendVerify(req.body.to, req.body.channel);
  res.send(data);
});

app.post("/test", async (req, res) => {
  const data = req.body;
  console.log(req);
  res.send(data);
});

app.post("/verify", async (req, res) => {
  const data = await twilioObj.verifyCode(req.body.to, req.body.code);
  console.log(data.status);
  res.send(data);
});

server.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`);
});
