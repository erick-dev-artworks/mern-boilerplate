module.exports = [{
    DB: 'database_central',
    MONGOURL: 'mongodb://localhost:27017/', // local connections
    MONGOURL2: 'mongodb://192.168.8.104:27017/', // outside connections
    serverConfig: {
        isClustering: false // used for multi-threading CPU 
    }
}]

