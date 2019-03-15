
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const should = chai.should();
const config = require('config')

chai.use(chaiHttp);

describe('clients', () => {
  describe('GET /api/v1/clients', () => {
    it('it should returns ten first clients', (done) => {
      chai.request(server)
        .get('/api/v1/clients')
        .set({ 'Authorization': `Bearer ${config.login.testToken}` })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('docs')

          res.body.docs.length.should.equal(10)

          done()
      })
    })

    it('it should be paginated', (done) => {
      chai.request(server)
        .get('/api/v1/clients')
        .set({ 'Authorization': `Bearer ${config.login.testToken}` })
        .end((err, res) => {
          res.body.should.have.property('totalDocs')
          res.body.should.have.property('limit')
          res.body.should.have.property('hasPrevPage')
          res.body.should.have.property('hasNextPage')
          res.body.should.have.property('page')
          res.body.should.have.property('totalPages')
          res.body.should.have.property('pagingCounter')
          res.body.should.have.property('prevPage')
          res.body.should.have.property('nextPage')

          res.body.totalDocs.should.equal(122)
          res.body.limit.should.equal(10)
          res.body.hasPrevPage.should.equal(false)
          res.body.hasNextPage.should.equal(true)
          res.body.page.should.equal(1)
          res.body.totalPages.should.equal(13)
          res.body.pagingCounter.should.equal(1)
          res.body.nextPage.should.equal(2)

          done()
      })
    })

    it('it should returns second page with query page', (done) => {
      chai.request(server)
        .get('/api/v1/clients?page=2')
        .set({ 'Authorization': `Bearer ${config.login.testToken}` })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('page');
          res.body.page.should.equal(2);

          res.body.docs.length.should.equal(10)

          done()
      })
    })

    it('it should returns an error when called without Bearer', (done) => {
      chai.request(server)
        .get('/api/v1/clients?page=2')
        .end((err, res) => {
          res.should.have.status(401)

          done()
      })
    })

    it('it should returns clients with good properties and lots count', (done) => {
      chai.request(server)
        .get('/api/v1/clients')
        .set({ 'Authorization': `Bearer ${config.login.testToken}` })
        .end((err, res) => {
          res.should.have.status(200)
          const client = res.body.docs[0];
          client.should.be.a('object')
          client.should.have.property('fullname')
          client.should.have.property('email')
          client.should.have.property('lots')

          client.lots.should.equal(2)

          done()
      })
    })
  })
})