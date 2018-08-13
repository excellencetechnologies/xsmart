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
        console.log("device ping", obj);
        var id = obj['WEBID'];
        w.id = id;
        w.pins = obj['PINS'];
        w.chip = obj['chip'];
        w.send(JSON.stringify({
          type: "OK",
          challenge: obj['challenge']
        }));
      } else if (obj.type === "device_online_check") {
        let chip = obj['chip'];
        let found = false;
        ws.clients.forEach(function each(client) {
          if (client.chip == chip) {
            w.send(JSON.stringify({
              type: "device_online_check_reply",
              id: client.id,
              pins: client.pins,
              chip: client.chip,
              found: true
            }));
            found = true;
            console.log(w);
          }
        });
        if (!found) {
          w.send(JSON.stringify({
            type: "device_online_check_reply",
            found: false,
            chip: chip
          }));
        }

      }

    } catch (e) {
      console.log(e);
    }
  });
  w.on('close', function () {
    console.log('closing connection');
  });

});