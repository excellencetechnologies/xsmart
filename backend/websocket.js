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
            console.log(client);
            w.send(JSON.stringify({
              type: "device_online_check_reply",
              id: client.id,
              pins: client.pins,
              chip: client.chip,
              found: true,
              readyState: client.readyState
            }));
            found = true;
          }
        });
        if (!found) {
          w.send(JSON.stringify({
            type: "device_online_check_reply",
            found: false,
            chip: chip
          }));
        }

      } else if (obj.type === "device_pin_oper") {
        let chip = obj['chip'];
        let found = false;
        ws.clients.forEach(function each(client) {
          console.log(client.chip, chip)
          if (client.chip == chip) {
            client.send(JSON.stringify({
              type: obj['status'] == 0 ? 'LOW' : 'HIGH',
              pin: obj['pin']
            }));
            found = true;
          }
        });
        w.send(JSON.stringify({
          type: "device_pin_oper_reply",
          found: found,
          chip: chip
        }));
      }


    } catch (e) {
      console.log(e);
    }
  });
  w.on('close', function () {
    console.log('closing connection');
  });

});