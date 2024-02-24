// 引入express创建 http 服务
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const router = require('./router/index-new')
const cors = require('cors')
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

  const whitelist = ["http://192.168.8.100:3001"]

  const corsOptions = {
  
    origin: function (origin, callback) {
  
      if (!origin || whitelist.indexOf(origin) !== -1) {
  
        callback(null, true)
  
      } else {
        callback()
  
      }
  
    },
  
  
  }
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://192.168.8.100:3001');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Max-Age", "43200");

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      //respond with 200
      res.sendStatus(200);
    }
    else {
    //move on
      next();
    }
  });
  app.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', 'http://192.168.8.100:3001');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Max-Age", "43200");

     res.send(200);
  });
  app.use(cors(corsOptions))
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
  
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
  mongoose.connect('mongodb://localhost:27017/latvian_defence_system', {useNewUrlParser: true}).then(() => {
    console.log('Database connection is successful...')
   
  
  
    app.listen('9999', "0.0.0.0", () => {
      console.log('Server started successfully...')
    })
    
  
  }).catch(error =>{
    console.error('fail to connect to database', error)
  })
  
}

