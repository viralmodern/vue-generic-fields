import { removeObjectDuplicate } from "@/sat-vue-toolkit/satlegal/utils";

export default {
  setDataClientMessage(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataClientMessage = data;
    } else {
      for (let key in data) {
        const mergeTasks = ((state.dataClientMessage[key] || {}).results || []).concat(
          data[key].results
        );
        const results = removeObjectDuplicate(mergeTasks, 'pk'); //remove duplicates
        state.dataClientMessage[key] = {
          ...data[key],
          results
        };
      }
      state.dataClientMessage = { ...state.dataClientMessage };
    }
  },

  setDataClientMessageDetail(state, data) {
    state.dataClientMessageDetail = { ...state.dataClientMessageDetail, ...data };
  },

  addDataClientMessage(state, { listIdGroup, result }) {
    listIdGroup.forEach(name => {
      const data = state.dataClientMessage[name];
      data.results.push(result);
      data.totals++;
    });
  },
  updateDataClientMessage(state, { result }) {
    for (const key in state.dataClientMessage) {
      state.dataClientMessage[key].results = state.dataClientMessage[key].results.map(x => {
        if (x.pk === result.pk) {
          return { ...x, ...result };
        }
        return x;
      });
    }
  },
  removeDataClientMessage(state, { name, clientMessageId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataClientMessage) {
        state.dataClientMessage[key].results = state.dataClientMessage[key].results.filter(
          x => x.pk !== clientMessageId
        );
        state.dataClientMessage[key].totals--;
      }
    } else {
      state.dataClientMessage[name].results = state.dataClientMessage[name].results.filter(
        x => x.pk !== clientMessageId
      );
      state.dataClientMessage[name].totals--;
    }
  },


  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },

  setLoadingGetDetail(state, loading) {
    state.isLoadingGetDetail = loading;
  },

  // attachments
  getDataAttachments(state, data) {
    state.dataAttachments = data;
  },

  addDataAttachment(state, data) {
    state.dataAttachments = [...state.dataAttachments, ...data]
  },

  updateDataAttachment(state, data) {
    state.dataAttachments = state.dataAttachments.map(x => {
      if(x.pk === data.attachmentId) {
        return {...x, ...data.result}
      }
      return x;
    });
  },

  removeDataAttachment(state, attachmentId) {
    state.dataAttachments = state.dataAttachments.filter(x => x.pk !== attachmentId);
  },

  addDataAttachmentInClientMessage(state, data) {
    for (var key in state.dataClientMessage) {
      state.dataClientMessage[key].results = state.dataClientMessage[
        key
      ].results.map(x => {
        if(x.pk === data.ClientMessageId) {
          const attachments = [...x.attachments, ...data.attachment];
          return {...x, attachments};
        }
        return x;
      });
    }
  },

  updateDataAttachmentInClientMessage(state, data) {
    for (var key in state.dataClientMessage) {
      state.dataClientMessage[key].results = state.dataClientMessage[
        key
      ].results.map(x => {
        if(x.pk === data.ClientMessageId) {
          const attachments = x.attachments.map(attachment => {
            if (attachment.pk === data.attachment.pk) {
              return data.attachment;
            }
            return attachment;
          });
          return {...x, attachments};
        }
        return x;
      });
    }
  },

  removeDataAttachmentInClientMessage(state, data) {
    for (var key in state.dataClientMessage) {
      state.dataClientMessage[key].results = state.dataClientMessage[
        key
      ].results.map(x => {
        if(x.pk === data.ClientMessageId) {
          const attachments = x.attachments.filter(x => x.pk !== data.attachmentId);
          return {...x, attachments};
        }
        return x;
      });
    }
  },

};
