const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  resolve: {
    // modules: [path.resolve(__dirname, 'source'), path.resolve('node_modules')]
    alias:{
      'vue': 'vue/dist/vue.js'
    },
    modules: [path.resolve('node_modules')]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    })
  ]
}
