const VueMaculaAutoRoutingPlugin = require('vue-macula-auto-routing/lib/webpack-plugin')

module.exports = api => {
  api.chainWebpack(webpackConfig => {
    // prettier-ignore
    webpackConfig
      .plugin('vue-macula-auto-routing')
        .use(VueMaculaAutoRoutingPlugin, [
          {
            pages: 'src/modules',
            nested: true
          }
        ])
  })
}
