// server.js
// pm2 start websocket.js --name "xsmart"

var Server = require('ws').Server;
var port = process.env.PORT || 9030;
var ws = new Server({ port: port });

console.log("started");
ws.on('connection', function (w) {
  
  w.on('message', function (msg) {
    try {
      console.log('message from client', msg);
      let obj = JSON.parse(msg);
      if (obj.type === "device_ping") {
        console.log("device ping" , obj);
        var id = obj['WEBID'];
        w.id = id;
        w.pins = obj['PINS'];
        w.pins_status = obj['PINS_STATUS'];
        w.chip = obj['chip'];
        w.send(JSON.stringify({
          type: "OK",
          challenge: obj['challenge']
        }));
      }else if(obj.type === "device_online_check"){
        let chip = obj['chip'];
        let found = false;
        ws.clients.forEach(function each(client) {
          if (client.chip == chip) {
            w.send(JSON.stringify({
              id: client.id,
              pins: client.pins,
              pins_status: client.pins_status,
              chip: client.chip
            }));
            found = true;
          }
        });
        if(!found){
          w.send("");
        }
        
      }
      // else if (msg.indexOf("CLIENTS") >= 0) {
      //   console.log("getting list of clients");
      //   var clients = [];
      //   ws.clients.forEach(function each(client) {
      //     if (client.id) {
      //       console.log('Client.ID: ' + client.id);
      //       clients.push({
      //         id: client.id,
      //         pins: client.pins,
      //         pins_status: client.pins_status
      //       });
      //     }
      //   });
      //   w.send(JSON.stringify(clients));
      // } else if (msg.indexOf("PING") >= 0) {
      //   var obj = JSON.parse(msg);
      //   console.log("got ping");
      //   var deviceid = obj['id'];
      //   var type = obj['type'];
      //   var pin = obj['pin'];
      //   var found = false;
      //   ws.clients.forEach(function each(client) {
      //     console.log(client.id + "XXXX" + deviceid);
      //     if (client.id == deviceid) {
      //       console.log('device found with id ' + deviceid);
      //       client.send(JSON.stringify({
      //         type: type,
      //         pin: pin
      //       }));
      //       found = true;
      //     }
      //   });
      //   if (found) {
      //     w.send("OK");
      //   } else {
      //     console.log("device not found with id " + deviceid);
      //     w.send("NOK");
      //   }
      // } else {
      //   console.log("invalid mmsg");
      // }
    } catch (e) {
      console.log(e);
    }
  });
  w.on('close', function () {
    console.log('closing connection');
  });

});