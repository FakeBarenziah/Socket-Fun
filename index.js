/* eslint-disable no-path-concat */
var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

const os = require("os");
const ifaces = os.networkInterfaces();
const PORT = 4099;

const getIP = () => {
  const returnVal = [];
  Object.keys(ifaces).forEach(each => {
    ifaces[each].forEach(eachIface => {
      if (eachIface.family === "IPv4" && eachIface.internal === false) {
        returnVal.push(eachIface.address);
      }
    });
  });
  return returnVal[Math.floor(Math.random() * returnVal.length)];
};

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  socket.on("chat message", function(msg) {
    io.emit("chat message", msg);
  });
});

http.listen(PORT, function() {
  console.log(
    `Others on your network can access your page by navigating to http://${getIP()}:${PORT}`
  );
});
