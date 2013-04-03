var request = require('request')
  , CookieStorage = require('../cookie-storage')
  , endpoints = require('./endpoints')()
  , errorHandler = require('./error-handler')

module.exports = function (options) {
  var self = {}

  options = options || {}
  options.store = request.jar()

  self.login = function (name, cleartext, cb) {
    request(
      { method: 'GET'
      , uri: endpoints.login
      , qs: { name: name, cleartext: cleartext }
      , jar: options.store
      , timeout: 10000
      }
    , function (err, res, body) {
      errorHandler(err, res, body, cb)
    })
  }

  /**
   *  eventid = will trigger the event for user when successful
   *  sub = subscriber
   *  aid = affiliateid
   */
  self.setuser = function (query, cb) {
    request(
      { method: 'GET'
      , uri: endpoints.setuser
      , qs: query
      , jar: options.store
      , timeout: 10000
      }
    , function (err, res, body) {
      errorHandler(err, res, body, cb)
    })
  }

  /**
   *  eid = the event id to trigger
   *  aid = affiliateid
   */
  self.trigger = function (query, cb) {
    request(
      { method: 'GET'
      , uri: endpoints.trigger
      , qs: query
      , jar: options.store
      , timeout: 10000
      }
    , function (err, res, body) {
      errorHandler(err, res, body, cb)
    })
  }

  return self
}