const COS = require('cos-nodejs-sdk-v5')
const config = require('./config')

const cos = new COS(config)

exports.getBucket = (req, res) => {
  cos.getBucket(config, (err, data) => {
    if(err) {
      res.json(err)
    } else {
      res.status(200).json(data)
    }
  })
}
