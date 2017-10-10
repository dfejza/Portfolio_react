//Import the mongoose module
var mongoose = require("mongoose");

module.exports = function(server) {
  const io = require("socket.io")(server);
  // var userList = [];
  var userCount = 0;
  io.on("connection", socket => {
    console.log("a user connected");
    userCount++;
    // Fetch the chat
    var core = mongoose.connection.collection("chat");
    core.find().toArray(function(err, items) {
      socket.emit("chat log", items);
    });

    // // Userlist
    // socket.on('new user', (user) =>{
    //   userList.push(user);
    // });
    io.emit('user count', userCount);

    // Post to chat
    socket.on("chat updated", function(msg) {
      var postData = {
        time: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
        id: msg.id,
        msg: msg.msg
      };
      // Connect to the db
      var core = mongoose.connection.collection("chat");
      // Insert it into the db
      core.insert(postData, function(err, results) {
        if (err) throw err;
      });
      // emit the message to all connected clients
      io.emit("chat updated", postData);

    });

    socket.on("disconnect", function() {
      console.log("user disconnected");
      --userCount;
      io.emit("user count", userCount);
    });
  });
};
