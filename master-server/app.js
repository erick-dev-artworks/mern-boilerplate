// 引入express创建 http 服务
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const router = require('./router/index-new')
// const compression = require('compression')
// require('appmetrics-dash').monitor();
const cluster = require('cluster')
const os = require('os')
const configuration = require('./configuration')

if(cluster.isMaster & configuration[0]['serverConfig']['isClustering'] === true){
  const nCPUs = os.cpus().length;
  for(let i=0; i<nCPUs; i++){
    console.log('Allocating cluster: ', i, ', and total clusters: ', nCPUs)
    cluster.fork()
  }
} else {
  const app = express()
  // 开放静态资源
  app.use(express.static('./public'))
  // 配置解析post请求中间件 body-parser
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  // 配置解析cookie数据的中间件
  app.use(cookieParser())
  // app.use(compression({
  //   level: 1
  
  // }))
  // 挂载路由容器到app
  app.use(router)
  app.listen('9998', "0.0.0.0", () => {
    console.log('Server started successfully...')
  })
  
}

