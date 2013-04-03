var Mocha = require('mocha')
  , join = require('path').join
  , fs = require('fs')
  , path = require('path')

require('should')

var mocha = new Mocha()
  , counts =
    { total: 0
    , pass: 0
    , fail: 0
    }

// set a timeout
mocha.timeout(5000)

var filter = process.argv[2] || false

function addFile(filepath) {

  // Only run tests that match filter
  if (filter && (filepath.indexOf(filter) === -1)) {
    return false
  }
  var nicePath = './' + path.relative(__dirname, filepath)

  if (fs.existsSync(filepath)) {
    console.log('Adding tests', nicePath)
    mocha.addFile(filepath)
  } else {
    console.log('Tests not found', nicePath)
  }
  return
}

mocha.reporter('spec').ui('bdd');

// Integration Tests
addFile(join(__dirname, 'cheetahmail.login.test.js'))
// addFile(join(__dirname, 'cheetahmail.cookieStorage.test.js'))

var runner = mocha.run(function () {
  console.log('Finished', counts)
  process.exit(counts.fail === 0 ? 0 : 1)
})

runner.on('pass', function () {
  counts.total += 1
  counts.pass += 1
})

runner.on('fail', function () {
  counts.total += 1
  counts.fail += 1
})