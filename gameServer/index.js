var io = require("socket.io")();


var GameServer = function(){
    var self = this;
}

var pt = GameServer.prototype;

pt.init = function(pServer){
    var self = this;
    io.listen(pServer);
    io.on("connection", function(pSocket){
        console.log("socket connected");
    });
}

module.exports = GameServer;