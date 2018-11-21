import io from 'socket.io-client';
import { alertConsts, gameConsts, roomConsts, userConsts } from '../redux/actions/action.types'

const socket = io()

const wstypes = [
  ...Object.values(alertConsts),
  ...Object.values(gameConsts),
  ...Object.values(roomConsts),
  ...Object.values(userConsts)
].filter(type => type.startsWith('ws/'))

export const init = (store) => {
  wstypes.forEach(type => {
    socket.on(type, payload => store.dispatch({ type, payload }))
  })
}

export const emit = (type, payload = {}) => socket.emit(type, payload);
