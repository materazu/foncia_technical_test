/**
 * Dependencies
 */
const config = require('config')
const jwt = require('jsonwebtoken')

/**
 * Config constants
 */
const loginUser = config.login.user
const loginPassword = config.login.password
const jwtSecret = config.jwt.secret

const post = (req, res) => {
  const user = req.body.user
  const password = req.body.password
  const loginMatch = user === loginUser
  const passwordMatch = password === loginPassword

  if (!loginMatch || !passwordMatch) {
    return res
      .status(401)
      .send({message: 'Bad login or password'})
  }

  const token = jwt.sign({ user: user }, jwtSecret)
  res.send({token: token})
}

module.exports = { post }
