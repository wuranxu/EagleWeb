import * as projectService from '@/services/project';
import validResponse from "@/utils/response";
import {notification} from "antd";

export default {
  namespace: 'project',
  state: {
    data: [],
    projectName: '',
    visible: false,
    currentProject: null,
    projectData: {},
    roles: [],
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

    * queryProject({payload}, {call, put}) {
      const response = yield call(projectService.fetchProjectById, payload);
      if (validResponse(response) && response.data !== null) {
        yield put({
          type: 'save',
          payload: {
            projectData: response.data,
            currentProject: response.data.projectName
          }
        })
      }
    },

    *insert({payload}, {call, put}) {
      const response = yield call(projectService.insertProject, payload);
      if (validResponse(response)) {
        notification.success({message: response.message});
        yield put({
          type: 'queryProject',
          payload: {
            projectId: payload.id,
          }
        })
      }
    },

    *update({payload}, {call, put}) {
      const response = yield call(projectService.updateProject, payload);
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

    * listProjectRole({payload}, {call, put}) {
      const response = yield call(projectService.listProjectRole, payload);
      if (validResponse(response)) {
        yield put({
          type: 'save',
          payload: {
            roles: response.data,
          }
        })
      }
    }
  }

}
