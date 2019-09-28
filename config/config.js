var config = {
  mongoDB: {
    connect: 'mongodb://localhost:27017/ODU'
  },
  allowedOrigins: ['http://localhost:3200', 'http://localhost:3300'],
  options: {
    host: 'localhost',
    path: '/',
    headers: {
      'Accept': 'application/json',
      'Accept-Charset': 'utf-8',
      'User-Agent': 'my-reddit-client'
    }
  },
  domain: 'http://localhost:3100'
}

module.exports = config
