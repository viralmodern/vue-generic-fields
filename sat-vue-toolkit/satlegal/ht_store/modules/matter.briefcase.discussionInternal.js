import api from "../../api/matter.briefcase.discussionInternal";

const state = {
  dataThread: [],
  dataComments: [],
};

const getters = {
  dataThread: state => state.dataThread,
  dataComments: state => state.dataComments,
};

const actions = {
  async getDataThreadRequest({ commit }) {
    commit("getDataThread", await api.getDataThead());
  },
  async getDataCommentRequest({ commit }) {
    commit("getDataComment", await api.getdataComments());
  }
};

const mutations = {
  getDataThread(state, data) {
    state.dataThread = data;
  },
  addThread(state, data) {
    state.dataThread.push({
      id: state.dataThread.length + 1,
      name: data
    });
  },
  getDataComment(state, data) {
    state.dataComments = data;
  },
  addComment(state, data) {
    state.dataComments.push({
      id: Math.random(),
      user: {
        id: 1,
        fullName: "Nguyen Phong",
        avatar: {
          imageUrl:
            "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
        }
      },
      content: data,
      like: [],
      date: "2019-01-20T17:00:00.000Z",
      replies: []
    });
  },
  addCommentChildrent(state, data) {
    state.dataComments = state.dataComments.map(e => {
      if (e.id === data.id) {
        return {
          ...e,
          replies: [
            ...e.replies,
            {
              id: Math.random(),
              user: {
                id: 2324231,
                fullName: "Nguyen Phong",
                avatar: {
                  imageUrl:
                    "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                }
              },
              content: data.text,
              like: [],
              date: "2019-01-20T17:00:00.000Z"
            }
          ]
        };
      }
      return e;
    });
  },
  likeReply(state, id) {
    state.dataComments = state.dataComments.map(e => {
      if (e.id === id) {
        return {
          ...e,
          like: [
            ...e.like,
            {
              id: 100,
              name: "Nguyen Van Phong"
            }
          ]
        };
      }
      return e;
    });
  },
  unlikeReply(state, id) {
    state.dataComments = state.dataComments.map(e => {
      if (e.id === id) {
        return {
          ...e,
          like: [...e.like.filter(x => x.id !== 100)]
        };
      }
      return e;
    });
  },
  likeReplyChildrent(state, data) {
    state.dataComments = state.dataComments.map(e => {
      if (e.id === data.parent) {
        return {
          ...e,
          replies: e.replies.map(x => {
            if (x.id === data.childrent) {
              return {
                ...x,
                like: [
                  ...x.like,
                  {
                    id: 100,
                    name: "Nguyen Van Phong"
                  }
                ]
              };
            }
            return x;
          })
        };
      }
      return e;
    });
  },
  unlikeReplyChildrent(state, data) {
    state.dataComments = state.dataComments.map(e => {
      if (e.id === data.parent) {
        return {
          ...e,
          replies: e.replies.map(x => {
            if (x.id === data.childrent) {
              return {
                ...x,
                like: [...e.like.filter(x => x.id !== 100)]
              };
            }
            return x;
          })
        };
      }
      return e;
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
