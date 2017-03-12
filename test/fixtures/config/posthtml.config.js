module.exports = (ctx) => ({
  parser: 'posthtml-sugarml',
  plugins: [
    ctx.options.plugin ? require('../../plugin')() : false
  ]
})
