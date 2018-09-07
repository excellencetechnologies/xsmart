module.exports = {
    checkPing: [{
        webid: "1234",
        chip: "chip1",
        name: "fan-switch",
        isNew: false
    },
    {
        webid: "1234",
        chip: "chip2",
        name: "bedroom light",
        isNew: false
    },
    {
        webid: "1234",
        chip: "chip3",
        name: "cabin light",
        isNew: false
    }],

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

    Switch: {
        pin: 1,
        status: 1
    },

    Device: [{
        name: 'fan-switch',
        device_id: 'd1',
        chip: 'chip1',
        ttl: 0,
        online: true,
        switches: [
            {
                pin: 1,
                status: 1
            },
            {
                pin: 2,
                status: 0
            },
            {
                pin: 3,
                status: 1
            },
        ]
    },
    {
        name: 'bedroom light',
        device_id: 'd2',
        chip: 'chip2',
        ttl: 101,
        online: true,
        switches: [
            {
                pin: 1,
                status: 1
            },
            {
                pin: 2,
                status: 0
            },
            {
                pin: 3,
                status: 1
            }
        ]
    },
    {
        name: 'cabin light',
        device_id: 'd3',
        chip: 'chip3',
        ttl: 101,
        online: true,
        switches: [
            {
                pin: 1,
                status: 1
            },
            {
                pin: 2,
                status: 0
            },
            {
                pin: 3,
                status: 1
            }
        ]
    }
    ]
}