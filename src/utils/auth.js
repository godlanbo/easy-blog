import { setLocalStorage, removeLocalStorage, getLocalStorage } from "./localStorage"
import CryptoJS from 'crypto-js'

const tokenKey = 'Admin-token'

export function setToken(value) {
  return setLocalStorage(tokenKey, value, { exp : 3600 * 24 })
}

export function removeToken() {
  return removeLocalStorage(tokenKey)
}

export function getToken() {
  return getLocalStorage(tokenKey)
}

export function encode(s) {
  return CryptoJS.AES.encrypt(s, CryptoJS.SHA256('cfc').toString()).toString()
}

export function decode(s) {
  return CryptoJS.AES.decrypt(s, CryptoJS.SHA256('cfc').toString()).toString(CryptoJS.enc.Utf8)
}
