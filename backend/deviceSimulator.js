var WebSocket = require('ws');
var deviceWS = new WebSocket('http://5.9.144.226:9030');

deviceWS.onerror = (e)=> {
    console.log("there is an error to open the connection with server socket");
 }
 
 deviceWS.onopen = ()=>{
     console.log("connection opend");
     try{
        setInterval(() => {
            deviceWS.send(JSON.stringify(data));
        }, 10000);         
     }catch(err){
         console.log("error in sending the data");
     }
 }

 deviceWS.on("message",(msg)=>{
     console.log(msg);
 })

 deviceWS.onclose = ()=>{
     console.log('connection closed');
 }

const data = {
    type: "device_ping",
    WEBID: "1234",
    version: "0.11",
    chip: 'chip1',
    PINS: {pin:1,status:1}
}


