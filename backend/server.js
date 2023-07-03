require('dotenv').config()
const cors = require('cors');
const express = require('express')
const tdlRoutes = require('./routes/tdl')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use(cors({ origin: true, credentials: true }));
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use('/api/tdl', tdlRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })