module.exports = function () {
  var expiriesIn = 28800000 // 8 hours
    , self = {}

  var cookie =
    { cookiejar: null
    , created: null // date aquired
    , expires: null // 8 hours after created date
    }

  self.get = function () {
    if (+Date.now() > +cookie.expires) {
      return false
    } else {
      return cookie
    }
  }

  self.set = function (cookiejar) {
    cookie.cookiejar = cookiejar
    cookie.created = +Date.now()
    cookie.expires = +Date.now() + expiriesIn
  }

  return self
}