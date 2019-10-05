var config = {
  mongoDB: {
    connect: 'mongodb://localhost:27017/IKM'
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
  domain: 'http://localhost:3101'
}

module.exports = config
