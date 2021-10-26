// Mongo connection
const mongoose = require('mongoose')
mongoose.connect('mongodb://128.199.129.214:27017/rooppab', {
  user: 'admin',
  pass: '123456',
  authSource: 'admin',
})

mongoose.connection.on('error', (err) => {
  console.log('MongoDB error', err)
})
mongoose.set('debug', true)