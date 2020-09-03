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
  return request('http://127.0.0.1:7560/api/user/list', {
    headers: getHeader()
  });
}
