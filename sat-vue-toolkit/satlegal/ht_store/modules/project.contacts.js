import api from '../../api/project.contacts'
import contact from './project.contacts.contact'
import general from './project.contacts.general'
import work from './project.contacts.work'
import document from './project.contacts.document'
import data from "../../mock-data/project.contacts"

const state = {
  dataContacts: [],
  totalsContacts: 0,
  loadingContacts: false
};

const getters = {
  dataContacts: state => state.dataContacts,
  totalsContacts: state => state.totalsContacts,
  loadingContacts: state => state.loadingContacts,
};

const actions = {
  async getDataContactsRequest({ commit }, pagination) {
    commit("setLoadingContacts", true);
    commit("getDataContactsSuccess", await api.getDataContacts(pagination))
    commit("setLoadingContacts", false);
  },
};

const mutations = {
  getDataContactsSuccess(state, data) {
    const { dataContacts, totals } = data
    state.dataContacts = dataContacts;
    state.totalsContacts = totals;
  },
  updateRateContracts(state, data) {
    const { id, rate } = data
    state.dataContacts = state.dataContacts.map(e => {
      if (e.id === id) {
        return { ...e, rate }
      }
      return e
    })
  },
  setLoadingContacts(state, status) {
    state.loadingContacts = status
  },
  removeContactById(state, id){
    state.dataContacts = state.dataContacts.filter(x => x.id !== id);
  },
  addContacts(state, data){
    state.dataContacts.unshift(data)
  },
  editContacts(state, data){
    state.dataContacts = state.dataContacts.map(x => {
      if(x.id === data.id){
        return {...x,...data}
      }
      return x;
    })
  },
  changeRoleContact(state, data){
    state.dataContacts = state.dataContacts.map(x => {
      if(x.id === data.id){
        return {...x,...data}
      }
      return x;
    })
  },
  filterContactByType(state, filter){
    const filterResult =  data.dataContacts.filter(x => filter.some(x1 => x1 === x.type))
    if(filterResult.length) {
      state.dataContacts = filterResult
    } else {
      state.dataContacts = data.dataContacts
    }
  },
  filterContact(state, filter){
    if(filter == "all"){
      state.dataContacts = data.dataContacts
    }else{
      state.dataContacts = data.dataContacts.filter(x => x.category == filter)
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    general,
    work,
    contact,
    document
  }
};
