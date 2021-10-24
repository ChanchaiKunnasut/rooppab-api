const express = require('express')
const app = express()
const mongoose = require('mongoose')
// mongoose.connect('mongodb://admin:123456@128.199.129.214:27017/rooppab', {
//   useNewUrlParser: true,
// })
mongoose.connect('mongodb://128.199.129.214:27017/rooppab', {
  user: 'admin',
  pass: '123456',
  authSource: 'admin'
})

mongoose.set('debug', true)

app.use(express.json())

// สร้าง database schema
const Cat = mongoose.model('Cat', { name: String })
// สร้าง instance จาก model
const kitty = new Cat({ name: 'JavaScript' })
// save ลง database (return เป็น Promise)
kitty.save().then(() => console.log('meow'))

const users = [
  {
    id: '1001',
    name: 'Chanchai',
    surname: 'Kunnasut',
    age: 29,
  },
  {
    id: '1002',
    name: 'Panchita',
    surname: '-',
    age: 27,
  },
]

// Get all user in db
app.get('/users', (req, res) => {
  res.json(users)
})

// Get user by id
app.get('/user/:id', (req, res) => {
  const { id } = req.params
  const result = users.find((user) => user.id === id)
  res.json(result)
})

// Create new user
app.post('/users', (req, res) => {
  const payload = req.body
  res.json(payload)
})

// Update user by id
app.put('/user/:id', (req, res) => {
  const { id } = req.params
  res.json({ id })
})

// Delete user by id
app.delete('/user/:id', (req, res) => {
  const { id } = req.params
  res.json({ id })
})

app.listen(3000, () => {
  console.log('Application is running on port 3000')
})
