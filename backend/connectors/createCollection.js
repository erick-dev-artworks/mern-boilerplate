const connectDB = require('./mongoConnect');
const connectDB2 = require('./mongoConnect2');
var ObjectId = require('mongodb').ObjectID;
var listCollection = require('../connectors/listCollection');
const configuration = require('../configuration');

// "mongodb": "^3.6.6",
async function listQuery(method, data, number){
    const { db, client } = await connectDB();

    try{
        if(method == 'initDB'){
        
            const { db, client } = await connectDB2(configuration[0].MONGOURL, configuration[0].DB);
            return client.close()
        }
        if(method == 'blankcollections'){
            for(var j=0; j<data['collections'].length; j++){
                var dam1 = data['collections'][j]
                await db.createCollection(dam1)
    
            }
            return client.close()
        }
        if(method == 'initBlankDocument'){
            await db.collection(data['collection']).insertOne(data['data'])
    
    
            return client.close()
        }
    
        if(method == '100campageADD'){
            await db.collection('100-user-campaign').insertOne(data)
            return client.close()
        }
        if(method == '100campageDELETE'){
            var listDBS = await listCollection('100campage')
            if(listDBS.length == 0){
                return client.close()   
            } else {
                var matchX = listDBS.filter(obj => { return obj['hash'] === data})
                if(matchX.length > 0){
                    var XC = matchX[0]['_id']
                    await db.collection('100-user-campaign').deleteOne( { "_id" : ObjectId(XC) } ); 
                    return client.close() 
                } else {
                    return client.close() 
                }
            }
        }
        
        
        if(method == 'order'){
            await db.collection('dashboard-trades').insertOne(data)
            return client.close()
        }
        if(method == 'databasetraffic'){
            var listDBS = await listCollection('databasetraffic')
    
            if(listDBS.length == 0){
                await db.collection('database-regulation').insertOne({data})
                return client.close()   
            } else {
                var data3 = listDBS[0]
                var id = data3._id
                await db.collection('database-regulation').deleteOne( { "_id" : ObjectId(id) } ); 
                await db.collection('database-regulation').insertOne({data})
                return client.close()    
            }
        }
    
        // standard
        if(method == 'initConfiguration'){
            await db.collection('app-configuration').insertOne(data)
            return client.close()
        }
        if(method == 'deleteConfiguration'){
            await db.collection('app-configuration').deleteOne({"_id": ObjectId(data['_id'])})
            return client.close()
        }
        if(method == 'users'){
            await db.collection('users').insertOne(data)
            return client.close()
        }
        if(method == 'signals'){
            await db.collection('tradingview-signals').insertOne(data)
            return client.close()
        }
        if(method == 'activeBotsFutures'){
            var response = await db.collection('binance-futures-active-bots').insertOne(data)
            client.close()
            return response
        }
        if(method == 'deleteactiveBotsFutures'){
            await db.collection('binance-futures-active-bots').deleteOne({"_id": ObjectId(data['_id'])})
            return client.close() 
        }
        if(method == 'activeBotsSpot'){
            var response = await db.collection('binance-spot-active-bots').insertOne(data)
            client.close()
            return response 
        }
        if(method == 'deleteactiveBotsSpot'){
            await db.collection('binance-spot-active-bots').deleteOne({"_id": Object(data['_id'])})
            return client.close()
        }
        
        if(method == 'futuressignals'){
            await db.collection('tradingview-futuresignals').insertOne(data)
            return client.close()
        }
        if(method == 'marginsignals'){
            await db.collection('tradingview-marginsignals').insertOne(data)
            return client.close()
        }
        if(method == 'favsignals'){
            await db.collection('tradingview-favsignals').insertOne(data)
            return client.close()
        }
        if(method == 'orders'){
            await db.collection('binance-trades').insertOne(data)
            return client.close()
        }
        if(method == 'marginorders'){
            await db.collection('binance-margin-trades').insertOne(data)
            return client.close()
        }
        if(method == 'futuresorders'){
            await db.collection('binance-futures-trades').insertOne(data)
            return client.close()
        }
    
        if(method == 'deleteorder'){
            await db.collection('binance-trades').deleteOne({"_id": Object(data)})
            return client.close()
        }
        if(method == 'deleteorder1'){
            await db.collection('binance-margin-trades').deleteOne({"_id": Object(data)})
            return client.close()
        }
        if(method == 'deleteorder2'){
            await db.collection('binance-futures-trades').deleteOne({"_id": Object(data)})
            return client.close()
        }

        if(method == 'deleteactive1'){
            await db.collection('binance-spot-active-bots').deleteOne({"_id": Object(data)})
            return client.close()
        }
        if(method == 'deleteactive2'){
            await db.collection('binance-futures-active-bots').deleteOne({"_id": Object(data)})
            return client.close()
        }
        if(method == 'deleteactive3'){
            await db.collection('binance-margin-active-bots').deleteOne({"_id": Object(data)})
            return client.close()
        }

        if(method == 'deletesignal'){
            await db.collection('tradingview-signals').deleteOne({"_id": Object(data)})
            return client.close()
        }
        if(method == 'deletesignal1'){
            await db.collection('tradingview-marginsignals').deleteOne({"_id": Object(data)})
            return client.close()
        }
        if(method == 'deletesignal2'){
            await db.collection('tradingview-futuresignals').deleteOne({"_id": Object(data)})
            return client.close()
        }

        if(method == 'changestatus'){
            var exitingdata = await listCollection('spotbots')
            var matchCase = exitingdata.filter(obj => { return obj['bot']['name'] == (data).toString()})
    
            if(matchCase.length > 0){
                var data3 = matchCase[0]
                var id = data3._id
                
                data3['status'] = 1
                data3['botfirsttime'] = true

                await db.collection('spot-bots').deleteOne({"_id": ObjectId(id)})
                await db.collection('spot-bots').insertOne(data3)
            }
            return client.close()
        }


        if(method == 'changestatus1'){
            var exitingdata = await listCollection('marginbots')
            var matchCase = exitingdata.filter(obj => { return obj['bot']['name'] == (data).toString()})
    
            if(matchCase.length > 0){
                var data3 = matchCase[0]
                var id = data3._id
                
                data3['status'] = 1
                data3['botfirsttime'] = true

                await db.collection('margin-bots').deleteOne({"_id": ObjectId(id)})
                await db.collection('margin-bots').insertOne(data3)
            }
            return client.close()
        }

        if(method == 'changestatus2'){
            var exitingdata = await listCollection('futuresbots')
            var matchCase = exitingdata.filter(obj => { return obj['bot']['name'] == (data).toString()})
    
            if(matchCase.length > 0){
                var data3 = matchCase[0]
                var id = data3._id
                
                data3['status'] = 1
                data3['botfirsttime'] = true

                await db.collection('futures-bots').deleteOne({"_id": ObjectId(id)})
                await db.collection('futures-bots').insertOne(data3)
            }
            return client.close()
        }

    
        if(method == 'plannerorders'){
            await db.collection('binance-plannerOrders').insertOne(data)
            return client.close()
        }
    
        if(method == 'orderbook'){
            await db.collection('binance-orderbook').insertOne(data)
            return client.close()
        }
        // if(method == 'tickers'){
        //     var result = await db.collection('binance-tickers').insertOne(data)
        //     return client.close()
        // }
        
        if(method == 'coinsettings'){
            var exitingdata = await listCollection('coinsettings')
            if(exitingdata.length == 0){
                await db.collection('coin-settings').insertOne({data})
                return client.close()   
            } else {
                var data3 = exitingdata[0]
                var id = data3._id
                await db.collection('coin-settings').deleteOne( { "_id" : ObjectId(id) } ); 
                await db.collection('coin-settings').insertOne({data})
                return client.close()    
            }
            
        }
        
    
        if(method == 'coinsettingsfutures'){
            var exitingdata = await listCollection('coinsettingsfutures')
            if(exitingdata.length == 0){
                await db.collection('coin-settings-futures').insertOne({data})
                return client.close()   
            } else {
                var data3 = exitingdata[0]
                var id = data3._id
                await db.collection('coin-settings-futures').deleteOne( { "_id" : ObjectId(id) } ); 
                await db.collection('coin-settings-futures').insertOne({data})
                return client.close()    
            }
            
        }
        if(method == 'clearTrades'){
            var exitingdata = await listCollection('orders')
            var matchCase = exitingdata.filter(obj => { return obj._id == (data._id).toString()})
            
            if(matchCase.length > 0){
                var data3 = matchCase[0]
                var id = data3._id
                await db.collection('binance-trades').deleteOne({"_id": ObjectId(id)})
    
            }
            return client.close()
        }
        if(method == 'clearTradesFutures'){
            var exitingdata = await listCollection('futuresorders')
            var matchCase = exitingdata.filter(obj => { return obj._id == (data._id).toString()})
            
            if(matchCase.length > 0){
                var data3 = matchCase[0]
                var id = data3._id
                await db.collection('binance-futures-trades').deleteOne({"_id": ObjectId(id)})
    
            }
            return client.close()
        }
    
        if(method == 'favbotentry'){
            var exitingdata = await listCollection('listfavbots')
            var networkData = await listCollection('listConfiguration')
            var backendURI = networkData[0]['currentBackendURI']
            var matchCase = exitingdata.filter(obj => { return obj._id == (data._id).toString()})
    
            if(matchCase.length > 0){
                var data3 = matchCase[0]
                var id = data3._id
                data3['trailingstatus'] = data.trailingstatus
                data3['trailinginterval'] = data.trailinginterval
                data3['backendURI'] = backendURI
                await db.collection('spot-bots').deleteOne({"_id": ObjectId(id)})
                await db.collection('spot-bots').insertOne(data3)
            }
            return client.close()
        }

        

        


        if(method == 'updatebackenduri'){
            var exitingdata = await listCollection('listfavbots')
            var networkData = await listCollection('listConfiguration')
            var backendURI = networkData[0]['currentBackendURI']
            var matchCase = exitingdata.filter(obj => { return obj._id == (data._id).toString()})
    
            if(matchCase.length > 0){
                var data3 = matchCase[0]
                var id = data3._id
                data3['backendURI'] = backendURI
                await db.collection('fav-bots').deleteOne({"_id": ObjectId(id)})
                await db.collection('fav-bots').insertOne(data3)
            }
            return client.close()
        }
        if(method == 'disablebotInit'){
            var exitingdata = await listCollection('listfavbots')
            var matchCase = exitingdata.filter(obj => { return obj._id == (data._id).toString()})
    
            if(matchCase.length > 0){
                var data3 = matchCase[0]
                var id = data3._id
                data3['botfirsttime'] = false
                await db.collection('spot-bots').deleteOne({"_id": ObjectId(id)})
                await db.collection('spot-bots').insertOne(data3)
            }
            return client.close()
        }
        if(method == 'updatebotInit'){
            var exitingdata = await listCollection('listfavbots')
            var matchCase = exitingdata.filter(obj => { return obj._id == (data._id).toString()})
    
            if(matchCase.length > 0){
                var data3 = matchCase[0]
                var id = data3._id
                data3['botfirsttime'] = true
                await db.collection('spot-bots').deleteOne({"_id": ObjectId(id)})
                await db.collection('spot-bots').insertOne(data3)
            }
            return client.close()
        }
        
    
        if(method == 'favbotentryRestrictionTrading'){ // spot trading bot
            var exitingdata = await listCollection('listfavbots')
            var networkData = await listCollection('listConfiguration')
            var userData = await listCollection('users')
            var backendURI = networkData[0]['currentBackendURI']
            var matchCase = exitingdata.filter(obj => { return obj._id == (data._id).toString()})
    
            if(matchCase.length > 0){
                var data3 = matchCase[0]
                var id = data3._id
                data3['backendURI'] = backendURI
                await db.collection('fav-bots').deleteOne({"_id": ObjectId(id)})
                await db.collection('fav-bots').insertOne(data3)
    
    
                var matchUserData = userData.filter(obj => { return obj.username == data3['username']})
                if(matchUserData.length > 0){
                    var id1 = matchUserData[0]['_id']
                    matchUserData[0]['spotBotRestricted']['tradingbot'] = false
                    matchUserData[0]['spotBotRestricted']['trailingbot'] = true
                    matchUserData[0]['tradeRestricted'] = true
                    matchUserData[0]['PlannerRestricted'] = true 
    
                    await db.collection('users').deleteOne({"_id": ObjectId(id1)})
                    await db.collection('users').insertOne(matchUserData[0])
    
    
                }
            }
    
    
            return client.close()
        }
    
        if(method == 'deleteruser'){
            var info = data 
            var IDm = info['_id']
            delete info['_id']
    
            await db.collection('users').deleteOne({"_id": ObjectId(IDm)})
            await db.collection('users').insertOne(info)
            
        }
      
        if(method == 'favbotentryRestrictionTrailing'){ // spot trailing bot
            var exitingdata = await listCollection('spotbots')
            var networkData = await listCollection('listConfiguration')
            var userData = await listCollection('users')
            var backendURI = networkData[0]['currentBackendURI']
            var matchCase = exitingdata.filter(obj => { return obj._id == (data._id).toString()})
    
            if(matchCase.length > 0){
                var data3 = matchCase[0]
                var id = data3._id
    
                data3['trailingstatus'] = data.trailingstatus
                data3['trailinginterval'] = data.trailinginterval
                data3['backendURI'] = backendURI
                await db.collection('spot-bots').deleteOne({"_id": ObjectId(id)})
                await db.collection('spot-bots').insertOne(data3)
    
    
                var matchUserData = userData.filter(obj => { return obj.username == data3['username']})
                if(matchUserData.length > 0){
                    var id1 = matchUserData[0]['_id']
                    matchUserData[0]['futuresBotRestricted']['trailingbot'] = true
                    matchUserData[0]['futuresBotRestricted']['tradingbot'] = true
                    matchUserData[0]['tradeRestricted'] = true
                    matchUserData[0]['PlannerRestricted'] = true 
    
                    await db.collection('users').deleteOne({"_id": ObjectId(id1)})
                    await db.collection('users').insertOne(matchUserData[0])
    
    
                }
            }
    
    
            return client.close()
        }
        if(method == 'favbotentryRestrictionTrailing2'){ // spot trailing bot
            var exitingdata = await listCollection('listfavbots')
            var networkData = await listCollection('listConfiguration')
            var userData = await listCollection('users')
            var backendURI = networkData[0]['currentBackendURI']
            var matchCase = exitingdata.filter(obj => { return obj._id == (data._id).toString()})
    
            if(matchCase.length > 0){
                var data3 = matchCase[0]
                var id = data3._id
    
                data3['backendURI'] = backendURI
                await db.collection('fav-bots').deleteOne({"_id": ObjectId(id)})
                await db.collection('fav-bots').insertOne(data3)
    
    
                var matchUserData = userData.filter(obj => { return obj.username == data3['username']})
                if(matchUserData.length > 0){
                    var id1 = matchUserData[0]['_id']
                    matchUserData[0]['futuresBotRestricted']['trailingbot'] = true
                    matchUserData[0]['futuresBotRestricted']['tradingbot'] = true
                    matchUserData[0]['tradeRestricted'] = true
                    matchUserData[0]['PlannerRestricted'] = true 
    
                    await db.collection('users').deleteOne({"_id": ObjectId(id1)})
                    await db.collection('users').insertOne(matchUserData[0])
    
    
                }
            }
    
    
            return client.close()
        }
        if(method == 'unlockuserrestrictions'){
            var userData = await listCollection('users')
    
            var matchUserData = userData.filter(obj => { return obj.username == data['username']})
            if(matchUserData.length > 0){
                var id1 = matchUserData[0]['_id']
                matchUserData[0]['spotBotRestricted']['trailingbot'] = false
                matchUserData[0]['spotBotRestricted']['tradingbot'] = false
                matchUserData[0]['futuresBotRestricted']['trailingbot'] = false
                matchUserData[0]['futuresBotRestricted']['tradingbot'] = false
                matchUserData[0]['tradeRestricted'] = false
                matchUserData[0]['PlannerRestricted'] = false
    
                await db.collection('users').deleteOne({"_id": ObjectId(id1)})
                await db.collection('users').insertOne(matchUserData[0])
    
    
            }
    
            return client.close()
        }
        if(method === 'updateUSER1'){
            var countN = number['count']
            var typeN = number['type']
    
            var existingdata = await listCollection('users')
            var matchUserData = existingdata.filter(obj => { return obj.username === data})
          
    
    
            if(matchUserData.length > 0){
                var id1 = matchUserData[0]['_id']
                var nm1 = Number(countN)
                var cm2 = Number(matchUserData[0]['totalrequests'][typeN])
    
                var newNumber = cm2
                newNumber += nm1
                matchUserData[0]['totalrequests'][typeN] = newNumber
                
                await db.collection('users').deleteOne({"_id": ObjectId(id1)})
                await db.collection('users').insertOne(matchUserData[0])
            }
            return client.close()
        }
        
        if(method == 'appsettings'){
            var exitingdata = await listCollection('appsettings')
            if(exitingdata !== undefined){
                var matchCase = exitingdata.filter(obj => { return obj._id == (data._id).toString()})
    
                if(matchCase.length > 0){
                    // var data3 = matchCase[0]
                    // var id = data3._id
                    // data3['trailingstatus'] = data.trailingstatus
                    // data3['trailinginterval'] = data.trailinginterval
                    // var deleteone = await db.collection('app-settings').deleteOne({"_id": ObjectId(id)})
                    // var updateDB = await db.collection('app-settings').insertOne(data3)
                } else {
                    await db.collection('app-settings').insertOne(data)
                }
            } else {
                await db.collection('app-settings').insertOne(data)
            }
           
            return client.close()
        }
        if(method == 'appsettingsdisable'){
            var exitingdata = await listCollection('appsettings')
            if(exitingdata !== undefined){
                var matchCase = exitingdata.filter(obj => { return obj._id == (data._id).toString()})
                if(matchCase.length > 0){
                    var data3 = matchCase[0]
                    var id = data3._id
                    data3['configuration']['storageEnabled'] = false
    
                    await db.collection('app-settings').deleteOne({"_id": ObjectId(id)})
                    await db.collection('app-settings').insertOne(data3)
                }
            }
            return client.close()
        }
        if(method == 'disableactuallharddrive'){
            var exitingdata = await listCollection('appsettings')
            if(exitingdata !== undefined){
                var matchCase = exitingdata.filter(obj => { return obj._id == (data._id).toString()})
    
                
                if(matchCase.length > 0){
                    var data3 = matchCase[0]
                    var id = data3._id
    
                    delete data['_id']
                    await db.collection('app-settings').deleteOne({"_id": ObjectId(id)})
                    await db.collection('app-settings').insertOne(data)
                }
            }
            return client.close()
        }
        
        if(method == 'updateNews'){   
            var exitingdata = await listCollection('news')
            if(exitingdata !== undefined){
                var matchCase = exitingdata.filter(obj => { return obj._id == (data._id).toString()})
    
                if(matchCase.length > 0){
                    var data3 = matchCase[0]
                    var id = data3._id
    
                    delete data['_id']
                    await db.collection('news').deleteOne({"_id": ObjectId(id)})
                    await db.collection('news').insertOne(data)
                }
    
            } else {
                await db.collection('news').insertOne({data})
            }
    
            return client.close()
        }if(method == 'updateNews2'){   
            var exitingdata = await listCollection('news2')
            if(exitingdata !== undefined){
                var matchCase = exitingdata.filter(obj => { return obj._id == (data._id).toString()})
    
                if(matchCase.length > 0){
                    var data3 = matchCase[0]
                    var id = data3._id
    
                    delete data['_id']
                    await db.collection('news2').deleteOne({"_id": ObjectId(id)})
                    await db.collection('news2').insertOne(data)
                }
    
            } else {
                await db.collection('news2').insertOne({data})
            }
    
            return client.close()
        }
        if(method == 'enablenewharddrive'){
            var exitingdata = await listCollection('appsettings')
            if(exitingdata !== undefined){
                var matchCase = exitingdata.filter(obj => { return obj._id == (data._id).toString()})
    
                if(matchCase.length > 0){
                    var data3 = matchCase[0]
                    var id = data3._id
    
                    delete data['_id']
                    await db.collection('app-settings').deleteOne({"_id": ObjectId(id)})
                    await db.collection('app-settings').insertOne(data)
                }
    
            }
    
            return client.close()
        }
    
    
        if(method == 'tickers'){
            var exitingdata = await listCollection('tickers')
            if(exitingdata.length == 0){
                await db.collection('binance-tickers').insertOne(data)
                return client.close()
            } else {
                var data3 = exitingdata[0]
                var id = data3._id
                await db.collection('binance-tickers').deleteOne( { "_id" : ObjectId(id) } ); 
                await db.collection('binance-tickers').insertOne(data)
                return client.close()
            }
            
        }
        
    
        if(method == 'tickersfutures'){
            var exitingdata = await listCollection('tickersfutures')
            if(exitingdata.length == 0){
                await db.collection('binance-tickers-futures').insertOne(data)
                return client.close()
            } else {
                var data3 = exitingdata[0]
                var id = data3._id
                await db.collection('binance-tickers-futures').deleteOne( { "_id" : ObjectId(id) } ); 
                await db.collection('binance-tickers-futures').insertOne(data)
                return client.close()
            }
    
        }
    
        if(method == 'fees'){
            var exitingdata = await listCollection('fees')
            if(exitingdata.length == 0){
                await db.collection('binance-fees').insertOne(data)
                return client.close()
            } else {
                var data3 = exitingdata[0]
                var id = data3._id
                await db.collection('binance-fees').deleteOne( { "_id" : ObjectId(id) } ); 
                await db.collection('binance-fees').insertOne(data)
                return client.close()
            }
            
        }
        if(method == 'feesfutures'){
            var exitingdata = await listCollection('feesfutures')
            if(exitingdata.length == 0){
                await db.collection('binance-fees-futures').insertOne(data)
                return client.close()
            } else {
                var data3 = exitingdata[0]
                var id = data3._id
                await db.collection('binance-fees-futures').deleteOne( { "_id" : ObjectId(id) } ); 
                await db.collection('binance-fees-futures').insertOne(data)
                return client.close()
            }
            
        }
        
        if(method == 'planner'){
            var data3 = data
            var id = data3._id
            await db.collection('trade-calendar').deleteOne( { "_id" : ObjectId(id) } ); 
            await db.collection('trade-calendar').insertOne(data)
            return client.close()
            
        }
    
        if(method == 'deleteorderbook'){
            var exitingdata = await listCollection('orderbook')
            var mongodID = exitingdata[0]._id
            await db.collection('binance-orderbook').deleteOne( { "_id" : ObjectId(mongodID) } ); 
            return client.close()
            
        }
    
        if(method == 'createpayment'){
            await db.collection('payments').insertOne(data)
            return client.close()
        }
        
        if(method == 'configuration'){
            await db.collection('configuration').insertOne(data)
            return client.close()
        }
        if(method == 'deleteconfiguration'){
            var exitingdata = await listCollection('configuration')
            var mongodID = exitingdata[0]._id
            await db.collection('configuration').deleteOne( { "_id" : ObjectId(mongodID) } ); 
            return client.close()
        }
    
    
        if(method == 'updateusersbalance'){
            var props = Object.keys(data)
            var props2 = Object.values(data)
    
            var currency1 = props[1]
            var currency2 = props[2]
            var amount1 = props2[1]
            var amount2 = props2[2]
    
            var exitingdata = await listCollection('users')
            var match = exitingdata.filter(obj => { return obj.username == data.username})
            var idata = match[0]
            var mongodID = idata._id
            idata['balances'] = {}
            idata['balances'][currency1] = amount1
            idata['balances'][currency2] = amount2
    
    
            await db.collection('users').deleteOne( { "_id" : ObjectId(mongodID) } ); 
            await db.collection('users').insertOne(idata)
            return client.close()
        }
        if(method == 'updateusersession'){
            var exitingdata = await listCollection('users')
            var match = exitingdata.filter(obj => { return obj._id == (data.id).toString()})
            var idata = match[0]
            var mongodID = idata._id
            idata['sessionToken'] = ""
    
    
            await db.collection('users').deleteOne( { "_id" : ObjectId(mongodID) } ); 
            await db.collection('users').insertOne(idata)
            return client.close()
        }
    
        if(method == 'updatenewcurrencies'){
            var props = Object.keys(data)
            var props2 = Object.values(data)
    
            var currency1 = props[1]
            var currency2 = props[2]
    
            var exitingdata = await listCollection('configuration')
            if(exitingdata.length > 0){
                var idata = exitingdata[0]
                var mongoID = idata._id
                var allexitingcurrencies = idata['enabledCurrencies']
                
                var match = allexitingcurrencies.filter(obj => { return obj == currency1})
                var match2 = allexitingcurrencies.filter(obj => { return obj == currency2})
                if(match.length == 0){
                    idata['enabledCurrencies'].push(currency1)
                }
                if(match2.length == 0){
                    idata['enabledCurrencies'].push(currency2)
                }
        
                await db.collection('configuration').deleteOne( { "_id" : ObjectId(mongoID) } ); 
                await db.collection('configuration').insertOne(idata)
        
                return client.close()
            } else {
                var body = {
                    'enabledCurrencies': ['BTC', 'USDT', 'ETH', 'LTC', 'DOT', 'BNB', 'XRP'],
                    'enabledSymbols': []
                }
    
                body['enabledCurrencies'].push(currency1)
                body['enabledCurrencies'].push(currency2)
                await db.collection('configuration').insertOne(body)
                return client.close()
            }
            
        }
    
        if(method == 'changebot1'){
            var mongoid = data.databaseid
    
            var exitingdata = await listCollection('spotbots')
            var match = exitingdata.filter(obj => { return obj._id == (mongoid).toString()})
            var data1 = match[0]
            data1['status'] = 1
    
            await db.collection('spot-bots').deleteOne( { "_id" : ObjectId(mongoid) } ); 
            await db.collection('spot-bots').insertOne(data1)
            return client.close()
        }
        if(method === 'loopactive'){
            var mongoid = data.databaseid
            var status = data.loopactive
            var exitingdata = await listCollection('spotbots')
            var match = exitingdata.filter(obj => { return obj._id == (mongoid).toString()})
            var data1 = match[0]
            data1['loopactive'] = status
           
            await db.collection('spot-bots').deleteOne({"_id": ObjectId(mongoid)});
            await db.collection('spot-bots').insertOne(data1)
            return client.close()
        }
        if(method === 'activeBots1'){
            var existingdata = await listCollection('listConfiguration')
            var previous = data 
    
            existingdata[0]['connections'] = existingdata[0]['connections'].filter(obj => { return obj['name'] !== previous['name']})
            existingdata[0]['connections'].push(previous)
    
            await db.collection('app-configuration').deleteOne({"_id": ObjectId(existingdata[0]['_id'])});
    
            delete existingdata[0]['_id']
            await db.collection('app-configuration').insertOne(existingdata[0])
            return client.close()
    
        }
        
    
    
        if(method === 'updatenotification'){
            var username = data.username 
            var body1 = data['body1']
            var existingdata = await listCollection('listNotifications')
            var matchCase = existingdata.filter(obj => { return obj.username === username})
            var canContinue = false
            var mongoid = ''
            
            
            if(matchCase.length > 0){
                mongoid = matchCase[0]['_id']
    
                if(matchCase.length < 8){
                    matchCase[0]['notifications'].push(body1)
                    delete matchCase[0]['_id']
                    canContinue = true
                } else {
                    if(matchCase.length >= 8){
                        matchCase[0]['notifications'] = matchCase[0]['notifications'].pop()
                        matchCase[0]['notifications'].push(body1)
                        canContinue = true
                    }
    
                    
                }
    
    
                if(matchCase[0]['calendar'][0]['bots'].length <=30){
                    matchCase[0]['calendar'][0]['bots'].push(body1)
    
                } else {
                    if(matchCase[0]['calendar'][0]['bots'].length >= 30){
                        var newLength = matchCase[0]['calendar'][0]['bots'].length - 1
                        var newarray = matchCase[0]['calendar'][0]['bots'].splice(0, newLength)
    
                        matchCase[0]['calendar'][0]['bots'] = newarray
                        matchCase[0]['calendar'][0]['bots'].push(body1)
                    }
                }
    
            } else {
                var newObject = {
                    "username": username,
                    "notifications": [],
                    "calendar": [{
                        "events": [],
                        "bots": [],
                        "planners": [],
                        "allevents": []
                    }]
                }
                newObject['notifications'].push(body1)
                await db.collection('users-notification').insertOne(newObject)
            }
    
          
    
            if(canContinue === true){
                await db.collection('users-notification').deleteOne({"_id": ObjectId(mongoid) })
                await db.collection('users-notification').insertOne(matchCase[0])
    
            }
    
            return client.close()
    
    
        }
        if(method == 'deletecalendar'){
            var newObj = data
            var oldID = data['_id']
            delete newObj['_id']
    
            await db.collection('users-notification').deleteOne({"_id": ObjectId(oldID)})
            await db.collection('users-notification').insertOne({newObj})
        }
    
        if(method == 'changebotlocked'){
            var mongoid = data.databaseid
    
            var exitingdata = await listCollection('listfavbots')
            var match = exitingdata.filter(obj => { return obj._id == (mongoid).toString()})
            var data1 = match[0]
            data1['lockedAmount'] = {
                'BUY': data.BUY,
                'SELL': data.SELL
            }
    
            await db.collection('fav-bots').deleteOne( { "_id" : ObjectId(mongoid) } ); 
            await db.collection('fav-bots').insertOne(data1)
            return client.close()
        }
        if(method == 'changebotstatus'){
            var exitingdata = await listCollection('listbots')
            for(var m=0; m<exitingdata.length; m++){
                data = exitingdata[m]
    
                mongoid = data._id
                data['status'] = 1
                await db.collection('bots').deleteOne( { "_id" : ObjectId(mongoid) } ); 
                await db.collection('bots').insertOne(data)
    
            }
            
            return client.close()
        }
    } catch(e){
        if(e !== undefined){
            return client.close()
        }
    }
}


module.exports = listQuery