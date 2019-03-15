
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const should = chai.should();
const config = require('config')

chai.use(chaiHttp);

describe('login', () => {
  describe('POST /api/v1/login', () => {
    it('it should login user and returns a token', (done) => {
      chai.request(server)
        .post('/api/v1/login')
        .send({ user: config.login.user, password: config.login.password })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.token.should.be.a('string')

          done()
      })
    })

    it('it should fail for bad credentials', (done) => {
      chai.request(server)
        .post('/api/v1/login')
        .send({ user: 'nothing', password: 'here' })
        .end((err, res) => {
          res.should.have.status(401)
          res.body.should.be.a('object')
          res.body.message.should.be.equal('Bad login or password')

          done()
      })
    })
  })
})