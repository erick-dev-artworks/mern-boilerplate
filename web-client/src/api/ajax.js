
import axios from 'axios'
import storageUtils from '../utils/storageUtils';

function ajax (url, data={}, method='GET') {
  return new Promise(async(resolve, reject) => {
    try{
      var networkProxy = await storageUtils.getNetwork()
      var urlX = url
      if(networkProxy !== undefined){
        if(networkProxy.length > 0){
          var sms = Buffer.from(networkProxy, 'base64').toString('ascii')
          var nm_1 = JSON.parse(sms)
          var link = url.split('/')
          if(link.length > 0){
          
            var nonUnique = [
              'session',
              'manage',
              'login',
              'logout',
              'register',
              'loginQR',
              'register',
              'authy',
              'system',
              'settings'
            ]

            var statusX = 1
            for(var c1=0; c1<nonUnique.length; c1++){
              var cv1 = nonUnique[c1]

              if(cv1 === link[1] & link[2] !== 'restrictions2' & link[2] !== 'network'){
                statusX = 0
              }
            }

            if(statusX === 0){
              urlX = nm_1['21_vka'] + url
            }

          } 
        }
      } 

      let promise  
      if (method === 'GET') {
        promise = await axios.get(urlX, {params: data}, {cancelToken: data['cancelToken']}).catch(() => { promise = []})
      } else {
        promise =  await axios.post(urlX, data, {cancelToken: data['cancelToken']}).catch(() => { promise = []})
      }
     
  
      
      if(promise.data !== undefined){
        resolve(promise.data)
  
      } else {
        reject(promise)
  
      }
    } catch(e){
      if(e !== undefined){
        resolve([])
      }
    }
   
  
  })
}


export default ajax