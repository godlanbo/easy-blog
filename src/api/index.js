import request from './../utils/request';

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