const axios = require('axios');
let firstLineStart = { lat: 45.457888, lon: 9.179528 };
let secondLineStart = 2;
let thirdLineStart = 2;

let increment = 0.00010;

setInterval( async ()=> {
    console.log('Sent PLANE 1');
    try {
        await axios.post('http://localhost:3000/data', {
            plane_id : 1,
            timestamp: Math.floor(+ new Date()/1000),
            lat: firstLineStart.lat + increment,
            lng: firstLineStart.lon + increment,
            altitude: Math.random() * (10001 - 0) + 0
        });
        increment = increment + 0.00010;
    }catch(e) {
        console.log('SERVER DOWN')
    }
}, 3000);

setInterval( async ()=> {
    console.log('Sent PLANE 2');
    try {
        await axios.post('http://localhost:3000/data', {
            plane_id : 2,
            timestamp: Math.floor(+ new Date()/1000),
            lat: firstLineStart.lat - increment,
            lng: firstLineStart.lon - increment,
            altitude: Math.random() * (10001 - 0) + 0
        });
        increment = increment + 0.00010;
    }catch(e) {
        console.log('SERVER DOWN')
    }
}, 3000);