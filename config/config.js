var config = {
  mongoDB: {
    connect: 'mongodb://localhost:27017/TA'
  },
  allowedOrigins: ['http://localhost:3030', 'http://localhost:3000', 'http://wland.vn'],
  options: {
    host: 'localhost',
    path: '/',
    headers: {
      'Accept': 'application/json',
      'Accept-Charset': 'utf-8',
      'User-Agent': 'my-reddit-client'
    }
  },
  domain: 'http://api.edutour.vn'
}

module.exports = config
