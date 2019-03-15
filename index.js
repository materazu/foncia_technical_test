// Uncomment me to use another env than default
// process.env.NODE_ENV = 'production'

/**
 * Dependencies
 */
const config = require('config')
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')

/**
 * Bootstraping Express
 */
const app = express()
app.use(morgan('combined'))

/**
 * Bootstraping Mongoose
 */
mongoose.connect(config.db.host, confib.db.options)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

/**
 * Configs constants
 */
const apiPort = config.api.port

/**
 * Routes
 */
app.get('/', function (req, res) {
  res.send('Hello World!')
})

/**
 * Run the api
 */
app.listen(apiPort, function () {
  console.log('Example app listening on port 3000!')
})