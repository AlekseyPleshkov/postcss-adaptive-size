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
        const calc = parseFloat(width[0]) / parseInt(width[1]) * 100
        const result = calc.toFixed(4)
        parent.append(`width: ${width[0]};`)
        parent.append(`width: ${result}${width[2]};`)
      }

      if (height !== null && height.length === 3) {
        const calc = parseFloat(height[0]) / parseInt(height[1]) * 100
        const result = calc.toFixed(4)
        parent.append(`height: ${height[0]};`)
        parent.append(`height: ${result}${height[2]};`)
      }

      decl.remove()
    }

    // Viewport padding/margin
    const viewportPadding = (decl, params, type) => {
      const parent = decl.parent
      let parentResult = ''

      params.forEach(item => {
        const param = item.split(' ')
        if (param.length === 3) {
          const calc = parseFloat(param[0]) / parseFloat(param[1]) * 100
          const result = calc.toFixed(4)
          parentResult += ` ${result}${param[2]}`
        } else {
          parentResult += ` ${param[0]}`
        }
      })

      parent.append(`${type}:${parentResult};`)
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
