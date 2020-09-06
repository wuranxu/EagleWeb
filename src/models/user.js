import {fetchUserList} from '@/services/user';
import validResponse from "@/utils/response";

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    users: [],
    userMap: {},
  },
  effects: {
    * fetch(_, {call, put}) {
      const response = yield call(fetchUserList);
      if (validResponse(response)) {
        const result = [];
        const map = {};
        response.data.forEach(v => {
          result.push({
            value: v.id,
            label: v.nickname
          });
          map[v.id] = v;
        });
        yield put({
          type: 'save',
          payload: {
            users: result,
            userMap: map
          },
        });
      }
    },

    * fetchCurrent(_, {call, put}) {
      const user = localStorage.getItem("eagle_user");
      if (user === undefined) {
        yield put({
          type: 'login/logout'
        })
      }
      const userInfo = JSON.parse(user)
      yield put({
        type: 'saveCurrentUser',
        payload: userInfo,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return {...state, currentUser: action.payload || {}};
    },

    save(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
