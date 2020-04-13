module.exports = {
  publicPath: './',
  outputDir: './public/dist',
  devServer: {
    proxy: {
      '/api': {

        target: 'http://localhost:8080',
        pathRewrite(path, req) {

          return path.replace('/api/admin', '/data') + '.json'

        },

      }
    },
  },
}
