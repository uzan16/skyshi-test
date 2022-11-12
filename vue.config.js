module.exports = {
  transpileDependencies: ["vuetify"],
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "To Do List - Dashboard";
      return args;
    });
  },
  devServer: {
    disableHostCheck: true
  }
};
