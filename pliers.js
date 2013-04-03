module.exports = tasks

var join = require('path').join
  , child

// Growl is only for Mac users
try {
  var growl = require('growl')
} catch (e) {}

function notify() {
  if (growl) growl.apply(null, arguments)
}

function tasks(pliers) {

  function log(msg, level) {
    pliers.logger[level](msg)
  }
  pliers.filesets('tests', [join(__dirname, 'bundles', '*', '**/*.test.js'),
    join(__dirname, 'test', '*', '**/*.test.js')])

  pliers('build', function (done) {
    done()
  })

  pliers('qa', 'test', 'lint', 'testFeatures')

  pliers('lint', function (done) {
    pliers.exec('./node_modules/jshint/bin/jshint .', done)
  })

  pliers('noExitLint', function (done) {
    var child = pliers.exec('./node_modules/jshint/bin/jshint .', false, done)
    child.on('exit', function (code) {
      if (code === 1) {
        notify('Lint errors found')
      }
    })
  })

  pliers('qaWatch', function () {
    pliers.logger.info('Watching for JavaScript changes for QA')
    pliers.run('noExitLint')
    pliers.watch(pliers.filesets.serverJs, function () {
      pliers.run('noExitLint')
    })
  })

  pliers('test', function (done) {
    pliers.exec('node ./test/runner', done)
  })

  pliers('start', function (done) {
    if (child) child.kill()
    child = pliers.exec('node app')
    done()
  })
}