import request from './../utils/request'

export function getBlogsList() {
  return request({
    url: '/blog/list'
  })
}

export function getLifeList() {
  return request({
    url: '/life/list'
  })
}
export function getBlogsDetail(id) {
  return request({
    url: `/blog/${id}`
  })
}

export function getCommentsList(id) {
  return request({
    url: `/comment/${id}`
  })
}

export function addSubEmail(email) {
  return request({
    url: '/emailSub',
    method: 'POST',
    data: {
      token: 'godlanbo',
      email
    }
  })
}

export function sendMessageBoard(messageData) {
  return request({
    url: '/messageBoard',
    method: 'POST',
    data: messageData
  })
}
