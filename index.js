'use strict'
const postcss = require('postcss')

module.exports = postcss.plugin('postcss-adaptive-size', (options) => {
  return (css) => {
    
    // Adaptive size
    const adaptive = (decl, sizeW, sizeH) => {
      const parent = decl.parent
      parent.append('width: 100%; max-width: '+ sizeW +';')
      if (sizeH != null) {
        parent.append('height: auto; min-height: '+ sizeH +';')
      }
      decl.remove()
    }

    // Search tag
    css.walkDecls('adaptive', (decl) => {
      const sizes = postcss.list.space(decl.value)
      if (sizes.length == 1) {
        sizes[1] = null
      }
      adaptive(decl, sizes[0], sizes[1])
    })

  }
})
