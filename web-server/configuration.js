module.exports = [{
    DB: 'database_central',
    MONGOURL: 'mongodb://localhost:27017/', // local connections
    MONGOURL2: 'mongodb://192.168.8.104:27017/', // outside connections
    adminDB: 'mongodb://localhost:27017/', // get user proxyies and lobby proxies
    baseURL: 'http://localhost:8411/api/',
    backendURI: 'http://localhost:7914',
    botURI: 'http://localhost:9898', // whole stack used in development (v1.0.2 wont accept)
    assetURI: 'http://localhost:6500',
    calendarURI: 'http://localhost:6501',
    newsURI: 'http://localhost:6502',
    qrURI: 'http://localhost:6503',
    restrictionURI: 'http://localhost:6504',
    sessionURI: 'http://localhost:6505',
    spotURI: 'http://localhost:6506',
    futuresURI: 'http://localhost:6507',
    marginURI: 'http://localhost:6508',
    serverConfig: {
        isClustering: false // used for multi-threading CPU 
    }
}]

