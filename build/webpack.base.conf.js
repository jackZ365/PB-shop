'use strict'   //严格模式
const path = require('path'); //引用路径处理模块
const utils = require('./utils');  //工具模块
const config = require('../config');  //配置模块
const vueLoaderConfig = require('./vue-loader.conf');  //处理vue的配置文件

//公共返回 拼接的路劲
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}


//exports导出 打包的配置对象
module.exports = {
  context: path.resolve(__dirname, '../'),//打包的环境目录/D:\myvue
  entry: { //打包的入口，从哪开始打包，从main.js根组件开始打包
    app: './src/main.js'
  },
  output: { //打包的出口，打包文件到哪去
    path: config.build.assetsRoot, //打包后基本的文件根目录
    filename: '[name].js', //js文件打包的名称
    publicPath: process.env.NODE_ENV === 'production' //打包公共的path路劲
      ? config.build.assetsPublicPath  //
      : config.dev.assetsPublicPath
  },
  resolve: { //返回的数据
    extensions: ['.js', '.vue', '.json'], //打包的文件后缀自动补齐
    alias: { //代替的关键词
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'), //@字符，代表src文件目录
    }
  },
  module: {
    rules: [ /* 打包的规则，正常的webpack只能打包js，如需打包其它文件，要配loader，
		    loader是一个模块，用来编译一些文件或处理一些静态资源的内容，能在浏览器运行的内容*/
      {
        test: /\.vue$/, //打包遇到.vue$这个文件时，就用下面的vue-loader处理文件
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/, //打包遇到.js$这个文件时，就用下面的babel-loader处理
        loader: 'babel-loader', //babel-loader模块可以把es6转es5
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //打包遇到图片文件的url地址时，就用下面的url-loader处理，生成图片
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]') //生成图片，放到那个文件夹
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, //字体文件
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
