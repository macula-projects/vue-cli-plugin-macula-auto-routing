const VueMaculaAutoRoutingPlugin = require('vue-macula-auto-routing/lib/webpack-plugin')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = api => {
  api.chainWebpack(webpackConfig => {
    // prettier-ignore
    webpackConfig.plugin('vue-macula-auto-routing')
      .use(VueMaculaAutoRoutingPlugin, [{
          pages: 'src/modules',
          nested: true
        }
      ])
    
    // 为了fix vue-loader不能添加custom block的bug，
    // 待vue-loader解决后这个代码可以移除
    webpackConfig.module
      .rule('routeMeta')
      .resourceQuery(/blockType=route-meta/)
      .type('javascript/auto')
      .use('routeMeta')
      .loader(resolve('generator/routemeta.js'))
  })
}
