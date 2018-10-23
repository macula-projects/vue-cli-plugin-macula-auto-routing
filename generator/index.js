module.exports = api => {
  api.extendPackage({
    dependencies: {
      'vue-router': '^3.0.1',
      'vuex': '^3.0.1',
      'vue-router-layout': '^0.1.2',
      "nodemon": "^1.18.4",
      "json-server": "^0.14.0",
      "mockjs": "^1.0.1-beta3"
    },
    devDependencies: {
      'vue-macula-auto-routing': '^0.3.5'
    },
    scripts: {
      "serve": "vue-cli-service serve",
      "build-dev": "vue-cli-service build --mode production.dev",
      "build-test": "vue-cli-service build --mode production.test",
      "build-staging": "vue-cli-service build --mode production.staging",
      "build": "vue-cli-service build",
      "lint": "vue-cli-service lint",
      "mock": "nodemon --watch mock mocks/server.js",
      "test:e2e": "vue-cli-service test:e2e --mode development",
      "test:unit": "vue-cli-service test:unit"
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
