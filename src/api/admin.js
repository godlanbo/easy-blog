import request from './../utils/request';
import { setToken } from '@/utils/auth';
import { compress } from '../utils';

export function addTag(newTag) {
  return request({
    url: `/admin/tag`,
    method: 'POST',
    data: {
      tag: newTag
    }
  })
}

export function login(userData) {
  let { username, password } = userData
  return request({
    url: `/admin/login`,
    method: 'POST',
    data: {
      username,
      password
    }
  }).then(res => {
    setToken(res.data.token)
  })
}

export function newBlog(blog) {
  return request({
    url: '/blog',
    method: 'POST',
    data: blog
  })
}

export function deleteBlog(id) {
  return request({
    url: '/blog',
    method: 'DELETE',
    data: {
      id
    }
  })
}

export function updateBlog(blog) {
  return request({
    url: '/blog',
    method: 'PATCH',
    data: blog
  })
}

export function uploadImg(img) {
  compress(img.get('img'), { fieldName: 'img' }).then(res => {
    return res.formData
  }).then(fileData => {
    return request({
      url: '/admin/uploadImg',
      method: 'POST',
      data: fileData
    })
  })
}

export function deletImg(fileName) {
  return request({
    url: '/admin/deleteImg',
    method: 'DELETE',
    data: {
      fileName
    }
  })
}

export function newLife(lifeItem) {
  return request({
    url: '/life',
    method: 'POST',
    data: lifeItem
  })
}

export function deleteLife(id) {
  return request({
    url: '/life',
    method: 'DELETE',
    data: {
      id
    }
  })
}