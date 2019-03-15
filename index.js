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
const router = express.Router()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

/**
 * Route features
 */
let clients = require('./features/clients')
let codes = require('./features/codes')
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
 * Register models
 */
require('./schema/client')
require('./schema/gestionnaire')
require('./schema/lot')

/**
 * Bootstraping Passport
 */
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret
}
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  const user = { ...jwt_payload }

  if (user.user !== config.login.user) {
    return done(false, 'Token expired or invalid')  
  }

  return done(null, user)
}))

const authRequired = passport.authenticate('jwt', { session: false })

/**
 * Declaration for routes
 */
router.route('/login')
  .post(login.post)

router.route('/profile')
  .get(authRequired, profile.get)

router.route('/codes/:managerId')
  .get(authRequired, codes.getForManager)

router.route('/clients')
  .get(authRequired, clients.get)

/**
 * Start router on scope /v1/
 */
app.use('/api/v1', router)

/**
 * Attach api-docs
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

/**
 * Run the api
 */
module.exports = app.listen(apiPort, function () {
  console.log(`Foncia manager api listening on port ${apiPort}!`)
})