'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: { //开发环境配置，里面配置端口、域名、代理。。。
/* 代理服务器，进入A服务器，没有直接进入A，而是进入B，再通过B进入A，就称A为代理服务器，
 在vue中的代理服务器主要用在开发的时候 访问公司后台服务器，
 如果公司后台服务器已经跨域，用于代理服务器也可以，
 如果没有跨域使用代理服务器就比较方便，可以实现跨域，等开发完以后，
 直接打包项目到服务器，这个时候代理服务就不用去管它了*/
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {/* proxyTable解决跨域：https://www.jianshu.com/p/c27142b8ce1d */
		'/api/cms': {
		target: 'http://localhost:31001',//目标域名接口
		changeOrigin:true, //是否跨域，可以不写，跨不跨域都可以
		pathRewrite: {
			'^/api': ' '   //重写接口，实际请求去掉/api以空字符串代替
		  }
		}//这里可以写多份，加逗号后面，需要重启
	},

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true, //服务器启动后自动打开浏览器
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {//生产环境，里面配置代码打包
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',//打包后放到哪  /是总文件夹里myvue

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
