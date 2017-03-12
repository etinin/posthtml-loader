'use strict'

const path = require('path')

const loaderUtils = require('loader-utils')

const posthtml = require('posthtml')
const posthtmlrc = require('posthtml-load-config')

const parseOptions = require('./lib/parse')
const validateOptions = require('./lib/validate')

module.exports = function (html) {
  this.cacheable && this.cacheable()

  const loader = this

  const cb = loader.async()
  const file = loader.resourcePath

  const options = loaderUtils.getOptions(loader) || {}

  validateOptions('PostHTML Loader', './schema', options)

  const rc = {
    path: '',
    ctx: {
      file: {
        extname: path.extname(file),
        dirname: path.dirname(file),
        basename: path.basename(file)
      }
    }
  }

  if (options.config) {
    options.config.path
      ? rc.path = path.resolve(options.config.path)
      : rc.path = path.dirname(file)

    options.config.ctx
      ? rc.ctx.options = options.config.ctx
      : rc.ctx.options = {}
  }

  const template = typeof options.template === 'boolean'
    ? '_'
    : options.template

  Promise.resolve().then(() => {
    if (Object.keys(options).length !== 0) {
      return parseOptions.call(loader, options)
    }

    return posthtmlrc(rc.ctx, rc.path, { argv: false })
  })
  .then((config) => {
    if (!config) config = {}

    if (config.file) loader.addDependency(config.file)

    let plugins = config.plugins || []
    let options = Object.assign({ from: file, to: file }, config.options)

    if (typeof options.parser === 'string') {
      options.parser = require(options.parser)()
    }

    if (typeof options.render === 'string') {
      options.render = require(options.render)
    }

    if (options.parser === undefined) options.parser = false
    if (options.render === undefined) options.render = false

    return posthtml(plugins)
      .process(html, options)
      .then((result) => {
        if (result.messages) {
          result.messages.forEach((msg) => {
            if (msg.type === 'error') {
              loader.emitError(msg.message)
            }
            if (msg.type === 'warning') {
              loader.emitWarning(msg.message)
            }
            if (msg.type === 'dependency') {
              loader.addDependency(msg.file)
            }
          })
        }

        html = result.html.trim()

        if (loader.loaderIndex === 0) {
          const module = template
          ? `module.exports = function (${template}) { return \`${html}\` }`
          : `module.exports = ${JSON.stringify(html)}`

          return cb(null, module)
        }

        return cb(null, html)
      })
  })
  .catch((err) => cb(err))
}
