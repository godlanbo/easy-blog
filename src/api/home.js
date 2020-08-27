import request from './../utils/request';



export function getBlogsCategoryList(type) {
  return request({
    url: `/blogs/categoryList?type=${type}`
  })
}