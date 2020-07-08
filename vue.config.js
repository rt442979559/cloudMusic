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
        }
    },
}