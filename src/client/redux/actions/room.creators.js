import { roomConsts } from './action.types'

const create = () => (dispatch, getState, emit) => {
  dispatch(create())
  emit(roomConsts.CREATE)

  function create() {
    return { type: roomConsts.CREATE }
  }
}

const get = () => (dispatch, getState, emit) => {
  dispatch(get())
  emit(roomConsts.GET_ALL)

  function get() {
    return { type: roomConsts.GET_ALL }
  }
}

const remove = room => (dispatch, getState, emit) => {
  dispatch(remove(room))
  emit(roomConsts.REMOVE, room)

  function remove(id) {
    return { type: roomConsts.REMOVE, payload: { id } }
  }
}

const join = room => (dispatch, getSate, emit) => {
  dispatch(connect(room))
  emit(roomConsts.CONNECT, room)

  function connect(id) {
    return { type: roomConsts.CONNECT, payload: { id } }
  }
}

const leave = room => (dispatch, getSate, emit) => {
  dispatch(disconnect(room))
  emit(roomConsts.DISCONNECT, room)

  function disconnect(id) {
    return { type: roomConsts.DISCONNECT, payload: { id } }
  }
}

export default {
  create,
  remove,
  join,
  leave,
  get
}
