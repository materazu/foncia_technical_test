// Uncomment me to use another env than default
// process.env.NODE_ENV = 'production'

/**
 * Dependencies
 */
const config = require('config');
const express = require('express')

/**
 * Bootstraping Express
 */
const app = express()

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