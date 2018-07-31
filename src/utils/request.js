'use strict'

const request = require('request-promise-native')
const getRequestOptions = (token) => {
  return {
    baseUrl: 'https://api.intra.42.fr/v2',
    auth: {
      bearer: token
    },
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    },
    json: {}
  }
}
let token = null

/**
 * Get new access token from 42 API using app credentials
 */
const getNewAccessToken = async _ => {
  const res = await request.post('https://api.intra.42.fr/oauth/token', {
    json: {
      grant_type: 'client_credentials',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET
    }
  })

  const date = new Date().getTime() / 1000
  const expireAt = new Date((date + res.expires_in) * 1000) // We store the expiration date

  return {
    token: res.access_token,
    expireAt
  }
}

/**
 * Returns request object with configuration
 */
module.exports = async (...args) => {
  // Handle token expire
  if (!token || token.expireAt.getTime() <= new Date().getTime()) {
    token = await getNewAccessToken()
  }

  return request.defaults(getRequestOptions(token.token))(...args)
}
