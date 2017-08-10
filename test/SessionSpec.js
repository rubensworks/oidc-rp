'use strict'

/**
 * Test dependencies
 */
const chai = require('chai')

/**
 * Assertions
 */
chai.use(require('dirty-chai'))
chai.should()
let expect = chai.expect

/**
 * Code under test
 */
const Session = require('../src/Session')
const RelyingParty = require('../src/RelyingParty')

const providerUri = 'https://provider.example.com'

const decoded = {
  header: {},
  payload: { iss: providerUri }
}

const params = {
  access_token: 'access t0ken',
  id_token: 'id t0ken'
}

const rp = {
  store: {},
  registration: {
    client_id: 'client123'
  }
}
const sessionKey = 'session key'
rp.store[RelyingParty.SESSION_PRIVATE_KEY] = sessionKey

const response = { decoded, params, rp }

describe('Session', () => {
  describe('fromAuthResponse', () => {
    let session

    before(() => {
      session = Session.fromAuthResponse(response)
    })

    it('should init the issuer', () => {
      expect(session.idp).to.equal(providerUri)
    })

    it('should init the client id', () => {
      expect(session.clientId).to.equal('client123')
    })

    it('should init the decoded id token', () => {
      expect(session.decoded).to.equal(decoded)
    })

    it('should init the session key', () => {
      expect(session.sessionKey).to.equal(sessionKey)
    })

    it('should init the id token', () => {
      expect(session.idToken).to.equal('id t0ken')
    })

    it('should init the access token', () => {
      expect(session.accessToken).to.equal('access t0ken')
    })
  })
})