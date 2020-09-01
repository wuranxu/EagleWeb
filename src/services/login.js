import request from '@/utils/request';


// export async function fakeAccountLogin(params) {
//   return request('/api/login/account', {
//     method: 'POST',
//     data: params,
//   });
// }
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}


export async function login(params) {
  return request('http://127.0.0.1:7560/api/user/login', {
    method: 'POST',
    data: params,
  });
}
