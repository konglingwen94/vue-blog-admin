module.exports = {
  publicPath: process.env.NODE_ENV!=='production'?'':'/vue-blog-admin/dist/',
  // outputDir: './public/dist',
  devServer: {

    proxy: {
      '/api': {

        target: 'http://localhost:8080',
        pathRewrite(path, req) {
          console.log(path.replace('/api', '/data') + '.json')
          return path.replace('/api', '/data') + '.json'

        },

      }
    },
  },
}
