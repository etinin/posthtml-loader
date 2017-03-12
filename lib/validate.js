'use strict'

const Ajv = require('ajv')

class ValidationError extends Error {
  constructor (loader, err) {
    super(err)

    this.err = err
    this.message = `${loader} Validation Error\nInvalid options found:\n\n`

    err.forEach((msg) => {
      this.message += `options${msg.dataPath} ${msg.message}\n`
    })

    this.hideStack = true
  }
}

module.exports = function validateOptions (loader, schema, options) {
  const ajv = new Ajv({ allErrors: true, errorDataPath: 'property' })

  if (typeof schema === 'string') schema = require(schema)

  if (!ajv.validate(schema, options)) {
    throw new ValidationError(loader, ajv.errors)
  }
}
