import api from "../../api/project.document.detail";
const state = {
  dataDocumentDetail: {},
  historyDocument: []
};

const getters = {
  dataDocumentDetail: state => state.dataDocumentDetail,
  historyDocument: state => state.historyDocument
};

const actions = {
  async getDataDocumentDetailRequest({ commit }, id) {
    commit("getDataDocumentDetail", await api.getDataDocumentDetail(id));
  },
  async getDataDocumentHistoryRequest({ commit }) {
    commit("getDataDocumentHistory", await api.getDataDocumentHistoryDetail());
  }
};

const mutations = {
  getDataDocumentDetail(state, data) {
    state.dataDocumentDetail = data;
  },
  getDataDocumentHistory(state, data) {
    state.historyDocument = data;
  },
  addComment(state, data) {
    state.dataDocumentDetail.dataComment.unshift({
      user: {
        id: 23,
        fullName: "Nguyen Phong",
        avatar:
          "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
      },
      mentions: [
        {
          id: 18091,
          name: "johnwilliams"
        },
        {
          id: 17801,
          name: "sarahash"
        }
      ],
      commentDate: "2019-01-20T17:00:00.000Z",
      userOnlineStatus: "busy",
      comment: data
    });
  },
  changeStatusRequest(state, data) {
    state.dataDocumentDetail.approvalStatus = data;
  },
  changeDescriptionRequest(state, data) {
    state.dataDocumentDetail.description = data;
  },
  changeStatusAttachment(state, data) {
    state.dataDocumentDetail.attachments = state.dataDocumentDetail.attachments.filter(
      x => x.id !== data.item.id
    );
    state.historyDocument.unshift({
      id: data.item.id,
      status: data.value,
      name: data.item.name,
      createAt: data.item.createAt
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
