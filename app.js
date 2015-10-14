var util = require("util"), //i just love this one
    express = require('express'),
    app = express(),
    GameServer = require("./gameServer");
    //we will have to add session, db and other stuff here later
    

/*
    and here we will connect to db and init (also later, we still didn't cover mongodb)
    but for now we can prepare our code
*/

function init(){
    /*
        here we will define session and everything once we cover mongodb
    */
    
    app.use(express.static('public'));
    app.use(require("./routes"));
    
    var server = app.listen(3001, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('Example app listening at http://%s:%s', host, port);
    });
    
    var gameServer = new GameServer();
    gameServer.init(server);
}

init();