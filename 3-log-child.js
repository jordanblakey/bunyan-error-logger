////////////////////////////////////////////////////////////////////////////////
// BUNYAN LOGGER: log.child
// Using the streams field, we can split the output between stdout and a
// log file based on the error level
////////////////////////////////////////////////////////////////////////////////

const bunyan = require('bunyan')
const log = bunyan.createLogger({ name: 'overture' })

// SUPER BASIC USAGE
log
  .child({ widget_type: 'component-name' })
  .warn('this is a warning from a sub-component')

// IN PRACTICE
function SendEmail(options) {
  this.log = options.log.child({ widget_type: 'email-service' })
  this.log.info('Sent an email')
}

SendEmail.prototype.malformed = function() {
  this.log.warn('The email was malformed')
}

log.info('start')
let sendWelcome = new SendEmail({ log: log })
sendWelcome.malformed()
log.info('done')
