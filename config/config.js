var config = {
  mongoDB: {
    connect: 'mongodb://localhost:27017/TA'
  },
  allowedOrigins: ['http://localhost:3200', 'http://localhost:3300', 'http://edutour.vn','http://admin.edutour.vn','http://khowebsite.net'],
  options: {
    host: 'localhost',
    path: '/',
    headers: {
      'Accept': 'application/json',
      'Accept-Charset': 'utf-8',
      'User-Agent': 'my-reddit-client'
    }
  },
  // domain: 'http://localhost:3100'
  domain: 'http://api.edutour.vn'
}

module.exports = config
