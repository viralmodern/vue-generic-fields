import _ from "lodash";
import { NA } from "@/sat-vue-toolkit/satlegal/config";

import { appConfigs } from "../../mock-data/appConfigs";
import { listColors } from "../../ht_helpers/color";
import { APP_CONFIGS_CONSTANTS } from "../../utils/constant";

import api from "@/sat-vue-toolkit/satlegal/api/app-config";
const state = {
  appConfigs: {
    choices: [],
    activity_types: {},
    system: {}
  },
  appConfigConstants: APP_CONFIGS_CONSTANTS,
};
const getters = {
  appConfigs: state => appConfigs,
  dataAppConfigs: state => state.appConfigs,
  appConfigChoices: state => {
    const choices = state.appConfigs.choices;
    const convertObject = choices.reduce((rs, choice) => {
      const cloneChoice = _.clone(choice, true);
      for (const key in cloneChoice) {
        cloneChoice[key] = cloneChoice[key].map((x, i) => ({
          ...x,
          color: x.color ? x.color : (listColors[i] || "primary")
        }));
      }
      rs = { ...rs, ...cloneChoice };
      return rs;
    }, {});
    convertObject["NA"] = NA;
    return convertObject;
  },
  appConfigListContentType: state => {
    const rs = {};
    const bookmarkableModels = state.appConfigs.system.bookmarkable_models || [];
    if(bookmarkableModels.length) {
      bookmarkableModels.forEach(x => rs[x.label] = x)
      return rs;
    }
    return rs;
  },
  appConfigConstants: state => state.appConfigConstants
};

const actions = {
  async getDataAppConfigRequest({ commit }) {
    const result = await api.getDataAppConfig();
    commit("setDataAppConfig", result);
    return result;
  }
};

const mutations = {
  setDataAppConfig(state, data) {
    state.appConfigs = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
