const express = require("express");
const { protocol } = require("socket.io-parser");
const app = express();
const path = require("path");
const socketio = require("socket.io");

//setting
app.set("port", 3000 || process.env.PORT);
//Static files
const elpath = path.join(__dirname, "public");
app.use(express.static(elpath));

const server = app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});

const io = socketio(server);

//websockets

io.on("connection", (socket) => {
  console.log("new connection", socket.id);
  socket.on("chat:message", (data) => {
    io.sockets.emit("chat:message", data);
  });

  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data);
  });
});
