'use strict';

var postcss = require('postcss');
module.exports = postcss.plugin('postcss-adaptive-size', function (options) {
  return function (css) {
    
    // Adaptive size
    var adaptive = function(decl, sizeW, sizeH) {
      var parent = decl.parent;
      parent.append('width: 100%; max-width: '+ sizeW +'; height: auto; min-height: '+ sizeH +';');
      decl.remove();
    };

    // Search tag
    css.walkDecls('adaptive', function(decl) {
      var sizes = postcss.list.space(decl.value);
      if (sizes.length === 1) {
        sizes[1] = 0;
      }
      adaptive(decl, sizes[0], sizes[1]);
    });

  };
});
