// Uncomment me to use another env than default
// process.env.NODE_ENV = 'production'

/**
 * Dependencies
 */
const bodyParser = require('body-parser')
const config = require('config')
const express = require('express')
const ExtractJwt = require('passport-jwt').ExtractJwt
const JwtStrategy = require('passport-jwt').Strategy
const mongoose = require('mongoose')
const morgan = require('morgan')
const passport = require('passport')

/**
 * Route features
 */
let login = require('./features/login')
let profile = require('./features/profile')


/**
 * Config constants
 */
const apiPort = config.api.port
const dbHost = config.db.host
const dbOptions = config.db.options
const jwtSecret = config.jwt.secret

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
  return done(null, {user: { ...jwt_payload }})
}))

const authRequired = passport.authenticate('jwt', { session: false })

/**
 * Routes
 */
app.route('/login')
  .post(login.post)

app.route('/profile')
  .get(authRequired, profile.get)

/**
 * Run the api
 */
app.listen(apiPort, function () {
  console.log('Example app listening on port 3000!')
})