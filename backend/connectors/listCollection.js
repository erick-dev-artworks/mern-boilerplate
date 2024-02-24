const connectDB = require('./mongoConnect');
var ObjectId = require('mongodb').ObjectID;

async function listQuery(method, body){
    const { db, client } = await connectDB();

    try{
        if(method == 'usersEMAIL'){
            var username1 = body
            let result = await db.collection('users').find({"username" : username1}).toArray()
            client.close()
            return result
        }
    } catch(e){
        if(e !== undefined){
            return client.close()
        }
    }
}

module.exports = listQuery