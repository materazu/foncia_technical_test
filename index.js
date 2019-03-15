// Uncomment me to use another env than default
// process.env.NODE_ENV = 'production'

/**
 * Dependencies
 */
const bodyParser = require('body-parser')
const config = require('config')
const express = require('express')
const ExtractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken')
const JwtStrategy = require('passport-jwt').Strategy
const mongoose = require('mongoose')
const morgan = require('morgan')
const passport = require('passport')

/**
 * Configs constants
 */
const apiPort = config.api.port
const dbHost = config.db.host
const dbOptions = config.db.options
const jwtSecret = config.jwt.secret
const loginUser = config.login.user
const loginPassword = config.login.password

/**
 * Bootstraping Express
 */
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())

/**
 * Bootstraping Mongoose
 */
mongoose.connect(dbHost, dbOptions)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

/**
 * Bootstraping Passport
 */
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret
}
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  return done(null, {user: {...jwt_payload}})
}))

/**
 * Routes
 */
app.post('/login', (req, res) => {
  const user = req.body.user
  const password = req.body.password
  const loginMatch = user === loginUser
  const passwordMatch = password === loginPassword

  if (!loginMatch || !passwordMatch) {
    return res.status(401).send({message: 'Bad login or password'});
  }

  const token = jwt.sign({user: user}, jwtSecret)
  res.send({token: token})
})

app.post('/profile', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send(req.user)
  }
)

/**
 * Run the api
 */
app.listen(apiPort, function () {
  console.log('Example app listening on port 3000!')
})