import React, { useEffect } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import socket from "./utils/socket";

function App() {
  useEffect(() => {
    socket.on("connection", () => {
      console.log("connected");
    });
  }, []);

  return (
    <div>
      <Login></Login>
    </div>
  );
}

export default App;
