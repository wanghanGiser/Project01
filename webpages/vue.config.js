module.exports = {
  //配置服务器代理解决跨域
  devServer: {
    proxy: {
      '/api': {
          target: 'http://localhost:8888',
          changeOrigin: true,
          ws: true,
          pathRewrite: {
           '^/api': ''
         }
      }
    }
  }
}