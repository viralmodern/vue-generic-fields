import api from '../../api/admin-setting-workflow'

const state = {
  dataWorkFlow: []
};

const getters = {
  dataWorkFlow: state => state.dataWorkFlow,
};

const actions = {
  async getDataWorkFlowRequest({ commit }) {
    commit("getDataWorkFlowSuccess", await api.listWorkflow())
  }
};

const mutations = {
  getDataWorkFlowSuccess(state, data) {
    state.dataWorkFlow = data;
  },
  deleteStepByParent(state, data){
    let workFlow = state.dataWorkFlow.find(x => x.id === data.parent);
    workFlow.steps = workFlow.steps.filter(x => x.id !== data.childrent)
  },
  addWorkFlowStep(state,data){
    state.dataWorkFlow.unshift(data)
  },
  editWorkFlowStep(state, data){
    state.dataWorkFlow = state.dataWorkFlow.map(x => {
      if(x.id === data.id){
        return {...x, ...data}
      }
      return x;
    })
  },
  deleteWorkFlow(state, data){
    state.dataWorkFlow = state.dataWorkFlow.filter(x => x.id !== data.id)
  },
  sortStepWorkFlow(state, data){
    // state.dataWorkFlow.sort((a, b) => value.indexOf(a.id) - value.indexOf(b.id));
    let find = state.dataWorkFlow.find(x => x.id === data.parent);
    find.steps = find.steps.sort((a, b) => data.value.indexOf(a.id) - data.value.indexOf(b.id))
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
