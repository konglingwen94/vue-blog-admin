
module.exports = {
  publicPath: process.env.DEPLOY_PUBLICPATH === "gh-pages" ? "/vue-blog-admin/" : "./",

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
