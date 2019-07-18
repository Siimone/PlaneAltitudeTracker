/*
    This module simulates an AWS Lambda Function for HIGH PRIORITY QUEUE,
    so we're going to push warnings from planes on High Priority Rabbit Queue.
    Important messages cannot wait general messages!
*/
const express = require('express')
const router = express.Router()
const producer = require('../../services/queue/producer')
const dbService = require('../../services/db/index')

// Setup Rabbit queue
producer.init();

// Received new data from plane, pushing it on Rabbit Queue
router.post('/', async (req, res) => {
    const body = req.body
    console.log(body)
    if(body.lat && body.lng && body.timestamp && body.plane_id){
        if(body.altitude < 3000 || body.altitude > 10000) {
            console.log('Warning message')
            producer.pushOnQueue(process.env.RABBIT_QUEUE_WARNINGS, body)
        } else {
            console.log('General message')
            producer.pushOnQueue(process.env.RABBIT_QUEUE_GENERAL, body)
        }
    }
    res.json({ result: 1 })
})

module.exports = router