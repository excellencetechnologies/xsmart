// server.js
// pm2 start websocket.js --name "xsmart"
var express = require("express");
var WebSocket = require("ws");
var http = require("http");
var userRouter = require("./routes/user");
var deviceRouter = require("./routes/device");
var cardRouter = require("./routes/card");
var deviceSimulatorRouter = require('./routes/deviceSimulator');
var bodyParser = require("body-parser");
var moment = require('moment');
require('dotenv').config();
var cors = require('cors');
var expressValidator = require("express-validator");
const semver = require('semver')
var glob = require("glob")
var cache = require('memory-cache');



const app = express();

app.use(express.static('ota'))
app.use(expressValidator());
app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/card', cardRouter);
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
var Attendance = require("./model/attendance");
var Device = require("./model/device");


let devices = {};
let apps = {};


checkLatestVersionOTA = (version, device, type) => {
    device = device.toLowerCase();
    let cacheKey = device + "-" + version + "-" + type;
    // console.log(cache.get(cacheKey), " cache value");
    if (cache.get(cacheKey)) {
        return cache.get(cacheKey);
    }

    let files = glob.sync("**/*.bin");
    // console.log(files, "files");
    let ota = "";
    files.forEach((file) => {
        let dirPath = "ota/" + device + "/" + type + "/";
        // console.log(dirPath);
        if (file.indexOf(dirPath) >= 0) {
            let name = file.replace(dirPath, "");
            name = name.replace(".bin", "");
            // console.log("name", name);
            if (semver.valid(name)) {
                console.log("valid");
                console.log(version);
                if (semver.gt(name, version)) {
                    //update found
                    file = file.replace("ota/", "");
                    ota = "http://5.9.144.226:9030/" + file;
                    console.log("version grt update found", ota);
                }
            }
        }
    })
    cache.put(cacheKey, ota, 1000 * 60 * 60 * 24);
    return ota;

}

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
            console.log("sending to chip " + chip);
            console.log(obj);
            client.send(JSON.stringify(obj));
            found = true;
        }
    });
    return found;
}


sendToApp = (obj, found, w) => {
    console.log("sending to app");
    console.log(obj);
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
        "device_set_pin_name",
        "device_bulk_pin_oper",
        "device_set_name",
        "device_set_add_employee",
        "device_set_delete_employee",
        "device_set_disable_employee",
        "device_set_enable_employee",
        "device_set_list_employee",
        "device_set_time",
        "device_get_time"
    ];
    if (obj.type === "device_set_delete_employee") {
        if (obj.stage === "success") {
            Card.deleteOne({
                chip: obj["chip"],
                emp_id: obj['emp_id']
            })
        }
    }
    if (obj.type === "device_set_pin_name") {
        if (obj.stage === "init") {
            let device = await Device.findOne({
                chip: obj["chip"]
            }).lean().exec();

            if (!device.meta.pinnames) {
                device.meta.pinnames = {};
            }
            device.meta.pinnames[obj['pin']] = obj['name'];
            await Device.update({
                chip: device.chip
            }, {
                    $set: {
                        meta: device.meta
                    }
                });
            if (devices[chip])
                devices[chip]["pinnames"] = device.meta.pinnames;
            sendNotifyToApp(obj, ws, w);

        }
        return;
    }
    if (obj.type === "device_set_name") {
        if (obj.stage === "init") {
            Device.findOneAndUpdate({
                chip: obj["chip"]
            }, {
                    $set: {
                        "meta.deviceName": obj["name"]
                    }
                },
                { upsert: true, new: true },
                () => {
                    if (devices[chip])
                        devices[chip]["deviceName"] = obj["name"];
                    sendToApp(obj, ws, w);
                }
            )
        }
        //don't send to actual device. device name we will keep in db itself
        return;
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
            console.log("employee adding to db");
            Card.findOneAndUpdate({
                chip: obj["chip"],
                emp_id: obj['emp_id'],
            },
                {
                    chip: obj["chip"],
                    emp_id: obj['emp_id'],
                    rfid: obj['uid']
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

            let attendance = new Attendance;
            attendance.chip = obj['chip'];
            attendance.emp_id = obj['emp_id'];
            attendance.time = obj["time"]
            attendance.save();

        } else {
            w.send("error...... wtfs.. yeah method nai hai :P :P :P");
        }
    }
}

ws.on('connection', function (w) {

    w.on('message', async function (msg) {
        try {
            let obj = JSON.parse(msg);
            if (obj.type === "device_ping") {
                console.log("device ping", obj);
                //this is basically the event which a device like esp32, 8266 
                // send every 1sec. this is ping from the device.
                let chip = obj['chip'];
                let offset = new Date().getTimezoneOffset();
                let time = new Date().getTime() + offset * 60 * 1000;
                if (!devices[chip])
                    devices[chip] = {};

                let deviceDB = false;
                let deviceName = "";
                let pinNames = {};
                if (!devices[chip]['deviceName']) {
                    deviceDB = await Device.findOne({ 'chip': chip }).lean().exec();
                    if (deviceDB.meta && deviceDB.meta.deviceName)
                        deviceName = deviceDB.meta.deviceName;
                }
                if (!devices[chip]['pinNames']) {
                    if (!deviceDB) {
                        deviceDB = await Device.findOne({ 'chip': chip }).lean().exec();
                    }
                    if (deviceDB.meta && deviceDB.meta.pinNames)
                        pinNames = deviceDB.meta.pinNames;
                }

                devices[chip] = {
                    id: obj["WEBID"],
                    version: obj['version'],
                    pins: obj['PINS'],
                    chip: obj['chip'],
                    time: time,
                    device_type: obj["device_type"] ? obj["device_type"] : "switch",
                    deviceTime: obj["deviceTime"],
                    deviceName: deviceName,
                    pinNames: pinNames
                };
                w.chip = chip;
                w.send(JSON.stringify({
                    type: "OK",
                    ota: checkLatestVersionOTA(obj['version'], obj['WEBID'], obj["device_type"] ? obj["device_type"] : "switch")
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
                                    name: devices[chip].deviceName,
                                    pinNames: devices[chip].pinNames,
                                    status: devices[chip].status,
                                    chip: devices[chip].chip,
                                    time: devices[chip].time,
                                    version: devices[chip].version,
                                    found: true,
                                    deviceTime: devices[chip].deviceTime,
                                    device_type: devices[chip].device_type,
                                    ota: checkLatestVersionOTA(devices[chip].version, devices[chip].id, devices[chip].device_type)
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
                // let chip = obj['chip'];
                // let app_id = obj['app_id'];
                // w.app_id = app_id;
                // if (!apps[chip]) {
                //     apps[chip] = [];
                // }
                // if (!apps[chip].includes(app_id)) {
                //     apps[chip].push(app_id);
                // }
                // let found = false;

                // Object.keys(devices).forEach((c) => {
                //     if (c === chip) {

                //         w.send(JSON.stringify({
                //             type: "device_online_check_reply",
                //             id: devices[c].id,
                //             version: devices[c].version,
                //             pins: devices[c].pins,
                //             chip: devices[c].chip,
                //             found: true,
                //             time: devices[c].time,
                //             deviceTime: devices[c].deviceTime,
                //             ota: checkLatestVersionOTA(devices[c].version, devices[c].id)
                //         }));
                //         found = true;

                //     }
                // })


                // if (!found) {
                //     w.send(JSON.stringify({
                //         type: "device_online_check_reply",
                //         found: false,
                //         chip: chip
                //     }));
                // }



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