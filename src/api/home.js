import request from './../utils/request'

export function getBlogsCategoryList(type) {
  return request({
    url: `/blog/categoryList?type=${type}`
  })
}

export function publishComment(data, id) {
  return request({
    url: `/comment/${id}`,
    method: 'POST',
    data
  })
}
