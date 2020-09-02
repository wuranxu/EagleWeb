import * as projectService from '@/services/project';
import validResponse from "@/utils/response";
import {message, notification} from "antd";

export default {
  namespace: 'project',
  state: {
    data: [],
    projectName: '',
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
            data: response.data.records
          }
        })
      }
    },
    * uploadFile({payload}, {call, put}) {
      const response = yield call(projectService.uploadProject, payload);
      if (validResponse(response)) {
        notification.success({
          message: response.message
        })
      }
    },
  }

}
