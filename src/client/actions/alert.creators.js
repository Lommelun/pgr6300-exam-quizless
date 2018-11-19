import { alertConsts } from './action.types'

function success(message) {
  return { type: alertConsts.SUCCESS, message }
}

function error(message) {
  return { type: alertConsts.ERROR, message }
}

export default alertActions = {
  success,
  error
}
