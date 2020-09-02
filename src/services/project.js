import request from '@/utils/request';


export async function fetchProjectList(params) {
  return request('http://127.0.0.1:7560/api/project/list', {
    params,
  });
}

export async function uploadProject(params) {
  const formData = new FormData();
  formData.append('file', params.file);
  formData.append('project_id', params.project_id);
  return request('http://127.0.0.1:7560/api/project/upload', {
    body: formData,
    method: 'POST',
  });
}
