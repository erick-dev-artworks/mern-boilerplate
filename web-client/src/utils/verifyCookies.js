import storageUtils from "./storageUtils"

 

export default async function checkCookies (recieveCookies) {
    try{
        var user = await storageUtils.getUser()
        var session = await storageUtils.getId()
        var language = await storageUtils.getLanguage()
        var ssid1 = await storageUtils.getId1()
        var ssid2 = await storageUtils.getId2()
    
        var canGenerate = false
        if(user === recieveCookies['user'] & session === recieveCookies['session']){
            if(ssid1 === recieveCookies['ssid1'] & ssid2 === recieveCookies['ssid2']){
                return 0
            }
        }

        if(canGenerate === true){
            storageUtils.savaUser(recieveCookies['user'])
            storageUtils.savaId(recieveCookies['session'])
            storageUtils.savaId1(recieveCookies['ssid1'])
            storageUtils.savaId2(recieveCookies['ssid2'])



            
        }

    } catch(e){
        if(e !== undefined){
            return 1
        }
    }
}