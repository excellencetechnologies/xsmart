var WebSocket = require('ws');
var deviceWS = new WebSocket('http://5.9.144.226:9030');
var data = require("./device_data/data");
deviceWS.onerror = (e) => {
    console.log("there is an error to open the connection with server socket");
}
deviceWS.onopen = () => {
    console.log("connection opend");
    try {
        setInterval(() => {
            let ping = {
                type: "device_ping",
                WEBID: data.Access.WEBID,
                version: data.Access.version,
                chip: data.Access.chip,
                PINS: data.Access.switches,
                device_type: data.Access.type
            };
            deviceWS.send(JSON.stringify(ping));
        }, 1000);
    } catch (err) {
        console.log("error in sending the data");
    }
}

let emp_id = -1;

deviceWS.on("message", async (msg) => {
    msg = JSON.parse(msg);
    if (msg.type == 'OK') {
        console.log(device);
    } else if (msg.type == "ADD_EMPLOYEE") {
        emp_id = msg.emp_id;
        let devicePingSend = {
            type: "device_set_add_employee_success",
            WEBID: data.Access.WEBID,
            chip: data.Access.chip,
        };
        try {
            console.log(devicePingSend);
            deviceWS.send(JSON.stringify(devicePingSend));

            setTimeout(() => {

                if (emp_id % 2) {
                    let devicePingSend = {
                        type: "device_add_card",
                        WEBID: data.Access.WEBID,
                        chip: data.Access.chip,
                        data: "101-Card",
                        size: "8",
                        emp_id: emp_id
                    };
                    deviceWS.send(JSON.stringify(devicePingSend));
                }



            }, 5000);
        } catch (err) {
            console.log("error in sending data");
        }
    }
})

deviceWS.onclose = () => {
    console.log('connection closed');
}


