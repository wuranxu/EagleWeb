import {stringify} from 'querystring';
import {history} from 'umi';
import {login} from '@/services/login';
import {setAuthority} from '@/utils/authority';
import {getPageQuery} from '@/utils/utils';
import {notification} from "antd";

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    * login({payload}, {call, put}) {
      const response = yield call(login, payload);
      if (response.code !== 200) {
        notification.error({message: response.message});
        return;
      }
      localStorage.setItem("eagle_user", JSON.stringify(response.data));
      localStorage.setItem("eagle_token", response.data.token);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully
      const urlParams = new URL(window.location.href);
      const params = getPageQuery();
      let {redirect} = params;

      if (redirect) {
        const redirectUrlParams = new URL(redirect);

        if (redirectUrlParams.origin === urlParams.origin) {
          redirect = redirect.substr(urlParams.origin.length);

          if (redirect.match(/^\/.*#/)) {
            redirect = redirect.substr(redirect.indexOf('#') + 1);
          }
        } else {
          window.location.href = '/';
          return;
        }
      }
      history.replace(redirect || '/');
      yield put(
        {
          type: 'user/saveCurrentUser',
          payload: response.data,
        }
      )
    },

    logout() {
      const {redirect} = getPageQuery(); // Note: There may be security issues, please note
      localStorage.removeItem('eagle_token');
      localStorage.removeItem('eagle_user');
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, {payload}) {
      setAuthority(payload.data.role);
      return {...state, status: payload.status, type: payload.type};
    },
  },
};
export default Model;
