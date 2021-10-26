require('./db')
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const User = require('./models/user')
const showLog = (req, res, next) => {
  // console.log("Request >> ", req)
  next()
}
app.use(showLog)
app.use(express.json())

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
app.get('/users', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// Get user by id
app.get('/user/:id', async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  res.json({ id })
})

// Update user by id
app.put('/user/:id', async (req, res) => {
  const payload = req.body
  const { id } = req.params

  const user = await User.findByIdAndUpdate(id, { $set: payload })
  res.json({ user })
})

// Delete user by id
app.delete('/user/:id', async (req, res) => {
  const { id } = req.params

  await User.findByIdAndDelete(id)
  res.status(204).end()
})

// Register
app.post('/register', async (req, res) => {
  const payload = req.body
  const { username, password, name } = payload
  if (!name || !username || !password) {
    return res.send('สมัครไม่สำเร็จ ข้อมูลไม่ครบถ้วน')
  }

  const passwordHash = bcrypt.hashSync(password, 10)
  const user = new User({
    ...payload,
    password: passwordHash,
  })

  await user.save()
  res.json({ user })
})

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.send('ล็อกอินไม่สำเร็จ กรุณากรอกข้อมูลให้สมบูรณ์')
  }

  const user = await User.findOne({
    username,
  })

  if (user) {
    const isCorrect = bcrypt.compareSync(password, user.password)
    if (isCorrect) {
      return res.json({ LoginAs: user })
    } else {
      return res.send("Password incorrect.")
    }
  } else {
    return res.send('Cannot find user.')
  }
})

app.listen(3000, () => {
  console.log('Application is running on port 3000')
})
