import store from 'store'
import Cookies from 'universal-cookie'
const cookies = new Cookies();
const USER_KEY = 'uuc_id';
const BASE64 = 'ssi_id';
const BASE641 = 'm1iH_1T';
const BASE642 = 'ym2D_2a';
const PIN_LOCK = 'x8b01_ck';
const SERVER_KL = 'CB_av';

const NO_KEYS = 'nc_ke19s'
const PRODUCT_KEY = 'product' 
const LANGUAGE_KEY = 'language'
const THEME_KEY = 'theme'
 
export default {
  // 保存
 
  getLanguage(){
    var language = cookies.get(LANGUAGE_KEY)
    if(language === 'ENG'){
      language = 'ENG'
    } else {
      if(language === 'RUS'){
        language = 'RUS'
      } else {
        if(language === 'LV'){
          language = 'LV'
        }
      }
    }

    return language
  },
  getUser () {
    return cookies.get(USER_KEY)
  },
  getNetwork () {
    return cookies.get(SERVER_KL)
  },
  getNoKeys(){
    return cookies.get(NO_KEYS)
  },
  getId () {
    return cookies.get(BASE64)
  },
  getId1 () {
    return cookies.get(BASE641)
  },
  getId2 () {
    return cookies.get(BASE642)
  },
  getPINSession(){
    return cookies.get(PIN_LOCK)
  }, 
  getProduct () {
    return store.get(PRODUCT_KEY)
  },
  getTheme(){
    return store.get(THEME_KEY)
  }, 
  saveLanguage(body) {
    return cookies.set(LANGUAGE_KEY, body, { path: '/', maxAge: 43200, sameSite: 'strict'})
  },
  savaUser (body) {
    return cookies.set(USER_KEY, body, { path: '/', maxAge: 43200, sameSite: 'strict'})
  },
  saveNetwork (body) {
    return cookies.set(SERVER_KL, body, { path: '/', maxAge: 43200, sameSite: 'strict'})
  },
  savePINSession(body){
    return cookies.set(PIN_LOCK, body, { path: '/', maxAge: 2400, sameSite: 'strict'})
  },
  saveNoKeys(body){
    return cookies.set(NO_KEYS, body, { path: '/', maxAge: 43200, sameSite: 'strict'})
  },
  savaId (body) {
    return cookies.set(BASE64, body, { path: '/', maxAge: 43200, sameSite: 'strict'})
  },
  savaId1 (body) {
    return cookies.set(BASE641, body, { path: '/', maxAge: 43200, sameSite: 'strict'})
  },
  savaId2 (body) {
    return cookies.set(BASE642, body, { path: '/', maxAge: 43200, sameSite: 'strict'})
  }, 
  saveProduct (product) {
    return store.set(PRODUCT_KEY, product)
  },
  saveTheme(theme){
    return store.set(THEME_KEY, theme)
  }, 
  deletePINSession(){
    return store.remove(PIN_LOCK)
  }, 
  removeUser () {
    return cookies.remove(USER_KEY)
  },
  removeNetwork () {
    return cookies.remove(SERVER_KL)
  },
  removeNoKeys(){
    return cookies.remove(NO_KEYS)
  }, 
  removeId () {
    return cookies.remove(BASE64)
  },
  removeId1 () {
    return cookies.remove(BASE641)
  },
  removeId2 () {
    return cookies.remove(BASE642)
  }, 
  removeLanguage(){
    return cookies.remove(LANGUAGE_KEY)
  }, 
  deleteProduct () {
    return store.remove(PRODUCT_KEY)
  },
  deleteTheme(){
    return cookies.remove(THEME_KEY)
  } 

}
