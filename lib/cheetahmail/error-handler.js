module.exports = function (error, response, body, next) {
  if (body.trim() === 'OK')
    next(null)
  else if (body.split(':').length > 0)
    next(new Error(body))
  else
    next(new Error('Unknown Error'))
}