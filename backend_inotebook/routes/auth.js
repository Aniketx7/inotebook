const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    obj = {
        name: 'Aniket',
        age: 15
    }
    res.json(obj)
})

module.exports = router