console.log('INITIALIZING CONSUMER');
const amqp = require('amqplib/callback_api');
const dbService = require('../db/index');
// const io = require('../../index');
const POI = {
    "lat": 45.457888,
    "lon": 9.179528
};
let increment = 0.000001;

const rabbitmqSettings = {
    protocol: 'amqp',
    hostname: process.env.RABBIT_HOST,
    port: 5672,
    username: process.env.RABBIT_USERNAME,
    password: process.env.RABBIT_PASSWORD,
    vhost: '/',
    authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL']
};

amqp.connect(rabbitmqSettings, function(error0, connection) {
    if (error0) {
        console.log(error0);
    }else{
        connection.createChannel(function(error1, channel) {
            if (error1) {
                console.log(error1);
            }
            channel.assertQueue(process.env.RABBIT_QUEUE_GENERAL, {
                durable: false
            });

            channel.assertQueue(process.env.RABBIT_QUEUE_WARNINGS, {
                durable: false
            });

            channel.consume(process.env.RABBIT_QUEUE_GENERAL, function(msg) {
                const newMessage = JSON.parse(msg.content.toString());
                console.log('Mesaaaaaaaage')
                dbService.insertMessage(
                    newMessage.plane_id,
                    newMessage.lat,
                    newMessage.lng,
                    newMessage.timestamp,
                    newMessage.altitude
                )
                io.emit(process.env.RABBIT_QUEUE_GENERAL, newMessage)
            }, {
                noAck: true
            });

            channel.consume(process.env.RABBIT_QUEUE_WARNINGS, function(msg) {
                console.log(`Received ${msg.content.toString()}`);
                const newMessage = JSON.parse(msg.content.toString());
                console.log(newMessage)
                dbService.insertWarning(
                    newMessage.plane_id,
                    newMessage.lat,
                    newMessage.lng,
                    newMessage.timestamp,
                    newMessage.altitude
                )
                io.emit(process.env.RABBIT_QUEUE_WARNINGS, newMessage)
            }, {
                noAck: true
            });
        });
    }
});