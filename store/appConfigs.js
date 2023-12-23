// initial state
import _ from 'lodash'
import { getChoicesWithDescriptions } from '~/utils/appConfigs'
import { SESSION, setSESSION, getSESSION } from '~/utils'

const types = {
  pending: 'pending',
  completed: 'completed',
  resetConfigs: 'resetConfigs',
  resetCourts: 'resetCourts',
}

export const state = () => ({
  configs: getSESSION(SESSION.APP_CONFIGS),
  courts: [],
})

export const getters = {
  pending: (state) => state.pending,
  configs: (state) => state.configs,
  courts: (state) => state.courts,
  workspaceMemberRole: (state) => {
    try {
      return getChoicesWithDescriptions(
        state.configs.choices,
        'Workspace.MemberRole'
      )
    } catch (e) {
      return []
    }
  },
  getChoicesConfigByName: (state, getters) => (model) => {
    try {
      return getters.configs.choices.find(
        (choice) => Object.keys(choice)[0] === model
      )[model]
    } catch (e) {
      return []
    }
  },
  getDetailChoicesConfigByName: (state, getters) => (
    model,
    value,
    getLabel = true
  ) => {
    try {
      let choices = getters.configs.choices.find(
        (choice) => Object.keys(choice)[0] === model
      )[model]
      let v = choices.find((choice) => choice.value == value)
      return getLabel ? v['label'] : v
    } catch (e) {
      console.error('CC', e.message)
      return null
    }
  },
  findCourtById: (state, getters) => (id) => {
    try {
      return state.courts.find((c) => c.pk == id)
    } catch (e) {
      return null
    }
  },
  findRoleByWorkspaceMemberRole: (state, getters) => (ROLE) => {
    try {
      return getters.workspaceMemberRole.filter((rl) => rl.value === ROLE)[0]
    } catch (e) {
      return {}
    }
  },
  findChoicesAttributeToModel: (state) => {
    // Attribute.ToModel
    try {
      // return getChoicesWithDescriptions(state.configs.choices, 'Attribute.ToModel');
      return state.configs.choices.find(
        (cf) => _.keys(cf)[0] === 'Attribute.ToModel'
      )['Attribute.ToModel']
    } catch (e) {
      console.log('findChoicesAttributeToModel', e.message)
      return []
    }
  },
  findFiledByDocket: (state) => {
    try {
      return state.configs.choices.find(
        (cf) => _.keys(cf)[0] === 'MatterDocketEntry.FiledBy'
      )['MatterDocketEntry.FiledBy']
    } catch (e) {
      console.log('findFiledByDocket', e.message)
      return []
    }
  },
  findEntryTypeDocket: (state) => {
    try {
      return state.configs.choices.find(
        (cf) => _.keys(cf)[0] === 'MatterDocketEntry.DocketEntryType'
      )['MatterDocketEntry.DocketEntryType']
    } catch (e) {
      console.log('findEntryTypeDocket', e.message)
      return []
    }
  },
}
export const actions = {
  async loadAppConfigs({ commit, state }) {
    try {
      let res = await this.$api.get('/api/app-configs/')
      commit(types.resetConfigs, res.data)
      return Promise.resolve(res.data)
    } catch (e) {
      return Promise.resolve(false)
    } finally {
    }
  },
  async loadCourts({ commit, state }) {
    try {
      let res = await this.$api.get('/api/courts/')
      commit(types.resetCourts, res['data'])
    } catch (e) {
    } finally {
    }
  },
}

export const mutations = {
  [types.pending](state) {
    state.pending = true
  },
  [types.resetConfigs](state, configs) {
    state.configs = configs
    setSESSION(SESSION.APP_CONFIGS, configs)
  },
  [types.resetCourts](state, courts) {
    state.courts = courts
  },
}
