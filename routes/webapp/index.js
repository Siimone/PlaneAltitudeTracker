const express = require('express');
const router = express.Router();
const dbService = require('../../services/db')

router.get('/planes', async (req, res) => {
    const planes = await dbService.listPlanes();
    console.log(planes)
    res.json(planes)
});

module.exports = router;
