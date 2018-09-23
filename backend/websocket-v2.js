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
app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/device', deviceRouter);
app.use('/deviceSimulator', deviceSimulatorRouter);
const server = http.createServer(app);
server.listen(process.env.PORT || 9030, () => {
    console.log('Server started on port ', server.address().port);;
});

const ws = new WebSocket.Server({ server });

//var Server = require('ws').Server;
//var port = process.env.PORT || 9030;
//var ws = new Server({ port: port });

var Card = require("./model/card");

let devices = {};
let apps = {};




//obj of type
//obj.chip
//obj.app_id
//obj.type
sendToDevice = (obj, ws, w) => {
    let chip = obj['chip'];
    let app_id = obj['app_id'];
    w.app_id = app_id;
    let found = false;
    ws.clients.forEach((client) => {
        if (client.chip && client.chip === chip) {
            client.send(JSON.stringify(obj));
            found = true;
        }
    });
    return found;
}


sendToApp = (obj, found, w) => {
    w.send(JSON.stringify({
        type: obj.type + "_reply",
        found: found,
        chip: obj['chip']
    }));
}


sendNotifyToApp = (obj, ws, w) => {
    // this is when a device send back reply after a sucessfuly i/o operation
    let chip = obj['chip'];
    obj["type"] = obj["type"] + "_notify";
    w.chip = chip;
    if (apps[chip]) {
        apps[chip].forEach((app) => {
            ws.clients.forEach((client) => {
                if (client.app_id && client.app_id == app) {
                    client.send(JSON.stringify(obj));
                }
            });
        });

    }
}



//general operation will be liek this

// 1. app sends operation to device with type = "xxxx" and stage = "init"
// 2. server sends to device with the same type
// 3. server sends back to app with respons if device was found or not with type = type + "_reply"
// 4. device gets the type and replies back with type _ "success" or type "_error"
// 5. server gives to to app with type type + "_notify"
// the name of protocol is drunkDeviceSync or highDSync

// who's going to test this............
handleProtocol = async (obj, ws, w) => {
    let methods = [
        "device_pin_oper",
        "device_bulk_pin_oper",
        "device_set_name",
        "device_set_add_employee",
        "device_set_delete_employee",
        "device_set_disable_employee"
    ];
    if(obj.type === "device_set_delete_employee"){
        if(obj.stage === "success"){
            Card.deleteOne({
                chip: obj["chip"],
                emp_id: obj['emp_id']
            })
        }
    }
    if (methods.includes(obj.type)) {
        if (obj.stage === "init") {
            //this variable found is just so that code is more readable.
            //no other use...... :thinkk....
            let found = await sendToDevice(obj, ws, w);
            sendToApp(obj, found, w);
        } else if (obj.stage === "success" || obj.stage === "error") {
            sendNotifyToApp(obj, ws, w);
        } else if (obj.stage === "employee_add_failed") {
            sendNotifyToApp(obj, ws, w);
        } else if (obj.stage = "employee_add_success") {
            Card.findOneAndUpdate({
                chip: obj["chip"],
                emp_id: obj['emp_id'],
            },
                {
                    chip: obj["chip"],
                    emp_id: obj['emp_id'],
                    rfid: obj['rfid']
                },
                { upsert: true, new: true },
                () => {
                    sendNotifyToApp(obj, ws, w);
                }
            )
        }
    } else {
        if (obj.type === "device_card_read") {
            //this is special method. outside regular protocal.
            //in this device is sending push to socket.

            // do something when card is read successfully like doing push notification or 
            //sending data to webhook. will come in advance usage.

        } else {
            w.send("error...... wtfs.. yeah method nai hai :P :P :P");
        }
    }
}

ws.on('connection', function (w) {

    w.on('message', function (msg) {
        try {
            console.log('message from client', msg);
            let obj = JSON.parse(msg);
            console.log("device ping", obj);
            if (obj.type === "device_ping") {
                //this is basically the event which a device like esp32, 8266 
                // send every 1sec. this is ping from the device.
                let chip = obj['chip'];
                let offset = new Date().getTimezoneOffset();
                let time = new Date().getTime() + offset * 60 * 1000;
                if (!devices[chip])
                    devices[chip] = {};

                devices[chip] = {
                    id: obj["WEBID"],
                    pins: obj['PINS'],
                    chip: obj['chip'],
                    time: time,
                    type: obj["type"] ? obj["type"] : "switch"
                };
                w.chip = chip;
                w.send(JSON.stringify({
                    type: "OK"
                }));

                if (apps[chip]) {
                    apps[chip].forEach((app) => {

                        ws.clients.forEach((client) => {
                            if (client.app_id && client.app_id == app) {
                                console.log(devices[chip], "==============================");
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


            } else {
                handleProtocol(obj, ws, w);
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