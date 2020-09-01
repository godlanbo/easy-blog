import request from './../utils/request';
import { setToken } from '@/utils/auth';

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
  let { account, password } = userData
  return request({
    url: `/admin/login`,
    method: 'POST',
    data: {
      account,
      password
    }
  }).then(res => {
    setToken(res.data.token)
  })
}