module.exports = [{
    name: 'backend_1',
    DB: 'database_central',
    MONGOURL: 'mongodb://localhost:27017/', // Node - Database
    emailEnabled: true,
    emailServer: '', // email server
    emailDocURL: 'http://localhost:7240', /// (ico, png, mp4 ) directory for email cards
    emailPw: '', // email server pw
    serverConfig: {
        isClustering: false, // used for multi-threading CPU
        backendAPI: 'bGF0dmlhIGhlbGFsbyB3b3JhbGQhMTYyMTI2NDY1MTQ4NWVyaWNrZGV2c2', // rest-api (localhost access key)
        backendSECRET: 'KlygMbdab5BSxIT9Z/6pY/wsXpWKs4nAcJ/RUwv1hl0=' // rest-api (localhost acesss secret)
    },
}]

