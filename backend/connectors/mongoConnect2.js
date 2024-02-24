
async function connectDB2(mongouri, database) { 
    var client;
    const MongoClient = require('mongodb').MongoClient;
    if (!client) client = await MongoClient.connect(mongouri, { useNewUrlParser: true, useUnifiedTopology: true});
    return { db: client.db(database), client: client };
};

module.exports = connectDB2