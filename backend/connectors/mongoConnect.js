const configuration = require('../configuration')

async function connectDB() { 
    var client;
    const MongoClient = require('mongodb').MongoClient;
    if (!client) client = await MongoClient.connect(configuration[0].MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true});
    return { db: client.db(configuration[0].DB), client: client };
};

module.exports = connectDB