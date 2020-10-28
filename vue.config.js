module.exports = {
  // publicPath: process.env.NODE_ENV !== 'production' ? '/' : '/vue-blog-admin/dist/',
  publicPath: process.env.NODE_ENV === "gh-pages" ? "/vue-blog-admin/" : "./",

  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        pathRewrite(path, req) {
          return path.replace("/api", "/data") + ".json";
        },
      },
    },
  },
};
