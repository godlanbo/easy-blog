import request from './../utils/request';


export function getBlogsDetail(id) {
  return request({
    url: `/blogs/${id}`
  })
}

export function getBlogsCategoryList(type) {
  return request({
    url: `/blogs/categoryList?type=${type}`
  })
}

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