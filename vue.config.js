const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    configureWebpack:{
        resolve:{
            alias:{
                "assets":'@/assets',
                "common":'@/common',
                "components":'@/components',
                "network":'@/network',
                "views":'@/views',
                "store":'@/store',
            }
        },
        devServer:{
            disableHostCheck: true,
            // proxy: {
            // 'https://api.mtnhao.com/': {
            //         target: 'http://localhost:8080',
            //         changeOrigin: true,
            //         secure: false,
            //     },
            // },
        }
    },
    lintOnSave: true,
    chainWebpack: (config)=>{
        config.resolve.alias
          .set('@$', resolve('src'))
          .set('assets',resolve('src/assets'))
          .set('components',resolve('src/components'))
          .set('layout',resolve('src/layout'))
          .set('base',resolve('src/base'))
          .set('static',resolve('src/static'))
    },
    publicPath:'./'
}
