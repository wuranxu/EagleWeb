import request from '@/utils/request';
import {getHeader} from "@/utils/utils";


export async function fetchProjectById({projectId}) {
  return request(`/api/project/${projectId}`, {
    headers: getHeader()
  });
}

export async function fetchProjectList(params) {
  return request('/api/project/list', {
    params,
    headers: getHeader()
  });
}

export async function insertProject(data) {
  return request('/api/project/insert', {
    data,
    method: 'POST',
    headers: getHeader()
  });
}

export async function updateProject(data) {
  return request('/api/project/update', {
    data,
    method: 'POST',
    headers: getHeader()
  });
}

export async function uploadProject(params) {
  const formData = new FormData();
  formData.append('file', params.file);
  formData.append('project_id', params.project_id);
  return request('/api/project/upload', {
    body: formData,
    method: 'POST',
    headers: getHeader()
  });
}

export async function listProjectRole({projectId}) {
  return request(`/api/project/${projectId}/members`, {
    headers: getHeader()
  });
}

export async function addProjectRole(payload) {
  return request(`/api/project/role/insert`, {
    headers: getHeader(),
    data: payload,
    method: 'POST'
  });
}

export async function updateProjectRole(payload) {
  return request(`/api/project/role/update`, {
    headers: getHeader(),
    data: payload,
    method: 'POST'
  });
}

export async function deleteProjectRole(payload) {
  return request(`/api/project/role/delete`, {
    headers: getHeader(),
    data: payload,
    method: 'POST'
  });
}
