import request from '@/utils/request';
import {getHeader} from "@/utils/utils";

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function fetchUserList() {
  return request('/api/user/list', {
    headers: getHeader()
  });
}

export async function registerUser(payload) {
  return request('/api/user/register', {
    headers: getHeader(),
    data: payload,
    method: 'POST'
  });
}
