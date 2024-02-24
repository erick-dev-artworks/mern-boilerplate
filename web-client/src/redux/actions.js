import {SET_HEAD_TITLE, RECEIVE_USER, ERROR_MSG, RESET_USER} from './action-types'
import {loginIf, loginIfQR, registerIf, logoutIf, startSession, endSession, addConnection} from '../api/index'
import crypto from 'crypto';
import storageUtils from '../utils/storageUtils'
export const setHeadTitle = (HeadTitle) => ({type: SET_HEAD_TITLE, data: HeadTitle})
export const receiveUser = (user) => ({type: RECEIVE_USER, user})
export const errorMsg = (errorMsg) => ({type: ERROR_MSG, errorMsg})


export const logout = () => {
  var user = storageUtils.getUser()
  var session = storageUtils.getId()
  var ssid1 = storageUtils.getId1()
  var ssid2 = storageUtils.getId2()
  var language = storageUtils.getLanguage()

  endSession(user, session, ssid1, ssid2, language)
  storageUtils.removeUser()
  storageUtils.removeId()
  storageUtils.removeId1()
  storageUtils.removeId2()
  storageUtils.removeNoKeys()

  logoutIf({user, session, ssid1, ssid2, language})

  
  storageUtils.removeNetwork()
  return ({type: RESET_USER})
}

export const login = (username, password, props) => {
  return async dispatch => {
    var language = await storageUtils.getLanguage()
    var cancelToken = ''

    const ret = await loginIf({username, password, language, cancelToken})
    if (ret.status === 0) {
      const user = ret.data
      var body = {
        'x': user['x'],
        'y': user['y'],
        'z': user['z']
      }

   

      const ENC_KEY = user['a'].slice(0, 32) // set random encryption key
      const IV = user['a'].slice(0, 16);
      const message = JSON.stringify(body)

      function encrytp(text) {
        let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENC_KEY), IV);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return { iv: IV.toString('hex'), encryptedData: encrypted.toString('hex') };
      }
      

      var res1 = await encrytp(message)

      var parts = res1.encryptedData.match(/.{1,57}/g)
      var lastobj = []

      for(var t=0; t<parts.length; t++){
        var partsa = parts[t]
        if(partsa.length === 57){
          if(lastobj.length === 4){
            lastobj[lastobj.length-1] += partsa
          } else {

            lastobj.push(partsa)
          }
        } else {
          if(lastobj.length === 4){
            lastobj[lastobj.length-1] += partsa
          } else {
            lastobj[lastobj.length-1] += partsa
          }
        }
      }
    
      var sessionKey = user['a']
      var userKey = lastobj[0]
      var ssid1 = lastobj[1]
      var ssid2 = lastobj[2] + lastobj[3]
      await startSession(userKey, sessionKey, ssid1, ssid2, language, cancelToken)

      storageUtils.savaUser(lastobj[0])
      storageUtils.savaId1(lastobj[1])
      storageUtils.savaId2(lastobj[2] + lastobj[3])
      // storageUtils.savaId3(parts[3])

      storageUtils.saveTheme("light")
      storageUtils.savaId(user['a'])
      var res12 = {
        'x': lastobj[0],
        'z': lastobj[1],
        'c': lastobj[2] + lastobj[3],
        'y': user['a'],
        'status': 0
      }
      
      dispatch(receiveUser(res12))
    } else {
      const errormsg = ""
      dispatch(errorMsg(errormsg))
    }
  }
}


export const loginQR = (username, password, props) => {
  return async dispatch => {
    var language = await storageUtils.getLanguage()
    var cancelToken = ''

    const ret = await loginIfQR({username, password, language, cancelToken})


    if (ret.status === 0) {
      const user = ret.data
      var body = {
        'x': user['x'],
        'y': user['y'],
        'z': user['z']
      }

   

      const ENC_KEY = user['a'].slice(0, 32) // set random encryption key
      const IV = user['a'].slice(0, 16);
      const message = JSON.stringify(body)

      function encrytp(text) {
        let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENC_KEY), IV);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return { iv: IV.toString('hex'), encryptedData: encrypted.toString('hex') };
      }
      

      var res1 = await encrytp(message)

      var parts = res1.encryptedData.match(/.{1,57}/g)
      var lastobj = []

      for(var t=0; t<parts.length; t++){
        var partsa = parts[t]
        if(partsa.length === 57){
          if(lastobj.length === 4){
            lastobj[lastobj.length-1] += partsa
          } else {

            lastobj.push(partsa)
          }
        } else {
          if(lastobj.length === 4){
            lastobj[lastobj.length-1] += partsa
          } else {
            lastobj[lastobj.length-1] += partsa
          }
        }
      }
    

      storageUtils.savaUser(lastobj[0])
      storageUtils.savaId1(lastobj[1])
      storageUtils.savaId2(lastobj[2] + lastobj[3])
      storageUtils.saveTheme("light")
      storageUtils.savaId(user['a'])
      var res12 = {
        'x': lastobj[0],
        'z': lastobj[1],
        'c': lastobj[2] + lastobj[3],
        'y': user['a'],
        'status': 0
      }
      
      dispatch(receiveUser(res12))
    } else {
      const errormsg = ""
      dispatch(errorMsg(errormsg))
    }
  }
}

export const register = (userName, email, password, phonenumber, county, language, iplist) => {

  
  return async dispatch => {
    var language2 = await storageUtils.getLanguage()
    var cancelToken = ''
    const ret = await registerIf({userName, email, password, phonenumber, county, language2, iplist, cancelToken})
    if (ret.status === 0) {
      const user = ret.data
      var body = {
        'x': user['x'],
        'y': user['y'],
        'z': user['z']
      }
      const ENC_KEY = user['a'].slice(0, 32) // set random encryption key
      const IV = user['a'].slice(0, 16);
      const message = JSON.stringify(body)

      async function encrytp(val){
        let cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY, IV);
        let encrypted = cipher.update(val, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted;
      };
     
      var res1 = await encrytp(message)

      var parts = res1.encryptedData.match(/.{1,57}/g)
      var lastobj = []

      for(var t=0; t<parts.length; t++){
        var partsa = parts[t]
        if(partsa.length === 57){
          if(lastobj.length === 4){
            lastobj[lastobj.length-1] += partsa
          } else {

            lastobj.push(partsa)
          }
        } else {
          if(lastobj.length === 4){
            lastobj[lastobj.length-1] += partsa
          } else {
            lastobj[lastobj.length-1] += partsa
          }
        }
      }
      
      var deviceInfo = {
        'xsc': new Buffer(userName).toString('base64'),
        'hvb': crypto.createHash('md5').update(password).digest('base64')
      }
      var connectiondata = await addConnection(deviceInfo)
      if(connectiondata['status'] === 0){
        await storageUtils.saveNetwork(connectiondata['data']['21_vka'])

        storageUtils.savaUser(lastobj[0])
        storageUtils.savaId1(lastobj[1])
        storageUtils.savaId2(lastobj[2] + lastobj[3])
        storageUtils.savaId(user['a'])
  
        dispatch(receiveUser(lastobj[0]))
      } else {
        const errormsg = ret.msg
        dispatch(errorMsg(errormsg))
      }
      
    } else {
      const errormsg = ret.msg
      dispatch(errorMsg(errormsg))
    }
  }
}