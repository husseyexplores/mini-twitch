import { SIGN_IN, SIGN_OUT } from './types'

export function signIn(userId) {
  return {
    type: SIGN_IN,
    payload: userId,
  }
}

export function signOut() {
  return {
    type: SIGN_OUT,
  }
}
