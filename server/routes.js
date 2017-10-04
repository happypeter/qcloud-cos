const express = require('express')
const router = express.Router()
const bucket = require('./bucket.js')

router.get('/', (req, res) => {
  res.send('API running...')
})

router.post('/auth', bucket.auth)
router.get('/bucket', bucket.getBucket)


module.exports = router
