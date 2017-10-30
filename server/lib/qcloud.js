const COS = require('cos-nodejs-sdk-v5')
const config = require('../config')

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

exports.auth = (req, res) => {
  // console.log(req.body.method);
  // console.log(req.body.pathname);
  const params = {
    AppId: `${config.AppId}`,
    SecretId: `${config.SecretId}`,
    SecretKey: `${config.SecretKey}`,
    Method: req.body.method,
    Key: req.body.pathname
  }

  const cos = new COS(params)

  const Authorization = cos.getAuth(params)
  // console.log(Authorization)
  res.status(200).json(Authorization)
}
