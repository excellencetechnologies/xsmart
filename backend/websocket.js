// server.js
// pm2 start websocket.js --name "xsmart"

var Server = require('ws').Server;
var port = process.env.PORT || 9030;
var ws = new Server({ port: port });

let devices = {};
let apps = {};

console.log("started");
ws.on('connection', function (w) {

  w.on('message', function (msg) {
    try {
      console.log('message from client', msg);
      let obj = JSON.parse(msg);
      if (obj.type === "device_ping") {
        console.log("device ping", obj);
        let offset = new Date().getTimezoneOffset();
        let time = new Date().getTime() + offset * 60 * 1000;
        if (!devices[chip])
          devices[chip] = {};

        devices[chip] = {
          id: obj["WEBID"],
          pins: obj['PINS'],
          chip: obj['chip'],
          time: time,
          w: w
        };

        w.send(JSON.stringify({
          type: "OK",
          challenge: obj['challenge']
        }));
      } else if (obj.type === "device_online_check") {
        let chip = obj['chip'];
        let device_id = obj['id'];
        if (!apps[chip]) {
          apps[chip] = [];
        }
        if (!apps.includes(device_id)) {
          apps.push(device_id);
        }

        devices.forEach( (device) => {
          console.log(device);
        })

        // ws.clients.forEach(function each(client) {
        //   if (client.chip == chip) {
        //     w.send(JSON.stringify({
        //       type: "device_online_check_reply",
        //       id: client.id,
        //       pins: client.pins,
        //       chip: client.chip,
        //       found: true,
        //       readyState: client.readyState,
        //       time: client.time
        //     }));
        //     found = true;
        //   }
        // });
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
        w.isApp = true;
        ws.clients.forEach(function each(client) {
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
      } else if (obj.type === "device_io_reply") {
        w.isDevice = true;
        let chip = obj['chip'];
        let pin = obj['pin'];
        let status = obj['status'];
        ws.clients.forEach(function each(client) {
          if (client.devices && client.devices.includes(chip)) {
            client.send(JSON.stringify({
              type: "device_io_notify",
              pin: pin,
              status: status,
              chip: chip
            }));
          }
        });
      }


    } catch (e) {
      console.log(msg);
      console.log(e);
    }
  });
  w.on('close', function () {
    console.log('closing connection');
  });

});