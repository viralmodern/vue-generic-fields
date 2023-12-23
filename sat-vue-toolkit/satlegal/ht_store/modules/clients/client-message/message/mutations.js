import _ from "lodash";
import { cloneDeep } from "@/sat-vue-toolkit/satlegal/utils"

export default {
  setDataTopicMessage(state, data) {
    state.dataTopicMessage = data.results;
    state.countDataTopicMessage = data.count;
  },
  concatDataTopicMessage(state, data) {
    state.dataTopicMessage = [...data.results, ...state.dataTopicMessage];
    state.countDataTopicMessage = data.count;
  },

  addDataTopicMessage(state, data) {
    state.dataTopicMessage.push(data);
    state.countDataTopicMessage++;
  },

  removeDataTopicMessage(state, data) {
    state.dataTopicMessage = state.dataTopicMessage.filter(x => x.pk !== data.pk);
    state.countDataTopicMessage--;
  },

  setLoading(state, loading) {
    state.isLoadingGet = loading;
  },


};
