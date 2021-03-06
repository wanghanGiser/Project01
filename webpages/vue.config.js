module.exports = {
  //配置服务器代理解决跨域
  publicPath:"./",
  devServer: {
    https:true,
    proxy: {
      '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          ws: true,
          pathRewrite: {
           '^/api': ''
         }
      }
    },
    disableHostCheck:true
  }
}