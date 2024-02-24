const express = require('express')
const md5 = require('blueimp-md5')
const fileUpload = require('./file-upload')
const UserModel = require('../models/UserModel')
const UserNotificationModel = require('../models/userNotifications');
const ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const configuration = require('../configuration')
const crypto = require('crypto');
const request = require('request')
const router = express.Router()
const languageJS = require('./language')


let db2;
async function connectDatabase(){
  if(!db2){
    var client = await MongoClient.connect('mongodb://localhost:27017/', {useNewUrlParser: true});
    db2 = client.db('database_central');
    console.log('connected to database server: ', ' mongodb://localhost:27017/' +  'database_central')
  }
  return db2
}
connectDatabase()



async function connectDatabase2(uri, dbname){
  var db2x;
  if(!db2x){
    var client = await MongoClient.connect(uri, {useNewUrlParser: true});
    db2x = client.db(dbname);
  }
  return db2x
}


async function saveUserInstance(user, pw, secretHash2XX, proxy){
  try{
    var db2x;
    if(!db2x){
      var client = await MongoClient.connect(configuration[0]['adminDB'], {useNewUrlParser: true});
      db2x = client.db('admin_database');
    }

    var us1 = user
    var pw1 = pw
  
    var create = {
      "username": us1,
      "id": secretHash2XX,
      "proxy": [ proxy ],
      "password": pw1
    }
  
    await db2x.collection('user-locations').insertOne(create)
    return 0
  } catch(e){
    if(e !== undefined){
      return 1
    }
  }

}


async function chooseDBconnection(collection){
  var res = await db2.collection(collection).find({}).sort({_id:-1}).toArray();
  return res

}

async function deleteDBconnection(collection, id){
  var res = await db2.collection(collection).deleteOne( { "_id" : ObjectId(id) } ); 
  return res

}

async function createDBconnection(collection, document){
  var res = await db2.collection(collection).insertOne(document)
  return res

}

async function updateDBconnection(collection, document, newdocument){
  var res = await db2.collection(collection).updateOne(document, newdocument)
  return res
} 

async function pushNewNotification(ID, newnotification){
  try{
    var exitingdata = await chooseDBconnection('users-notification');
    var match = exitingdata.filter(obj => { return obj._id == ID})
    if(match.length > 0){
      var olddata = match[0] 


      var newdata = {
        'username': olddata.username,
        'notifications': [],
        'calendar': olddata['calendar']
      }
      for(var c=0; c<olddata['notifications'].length; c++){
        var info = olddata['notifications'][c]
        newdata['notifications'].push(info)
      }
      newdata['notifications'].push(newnotification)


      var oldValues = olddata
      var newValues = { $set: newdata}
      await updateDBconnection('users-notification', oldValues, newValues)
  
    }
    
  } catch(e){
    if(e !== undefined){
      return 2
    }
  }
  
}

async function updateusersession(ID, method, oldid, oldtoken, hash){
  try{
    var binanceVerify = false
    if(method == 'login'){
      binanceVerify = true
    } else {
      if(method == 'register'){
        binanceVerify = false
      }
    }
    
    var oldValues = { _id: ObjectId(ID), sessionToken: oldtoken, binanceverified: oldid}
    var newValues = { $set: {sessionToken: hash, binanceverified: binanceVerify}}
    await updateDBconnection('users', oldValues, newValues)


    return 0
  } catch(e){
    if(e !== undefined){
      return 2
    }
  }
  
}

async function deleteusersession(ID, token, hash){
  try{
    var oldValues = { _id: ObjectId(ID), sessionToken: token}
    var newValues = { $set: {sessionToken: ""}}
    await updateDBconnection('users', oldValues, newValues)
    
    return 0
  } catch(e){
    if(e !== undefined){
      return 2
    }
  }

}


async function redopassword(oldhash, hash){
  try{
    var oldValues = oldhash
    var newValues = { $set: hash}
    await updateDBconnection('users', oldValues, newValues)

    return 0
  } catch(e){
    if(e !== undefined){
      return 2
    }
  }

}

async function redopasswordXC(email, hash){
  try{
    var exitingdata = await chooseDBconnection('users');
    var match = exitingdata.filter(obj => { return obj.email === email})

    if(match.length > 0){
      var oldValues = match[0]
      var newValues = { $set: hash}
      await updateDBconnection('users', oldValues, newValues)
  
      return 0
    } else {
      return 2
    }
   
  } catch(e){
    if(e !== undefined){
      return 2
    }
  }

}


async function createnewkeys(match){
  try{
    var idata = match
    var apiHash = crypto.createHash('sha256').update(idata['email'] + idata['password'] + idata['username'] + Date.now()).digest('base64');
    var secretHash = crypto.createHash('sha256').update(apiHash + Date.now()).digest('base64');
  

    var oldValues = { _id: ObjectId(idata['_id']), apiKey: idata['apiKey'], secretKey: idata['secretKey']}
    var newValues = { $set: {apiKey: apiHash, secretKey: secretHash}}
    await updateDBconnection('users', oldValues, newValues)

    return {
      'apiKey': apiHash,
      'secretKey': secretHash
    }
  } catch(e){
    if(e !== undefined){
      return 2
    }
  }
  
}

async function updateuser(ID, oldlist, body){
  try{
    var oldValues = { _id: ObjectId(ID), iplist: oldlist}
    var newValues = { $set: {iplist: body['iplist']}}
    await updateDBconnection('users', oldValues, newValues)

    return 0
  } catch(e){
    if(e !== undefined){
      return 2
    }
  }

  
}


async function changeUserStatus(ID, oldname){
  try{
    var oldValues = { _id: ObjectId(ID), isEnabled: oldname}
    var newValues = { $set: {isEnabled: 'true'}}
    await updateDBconnection('users', oldValues, newValues)

    return 0
  } catch(e){
    if(e !== undefined){
      return 2
    }
  }

}


async function changeEmailPIN(ID, emailCode, newCode){
  try{
    var oldValues = { _id: ObjectId(ID), pinCodeResetCode: emailCode}
    var newValues = { $set: {pinCodeResetCode: newCode}}
    await updateDBconnection('users', oldValues, newValues)

    return 0
  } catch(e){
    if(e !== undefined){
      return 1
    }
  }

}


async function changeEmailPIN2(ID, emailCode, pinCode, newCode, newPIN){
  try{
    var oldValues = { _id: ObjectId(ID), pinCodeResetCode: emailCode, pinCode: pinCode}
    var newValues = { $set: {pinCodeResetCode: newCode, pinCode: newPIN}}
    await updateDBconnection('users', oldValues, newValues)

    return 0
  } catch(e){
    if(e !== undefined){
      return 1
    }
  }

}

async function updateIPLIST(ID, newlist, browserdata){
  try{
    var oldlist = newlist
    var newlist = []
    for(var c=0; c<oldlist.length; c++){
      newlist.push(oldlist[c])
    }
    newlist.push(browserdata)

    var oldValues = { _id: ObjectId(ID), iplist: oldlist}
    var newValues = { $set: {iplist: newlist}}
    await updateDBconnection('users', oldValues, newValues)

    return 0
  } catch(e){
    if(e !== undefined){
      return 1
    }
  }

}

async function removeDevice(ID, newlist, code){
  try{
    var exitingdata = await chooseDBconnection('users');
    var match = exitingdata.filter(obj => { return obj._id == (ID).toString()})

    var idata = newlist
    var oldlist = match[0]['iplist']
    var indexIS = ''


    for(var c=0; c<idata.length; c++){
      var listD = idata[c]

      if(listD['uniqueCode'] === code){
        indexIS = c
      }

    }
    idata[indexIS]['isVerified'] = true
  

    var oldValues = { _id: ObjectId(ID), iplist: oldlist}
    var newValues = { $set: {iplist: idata}}
    await updateDBconnection('users', oldValues, newValues)

    return 0
  } catch(e){
    if(e !== undefined){
      return 1
    }
  }

}

async function updateUSERDATA(ID, code, oldpin){
  try{
    var oldValues = { _id: ObjectId(ID), pinCode: oldpin}
    var newValues = { $set: {pinCode: code}}
    await updateDBconnection('users', oldValues, newValues)

    return 0
    
  } catch(e){
    if(e !== undefined){
      return 1
    }
  }

}




async function updateUSERDATA2(ID, panel, locations){
  try{
    var oldValues = { _id: ObjectId(ID), pinCodeLocations: locations}
    var newValues = { $set: {pinCodeLocations: panel}}
    await updateDBconnection('users', oldValues, newValues)

    return 0
  } catch(e){
    if(e !== undefined){
      return 1
    }
  }

}



async function redopasswordXC(email, hash){
  try{
    var exitingdata = await chooseDBconnection('users');
    var match = exitingdata.filter(obj => { return obj.email === email})

    if(match.length > 0){
      var oldValues = match[0]
      var newValues = { $set: hash}
      await updateDBconnection('users', oldValues, newValues)
  
      return 0
    } else {
      return 2
    }
   
  } catch(e){
    if(e !== undefined){
      return 2
    }
  }

}


const POSTapiCall = (URI, body) => {
  return new Promise((resolve, reject) => {
      const options = {
          url: URI,
          body: body,
          json: true
          
      }
      request.post(options, function(error, res, body) {
          if(error) reject(error);
          resolve(body);
      });
  });
}



function decrypt(decryptedkey, sessionkey) {
  const ENC_KEY = sessionkey.slice(0, 32) // set random encryption key
  const IV = sessionkey.slice(0, 16);
  
  // IV = Buffer.from(IV, 'hex');
  let encryptedText = Buffer.from(decryptedkey, 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENC_KEY), IV);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

function generateLoginHash(){
  try{
    var biglist = [
      'yala',
      'furtune',
      'binance',
      'chelsia',
      'eleno',
      'latvietis',
      'polis',
      'bmw',
      'zirgagalva',
      'lielisudi',
      'huma',
      'usa',
      'nolberts',
      'nolbis',
      'dievs',
      'dzive',
      'ir',
      'suds'
    ]
  
    var datenow = Date.now()
    var randomBytes = crypto.randomBytes(128).toString('base64').slice(0, 128)
    var randomwordstring = biglist[Math.floor(Math.random() * biglist.length)]
  
    var lastString = datenow + randomBytes + randomwordstring
  
    return {
      'hash': lastString,
      'validuntil': datenow,
      'verified': false,
      'approved': false,
      'status': 'init',
      'user': '',
      'sessionInfo': {}
    }
  } catch(e){
    if(e !== undefined){
      return 1
    }
  }
  
}

router.post('/manage/qrcode/proof', async(req, res) => {
  try{
    var token = req.body.token

    if(token.length > 0){
      var listTokens = await chooseDBconnection('qrcode-login')
      if(listTokens.length > 0){
        var match = listTokens.filter(obj => { return obj['hash'] === token})
        if(match.length > 0){
          if(match[0]['verified'] === true & match[0]['user'].length > 0 & match[0]['status'] === 'waiting'){
            var sessionInfo = match[0]['sessionInfo']
            // await deleteDBconnection('qrcode-login',  match[0]['_id']) 
            res.send({status: 0, data: sessionInfo})

          } else {
            res.send({status: 1})
          }
        } else {
          res.send({status: 1})
        }
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


router.post('/manage/qrcode/proof2', async(req, res) => {
  try{
    var token = req.body.token
    
    if(token.length > 0){
      var listTokens = await chooseDBconnection('qrcode-login')
      if(listTokens.length > 0){
        var match = listTokens.filter(obj => { return obj['hash'] === token})
        if(match.length > 0){
          if(match[0]['verified'] === true & match[0]['approved'] === true & match[0]['user'].length > 0 & match[0]['status'] === 'waiting'){
            var sessionInfo = match[0]['sessionInfo']
            await deleteDBconnection('qrcode-login',  match[0]['_id']) 
            res.send({status: 0, data: sessionInfo})

          } else {
            res.send({status: 1})
          }
        } else {
          res.send({status: 1})
        }
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


router.post('/manage/qrcode/verify', async(req, res) => {
  try{
    if(req.body.user !== undefined & req.body.session !== undefined & req.body.ssid1 !== undefined & req.body.ssid2 !== undefined){
      var xData1 = req.body.user
      var yKey = req.body.session 
      var ykey1 = req.body.ssid1
      var ykey2 = req.body.ssid2
      var xData = xData1 + ykey1 + ykey2
  
      var decryptData = await decrypt(xData, yKey)
      var user = JSON.parse(decryptData)
  
      var x = user['x']
      var z = user['z']
      var y = user['y']
      var newToken = req.body.token
  
      var listUsers = await chooseDBconnection('users')
      var matcheduser = listUsers.filter(obj => { return obj._id == x})    
      if(matcheduser[0]._id == x & matcheduser[0].apiKey == y & matcheduser[0].secretKey == z){
        if(matcheduser[0].index == 'free'){
          res.send({status: 1})
        } else {
          var listTokens = await chooseDBconnection('qrcode-login')
          if(listTokens.length > 0){
            var matchToken = listTokens.filter(obj => { return obj['hash'] === newToken})
            if(matchToken.length > 0){
              var id = matchToken[0]['_id']
              var newobj = matchToken[0]
              newobj['user'] = matcheduser[0]['username']
              newobj['verified'] = true
              newobj['status'] = 'waiting'
              newobj['approved'] = false
              newobj['sessionInfo'] = {
                'x': matcheduser[0]['username'],
                'y': matcheduser[0]['password'],
              }
              delete newobj['_id']
              await deleteDBconnection('qrcode-login', id) 
              await createDBconnection('qrcode-login', newobj)
              res.send({status: 0})
            } else {
              res.send({status: 1})
            }

          } else {
            res.send({status: 1})
          }
        }
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


router.post('/manage/qrcode/verify2', async(req, res) => {
  try{
    if(req.body.user !== undefined & req.body.session !== undefined & req.body.ssid1 !== undefined & req.body.ssid2 !== undefined){
      var xData1 = req.body.user
      var yKey = req.body.session 
      var ykey1 = req.body.ssid1
      var ykey2 = req.body.ssid2
      var xData = xData1 + ykey1 + ykey2
  
      var decryptData = await decrypt(xData, yKey)
      var user = JSON.parse(decryptData)
  
      var x = user['x']
      var z = user['z']
      var y = user['y']
      var newToken = req.body.token
  
      var listUsers = await chooseDBconnection('users')
      var matcheduser = listUsers.filter(obj => { return obj._id == x})    
      if(matcheduser[0]._id == x & matcheduser[0].apiKey == y & matcheduser[0].secretKey == z){
        if(matcheduser[0].index == 'free'){
          res.send({status: 1})
        } else {
          var listTokens = await chooseDBconnection('qrcode-login')
          if(listTokens.length > 0){
            var matchToken = listTokens.filter(obj => { return obj['hash'] === newToken})
            if(matchToken.length > 0){
              var id = matchToken[0]['_id']
              var newobj = matchToken[0]
              newobj['approved'] = true
             
              delete newobj['_id']
              await deleteDBconnection('qrcode-login', id) 
              await createDBconnection('qrcode-login', newobj)
              res.send({status: 0})
            } else {
              res.send({status: 1})
            }

          } else {
            res.send({status: 1})
          }
        }
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

router.post('/manage/qrcode/random', async(req, res) => {
  try{
    var ss1 = await generateLoginHash()
    if(ss1 !== 1){
      var loginQR = await chooseDBconnection('qrcode-login')
      if(loginQR.length > 0){
        var match = loginQR.filter(obj => { return obj['hash'] === ss1['hash']})
        if(match.length === 0){
          await createDBconnection('qrcode-login', ss1)
          res.send({status: 0, data: ss1})
        } else {
          await deleteDBconnection('qrcode-login', match[0]._id) 
          var ss1c = await generateLoginHash()
          if(ss1c !== 1){
            await createDBconnection('qrcode-login', ss1c)
            res.send({status: 0, data: ss1c})
          } else {
            res.send({status: 1})
          }
          
        }
      } else {
        await createDBconnection('qrcode-login', ss1)
        res.send({status: 0, data: ss1})
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


router.post('/register', async(req, res) => {
  try{
    var recieveLocales = await languageJS()
    var e1 = recieveLocales['ENG']['register']['e1']
    var e2 = recieveLocales['ENG']['register']['e2']

    const {userName, email, password, phonenumber, county, language, iplist} = req.body


    UserModel.findOne({userName})
      .then(async(user) => {
        if (user) {
          res.send({status: 3, msg: e1})
        } else {
            var connectDB = await connectDatabase2('mongodb://localhost:27017', 'admin_database')
            var clientX = await connectDB.collection('defenced_root').find({}).sort({_id:-1}).toArray();

            if(clientX.length > 0){
              var infoX = clientX[0]

              var freeInstances = []
              for(var y=0; y<infoX['dblist'].length; y++){
                  var instanceXC = infoX['dblist'][y]
  
                  if(instanceXC['users'] < instanceXC['totalusers'] & instanceXC['isDefaultProxy'] === false){
                      if(instanceXC['status'] === "online"){
                          freeInstances.push(instanceXC)
                      }
  
                  }
  
              }

              if(freeInstances.length > 0){
                var reduced = freeInstances.reduce(function(res, obj) {
                    return (obj.users < res.users & obj.totalusers > res.totalusers & obj.status === "online") ? res : obj;
                });

                var mongoDB = reduced['databaseID']
                var apiHash = crypto.createHash('sha256').update(email + password + userName + Date.now()).digest('hex');
                var secretHash = crypto.createHash('sha256').update(apiHash + Date.now()).digest('hex');
                var secretHashXX = crypto.createHash('sha256').update(password + apiHash + Date.now()).digest('hex');
                var secretHash2XX = secretHashXX.slice(0, 14)
                var status = await saveUserInstance(userName, md5(password || 'pubdreamcc'), secretHash2XX, mongoDB)

                if(status === 0){
                  var appConfig = await chooseDBconnection('app-configuration')
                  var registerDisabled = appConfig[0]['RegisterRestricted']
                  
                  if(registerDisabled == false){
                 
      
                  var secretHash2 = secretHash.slice(8, 16)
                  var uri1 = configuration[0]['backendURI'] + '/#/register/confirm/' + secretHash + secretHash2

                  
                  UserModel.create({
                    username: userName,
                    userID: secretHash2XX,
                    email: email,
                    emailDetails: {
                      emailChangeTimes: 0,
                      emailDate: "",
                      emailCode: ""
                    },
                    apiKey: apiHash, 
                    bots: "0",
                    lobbies: "0",
                    campaigns: "0",
                    diagrams: "0",
                    documents: "0",
                    secretKey: secretHash,
                    iplist: iplist,
                    password: md5(password || 'pubdreamcc'),  
                    index: '3',
                    emailverification: secretHash2,
                    verificationdate: Date.now(),
                    binanceverified: false,
                    resettime: "",
                    reset2fa: { "url": "", "code": "", "time": ""},
                    resetpin: { "url": "", "code": "", "time": ""},
                    isEnabled: 'true',
                    emailuri: uri1,
                    sessionToken: '',
                    favPairs: [],
                    phone: phonenumber,
                    isfirstTimeUser: 'true',
                    phoneDetails: {
                      phoneChangeTimes: 0,
                      phoneDate: '',
                      phoneZone: ''
                    },
                    newPhoneCode: {},
                    language: language,
                    authyTypes: [],
                    pinCode: "",
                    pinCodeResetCode: "",
                    pinCodeLocations: {
                      "dashboard": false,
                      "bots": false,
                      "wallet": false,
                      "apisettings": false,
                      "usersettings": false,
                      "tradehistory": false,
                      "signalhistory": false
                    },
                    authyURI: "",
                    authyID: '',
                    country: county,
                    isSuspended: false,
                    favWalletPairs: [],
                    tradeRestricted: false,
                    spotBotRestricted: {
                        tradingbot: false,
                        trailingbot: false
                    },
                    futuresBotRestricted: {
                        tradingbot: false,
                        trailingbot: false
                    },
                    marginBotRestricted: {
                      "tradingbot": false,
                      "trailingbot": false
                    },
                    PlannerRestricted: false,
                    LoginRestricted: false,
                    RegisterRestricted: false,
                    startingBalance: 0.00,
                    goalincrease:  0.00,
                    assetNotifications: 'disabled',
                    goaldate: "",
                    totalrequests: {
                      "trades": 0,
                      "account": 0,
                      "bots": [],
                    }
      
                  })

                  UserNotificationModel.create({
                    username: userName,
                    notifications: [],
                    calendar: [
                      {
                        "events": [],
                        "bots": [],
                        "planners": [],
                        "allevents": [],
                        "celebration": []
                      }
                    ]
                  })
                  var requestBOD1 = {
                    'username': userName,
                    'email': email,
                    'code': secretHash2,
                    'link': uri1,
                    'date': new Date(Date.now()).toLocaleString()
                  
                  }
                  var uri1 = configuration[0]['backendURI'] + '/api/emails/register'
        
                  await POSTapiCall(uri1, requestBOD1) 
      
                  var bod1 = {
                    'x': Date.now(),
                    'y': apiHash,
                    'z': secretHash
                  }
                  var hash = await crypto.createHash('sha256').update(bod1 + Date.now()).digest('base64');
                  var bod = {
                    'a': hash,
                    'x': Date.now(),
                    'y': apiHash,
                    'z': secretHash
      
                  }
                  await updateusersession(user['_id'], 'register', user['binanceverified'], user['sessionToken'], hash)
                  res.send({status: 0, data: bod})
                
                }
                }
              } else {
                return res.send({status: 1, msg: e2})
              }
              
            }
        }
      }) .catch(error => {
        res.send({status: 1, msg: e2})
      })
  } catch(e){
    if(e !== undefined){
      res.send({status: 1, msg: e2})
    }
  }
  
})

router.post('/manage/reset/login', async(req, res) => {
  try{
    const { email } = req.body
    if(email.length > 0){
      var listUsers = await chooseDBconnection('users')
      var isExisting = false
      var error = 0
      var userinfo = []
      for(var j=0; j<listUsers.length; j++){
        var dataX = listUsers[j]

        if(dataX['email'] === email){
          if(dataX['resettime'].length > 0){
            var datenow = Date.now() 
            var datebefore = Number(dataX['resettime']) + 86400000
  
            if(datebefore < datenow){
              isExisting = true
              userinfo.push(dataX)
            } else {
              isExisting = false
              error = 1
            }   
          } else {
            isExisting = true
            userinfo.push(dataX)
          }
         
         
        }
      }
      var oldBody = userinfo[0]

      if(isExisting === true){
        var hash = await crypto.createHash('sha256').update(email + Date.now()).digest('hex');
        var urlname = 'http://localhost:3000/#/forgot-password/' + (hash).slice(0, 49)

       
        var body = userinfo[0]
        body['reseturl'] = urlname


        await redopassword(oldBody, body)

        var requestBOD1 = {
          'username': '',
          'link': urlname,
          'email': email,
          'date': new Date(Date.now()).toLocaleString()
        
        }
        var uri1 = configuration[0]['backendURI'] + '/api/emails/changepw'

        await POSTapiCall(uri1, requestBOD1) 
        res.send({status: 0})
      } else {
        if(error === 1){
          res.send({status: 2})
        } else {
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


router.post('/manage/reset/login2', async(req, res) => {
  try{
    const { email } = req.body
    if(email.length > 0){
      var listUsers = await chooseDBconnection('users')
      var isExisting = false
      var error = 0
      var userinfo = []

      for(var j=0; j<listUsers.length; j++){
        var dataX = listUsers[j]

        if(dataX['email'] === email){
          if(dataX['reset2fa']['time'].length > 0){
            var datenow = Date.now() 
            var datebefore = Number(dataX['reset2fa']['time']) + 86400000
  
            if(datebefore < datenow){
              isExisting = true
              userinfo.push(dataX)
            } else {
              isExisting = false
              error = 1
            }   
          } else {
            isExisting = true
            userinfo.push(dataX)
          }
         
         
        }
      }

      if(isExisting === true){
        var hash = await crypto.createHash('sha256').update(email + Date.now()).digest('hex');
        var urlname = 'http://localhost:3000/#/forgot-password/' + '01xcnV' + (hash).slice(0, 16)

       
        userinfo[0]['reset2fa']['url'] = urlname

        await redopasswordXC(email, userinfo[0])

        var requestBOD1 = {
          'username': '',
          'link': urlname,
          'email': email,
          'date': new Date(Date.now()).toLocaleString()
        
        }
      
        var uri1 = configuration[0]['backendURI'] + '/api/emails/remove2fa'

        await POSTapiCall(uri1, requestBOD1) 
        res.send({status: 0})
      } else {
        if(error === 1){
          res.send({status: 2})
        } else {
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


router.post('/manage/reset/login3', async(req, res) => {
  try{
    const { email } = req.body
    if(email.length > 0){
      var listUsers = await chooseDBconnection('users')
      var isExisting = false
      var error = 0
      var userinfo = []

      for(var j=0; j<listUsers.length; j++){
        var dataX = listUsers[j]

        if(dataX['email'] === email){
          if(dataX['resetpin']['time'].length > 0){
            var datenow = Date.now() 
            var datebefore = Number(dataX['resetpin']['time']) + 86400000
  
            if(datebefore < datenow){
              isExisting = true
              userinfo.push(dataX)
            } else {
              isExisting = false
              error = 1
            }   
          } else {
            isExisting = true
            userinfo.push(dataX)
          }
         
         
        }
      }

      if(isExisting === true){
        var hash = await crypto.createHash('sha256').update(email + Date.now()).digest('hex');
        var urlname = 'http://localhost:3000/#/forgot-password/' + '01VcnG' + (hash).slice(0, 16)

       
        userinfo[0]['resetpin']['url'] = urlname

        await redopasswordXC(email, userinfo[0])

        var requestBOD1 = {
          'username': '',
          'link': urlname,
          'email': email,
          'date': new Date(Date.now()).toLocaleString()
        
        }
      
        var uri1 = configuration[0]['backendURI'] + '/api/emails/removePIN'

        await POSTapiCall(uri1, requestBOD1) 
        res.send({status: 0})
      } else {
        if(error === 1){
          res.send({status: 2})
        } else {
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


router.post('/manage/reset/confirm', async(req, res) => {
  try{
    const { body } = req.body
    var listUsers = await chooseDBconnection('users')
      
    // 5a79b26e3443f0aebb6601cb6d9ed6bb
    var matchX = listUsers.filter(obj => { return obj.username === body['username']})

    if(matchX.length > 0){
      if(body['password'].length > 0){

        if(matchX[0]['reseturl'] !== "link expired"){
          var newhash = md5(body['password'] || 'pubdreamcc')
          var oldBody = matchX[0]

          var newbody = matchX[0]
          newbody['password'] = newhash
          newbody['reseturl'] = ''
          newbody['resetcode'] = ''
          newbody['resettime'] = (Date.now()).toString()

          var requestBOD1 = {
            'username': '',
            'email': newbody['email'],
            'date': new Date(Date.now()).toLocaleString()
          
          }
          var uri1 = configuration[0]['backendURI'] + '/api/emails/pwsuccess'
  
          await redopassword(oldBody, newbody)
          await POSTapiCall(uri1, requestBOD1) 
  
          res.send({status: 0})
        } else {
          res.send({status: 1})
        }
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




router.post('/manage/reset/verifyX', async(req, res) => {
  try{
    const { link } = req.body
    if(link.length > 0){
      var listUsers = await chooseDBconnection('users')
      
      var statusX = 1
      var body1 = {
        'status': 1
      }
      for(var j=0; j<listUsers.length; j++){
        var dataX = listUsers[j]

        
        if(dataX['reset2fa'] !== undefined){
          var linkX = dataX['reset2fa']['url'].split('forgot-password/')
          var idX = linkX[1]
  
          if(link === idX){
            var datenow = Date.now() 
            var datebefore = Number(dataX['reset2fa']['time']) + 86400000
  
            if(datebefore < datenow){
              var hash = await crypto.createHash('sha256').update(dataX['username'] + Date.now()).digest('hex');
              var newstring = hash.slice(0, 12)
      
      
              dataX['reset2fa']['code'] = (newstring).toString()
              var requestBOD1 = {
                'username': '',
                'email': dataX['email'],
                'code': newstring,
                'date': new Date(Date.now()).toLocaleString()
              
              }
              var uri1 = configuration[0]['backendURI'] + '/api/emails/2facode'  
              await POSTapiCall(uri1, requestBOD1) 

              await redopasswordXC(dataX['email'], dataX)
      
      
              if(idX === link){
                body1['status'] = 0
                statusX = 0
              }
            } else {
              res.send({status: 2})
            }
  
           
          }
          
        }
       

        
      }

      res.send({
        status: statusX, data: body1
      })
    } else {
      res.send({status: 1})
    }
  } catch(e){
    if(e !== undefined){
      res.send({status: 1})
    }
  }


})


router.post('/manage/reset/verifyX2', async(req, res) => {
  try{
    const { link } = req.body
    if(link.length > 0){
      var listUsers = await chooseDBconnection('users')
      
      var statusX = 1
      var body1 = {
        'status': 1
      }
      for(var j=0; j<listUsers.length; j++){
        var dataX = listUsers[j]

        
        if(dataX['resetpin'] !== undefined){
          var linkX = dataX['resetpin']['url'].split('forgot-password/')
          var idX = linkX[1]
  
          if(link === idX){
            var datenow = Date.now() 
            var datebefore = Number(dataX['resetpin']['time']) + 86400000
  
            if(datebefore < datenow){
              var hash = await crypto.createHash('sha256').update(dataX['username'] + Date.now()).digest('hex');
              var newstring = hash.slice(0, 12)
      
      
              dataX['resetpin']['code'] = (newstring).toString()
              var requestBOD1 = {
                'username': '',
                'email': dataX['email'],
                'code': newstring,
                'date': new Date(Date.now()).toLocaleString()
              
              }
              var uri1 = configuration[0]['backendURI'] + '/api/emails/PINcode'  
              await POSTapiCall(uri1, requestBOD1) 

              await redopasswordXC(dataX['email'], dataX)
      
      
              if(idX === link){
                body1['status'] = 0
                statusX = 0
              }
            } else {
              res.send({status: 2})
            }
  
           
          }
          
        }
       

        
      }

      res.send({
        status: statusX, data: body1
      })
    } else {
      res.send({status: 1})
    }
  } catch(e){
    if(e !== undefined){
      res.send({status: 1})
    }
  }


})

router.post('/manage/reset/verify', async(req, res) => {
  try{
    const { link } = req.body
    if(link.length > 0){
      var listUsers = await chooseDBconnection('users')
      
      var statusX = 1
      var body1 = {
        'status': 1
      }
      for(var j=0; j<listUsers.length; j++){
        var dataX = listUsers[j]

        
        var linkX = dataX['reseturl'].split('forgot-password/')
        var idX = linkX[1]

        if(link === idX){
          var datenow = Date.now() 
          var datebefore = Number(dataX['resettime']) + 86400000

          var oldBody = dataX
          if(datebefore < datenow){
            var hash = await crypto.createHash('sha256').update(dataX['username'] + Date.now()).digest('hex');
            var newstring = hash.slice(0, 12)
    
    
            dataX['resetcode'] = (newstring).toString()
            var requestBOD1 = {
              'username': '',
              'email': dataX['email'],
              'code': newstring,
              'date': new Date(Date.now()).toLocaleString()
            
            }
            var uri1 = configuration[0]['backendURI'] + '/api/emails/pwcode'
    
            await POSTapiCall(uri1, requestBOD1) 
            await redopassword(oldBody, dataX)
    
    
            if(idX === link){
              body1['status'] = 0
              statusX = 0
            }
          } else {
            res.send({status: 2})
          }

         
        }
        

        
      }

      res.send({
        status: statusX, data: body1
      })
    } else {
      res.send({status: 1})
    }
  } catch(e){
    if(e !== undefined){
      res.send({status: 1})
    }
  }


})

router.post('/manage/reset/verifytoken', async(req, res) => {
  try{
    const { code } = req.body
    if(code.length > 0){
      var listUsers = await chooseDBconnection('users')
      
      var statusX = 1
      var body1 = {
        'status': 1
      }

      for(var j=0; j<listUsers.length; j++){
        var dataX = listUsers[j]

        if(dataX['resetcode'] === code){
          body1['status'] = 0
          statusX = 0

        }
      }

      res.send({
        status: statusX, data: body1
      })
    } else {
      res.send({status: 1})
    }
  } catch(e){
    if(e !== undefined){
      res.send({status: 1})
    }
  }


})


router.post('/manage/reset/verifypin', async(req, res) => {
  try{
    const { code } = req.body
    if(code.length > 0){
      var listUsers = await chooseDBconnection('users')
      
      var statusX = 1
      var body1 = {
        'status': 1
      }

      var userMatch = []
      for(var j=0; j<listUsers.length; j++){
        var dataX = listUsers[j]

        if(dataX['resetpin'] !== undefined){
          if(dataX['resetpin']['code'] === code){
            body1['status'] = 0
            statusX = 0
            userMatch = dataX
          }
        }
       
      }

      if(statusX === 0){
        userMatch['resetpin']['url'] = ""
        userMatch['resetpin']['code'] = ""
        userMatch['authyURI'] = ""
        userMatch['authyID'] = ""
        userMatch['authyTypes'] = []

        await redopasswordXC(userMatch['email'], userMatch)

        res.send({
          status: statusX, data: body1
        })

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


router.post('/manage/reset/verify2fa', async(req, res) => {
  try{
    const { code } = req.body
    if(code.length > 0){
      var listUsers = await chooseDBconnection('users')
      
      var statusX = 1
      var body1 = {
        'status': 1
      }

      var userMatch = []
      for(var j=0; j<listUsers.length; j++){
        var dataX = listUsers[j]

        if(dataX['reset2fa'] !== undefined){
          if(dataX['reset2fa']['code'] === code){
            body1['status'] = 0
            statusX = 0
            userMatch = dataX
          }
        }
       
      }

      if(statusX === 0){
        userMatch['reset2fa']['url'] = ""
        userMatch['reset2fa']['code'] = ""
        userMatch['authyURI'] = ""
        userMatch['authyID'] = ""
        userMatch['authyTypes'] = []

        await redopasswordXC(userMatch['email'], userMatch)

        res.send({
          status: statusX, data: body1
        })

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

router.post('/login', async(req, res) => {
    try{
        var recieveLocales = await languageJS()

        var language = req.body.language
        var e1 = recieveLocales[language]['login']['e1']
        var e2 = recieveLocales[language]['login']['e2']
        var e3 = recieveLocales[language]['login']['e3']

        const {username, password} = req.body
        UserModel.findOne({username, password: md5(password)})
        .then(async(user) => {
            if (user) {
              if(user['LoginRestricted'] !== true){
                if(user['sessionToken'].length > 0){
                  var bod = {
                    'a': user['sessionToken'],
                    'x': user['_id'],
                    'y': user['apiKey'],
                    'z': user['secretKey']
                  }
                  res.send({status: 0, data: bod})
                } else {
                  var bod1 = {
                    'x': user['_id'],
                    'y': user['apiKey'],
                    'z': user['secretKey']
                  }
                  var hash = await crypto.createHash('sha256').update(bod1 + Date.now()).digest('base64');
                  var bod = {
                    'a': hash,
                    'x': user['_id'],
                    'y': user['apiKey'],
                    'z': user['secretKey']
                  }
                  
                  try{
                    await updateusersession(user['_id'], 'login', user['binanceverified'], user['sessionToken'], hash)
                  } catch(e){
                    if(e !== undefined){
                      res.send({status: 1, data: bod})
                    }
                  }
                 
                  res.send({status: 0, data: bod})
                }
              } else {
                res.send({status: 1, msg: e1})
              }
    
              
              
            } else {
              res.send({status: 1, msg: e2})
            }
        }).catch(error => {
          res.send({status: 1, msg: e3})
        })
  
    } catch(e){
      if(e !== undefined){
        res.send({status: 1, msg: e3})
      }
    }
    
})


router.post('/loginQR', async(req, res) => {
  try{
      var recieveLocales = await languageJS()

      var language = req.body.language
      var e1 = recieveLocales[language]['login']['e1']
      var e2 = recieveLocales[language]['login']['e2']
      var e3 = recieveLocales[language]['login']['e3']

      const {username, password} = req.body
      UserModel.findOne({username, password: password})
      .then(async(user) => {
          if (user) {
            if(user['LoginRestricted'] !== true){
              if(user['sessionToken'].length > 0){
                var bod = {
                  'a': user['sessionToken'],
                  'x': user['_id'],
                  'y': user['apiKey'],
                  'z': user['secretKey']
                }

                res.send({status: 0, data: bod})
              } else {
                var bod1 = {
                  'x': user['_id'],
                  'y': user['apiKey'],
                  'z': user['secretKey']
                }
                var hash = await crypto.createHash('sha256').update(bod1 + Date.now()).digest('base64');
                var bod = {
                  'a': hash,
                  'x': user['_id'],
                  'y': user['apiKey'],
                  'z': user['secretKey']
                }
                
                try{
                  await updateusersession(user['_id'], 'login', user['binanceverified'], user['sessionToken'], hash)
                } catch(e){
                  if(e !== undefined){
                    res.send({status: 1, data: bod})
                  }
                }
               
                res.send({status: 0, data: bod})
              }
            } else {
              res.send({status: 1, msg: e1})
            }
  
            
            
          } else {
            res.send({status: 1, msg: e2})
          }
      }).catch(error => {
        res.send({status: 1, msg: e3})
      })

  } catch(e){
    if(e !== undefined){
      res.send({status: 1, msg: e3})
    }
  }
  
})



router.post('/logout', async(req, res) => {
  try{
if(req.body.user !== undefined & req.body.session !== undefined & req.body.ssid1 !== undefined & req.body.ssid2 !== undefined){
        var recieveLocales = await languageJS()

        var language = req.body.language
        var e1 = recieveLocales[language]['logout']['e1']
        
        var xData1 = req.body.user
        var yKey = req.body.session 
        var ykey1 = req.body.ssid1
        var ykey2 = req.body.ssid2
        var xData = xData1 + ykey1 + ykey2
    
        var decryptData = await decrypt(xData, yKey)
        var user = JSON.parse(decryptData)
  
        var x = user['x']
        var z = user['z']
        var y = user['y']
  
  
        try{
            var listUsers = await chooseDBconnection('users')
            var matcheduser = listUsers.filter(obj => { return obj._id == x})
            if(matcheduser[0]._id == x & matcheduser[0].apiKey == y & matcheduser[0].secretKey == z){
              await deleteusersession(matcheduser[0]['_id'], matcheduser[0]['sessionToken'], '')
              res.send({status: 0})
            } else {
              res.send({status: 0, msg: e1})
            }

        } catch(e){
            if(e !== undefined){
                res.send({status: 0, msg: e1})
            }
        }
  
    } else {
      res.send({status: 0, msg: e1})
    }
  } catch(e){
    if(e !== undefined){
      res.send({status: 1})
    }
  }
})
  


router.post('/session/start', async(req, res) => {
  try{
    if(req.body.user !== undefined & req.body.session !== undefined & req.body.ssid1 !== undefined & req.body.ssid2 !== undefined){
      var recieveLocales = await languageJS()

      var language = req.body.language
      var e1 = recieveLocales[language]['startSession']['e1']
      
      var xData1 = req.body.user
      var yKey = req.body.session 
      var ykey1 = req.body.ssid1
      var ykey2 = req.body.ssid2
      var xData = xData1 + ykey1 + ykey2
  
      var decryptData = await decrypt(xData, yKey)
      var user = JSON.parse(decryptData)
  
  
      var uri = configuration[0]['sessionURI'] + '/api/session'
      var body = {
        'apiKey': 'bGF0dmlhIGhlbGFsbyB3b3JhbGQhMTYyMTI2NDY1MTQ4NWVyaWNrZGV2c2',
        'secretKey': 'KlygMbdab5BSxIT9Z/6pY/wsXpWKs4nAcJ/RUwv1hl0=',
        'body': user
      }
  
      var requestres = await POSTapiCall(uri, body)
      if(requestres['status'] == 'success'){
        res.send({status: 0, requestres})
      } else {
        res.send({status: 1, msg: e1})
      }
    } else {
      res.send({status: 1, msg: e1})
    }
  } catch(e){
    if(e !== undefined){
      res.send({status: 1})
    }
  } 
})



router.post('/session/end', async(req, res) => {
  try{
    if(req.body.user !== undefined & req.body.session !== undefined & req.body.ssid1 !== undefined & req.body.ssid2 !== undefined){
      var recieveLocales = await languageJS()

      var language = req.body.language
      var e1 = recieveLocales[language]['endSession']['e1']

      var xData1 = req.body.user
      var yKey = req.body.session 
      var ykey1 = req.body.ssid1
      var ykey2 = req.body.ssid2
      var xData = xData1 + ykey1 + ykey2
  
      var decryptData = await decrypt(xData, yKey)
      var user = JSON.parse(decryptData)
  
      var x = user['x']
      var z = user['z']
      var y = user['y']
  
      try{
        var listUser = await chooseDBconnection('users')
        var matcheduser = listUser.filter(obj => { return obj._id == x})
        if(matcheduser[0]._id == x & matcheduser[0].apiKey == y & matcheduser[0].secretKey == z){    
          var updateParams = await deleteusersession(matcheduser[0]['_id'], matcheduser[0]['sessionToken'])
  
          if(updateParams == 0){
            res.send({status: 0})
          } else {
            res.send({status: 1, msg: e1})
          }
  
  
        } else {
          res.send({ status: 1, msg: e1})
        }
      } catch(e){
        if(e !== undefined){
          res.send({ status: 1, msg: e1})
        }
      }
    } else {
      res.send({status: 1, msg: e1})
    }
  } catch(e){
    if(e !== undefined){
      res.send({status: 1})
    }
  }
    
    
})


router.post('/register/confirm', async(req, res) => {
  try{
    if(req.body.pw !== undefined){
      if(req.body.pw == 's11x12aAaS1DG43y52SGfgddf313pd5sfSA123Dq'){
        var recieveLocales = await languageJS()

        var language = req.body.language
        var e1 = recieveLocales[language]['verifyRegister']['e1']
        var e2 = recieveLocales[language]['verifyRegister']['e1']
        var s1 = recieveLocales[language]['verifyRegister']['success']['s1']

        var code = req.body.body.code
  
        var listUsers = await chooseDBconnection('users')
        var match = listUsers.filter(obj => { return obj.username === req.body.body.username})
        if(match.length > 0){
          var matchCode = match[0].emailverification
  
          if(matchCode == code){
            await changeUserStatus(match[0]['_id'], match[0].isEnabled)
            res.send({status: 0, msg: s1})          
          } else {
            res.send({status: 1, msg: e1})
          }
        } else {
          res.send({status: 1, msg: e2})
        }
  
      } else {
        res.send({status: 1, msg: e2})
      }
    } else {
      res.send({status: 1, msg: e2})
    }
  } catch(e){
    if(e !== undefined){
      res.send({status: 1, msg: e2})
    }
  }
  
})

router.post('/manage/pincode/verify2c', async(req, res) => {
  try{
    var { name, email, token } = req.body 

    if(token === 'amk141mk141mk14mk14171mk141sd2k3mk1411@$!' ){
      var listCodes = await chooseDBconnection('users')
      if(listCodes.length > 0){
        var status = true
        for(var t=0; t<listCodes.length; t++){
          var info = listCodes[t]
  
          if(info['username'] === name){
            status = false
          }
          if(info['email'] === email){
            status = false
          }
        }


        if(status === true){
          res.send({status: 0})
        } else {
          res.send({status: 1})
        }
  
      } else {
        res.send({status: 0})
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




router.post('/manage/user/name', async(req, res) => {
  try{
    if(req.body.user !== undefined & req.body.session !== undefined & req.body.ssid1 !== undefined & req.body.ssid2 !== undefined){
      var recieveLocales = await languageJS()
  
      var language = req.body.language
      var e1 = recieveLocales[language]['userinfo']['e1']
      
      var xData1 = req.body.user
      var yKey = req.body.session 
      var ykey1 = req.body.ssid1
      var ykey2 = req.body.ssid2
      var xData = xData1 + ykey1 + ykey2
      var decryptData = await decrypt(xData, yKey)
      var user = JSON.parse(decryptData)
      var x = user['x']
      var z = user['z']
      var y = user['y']
  
      try{
          var listUsers = await chooseDBconnection('users')
          var matcheduser = listUsers.filter(obj => { return obj._id == x})
  
          if(matcheduser[0]._id == x & matcheduser[0].apiKey == y & matcheduser[0].secretKey == z){
            var apiKeys = await chooseDBconnection('settings')
            var matchingSettings = apiKeys.filter(obj => { return obj.username === matcheduser[0].username})
            
            var statusXC = false
            if(matchingSettings.length > 0){
              statusXC = true
            }
  
            var statusVerified = true
  
            if(matchingSettings.length > 0){
              var dateNow = new Date(Date.now()).toLocaleString()
              var addedDate = new Date(matcheduser[0]['original_time']).toLocaleString()
    
              if(dateNow >= addedDate){
                statusVerified = false
              }
            } else {
              statusVerified = false
            }
            
  
            var body = {
              'user': matcheduser[0].username,
              'email': matcheduser[0].email,
              'isapi': statusXC,
              'isverified': statusVerified,
              'locations': matcheduser[0]['pinCodeLocations'],
              'firsttime': matcheduser[0]['isfirstTimeUser']
            }
            res.send({status: 0, data: body})
          } else {
              res.send({status: 1, msg: e1})
          }
      } catch(e){
        if(e !== undefined){
          res.send({status: 1, msg: e1})
        }
      }
  
    } else {
      res.send({status: 1, msg: e1})
    }
  } catch(e){
    if(e !== undefined){
      res.send({status: 1})
    }
  }
  

})




router.post('/manage/user/permissions/update', async(req, res) => {
  try{
    if(req.body.user !== undefined & req.body.session !== undefined & req.body.ssid1 !== undefined & req.body.ssid2 !== undefined){
      var recieveLocales = await languageJS()
  
      var language = req.body.language
      var e1 = recieveLocales[language]['usersettings']['permissions']['update']['e1']
  
      var ipdata = req.body.ip
      var xData1 = req.body.user
      var yKey = req.body.session 
      var ykey1 = req.body.ssid1
      var ykey2 = req.body.ssid2
      var xData = xData1 + ykey1 + ykey2
  
      var decryptData = await decrypt(xData, yKey)
      var user = JSON.parse(decryptData)
  
      var x = user['x']
      var z = user['z']
      var y = user['y']
  
      try{
        var listUsers = await chooseDBconnection('users')
        var matcheduser = listUsers.filter(obj => { return obj._id == x})
      
        if(matcheduser[0]._id == x & matcheduser[0].apiKey == y & matcheduser[0].secretKey == z){
          var userdata = matcheduser[0]
  
          var userIPS = userdata['iplist']
          var isOnlyDevice = true
  
          if(userIPS.length > 0){
            for(var t=0; t<userIPS.length; t++){
              var infoX = userIPS[t]
  
              if(infoX['system'] === ipdata['system'] & infoX['continent'] === ipdata['continent'] & infoX['country'] === ipdata['country'] & infoX['uniqueCode'] === ipdata['uniqueCode']){
                if(userIPS.length >= 1){
                  isOnlyDevice = false
                }
              }
            }
  
          }
  
  
          if(isOnlyDevice === true){
            res.send({status: 2})
          } else {
            var ca = userdata['iplist'].filter(function(e) { return JSON.stringify(e) !== JSON.stringify(ipdata) })
            userdata['iplist'] = ca
            await updateuser(matcheduser[0]['_id'], matcheduser[0]['iplist'], userdata) 
  
            var notifBody = {
              "tittle": "",
              "type": "",
              "description": "",
              "time": ""
            }
          
            notifBody['tittle'] = "New Device Connected"
            notifBody['description'] = "System: " + matcheduser[0]['iplist']['system']
            notifBody['type'] = "success"
            notifBody['time'] = new Date(Date.now()).toLocaleString()
  
            await pushNewNotification(matcheduser[0]._id, notifBody)
  
            res.send({status: 0})
          }
  
        } else {
          res.send({status: 1, msg: 'Failed to update account permissions, try again later'})
        }
      } catch(e){
        if(e !== undefined){
          res.send({status: 1, msg: 'Failed to update account permissions, try again later'})
        }
      }
      
    }else {
      res.send({status: 1, msg: e1})
    }
  } catch(e){
    if(e !== undefined){
      res.send({status: 1})
    }
  }
  
})

   

router.post('/manage/user/device-new', async(req, res) => {
  try{
    if(req.body !== undefined){
      var user = req.body.body1['user']
      var code = req.body.body1['code']
      var pw = md5(req.body.body1['pw'] || 'pubdreamcc')


      var listUsers = await chooseDBconnection('users')
      var matcheduser = listUsers.filter(obj => { return obj.username == user})
      if(matcheduser[0].password == (pw).toString() & matcheduser[0].username == user){
        var matchIP = matcheduser[0]['iplist'].filter(obj => { return obj.uniqueCode === code & obj.isVerified === false})
        if(matchIP.length > 0){
          var iplist = matcheduser[0]['iplist']
          await removeDevice(matcheduser[0]['_id'], iplist, code)
          res.send({status: 0})
        } else {
          res.send({status: 1})
        }
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

router.post('/manage/pincode/create', async(req, res) => {
  try{
    if(req.body.user !== undefined & req.body.session !== undefined & req.body.ssid1 !== undefined & req.body.ssid2 !== undefined){
      var recieveLocales = await languageJS()
  
      var language = req.body.language
      var e1 = recieveLocales[language]['usersettings']['info2']['e1']
      var xData1 = req.body.user
      var yKey = req.body.session 
      var ykey1 = req.body.ssid1
      var ykey2 = req.body.ssid2
      var xData = xData1 + ykey1 + ykey2
      var pincode = req.body.pincode
  
      var decryptData = await decrypt(xData, yKey)
      var user = JSON.parse(decryptData)
      var x = user['x']
      var z = user['z']
      var y = user['y']
  
  
      try{
        var listUsers = await chooseDBconnection('users')
        var matcheduser = listUsers.filter(obj => { return obj._id == x})
      
        if(matcheduser[0]._id == x & matcheduser[0].apiKey == y & matcheduser[0].secretKey == z){
          if(pincode.length > 0){
            await updateUSERDATA(matcheduser[0]._id, pincode, matcheduser[0]['pinCode'])
            res.send({status: 0})
          } else {
            res.send({status: 1, msg:e1})
          }
        } else {
          res.send({status: 1, msg:e1})
        }
      } catch(e){
        if(e !== undefined){
          res.send({status: 1, msg:e1})
        }
      }
      
    } else {
      res.send({status: 1, msg:e1})
    }
  } catch(e){
    if(e !== undefined){
      res.send({status: 1})
    }
  }
  

})


router.post('/manage/pincode/delete', async(req, res) => {
  try{
    if(req.body.user !== undefined & req.body.session !== undefined & req.body.ssid1 !== undefined & req.body.ssid2 !== undefined){
      var recieveLocales = await languageJS()
  
      var language = req.body.language
      var e1 = recieveLocales[language]['usersettings']['info2']['e1']
      var xData1 = req.body.user
      var yKey = req.body.session 
      var ykey1 = req.body.ssid1
      var ykey2 = req.body.ssid2
      var xData = xData1 + ykey1 + ykey2
      var pincode = req.body.pincode
  
      var decryptData = await decrypt(xData, yKey)
      var user = JSON.parse(decryptData)
      var x = user['x']
      var z = user['z']
      var y = user['y']
  
  
      try{
        var listUsers = await chooseDBconnection('users')
        var matcheduser = listUsers.filter(obj => { return obj._id == x})
      
        if(matcheduser[0]._id == x & matcheduser[0].apiKey == y & matcheduser[0].secretKey == z){
          var oldPIN = matcheduser[0]['pinCode']
  
          if(pincode === oldPIN){
            await updateUSERDATA(matcheduser[0]._id, pincode, matcheduser[0]['pinCode'])
            res.send({status: 0})
          } else {
            res.send({status: 2})
          }
        } else {
          res.send({status: 1, msg:e1})
        }
      } catch(e){
        if(e !== undefined){
          res.send({status: 1, msg:e1})
        }
      }
      
    } else {
      res.send({status: 1, msg:e1})
    }
  } catch(e){
    if(e !== undefined){
      res.send({status: 1})
    }
  }

})





router.post('/manage/pincode/enable', async(req, res) => {
  try{
    if(req.body.user !== undefined & req.body.session !== undefined & req.body.ssid1 !== undefined & req.body.ssid2 !== undefined){
      var recieveLocales = await languageJS()
  
      var language = req.body.language
      var e1 = recieveLocales[language]['usersettings']['info2']['e1']
      var xData1 = req.body.user
      var yKey = req.body.session 
      var ykey1 = req.body.ssid1
      var ykey2 = req.body.ssid2
      var xData = xData1 + ykey1 + ykey2
      var pincode = req.body.pincode
  
      var decryptData = await decrypt(xData, yKey)
      var user = JSON.parse(decryptData)
      var x = user['x']
      var z = user['z']
      var y = user['y']
  
  
      try{
        var listUsers = await chooseDBconnection('users')
        var matcheduser = listUsers.filter(obj => { return obj._id == x})
      
        if(matcheduser[0]._id == x & matcheduser[0].apiKey == y & matcheduser[0].secretKey == z){
          var oldPIN = matcheduser[0]['pinCode']
  
          if(pincode === oldPIN){
            var pinpanel = req.body.pinpanel
            await updateUSERDATA2(matcheduser[0]._id, pinpanel, matcheduser[0]['pinCodeLocations'])
  
            res.send({status: 0})
          } else {
            res.send({status: 2})
          }
        } else {
          res.send({status: 1, msg:e1})
        }
      } catch(e){
        if(e !== undefined){
          res.send({status: 1, msg:e1})
        }
      }
      
    } else {
      res.send({status: 1, msg:e1})
    }
  } catch(e){
    if(e !== undefined){
      res.send({status: 1})
    }
  }
 

})


router.post('/manage/pincode/disableverify', async(req, res) => {
  try{
    if(req.body.user !== undefined & req.body.session !== undefined & req.body.ssid1 !== undefined & req.body.ssid2 !== undefined){
      var recieveLocales = await languageJS()
  
      var language = req.body.language
      var e1 = recieveLocales[language]['usersettings']['info2']['e1']
      var xData1 = req.body.user
      var yKey = req.body.session 
      var ykey1 = req.body.ssid1
      var ykey2 = req.body.ssid2
      var xData = xData1 + ykey1 + ykey2
      var emailCode = req.body.emailcode
  
      var decryptData = await decrypt(xData, yKey)
      var user = JSON.parse(decryptData)
      var x = user['x']
      var z = user['z']
      var y = user['y']
  
  
      try{
        var listUsers = await chooseDBconnection('users')
        var matcheduser = listUsers.filter(obj => { return obj._id == x})
      
        if(matcheduser[0]._id == x & matcheduser[0].apiKey == y & matcheduser[0].secretKey == z){
          var codeX = crypto.randomBytes(8).toString('hex');
          var requestBOD1 = {
            'username': matcheduser[0]['username'],
            'email': matcheduser[0]['email'],
            'code': codeX,
            'date': new Date(Date.now()).toLocaleString()
          }
        
  
          var resC = await changeEmailPIN(matcheduser[0]._id, matcheduser[0]['pinCodeResetCode'], codeX)
          if(resC === 0){
            var uri1 = configuration[0]['backendURI'] + '/api/emails/verify-pin'
            await POSTapiCall(uri1, requestBOD1) 
  
            res.send({status: 0})
          } else {
            res.send({status: 1})
          }
          
        } else {
          res.send({status: 1, msg:e1})
        }
      } catch(e){
        if(e !== undefined){
          res.send({status: 1, msg:e1})
        }
      }
      
    } else {
      res.send({status: 1, msg:e1})
    }
  } catch(e){
    if(e !== undefined){
      res.send({status: 1})
    }
  }
  

})


router.post('/manage/pincode/disable', async(req, res) => {
  try{
    if(req.body.user !== undefined & req.body.session !== undefined & req.body.ssid1 !== undefined & req.body.ssid2 !== undefined){
      var recieveLocales = await languageJS()
  
      var language = req.body.language
      var e1 = recieveLocales[language]['usersettings']['info2']['e1']
      var xData1 = req.body.user
      var yKey = req.body.session 
      var ykey1 = req.body.ssid1
      var ykey2 = req.body.ssid2
      var xData = xData1 + ykey1 + ykey2
      var emailCode = req.body.emailcode
  
      var decryptData = await decrypt(xData, yKey)
      var user = JSON.parse(decryptData)
      var x = user['x']
      var z = user['z']
      var y = user['y']
  
  
      try{
        var listUsers = await chooseDBconnection('users')
        var matcheduser = listUsers.filter(obj => { return obj._id == x})
      
        if(matcheduser[0]._id == x & matcheduser[0].apiKey == y & matcheduser[0].secretKey == z){
          if(matcheduser[0]['pinCodeResetCode'] === emailCode){
            var resC = await changeEmailPIN2(matcheduser[0]._id, matcheduser[0]['pinCodeResetCode'], matcheduser[0]['pinCode'], '', '')
            if(resC === 0){
              res.send({status: 0})
            } else {
              res.send({status: 1})
            }
          } else {
            res.send({status: 1})
          }
        } else {
          res.send({status: 1, msg:e1})
        }
      } catch(e){
        if(e !== undefined){
          res.send({status: 1, msg:e1})
        }
      }
    } else {
      res.send({status: 1, msg:e1})
    }
  } catch(e){
    if(e !== undefined){
      res.send({status: 1})
    }
  }
  

})


router.post('/manage/user/info3', async(req, res) => {
  try{
    if(req.body !== undefined){
      var recieveLocales = await languageJS()

      var language = req.body.language
      var e1 = recieveLocales[language]['usersettings']['info3']['e1']
        var username = Buffer.from(req.body['user']['xsc'], 'base64').toString('ascii')
        var password = Buffer.from(req.body['user']['hvb'], 'base64').toString('hex')


      // var username = req.body.user.username
      // var password = req.body.user.password
      var statusXC = req.body.statusXC
      var pw2 = password
      var listUsers = await chooseDBconnection('users')
      var matcheduser = listUsers.filter(obj => { return obj.username == username})
  


      if(matcheduser[0].password == pw2 & matcheduser[0].username == username){
        var system = req.body.user['system']
        var continent = req.body.user['continent']
        var country = req.body.user['country']
        var isEnabledPIN = false

        if(system.length === 0){
          var matchIP = matcheduser[0]['iplist'][0]


          if(matchIP['ip'].length > 0){
            var resX = {
              'isSuspended': matcheduser[0]['isSuspended'],
              'isEnabled': matcheduser[0]['isEnabled'],
              'binanceverified': matcheduser[0]['binanceverified'],
              'authyID': matcheduser[0]['authyID'],
              'authyTypes': matcheduser[0]['authyTypes'],
              'pinCodeEnabled': isEnabledPIN
            }
            res.send({status: 0, data: resX})
          } else {
            res.send({status: 1})
          }
        } else {
          if(matcheduser[0]['pinCode'].length > 0 & matcheduser[0]['pinCodeLocations']['login'] === true){
            isEnabledPIN = true
          }
  
          if(matcheduser[0]['iplist'].length === 0){
            var browserDATA = req.body.user
            delete browserDATA['username']
            delete browserDATA['password']
  
            browserDATA['uniqueCode'] = crypto.randomBytes(4).toString('hex');
            browserDATA['isVerified'] = false
  
            var requestBOD1 = {
              'username': username,
              'email': matcheduser[0]['email'],
              'code': browserDATA['uniqueCode'],
              'browser': browserDATA['browser'],
              'system': browserDATA['system'],
              'country': browserDATA['country'],
              'timezone': browserDATA['timezone'],
              'ip': browserDATA['ip'],
              'date': new Date(Date.now()).toLocaleString()
            
            }
          
  
            var resC = await updateIPLIST(matcheduser[0]['_id'], matcheduser[0]['iplist'], browserDATA)
            if(resC === 0){
              var uri1 = configuration[0]['backendURI'] + '/api/emails/device-new'
              await POSTapiCall(uri1, requestBOD1) 
    
              
              res.send({status: 3})
            } else {
              res.send({status: 1})
            }
            
          } else {
            if(matcheduser[0]['iplist'].length === 5){
              res.send({status: 5})
            } else {
              var matchIP = matcheduser[0]['iplist'].filter(obj => { return obj.continent === continent & obj.country === country & obj.system === system})
              if(matchIP.length > 0){
                if(matchIP[0]['isVerified'] === false){
                  var browserDATA = req.body.user
                  delete browserDATA['username']
                  delete browserDATA['password']
        
                  browserDATA['uniqueCode'] = crypto.randomBytes(4).toString('hex');
                  browserDATA['isVerified'] = false
        
                  var requestBOD1 = {
                    'username': username,
                    'email': matcheduser[0]['email'],
                    'code': matchIP[0]['uniqueCode'],
                    'browser': browserDATA['browser'],
                    'system': browserDATA['system'],
                    'country': browserDATA['country'],
                    'timezone': browserDATA['timezone'],
                    'ip': browserDATA['ip'],
                    'date': new Date(Date.now()).toLocaleString()
                  
                  }
  
                  var uri1 = configuration[0]['backendURI'] + '/api/emails/device-new'
                  await POSTapiCall(uri1, requestBOD1) 
        
                  res.send({status: 3})
                } else {
                  if(matchIP[0]['isVerified'] === true){
                  
                    var resX = {
                      'isSuspended': matcheduser[0]['isSuspended'],
                      'isEnabled': matcheduser[0]['isEnabled'],
                      'binanceverified': matcheduser[0]['binanceverified'],
                      'authyID': matcheduser[0]['authyID'],
                      'authyTypes': matcheduser[0]['authyTypes'],
                      'pinCodeEnabled': isEnabledPIN
                    }
                    res.send({status: 0, data: resX})
                  } else {
                    if(statusXC === 'check'){
                      var resX = {
                        'isSuspended': matcheduser[0]['isSuspended'],
                        'isEnabled': matcheduser[0]['isEnabled'],
                        'binanceverified': matcheduser[0]['binanceverified'],
                        'authyID': matcheduser[0]['authyID'],
                        'authyTypes': matcheduser[0]['authyTypes'],
                        'pinCodeEnabled': isEnabledPIN
                      }
                      res.send({status: 0, data: resX})
                    } else {
    
                      res.send({status: 3})
                    }
                  }
                }
                
              } else {
                var browserDATA = req.body.user
                delete browserDATA['username']
                delete browserDATA['password']
      
                browserDATA['uniqueCode'] = crypto.randomBytes(4).toString('hex');
                browserDATA['isVerified'] = false
      
                var requestBOD1 = {
                  'username': username,
                  'email': matcheduser[0]['email'],
                  'code': browserDATA['uniqueCode'],
                  'browser': browserDATA['browser'],
                  'system': browserDATA['system'],
                  'country': browserDATA['country'],
                  'timezone': browserDATA['timezone'],
                  'ip': browserDATA['ip'],
                  'date': new Date(Date.now()).toLocaleString()
                
                }
              
  
              
      
                var resC = await updateIPLIST(matcheduser[0]['_id'], matcheduser[0]['iplist'], browserDATA)
                if(resC === 0){
                  var uri1 = configuration[0]['backendURI'] + '/api/emails/device-new'
                  await POSTapiCall(uri1, requestBOD1) 
        
                  res.send({status: 3})
                } else {
                  res.send({status: 1})
                }
              }  
            }
          }
        }
        
      } else {
        res.send({status: 1})
      }
     
    } else {
      res.send({status: 1, msg:e1})
    }
  } catch(e){
    if(e !== undefined){
      res.send({status: 1, msg:e1})
    }
  }
  
  
  
})



router.post('/manage/user/info2', async(req, res) => {
  try{
    if(req.body.user !== undefined & req.body.session !== undefined & req.body.ssid1 !== undefined & req.body.ssid2 !== undefined){
      var recieveLocales = await languageJS()
  
      var language = req.body.language
      var e1 = recieveLocales[language]['usersettings']['info2']['e1']
      var xData1 = req.body.user
      var yKey = req.body.session 
      var ykey1 = req.body.ssid1
      var ykey2 = req.body.ssid2
      var xData = xData1 + ykey1 + ykey2
  
      var decryptData = await decrypt(xData, yKey)
      var user = JSON.parse(decryptData)
  
       var x = user['x']
      var z = user['z']
      var y = user['y']
  
  
      try{
        var listUsers = await chooseDBconnection('users')
        var matcheduser = listUsers.filter(obj => { return obj._id == x})
      
        if(matcheduser[0]._id == x & matcheduser[0].apiKey == y & matcheduser[0].secretKey == z){
          res.send({status: 0, data: matcheduser[0]})
          
        } else {
          res.send({status: 1, msg:e1})
        }
      } catch(e){
        if(e !== undefined){
          res.send({status: 1, msg:e1})
        }
      }
      
    } else {
      res.send({status: 1, msg:e1})
    }
  } catch(e){
    if(e !== undefined){
      res.send({status: 1, msg:e1})
    }
  }
  
})

router.post('/manage/user/info', async(req, res) => {
  try{
    if(req.body.user !== undefined & req.body.session !== undefined & req.body.ssid1 !== undefined & req.body.ssid2 !== undefined){
      var recieveLocales = await languageJS()
  
      var language = req.body.language
      var e1 = recieveLocales[language]['usersettings']['info']['e1']
      var e2 = recieveLocales[language]['usersettings']['info']['e2']
  
      var xData1 = req.body.user
      var yKey = req.body.session 
      var ykey1 = req.body.ssid1
      var ykey2 = req.body.ssid2
      var xData = xData1 + ykey1 + ykey2
  
      var decryptData = await decrypt(xData, yKey)
      var user = JSON.parse(decryptData)
  
       var x = user['x']
      var z = user['z']
      var y = user['y']
  
      try{
        var listUsers = await chooseDBconnection('users')
        var matcheduser = listUsers.filter(obj => { return obj._id == x})
      
        if(matcheduser[0]._id == x & matcheduser[0].apiKey == y & matcheduser[0].secretKey == z){
          if(matcheduser[0].index == 'free'){
            res.send({status: 1, msg: e2})
  
          } else { 
            var body = {
              'username': matcheduser[0].username,
              'apiKey': matcheduser[0].apiKey,
              'secretKey': matcheduser[0].secretKey
            }
      
            res.send({status: 0, data: body})
          }
          
        } else {
          res.send({status: 1, msg:e1})
        }
      } catch(e){
        if(e !== undefined){
          res.send({status: 1, msg:e1})
        }
      }
      
    } else {
      res.send({status: 1, msg:e1})
    }
  } catch(e){
    if(e !== undefined){
      res.send({status: 1, msg:e1})
    }
  }
  
})



router.post('/manage/user/newkeys', async(req, res) => {
  try{
    if(req.body.user !== undefined & req.body.session !== undefined & req.body.ssid1 !== undefined & req.body.ssid2 !== undefined){
      var recieveLocales = await languageJS()
  
      var language = req.body.language
      var e1 = recieveLocales[language]['usersettings']['newkeys']['e1']
      var e2 = recieveLocales[language]['usersettings']['newkeys']['e2']
  
      var xData1 = req.body.user
      var yKey = req.body.session 
      var ykey1 = req.body.ssid1
      var ykey2 = req.body.ssid2
      var xData = xData1 + ykey1 + ykey2
  
      var decryptData = await decrypt(xData, yKey)
      var user = JSON.parse(decryptData)
  
       var x = user['x']
      var z = user['z']
      var y = user['y']
  
      try{
        var listUsers = await chooseDBconnection('users')
        var matcheduser = listUsers.filter(obj => { return obj._id == x})
      
        if(matcheduser[0]._id == x & matcheduser[0].apiKey == y & matcheduser[0].secretKey == z){
          if(matcheduser[0].index == 'free'){
            res.send({status: 1, msg: e2})
  
          } else {
            var body = {'name': matcheduser[0].username}
            var res1 = await createnewkeys(matcheduser[0])
      
            res.send({status: 1, msg: res1})
          }
          
        } else {
          res.send({status: 1, msg: e1})
        }
      } catch(e){
        if(e !== undefined){
          res.send({status: 1, msg: e1})
        }
      }
      
    } else {
      res.send({status: 1, msg: e1})
    }
  } catch(e){
    if(e !== undefined){
      res.send({status: 1, msg:e1})
    }
  }
  
  
})





router.post('/settings/user/list', async(req, res) => {
  try{
    if(req.body.user !== undefined & req.body.session !== undefined & req.body.ssid1 !== undefined & req.body.ssid2 !== undefined){
      var xData1 = req.body.user
      var yKey = req.body.session 
      var ykey1 = req.body.ssid1
      var ykey2 = req.body.ssid2
      var xData = xData1 + ykey1 + ykey2
      var recieveLocales = await languageJS()
  
      var language = req.body.language
      var e1 = recieveLocales[language]['usersettings']['authy']['settings']['e1']
    
      var decryptData = await decrypt(xData, yKey)
      var user = JSON.parse(decryptData)
  
      var x = user['x']
      var z = user['z']
      var y = user['y']
      try{
        var listUsers = await chooseDBconnection('users')
        var matcheduser = listUsers.filter(obj => { return obj._id == x})
  
        if(matcheduser[0]._id == x & matcheduser[0].apiKey == y & matcheduser[0].secretKey == z){
          delete matcheduser[0]['_id']
          delete matcheduser[0]['apiKey']
          delete matcheduser[0]['secretKey']
          delete matcheduser[0]['password']
          delete matcheduser[0]['emailverification']
          delete matcheduser[0]['verificationdate']
          delete matcheduser[0]['pinCodeResetCode']
          delete matcheduser[0]['sessionToken']
          delete matcheduser[0]['emailuri']
          delete matcheduser[0]['isSuspended']
  
  
  
          res.send({status: 0, data: matcheduser[0]})
        } else {
          res.send({status: 1, msg: e1})
  
        }
      } catch(e){
        if(e !== undefined){
          res.send({status: 1, msg: e1})
  
        }
      }
  
    } else {
      res.send({status: 1, msg: e1})
    }
  } catch(e){
    if(e !== undefined){
      res.send({status: 1})
    }
  }
  

})



router.post('/manage/system/restrictions2', async(req, res) => {
  try{
    if(req.body.language !== undefined){
      var recieveLocales = await languageJS()
  
      var language = req.body.language
      var e1 = recieveLocales[language]['system']['restrictions']['e1']
  
  
      try{
        var config = await chooseDBconnection('app-configuration') 
  
        var resBody = {
          'login': config[0]['LoginRestricted'],
          'register': config[0]['RegisterRestricted']
        }
  
        res.send({status: 0, data: resBody})
      } catch(e){
        if(e !== undefined){
          res.send({status: 1, msg: e1})
        }
      }
  
    } else {
      res.send({status: 1, msg: e1})
    }
  } catch(e){
    if(e !== undefined){
      res.send({status: 1})
    }
  }
})

fileUpload(router)

module.exports = router
