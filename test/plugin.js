'use strict'

module.exports = function posthtmlPlugin (options) {
  options = Object.assign({}, options)

  return (tree) => {
    tree.walk((node) => {
      console.log('Plugin', node)
      if (node.tag === 'div') node.tag = 'section'

      return node
    })

    return tree
  }
}
