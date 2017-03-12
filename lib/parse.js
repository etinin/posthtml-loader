'use strict'

module.exports = function parseOptions (params) {
  if (typeof params === 'function') {
    params = params.call(this, this)
  }

  let plugins

  if (typeof params === 'undefined') plugins = []
  else if (Array.isArray(params)) plugins = params
  else plugins = params.plugins

  const options = {}

  if (typeof params !== 'undefined') {
    options.parser = params.parser
    options.render = params.render
  }

  return Promise.resolve({ options: options, plugins: plugins })
}
