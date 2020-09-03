import * as projectService from '@/services/project';
import validResponse from "@/utils/response";
import {notification} from "antd";

export default {
  namespace: 'project',
  state: {
    data: [],
    projectName: '',
    visible: false,
  },

  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    }
  },

  effects: {
    * fetch({payload}, {call, put}) {
      const response = yield call(projectService.fetchProjectList, payload);
      if (validResponse(response)) {
        yield put({
          type: 'save',
          payload: {
            data: response.data.records,
            visible: false,
            projectName: '',
          }
        })
      }
    },

    *insert({payload}, {call, put, select}) {
      const response = yield call(projectService.insertProject, payload);
      if (validResponse(response)) {
        notification.success({message: response.message});
        yield put({
          type: 'fetch',
          payload: {
          }
        })
      }

    },

    * uploadFile({payload}, {call, put}) {
      const response = yield call(projectService.uploadProject, payload);
      if (validResponse(response)) {
        notification.success({
          message: response.message,
          description: '由于缓存原因, 请稍候查看头像变化'
        })
      }
    },
  }

}
