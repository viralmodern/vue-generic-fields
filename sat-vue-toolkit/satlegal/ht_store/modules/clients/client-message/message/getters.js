export default {
  matterMembers: (_, __, ___, rootGetters) => rootGetters["ht_store/clients/clientsCommon/members"],
  findUser: (_, getters) => (userId) => {
    const find = getters.matterMembers.find(x => x.id === userId);
    return find || {};
  },

  currentUser: (_,__,___, rootGetters) => rootGetters["ht_store/user/currentUser"],

  dataTopicMessage: (state, getters) => {
    const mapData = state.dataTopicMessage.map(x => {
      let checkIsMine = false;
      let joinUser = {};
      if (x.sender !== null) {
        joinUser = getters.findUser(x.sender);
        checkIsMine = joinUser.id === getters.currentUser.pk;
      } else {
        joinUser = {
          name: x.client.first_name + "" + x.client.last_name,
          avatar: {
            imageUrl: x.client.avatar
          }
        }
      }
      return {
        ...x,
        is_mine: checkIsMine,
        user: joinUser,
      }
    })
    return mapData;
  },
  countDataTopicMessage: state => state.countDataTopicMessage,
  isLoadMoreGetDataTopicMessge: (state, getter) => {
    return state.dataTopicMessage.length < getter.countDataTopicMessage;
  },
  isLoadingGet: state => state.isLoadingGet,
};
