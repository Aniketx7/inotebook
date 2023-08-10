const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    obj = {
        title: 'Inotebook',
        description: 'Your notes on the cloud server',
        tag: 'tech'

    }
    res.json(obj)
})

module.exports = router