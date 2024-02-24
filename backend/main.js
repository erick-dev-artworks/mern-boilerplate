'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const http = require("http")
const os = require('os')
const cluster = require('cluster')
const configuration = require('./configuration')

if(cluster.isMaster & configuration[0]['serverConfig']['isClustering'] === true){
  const nCPUs = os.cpus().length;
  for(let i=0; i<nCPUs; i++){
    console.log('Allocating cluster: ', i, ', and total clusters: ', nCPUs)

    cluster.fork()
  }
} else {
  const app = express();
  const router = express.Router()
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.text({ type: 'text/plain' }))  
  app.use(cors());
  app.use('/api', router);
  
  router.get('/', function(req, res) {
    res.json({ message: 'Rest API initialized!'});
  });
  
  try{

    // wallet engines 
    const listenEmails = require('./routes/email-notifications/email-router');
    app.use('/api/emails/', listenEmails)


  } catch(e){
    console.log(e)
  }
    
  
  
  const httpServer = http.createServer(app);
  
  httpServer.listen(7914, () => {
    console.log("HTTP Server running on port 7914");
  })
  
}
