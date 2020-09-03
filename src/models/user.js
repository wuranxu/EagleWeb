import { fetchUserList } from '@/services/user';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    users: [],
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fetchUserList);
      const u = response.data.map(v => ({
        value: v.id,
        label: v.nickname
      }));
      yield put({
        type: 'save',
        payload: {
          users: u
        },
      });
    },

    *fetchCurrent(_, { call, put }) {
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
      return { ...state, currentUser: action.payload || {} };
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
