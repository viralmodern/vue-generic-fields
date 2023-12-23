import axios from '../../ht_plugins/axios';
import _ from 'lodash';

const state = {
  project: {},
  stagesWorkFlow: [],
  workFlowProject: {},
  workFlowId: '',
  projectMembers: []
};
// getters
const getters = {
  projectDetail: state => {
    return state.project;
  },
  workflowProject: state => {
    return state.workFlowProject
  },
  workFlowId: state => state.workFlowId,
  stagesWorkFlow: state => {
    return state.stagesWorkFlow
  },
  projectMembers: state => {
    return state.projectMembers
  }
};
// mutations
const mutations = {
  setInfoProject(state, payload) {
    state.project = {...payload};
  },
  setStagesWorkFlow(state, stages) {
    let temps = [...stages];
    let _idx = _.findIndex(temps, function (o) {
      return o.pk === 'new';
    });
    if (_idx >= 0) {
      temps.splice(_idx, 1);
    }
    state.stagesWorkFlow = [...temps];
  },
  setWorkFlowId(state, workFlowId) {
    state.workFlowId = workFlowId;
  },
  setWorkFlowProject(state, workFlowProject) {
    state.workFlowProject = {...workFlowProject};
  },
  setMemberProject(state, members) {
    state.projectMembers = [...members];
  }
};
// actions
const actions = {
  fetchStagesWorkFlow({commit, state}) {
    axios.get('/api/workflows/' + state.workFlowId + '/stages/').then(rs => {
      let stages = rs.data;
      commit('setStagesWorkFlow', stages)
    });
  },
  updateProject({commit, state}, data) {
    return new Promise((resolve, reject) => {
      axios.patch('/api/projects/' + state.project.pk + '/', data).then(rs => {
        let _project = rs.data;
        commit("setInfoProject", _project);
        resolve(_project);
      }).catch((err) => {
        reject(err)
      })
    })
  },
  fetchProjectMembers({commit, state}){
    return new Promise((resolve, reject) => {
      axios.get('/api/projects/'+state.project.pk+'/members/').then(rs => {
        let members = rs.data;
        commit("setMemberProject", members);
      }).catch(err => {
        reject(err);
      })
    })
  }
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
