import request from './../utils/request';

export function getBlogsList() {
  return request({
    url: '/blogs'
  })
}

export function getLifeList() {
  return request({
    url: '/life'
  })
}
export function getBlogsDetail(id) {
  return request({
    url: `/blogs/${id}`
  })
}