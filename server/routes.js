const express = require('express')
const router = express.Router()
const qcloud = require('./lib/qcloud.js')

router.get('/', (req, res) => {
  res.send('API running...')
})

router.post('/auth', qcloud.auth)
router.get('/bucket', qcloud.getBucket)


module.exports = router
