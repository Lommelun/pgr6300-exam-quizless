export const alertConsts = {
  SUCCESS: 'ALERT_SUCCESS',
  FAILURE: 'ALERT_FAILURE'
}

export const userConsts = {
  REGISTER_REQUEST: 'USER_REGISTER_REQUEST',
  REGISTER_FAILURE: 'USER_REGISTER_FAILURE',
  REGISTER_SUCCESS: 'USER_REGISTER_SUCCESS',

  LOGIN_REQUEST: 'USER_LOGIN_REQUEST',
  LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
  LOGIN_FAILURE: 'USER_LOGIN_FAILURE',

  LOGOUT_REQUEST: 'USER_LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'USER_LOGOUT_SUCCESS',
  LOGOUT_FAILURE: 'USER_LOGOUT_FAILURE'
}

export const gameConsts = {
  WIN: '$GAME_WIN',
  LOSS: '$GAME_LOSS',

  VERIFY_ANSWER_REQUEST: '$GAME_VERIFY_ANSWER_REQUEST',
  ANSWER_CORRECT: '$GAME_ANSWER_CORRECT',
  ANSWER_WRONG: '$GAME_ANSWER_WRONG'
}

export const roomConsts = {
  CREATE: '$ROOM_CREATE',
  REMOVE: '$ROOM_DELETE',

  CREATED: '$ROOM_CREATED',
  REMOVED: '$ROOM_REMOVED',

  USER_CONNECTED: '$ROOM_USER_CONNECTED',
  USER_DISCONNECTED: '$ROOM_USER_DISCONNECTED',

  CONNECT: 'ROOM_CONNECT',
  DISCONNECT: 'ROOM_DISCONNECT'
}
