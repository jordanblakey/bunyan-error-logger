////////////////////////////////////////////////////////////////////////////////
// BUNYAN LOGGER: Basic Usage
////////////////////////////////////////////////////////////////////////////////

// CONSTRUCTOR API /////////////////////////////////////////////////////////////
// var bunyan = require('bunyan');
// var log = bunyan.createLogger({
//   name: <string>,                     // Required
//   level: <level name or number>,      // Optional, see "Levels" section
//   stream: <node.js stream>,           // Optional, see "Streams" section
//   streams: [<bunyan streams>, ...],   // Optional, see "Streams" section
//   serializers: <serializers mapping>, // Optional, see "Serializers" section
//   src: <boolean>,                     // Optional, see "src" section

//   // Any other fields are added to all log records as is.
//   foo: 'bar',
//   ...
// });

// BASIC USAGE /////////////////////////////////////////////////////////////////
const bunyan = require('bunyan')
const log = bunyan.createLogger({
  name: 'bunyan-test'
})

log.info('hi') // Basic message

let name = 'Tim'
log.info('Hi, %s', name) // util.format used
log.info({ foo: 'bar' }, 'hi') // include a feilds object

try {
  // Pipe a JS error to bunyan
  throw new Error('something went wrong!')
} catch (err) {
  log.error(err.name + ': ' + err.message)
}

log.warn({ lang: 'fr' }, 'au revoir')

let foo = {
  eval: function() {
    throw new EvalError('eval error!')
  },
  range: function() {
    throw new RangeError('range error!')
  },
  syntax: function() {
    throw new SyntaxError('syntax error!')
  },
  reference: function() {
    throw new ReferenceError('reference error!')
  },
  type: function() {
    throw new TypeError('type error!')
  },
  uri: function() {
    throw new URIError('uri error!')
  }
}

try {
  foo.eval()
} catch (err) {
  if (err instanceof EvalError) {
    log.error(err.name + ': ' + err.message)
  }
}
try {
  foo.range()
} catch (err) {
  if (err instanceof RangeError) {
    log.error(err.name + ': ' + err.message)
  }
}
try {
  foo.syntax()
} catch (err) {
  if (err instanceof SyntaxError) {
    log.error(err.name + ': ' + err.message)
  }
}
try {
  foo.reference()
} catch (err) {
  if (err instanceof ReferenceError) {
    log.error(err.name + ': ' + err.message)
  }
}
try {
  foo.type()
} catch (err) {
  if (err instanceof TypeError) {
    log.error(err.name + ': ' + err.message)
  }
}
try {
  foo.uri()
} catch (err) {
  if (err instanceof URIError) {
    log.error(err.name + ': ' + err.message)
  }
}
try {
  foo.uri()
} catch (err) {
  log.error(err.name, ': more on this: %s', err.stack)
}
