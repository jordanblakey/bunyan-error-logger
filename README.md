# bunyan-error-logger

Testing basic usage of Node package bunyan for organized error-logging.

**Full Documentation**

[https://github.com/trentm/node-bunyan](https://github.com/trentm/node-bunyan)

## Get Started

```sh
yarn add bunyan
```

```js
const bunyan = require('bunyan')
const log = bunyan.createLogger({ name: 'myapp' })
log.trace('(lv 10) external libries and very detailed feedback')
log.debug('(lv 20) too detailed for regular usage/info level)')
log.info('(lv 30) detail on regular operation')
log.warn('(lv 40) something that should be resolved eventually')
log.error('(lv 50) something fatal for a particular code path')
log.fatal('(lv 60) fatal/breaking, app-wide error. Fix asap.')
```

## CLI Usage

Bunyan log output is a stream of JSON objects. This is great for processing, but not for reading directly. A bunyan tool is provided for pretty-printing bunyan logs and for filtering.

**Commands**

```sh
node server.js | bunyan -l warn # Filter & pretty print level 'warn'
node server.js | bunyan -c this.widget_type == "email-module" # Filter based on any createLogger() field
```

## Checking Levels

```js
log.level() // return lowest level of all streams
log.level('info') // set all streams to level 'info' (30)

log.levels() // return array of levels for all streams
log.levels('service-name') // get log level for stream 'service-name'
log.levels('service-name', 'info') // set stream 'service-name' to 'warn' (40)
```

## Constructor API

```js
var bunyan = require('bunyan');
var log = bunyan.createLogger({
  name: <string>,                     // Required
  level: <level name or number>,      // Optional, see "Levels" section
  stream: <node.js stream>,           // Optional, see "Streams" section
  streams: [<bunyan streams>, ...],   // Optional, see "Streams" section
  serializers: <serializers mapping>, // Optional, see "Serializers" section
  src: <boolean>,                     // Optional, see "src" section
});
```

## Full Constructor Example

* `streams`: split the destination of Bunyan output based on level
* `serializers`: stringify/filter a custom JS object to Bunyan output

```js
const bunyan = require('bunyan')
const log = bunyan.createLogger({
  name: 'overture-app',
  level: 'debug',
  streams: [
    { level: 'info', stream: process.stdout },
    { level: 'debug', stream: process.stderr },
    { level: 'error', path: 'log/myapp-error.log' }
  ],
  serializers: {
    req: reqSerializer, // Custom serializer defined below
    res: bunyan.stdSerializers.res, // Standard Bunyan serializer
    err: bunyan.stdSerializers.err
  },
  src: true // Show the file, line, and func of every log (dev only)
})

//////////////////////////////////////////////

function reqSerializer(req) {
  return {
    method: req.method,
    url: req.url,
    headers: req.headers
  }
}
```

Optionally you could add a serializer or stream later:

```sh
log.addSerializers({req: reqSerializer});
log.addStream({
  name: "myNewStream",
  stream: process.stderr,
  level: "debug"
});
```
