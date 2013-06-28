module.exports = function (error, response, body, next) {
  if (error) {
    return next(error)
  }

  if (body && body.trim() === 'OK') {
    return next(null)
  } else if (body && body.split(':').length > 0) {
    return next(new Error(body))
  }

  return next(new Error('Unknown Error'))
}