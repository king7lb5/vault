const path=require("path")

module.exports ={
  configureWebpack:{
     resolve:{
      alias:{
        "api":path.resolve(__dirname,'./src/api'),
        "com":path.resolve(__dirname,'./src/components'),
        "view":path.resolve(__dirname,'./src/views'),
        "uti":path.resolve(__dirname,'./src/utils'),
        "store":path.resolve(__dirname,'./src/store'),
      }
     }
  },
  devServer:{
    proxy:{
      "/tian":{
        target:"http://tian.tianguixing.com:4001/api/private/v1",
        pathRewrite:{
          "/tian":""
        }
      },
      "/9yue":{
        "target":"http://9yuecloud.com:9988/api/private/v1",
        pathRewrite:{
          "/9yue":""
        }
      },
      "/shi":{
        target:"http://shiyansong.cn:8888/api/private/v1",
        pathRewrite:{
          "/shi":""
        }
      },
      "/time":{
        target:"http://timemeetyou.com:8889/api/private/v1",
        pathRewrite:{
          "/time":""
        }
      },
    }
  }
}


//http://tian.tianguixing.com:4001/api/private/v1
//http://9yuecloud.com:9988/api/private/v1
//http://shiyansong.cn:8888/api/private/v1
//http://timemeetyou.com:8889/api/private/v1/