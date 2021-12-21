import {
  setLocalStorage,
  removeLocalStorage,
  getLocalStorage
} from './localStorage'
import { AES, SHA256, enc } from 'crypto-js'

const tokenKey = 'Admin-token'

export function setToken(value) {
  return setLocalStorage(tokenKey, value, { exp: 3600 * 24 })
}

export function removeToken() {
  return removeLocalStorage(tokenKey)
}

export function getToken() {
  return getLocalStorage(tokenKey)
}

export function encode(s) {
  return AES.encrypt(s, SHA256('cfc').toString()).toString()
}

export function decode(s) {
  return AES.decrypt(s, SHA256('cfc').toString()).toString(enc.Utf8)
}
