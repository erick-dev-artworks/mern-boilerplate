/*
能操作users集合数据的Model
 */
// 1.引入mongoose
const mongoose = require('mongoose')
const md5 = require('blueimp-md5')


// 2.字义Schema(描述文档结构)
const userSchema = new mongoose.Schema({
  username: {type: String, required: true}, // 用户名
  userID: {type: String, required: true},
  email: {type: String, required: true},
  emailDetails: {type: Object, required: false},
  password: {type: String, required: true}, // 密码
  iplist: {type: Object, required: true},
  phone: String,
  phoneDetails: {type: Object, required: false},
  newPhoneCode: {type: Object, required: false},
  language: String,
  email: String,
  isSuspended: String,
  pinCode: String,
  pinCodeResetCode: String,
  pinCodeLocations: {type: Object, required: false},
  isfirstTimeUser: String,
  binanceverified: Boolean,
  timestamp: {type: Number, default: Date.now},
  apiKey: String,
  bots: String,
  lobbies: String,
  diagrams: String,
  documents: String,
  secretKey: String,
  index: String,
  authyTypes: Object,
  authyURI: String,
  authyID: String,
  emailverification: String,
  favPairs: {type: Object, required: false},
  favWalletPairs: {type: Object, required: false},
  emailuri: String,
  verificationdate: Number,
  sessionToken: String,
  isEnabled: String,
  tradeRestricted: Boolean,
  spotBotRestricted: {type: Object, required: false},
  futuresBotRestricted: {type: Object, require: false},
  marginBotRestricted: {type: Object, require: false},
  PlannerRestricted: Boolean,
  LoginRestricted: Boolean,
  totalrequests: {type: Object, require: false},
  startingBalance: Number,
  goalincrease: Number,
  assetNotifications: String,
  goaldate: String,
  reseturl: String,
  resettimer: String,
  resetcode: String,
  resettime: String,
  reset2fa: {type: Object, require: false},
  resetpin: {type: Object, require: false},

})



const UserModel = mongoose.model('users', userSchema)


module.exports = UserModel