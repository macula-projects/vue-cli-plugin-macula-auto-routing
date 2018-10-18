module.exports = api => {
  api.extendPackage({
    dependencies: {
      'vue-router-layout': '^0.1.2'
    },
    devDependencies: {
      'vue-macula-auto-routing': '^0.3.1'
    }
  })

  api.render('./template')

  if (api.invoking) {
    api.postProcessFiles(files => {
      Object.keys(files).forEach(name => {
        if (/^src\/modules[/$]/.test(name)) {
          delete files[name]
        }
      })
    })

    if (api.hasPlugin('typescript')) {
      api.postProcessFiles(files => {
        delete files['src/router.ts']
        delete files['src/main.js']
        delete files['src/App.vue']
      })

      const convertFiles = require('@vue/cli-plugin-typescript/generator/convert')
      convertFiles(api)
    }
  }
}
