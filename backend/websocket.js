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
        //this is basically the event which a device like esp32, 8266 
        // send every 1sec. this is ping from the device.
        console.log("device ping", obj);
        let chip = obj['chip'];
        let offset = new Date().getTimezoneOffset();
        let time = new Date().getTime() + offset * 60 * 1000;
        if (!devices[chip])
          devices[chip] = {};

        devices[chip] = {
          id: obj["WEBID"],
          pins: obj['PINS'],
          chip: obj['chip'],
          time: time
        };
        w.chip = chip;

        w.send(JSON.stringify({
          type: "OK"
        }));

        if (apps[chip]) {
          apps[chip].forEach((app) => {

            ws.clients.forEach((client) => {
              if (client.app_id && client.app_id == app) {
                console.log(devices[chip]);
                client.send(JSON.stringify({
                  type: "device_online_check_reply",
                  id: devices[chip].id,
                  pins: devices[chip].pins,
                  status: devices[chip].status,
                  chip: devices[chip].chip,
                  time: devices[chip].time,
                  found: true
                }));
              }
            });
          });
        }


      } else if (obj.type === "device_online_check") {
        // this is a pint from mobile apps or web app every 5sec
        // to check if there devices are online.
        let chip = obj['chip'];
        let app_id = obj['app_id'];
        w.app_id = app_id;
        if (!apps[chip]) {
          apps[chip] = [];
        }
        if (!apps[chip].includes(app_id)) {
          apps[chip].push(app_id);
        }
        let found = false;

        Object.keys(devices).forEach((c) => {
          if (c === chip) {

            w.send(JSON.stringify({
              type: "device_online_check_reply",
              id: devices[c].id,
              pins: devices[c].pins,
              chip: devices[c].chip,
              found: true,
              time: devices[c].time
            }));
            found = true;

          }
        })


        if (!found) {
          w.send(JSON.stringify({
            type: "device_online_check_reply",
            found: false,
            chip: chip
          }));
        }

      } else if (obj.type === "device_pin_oper") {
        // this is when a mobile app, web app is doing a pin operation like on/off
        let chip = obj['chip'];
        let app_id = obj['app_id'];
        w.app_id = app_id;
        let found = false;
        ws.clients.forEach((client) => {
          if (client.chip && client.chip === chip) {
            client.send(JSON.stringify({
              type: obj['status'] == 0 ? 'LOW' : 'HIGH',
              pin: obj['pin']
            }));
            found = true;
            //experimental feature
            devices[chip].interval = setTimeout(() => {
              client.send(JSON.stringify({
                type: obj['status'] == 0 ? 'LOW' : 'HIGH',
                pin: obj['pin']
              }));
            }, 2000);
          }
        });
        w.send(JSON.stringify({
          type: "device_pin_oper_reply",
          found: found,
          chip: chip
        }));
      } else if (obj.type === "device_io_reply") {
        // this is when a device send back reply after a sucessfuly i/o operation
        let chip = obj['chip'];
        let pin = obj['pin'];
        let status = obj['status'];
        if (devices[chip].interval) {
          clearTimeout(devices[chip].interval);
        }
        w.chip = chip;
        if (apps[chip]) {
          apps[chip].forEach((app) => {
            ws.clients.forEach((client) => {
              if (client.app_id && client.app_id == app) {
                client.send(JSON.stringify({
                  type: "device_io_notify",
                  pin: pin,
                  status: status,
                  chip: chip
                }));
              }
            });
          });

        }
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