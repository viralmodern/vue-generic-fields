import { cloneDeep, checkIsAfter } from "@/sat-vue-toolkit/satlegal/utils";

const checkUpcommingPastDeposition = (deposition) => deposition.map(x => {
  if(!x.time) {
    return {
      ...x,
      upcoming_past: "N/A"
    }
  }
  if(checkIsAfter(x.time)) {
    return {
      ...x,
      upcoming_past: "Past"
    }
  } else {
    return {
      ...x,
      upcoming_past: "Upcoming"
    }
  }
})

export default {
  dataCharacter: state => {
    const cloneDataCharacter = cloneDeep(state.dataCharacter);
    for (const key in cloneDataCharacter) {
      cloneDataCharacter[key].results.forEach(x => {
        const fDeposition = x.f_depositions || [];
        const pDeposition = x.p_depositions || [];
        const naDeposition = x.na_depositions || [];
        const deposition = [...fDeposition, ...pDeposition, ...naDeposition];
        x.deposition = checkUpcommingPastDeposition(deposition);
        return x;
      })
    }
    return cloneDataCharacter;
  },
  dataAllCharacter: state => {
    return state.dataAllCharacter.map(x => {
      return {
        id: x.pk,
        name: `${x.last_name} ${x.first_name}`,
        avatarUrl: x.avatar,
      }
    })
  },
  isLoadingGet: state => state.isLoadingGet,
  characterDetail: state => {
    const fDeposition = state.characterDetail.f_depositions || [];
    const pDeposition = state.characterDetail.p_depositions || [];
    const naDeposition = state.characterDetail.na_depositions || [];
    const deposition = [...fDeposition, ...pDeposition, ...naDeposition];
    return {
      ...state.characterDetail,
      deposition: checkUpcommingPastDeposition(deposition),
    }
  },
  dataNotes: (state, _, __, rootGetters) => {
    const matterMembers = rootGetters["ht_store/project/members/members"];
    const dataMap = state.dataNotes.map(x => {
      const findMembers =
        matterMembers.find(member => member.id === x.creator) || {};
      let member = {};
      if (findMembers.avatar) {
        member = {
          avatar: findMembers.avatar.imageUrl,
          peopleWrite: findMembers.avatar.name
        };
      }
      return {
        ...x,
        ...member
      };
    });
    return dataMap;
  },
  totalsPageNote: state => Math.ceil(state.countNotes / 20),
  isShowPaginationNotes: (_, getters) => (getters.totalsPageNote || 0) > 1,
  dataHistories: state => state.dataHistories,
  isLoadingHistories: state => state.isLoadingHistories,
  total_histories: state => state.total_histories,

  //comments
  matterMembers: (_, __, ___, rootGetters) => rootGetters["ht_store/project/members/members"],
  findUser: (_, getters) => (userId) => {
    const find = getters.matterMembers.find(x => x.id === userId);
    return find || {};
  },

  dataComment: (state, getters) => {
    const joinCommentFeedback = state.dataComment.map(x => {
      return {
        ...x,
        user: getters.findUser(x.creator),
        feedback: getters.dataCommentFeedback.filter(x1 => +x1.parent === +x.pk),
        action: getters.actionComment[x.pk] || {}
      }
    })
    return joinCommentFeedback;
  },
  dataCommentFeedback: (state, getters) => {
    const joinActionCommentFeedback = state.dataCommentFeedback.map(x => {
      return {
        ...x,
        user: getters.findUser(x.creator),
        action: getters.actionCommentFeedback[x.pk] || {}
      }
    })
    return joinActionCommentFeedback;
  },
  actionComment: state => state.actionComment,
  actionCommentFeedback: state => state.actionCommentFeedback,
  countComment: state => state.countComment,
  totalsPageComment: state => Math.ceil(state.countComment / 20),
  isShowPaginationComment: (_, getters) => (getters.totalsPageComment || 0) > 1,
};
