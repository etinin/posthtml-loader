const loaderUtils = require('loader-utils')
const posthtml = require('posthtml')

module.exports = function (source) {


  if (this.cacheable) this.cacheable()

  // configure options
  // const qs = loaderUtils.parseQuery(this.query)
  const cb = this.async()
  let config
  try {
    config = parseOptions.call(this, loaderUtils.getOptions(this), null)
  } catch (err) {
    return cb(err)
  }
// console.log("pula fugueira io io");
  // configure custom parser argument if necessary
  const processArgs = [source.toString()]
  if (config.parser) { processArgs.push({ parser: config.parser }) }
  // console.log(config);
  // run posthtml
  const ph = posthtml(config.plugins)
  ph.process.apply(ph, processArgs)
    .then((result) => cb(null, result.html), cb)
}

function parseOptions (config = [], qs = {}) {
  const res = {}

  // if we have a function, run it
  if (typeof config === 'function') { config = config.call(this, this) }

  // if it's not an object at this point, error
  if (typeof config !== 'object') {
    throw new Error('Configuration must return an array or object')
  }

  // if we now have an array, that represents the plugins directly
  if (Array.isArray(config)) {
    res.plugins = config
  // if not, it's an object. if a plugin pack is being used, use it.
  // otherwise, use default plugins
  } else {
    res.plugins = config.plugins
  }

  // load in the custom parser if there is one
  if (config.parser) { res.parser = config.parser }

  // try loading custom parser from query
  // if (qs.parser) {
  //   res.parser = require(qs.parser)
  // }

  return res
}

module.exports.parseOptions = parseOptions
