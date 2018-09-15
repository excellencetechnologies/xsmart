module.exports = {
    Wifi: [{
        ENC: 'encryp',
        RSSI: 100,
        SSID: 'etech1'
    },
    {
        ENC: 'encryp',
        RSSI: 80,
        SSID: 'etech2'
    },
    {
        ENC: 'encryp',
        RSSI: 90,
        SSID: 'etech3'
    }],

    Device: [{
        name: 'access control',
        device_id: 'access1',
        chip: 'chip1',
        WEBID: 'W101',
        version: '1.0.2',
        type: "access",
        switches: []
    }, {
        name: 'fan-switch',
        device_id: 'd1',
        chip: 'chip1',
        WEBID: 'W101',
        version: '1.0.2',
        type: "switch",
        switches: [
            {
                pin: 1,
                status: 1,
                name: "switch1"
            },
            {
                pin: 2,
                status: 0,
                name: "switch2"
            },
            {
                pin: 3,
                status: 1,
                name: "switch3"
            },
            {
                pin: 4,
                status: 1,
                name: "switch4"
            },
        ]
    },
    {
        name: 'bedroom light',
        device_id: 'd2',
        chip: 'chip2',
        WEBID: 'W102',
        version: '1.0.3',
        type: "switch",
        switches: [
            {
                pin: 1,
                status: 1,
                name: "bedroom1"
            },
            {
                pin: 2,
                status: 0,
                name: "bedroom2"
            }
        ]
    }
    ]
}