
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const should = chai.should();
const config = require('config')

chai.use(chaiHttp);

const codes = [
  '4.6.6.1.5',
  '4.6.1.1.3',
  '4.6.1.1.1',
  '4.5.2.6',
  '4.5.4.2.8',
  '4.5.4.5.0.9'
];

describe('codes', () => {
  describe('GET /api/v1/codes/:managerId', () => {
    it('it should returns all available codes for a manager', (done) => {
      chai.request(server)
        .get('/api/v1/codes/5c6c36c9a3378e1809937dde')
        .set({ 'Authorization': `Bearer ${config.login.testToken}` })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.equal(6)
          res.body.should.be.to.deep.equal(codes)

          done()
      })
    })

    it('it should returns error when called without Bearer', (done) => {
      chai.request(server)
        .get('/api/v1/codes/5c69c5a9a3378e1809930322')
        .end((err, res) => {
          res.should.have.status(401)

          done()
      })
    })


    it('it should returns error when called with bad id', (done) => {
      chai.request(server)
        .get('/api/v1/codes/5c69c5a9a3378e1809930344')
        .set({ 'Authorization': `Bearer ${config.login.testToken}` })
        .end((err, res) => {
          res.should.have.status(404)

          done()
      })
    })

    it('it should returns error when called with malformed id', (done) => {
      chai.request(server)
        .get('/api/v1/codes/5c69c5a9a3378e1809sqdqdqsdqs930344')
        .set({ 'Authorization': `Bearer ${config.login.testToken}` })
        .end((err, res) => {
          res.should.have.status(400)

          done()
      })
    })
  })
})