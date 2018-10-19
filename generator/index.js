module.exports = api => {
  api.extendPackage({
    dependencies: {
      'vue-router': '^3.0.1',
      'vuex': '^3.0.1',
      'vue-router-layout': '^0.1.2'
    },
    devDependencies: {
      'vue-macula-auto-routing': '^0.3.4'
    }
  })

  api.render('./template')

  if (api.invoking) {
    api.postProcessFiles(files => {
      Object.keys(files).forEach(name => {
        if (/^src\/views[/$]/.test(name)) {
          delete files[name]
        }
        console.log('========' + name)
        if (/^src\/(main.js|router.js|store.js|App.vue)/.test(name)) {
          delete files[name]
        }
      })
    })

    if (api.hasPlugin('typescript')) {
      api.postProcessFiles(files => {
        delete files['src/router.ts']
      })

      const convertFiles = require('@vue/cli-plugin-typescript/generator/convert')
      convertFiles(api)
    }
  }
}
