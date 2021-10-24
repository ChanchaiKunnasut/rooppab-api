const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello rooppab')
})

app.get('/user/:id', (req, res) => {
  const id = req.params.id
  res.send(`Hellow user id = ${id}`)
})

app.get('/user', (req, res) => {
  const name = req.query.name
  res.send(`Hello ${name}`)
})

app.listen(3000)
