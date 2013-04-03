var api = 'https://ebm.cheetahmail.com/api/'
  , endpoints =
    { 'login': 'login1'
    , 'setuser': 'setuser1'
    , 'trigger': 'ebmtrigger1'
    }
  , testingEndpoints =
    { 'getuser': 'getuser1'
    , 'ok': 'ok1'
    }

module.exports = function () {
  var self = {}

  self.login = api + endpoints.login

  self.setuser = api + endpoints.setuser

  self.trigger = api + endpoints.trigger

  return self
}