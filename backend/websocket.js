// server.js
// pm2 start websocket.js --name "xsmart"
var express = require("express");
var WebSocket = require("ws");
var http = require("http");
var userRouter = require("./routes/user");
var deviceRouter = require("./routes/device");
var deviceSimulatorRouter = require('./routes/deviceSimulator');
var bodyParser = require("body-parser");
require('dotenv').config();
var cors = require('cors');
var expressValidator = require("express-validator");
const app = express();

app.use(expressValidator());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, token");
  next();
});
app.use(cors());
app.use(bodyParser.json());
app.use('/user',userRouter);
app.use('/device',deviceRouter);
app.use('/deviceSimulator',deviceSimulatorRouter);
const server = http.createServer(app);
server.listen(process.env.PORT || 9030, () => {
  console.log('Server started on port ', server.address().port);;
});

const ws = new WebSocket.Server({ server });

//var Server = require('ws').Server;
//var port = process.env.PORT || 9030;
//var ws = new Server({ port: port });

let devices = {};
let apps = {};

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
        // this has been removed now. not used anymore
        // depriciated
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

      else if (obj.type === "device_bulk_pin_oper") {
        // this is when a mobile app, web app is doing a bulk pin operation like on/off for all pins together etc
        let chip = obj['chip'];
        let app_id = obj['app_id'];
        w.app_id = app_id;
        let found = false;
        ws.clients.forEach((client) => {
          if (client.chip && client.chip === chip) {
            client.send(JSON.stringify({
              type: "IO",
              switches: obj['switches']
            }));
            found = true;
          }
        });
        w.send(JSON.stringify({
          type: "device_bulk_pin_oper_reply",
          found: found,
          chip: chip
        }));
      } else if (obj.type === "device_bulk_io_reply") {
        // this is when a device send back reply after a sucessfuly bulk i/o operation 
        let chip = obj['chip'];
        w.chip = chip;
        if (apps[chip]) {
          apps[chip].forEach((app) => {
            ws.clients.forEach((client) => {
              if (client.app_id && client.app_id == app) {
                client.send(JSON.stringify({
                  type: "device_bulk_io_notify",
                  pins: obj['PINS'],
                  chip: chip
                }));
              }
            });
          });

        }
      }
      else if (obj.type === "device_set_name") {
        let chip = obj['chip'];
        let app_id = obj['app_id'];
        w.app_id = app_id;
        let found = false;
        ws.clients.forEach((client) => {
          if (client.chip && client.chip === chip) {
            client.send(JSON.stringify({
              type: "DEVICE_NAME",
              name: obj['name']
            }));
            found = true;
          }
        });
        w.send(JSON.stringify({
          type: "device_set_name_reply",
          found: found,
          chip: chip
        }));
      } else if (obj.type === "device_set_name_success") {
        let chip = obj['chip'];
        let name = obj['name'];
        w.chip = chip;
        if (apps[chip]) {
          apps[chip].forEach((app) => {
            ws.clients.forEach((client) => {
              if (client.app_id && client.app_id == app) {
                client.send(JSON.stringify({
                  type: "device_set_name__notify",
                  name: name,
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