import { removeObjectDuplicate } from "@/sat-vue-toolkit/satlegal/utils";

export default {
  setDataMeeting(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataMeetings = data;
    } else {
      for (let key in data) {
        const mergeTasks = (
          (state.dataMeetings[key] || {}).results || []
        ).concat(data[key].results);
        const results = removeObjectDuplicate(mergeTasks, "id"); //remove duplicates
        state.dataMeetings[key] = {
          ...data[key],
          results
        };
      }
      state.dataMeetings = { ...state.dataMeetings };
    }
  },
  addDataMeeting(state, { listIdGroup, result }) {
    listIdGroup.forEach(name => {
      const data = state.dataMeetings[name];
      data.results.push(result);
      data.totals++;
    });
  },

  updateDataMeeting(state, { result }) {
    if (result.color) {
      result.color = '#' + result.color
    }
    for (const key in state.dataMeetings) {
      state.dataMeetings[key].results = state.dataMeetings[key].results.map(x => {
        if (x.id === result.id || x.pk === result.id) {
          return { ...x, ...result };
        }
        return x;
      });
    }
  },
  updateMemberOrClient(state, { result }) {
    for (const key in state.dataMeetings) {
      state.dataMeetings[key].results = state.dataMeetings[key].results.map(x => {
        if (x.id === result.id || x.pk === result.id) {
          const mapValue = {
            [result.name]: x[result.name]
          }
          if (result.isCheck) {
            mapValue[result.name].push(...result.value)
          } else {
            mapValue[result.name] = mapValue[result.name].filter(x => x !== result.value)
          }
          return { ...x, ...mapValue };
        }
        return x;
      });
    }
  },
  removeDataMeeting(state, { name, meetingId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataMeetings) {
        state.dataMeetings[key].results = state.dataMeetings[key].results.filter(
          x => x.id !== meetingId
        );
        state.dataMeetings[key].totals--;
      }
    } else {
      state.dataMeetings[name].results = state.dataMeetings[name].results.filter(
        x => x.id !== meetingId
      );
      state.dataMeetings[name].totals--;
    }
  },

  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },

  // Labels
  getLabelsWorkSpace(state, data) {
    state.dataLabelsWorkSpace = data
  },
  addLableWorkSpace(state, data) {
    state.dataLabelsWorkSpace.unshift({ ...data, color: `#${data.color}` });
  },
  updateLableWorkSpace(state, data) {
    state.dataLabelsWorkSpace = state.dataLabelsWorkSpace.map(item => {
      if (item.pk === data.id) {
        return { ...data, pk: item.pk }
      }
      return item
    })
  },
  removeLableWorkSpace(state, id) {
    state.dataLabelsWorkSpace = state.dataLabelsWorkSpace.filter(item => item.pk !== id)
  },
};
