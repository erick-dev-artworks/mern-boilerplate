const express = require('express')
const fileUpload = require('./file-upload')
const router = express.Router()
const MongoClient = require('mongodb').MongoClient;


let db2;
async function connectDatabase(){
  if(!db2){
    var client = await MongoClient.connect('mongodb://localhost:27017/', {useNewUrlParser: true});
    db2 = client.db('admin_database');
    console.log('connected to database server: ', ' mongodb://localhost:27017/' +  'admin_database')
  }
  return db2
}
connectDatabase()

async function chooseDBconnection(collection){
  var res = await db2.collection(collection).find({}).sort({_id:-1}).toArray();
  return res

}

router.post('/system/network', async(req, res) => {
  try{
    var config = await chooseDBconnection('defenced_root') 
    var users = await chooseDBconnection('user-locations')

    var username = Buffer.from(req.body['info']['xsc'], 'base64').toString('ascii')
    var password = Buffer.from(req.body['info']['hvb'], 'base64').toString('hex')


    var matchUser = users.filter(obj => { return obj.username === username & obj.password === password})
    if(matchUser.length > 0){
      var userDB = matchUser[0]['proxy'][0]
      var activeLocation = config[0]['dblist'].filter(obj => { return obj['databaseID'] === userDB})

      if(activeLocation.length > 0){
        var resBodyX = JSON.stringify({
          'user': username,
          '21_vka': (activeLocation[0]['webserver']).toString('hex')
        })

        var resBody = {
          '21_vka': Buffer.from(resBodyX).toString('base64')
        }
        
        res.send({status: 0, data: resBody})
      } else {
        res.send({status: 1})
      }
    } else {
      res.send({status: 1})
    }

  } catch(e){
    if(e !== undefined){
      res.send({status: 1})
    }
  }
})

router.post('/system/network/base', async(req, res) => {
  try{
    var config = await chooseDBconnection('defenced_root')     
    var activeLocation = config[0]['dblist'].filter(obj => { return obj['isDefaultProxy'] === true})
    if(activeLocation.length > 0){
      var resBodyX = JSON.stringify({
        '21_vka': (activeLocation[0]['webserver']).toString('hex')
      })

      var resBody = {
        '21_vka': Buffer.from(resBodyX).toString('base64')
      }
      
      res.send({status: 0, data: resBody})
    } else {
      res.send({status: 1})
    }

  } catch(e){
    if(e !== undefined){
      res.send({status: 1})
    }
  }
})




router.post('/system/network/add', async(req, res) => {
  try{
    var config = await chooseDBconnection('defenced_root') 
    var users = await chooseDBconnection('user-locations')
    
    var username = Buffer.from(req.body['info']['xsc'], 'base64').toString('ascii')
    var password = Buffer.from(req.body['info']['hvb'], 'base64').toString('hex')

    var matchUser = users.filter(obj => { return obj.username === username & obj.password === password})
    if(matchUser.length > 0){

      var userDB = matchUser[0]['proxy'][0]
      var activeLocation = config[0]['dblist'].filter(obj => { return obj['databaseID'] === userDB})
      if(activeLocation.length > 0){
        var resBodyX = JSON.stringify({
          'user': username,
          '21_vka': (activeLocation[0]['webserver']).toString('hex')
        })

        var resBody = {
          '21_vka': Buffer.from(resBodyX).toString('base64')
        }
        
        res.send({status: 0, data: resBody})
      } else {
        res.send({status: 1})
      }
    } else {
      res.send({status: 1})
    }

  } catch(e){
    if(e !== undefined){
      res.send({status: 1})
    }
  }
})


router.post('/system/restrictions2', async(req, res) => {
  try{
    if(req.body.language !== undefined){  
      try{
        var config = await chooseDBconnection('defenced_root') 
  
        var resBody = {
          'login': config[0]['LoginRestricted'],
          'register': config[0]['RegisterRestricted']
        }
  
        res.send({status: 0, data: resBody})
      } catch(e){
        if(e !== undefined){
          res.send({status: 1})
        }
      }
  
    } else {
      res.send({status: 1})
    }
  } catch(e){
    if(e !== undefined){
      res.send({status: 1})
    }
  }
})


fileUpload(router)

module.exports = router



