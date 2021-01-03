import Storage from 'web-storage-cache'

const webStorage = new Storage()

export function setLocalStorage(key, value, options) {
  return webStorage.set(key, value, options)
}
export function getLocalStorage(key) {
  clearLocalStorage()
  return webStorage.get(key)
}
export function removeLocalStorage(key) {
  return webStorage.delete(key)
}
export function clearLocalStorage() {
  return webStorage.deleteAllExpires()
}
