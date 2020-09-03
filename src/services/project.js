import request from '@/utils/request';
import {getHeader} from "@/utils/utils";


export async function fetchProjectList(params) {
  return request('http://127.0.0.1:7560/api/project/list', {
    params,
    headers: getHeader()
  });
}

export async function insertProject(data) {
  return request('http://127.0.0.1:7560/api/project/insert', {
    data,
    method: 'POST',
    headers: getHeader()
  });
}

export async function uploadProject(params) {
  const formData = new FormData();
  formData.append('file', params.file);
  formData.append('project_id', params.project_id);
  return request('http://127.0.0.1:7560/api/project/upload', {
    body: formData,
    method: 'POST',
    headers: getHeader()
  });
}
