import ajax from './ajax'

////////////////////////////////

export const getUSERDATA3 = (user, language, token, statusXC ) => ajax('/manage/user/info3', {user, language, token, statusXC }, 'POST');
export const verifyNewDevice = (body1, language, token ) => ajax('/manage/user/device-new', {body1, language, token }, 'POST');

export const listAuthyTokenAuthorization = (user, facode, language, cancelToken ) => ajax('/authy/token/approval/confirm', { user, facode, language, cancelToken}, 'POST'); 
export const createAuthyDeviceAuthorization = (obj, values, language, token ) => ajax('/authy/device/approval/create', { obj, values, language, token }, 'POST'); 
export const approveAuthyDeviceAuthorization = (obj, values, language, token ) => ajax('/authy/device/approval/confirm', { obj, values, language, token }, 'POST'); 


export const verifyPINcode2 = (user, language, token ) => ajax('/manage/pincode/verify2', { user, language, token }, 'POST');
export const verifyRegister = (name, email, token) => ajax('/manage/pincode/verify2c', {name, email, token}, 'POST')
export const registerConfirm = (pw, body, language, token ) => ajax('/register/confirm', {pw, body, language, token }, 'POST');
export const verifyRegisterKeys = (body, token) => ajax('/manage/register/verifykeys', body, token, 'POST');
export const listUser = (user, session, ssid1, ssid2, language, token ) => ajax('/manage/user/name', { user, session, ssid1, ssid2 , language, token }, 'POST');
export const createForgotModal = (email, language, token) => ajax('/manage/reset/login', {email, language, token}, 'POST');
export const createForgotModal2 = (email, language, token) => ajax('/manage/reset/login2', {email, language, token}, 'POST');
export const createForgotModal2x = (email, language, token) => ajax('/manage/reset/login3', {email, language, token}, 'POST');


export const verifycode1 = (link, token) => ajax('/manage/reset/verify', {link, token}, 'POST');
export const verifycodeX = (link, token) => ajax('/manage/reset/verifyX', {link, token}, 'POST');
export const verifycodeX2 = (link, token) => ajax('/manage/reset/verifyX2', {link, token}, 'POST');
export const verifypwtoken = (code, token) => ajax('/manage/reset/verifytoken', {code, token}, 'POST');
export const verifypwtoken2 = (code, token) => ajax('/manage/reset/verify2fa', {code, token}, 'POST');
export const verifypwtoken2x = (code, token) => ajax('/manage/reset/verifypin', {code, token}, 'POST');
export const resetPasswordLink = (body, token) => ajax('/manage/reset/confirm', {body, token}, 'POST');


export function registerIf ({userName, email, password, phonenumber, county, language, iplist, iprestriction, token}) { return ajax('/register', {userName, email, password, phonenumber, county, language, iplist, iprestriction, token }, 'POST' )}
export function loginIf ({username, password, language, token}) { return ajax('/login', {username, password, language, token }, 'POST' )};
export function loginIfQR ({username, password, language, token}) { return ajax('/loginQR', {username, password, language, token }, 'POST' )}
export function logoutIf ({user, session, ssid1, ssid2, language, token}) { return ajax('/logout', {user, session, ssid1, ssid2, language, token }, 'POST' )}
export const startSession = (user, session, ssid1, ssid2, language, token ) => ajax('/session/start', {user, session, ssid1, ssid2, language, token }, 'POST');
export const endSession = (user, session, ssid1, ssid2, language, token ) => ajax('/session/end', {user, session, ssid1, ssid2, language, token }, 'POST');




export const getConnection = (info) => ajax('/system/network', { info }, 'POST')
export const getRestrictions2 = (language, token ) => ajax('/system/restrictions2', { language, token }, 'POST');
export const getDefaultNetwork = () => ajax('/system/network/base', { }, 'POST');
export const addConnection = (info) => ajax('/system/network/add', { info }, 'POST');



export const moveTokenVerify = (user, session, ssid1, ssid2, language, cancelToken, token) => ajax('/manage/qrcode/verify', { user, session, ssid1, ssid2, language, cancelToken, token }, 'POST'); 
export const registerNewQRlogin = (user, session, ssid1, ssid2, language, cancelToken, token) => ajax('/manage/qrcode/verify2', { user, session, ssid1, ssid2, language, cancelToken, token }, 'POST');
export const getRandomQRcode = () => ajax('/manage/qrcode/random', {}, 'POST');
export const verifyRandomQRcode = (token) => ajax('/manage/qrcode/proof', { token }, 'POST');
export const approveNewQRlogin = (token) => ajax('/manage/qrcode/proof2', { token }, 'POST');

