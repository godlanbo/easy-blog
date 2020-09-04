import request from './../utils/request';



export function getBlogsCategoryList(type) {
  return request({
    url: `/blog/categoryList?type=${type}`
  })
}