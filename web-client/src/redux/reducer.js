import {SET_HEAD_TITLE, RECEIVE_USER, ERROR_MSG, RESET_USER} from './action-types'
import {combineReducers} from 'redux'
import storageUtils from '../utils/storageUtils'

const initHeadTitle = ''
const setHeadTitle = (state=initHeadTitle, action) => {
  switch (action.type) {
    case SET_HEAD_TITLE:
      return action.data
    default:
      return state
  }
}

const initUser = storageUtils.getUser() ? storageUtils.getUser() : {}
const user = (state=initUser, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return action.user
    case ERROR_MSG:
      return {...state, errorMsg: action.errorMsg}
    case RESET_USER:
      return {}
    default:
      return state
  }
}

export default combineReducers({
  setHeadTitle,
  user
})