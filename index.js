'use strict'
const postcss = require('postcss')

module.exports = postcss.plugin('postcss-adaptive-size', (options) => {
  return (css) => {

    const adaptive = (decl, params) => {
      const parent = decl.parent
      const width = params[0]
      const height = params.length > 1 ? params[1] : null

      parent.append('width: 100%; max-width: '+ width +';')
      if (height != null) {
        parent.append('height: auto; min-height: '+ height +';')
      }

      decl.remove()
    }

    // Viewport size
    const viewport = (decl, params) => {
      const parent = decl.parent
      const width = params[0].split(' ')
      const height = params.length > 1 ? params[1].split(' ') : null

      if (width.length === 3) {
        parent.append(`width: ${width[0]};`)
        parent.append(`width: ${width[0]}/${width[1]}*100${width[2]};`)
      }

      if (height !== null && height.length === 3) {
        parent.append(`height: ${height[0]};`)
        parent.append(`height: ${height[0]}/${height[1]}*100${height[2]};`)
      }

      decl.remove()
    }

    // Viewport padding/margin
    const viewportPadding = (decl, params, type) => {
      const parent = decl.parent
      let result = ''

      params.forEach(item => {
        const param = item.split(' ')
        if (param.length === 3) {
          result += ` ${param[0]}/${param[1]}*100${param[2]}`
        } else {
          result += ` ${param[0]}`
        }
      })

      parent.append(`${type}:${result};`)
      decl.remove()
    }

    // Adaptive size
    css.walkDecls('adaptive', (decl) => {
      const params = postcss.list.space(decl.value)
      adaptive(decl, params)
    })

    // Viewport size
    css.walkDecls('viewport', (decl) => {
      const params = postcss.list.comma(decl.value)
      viewport(decl, params)
    })

    // Viewport padding
    css.walkDecls('viewport-padding', (decl) => {
      const params = postcss.list.comma(decl.value)
      viewportPadding(decl, params, 'padding')
    })

    // Viewport margin
    css.walkDecls('viewport-margin', (decl) => {
      const params = postcss.list.comma(decl.value)
      viewportPadding(decl, params, 'margin')
    })

  }
})
