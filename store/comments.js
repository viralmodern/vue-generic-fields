export const state = () => {
  return {
    data: {}
  }
}
export const getters = {
  findCommentByEndpoint: (state) => (endPoint) => {
    return state.data[endPoint]
  }
}

export const actions = {
  async fetchComment({ state, commit }, { endPoint }) {
    if (state.data.endPoint && state.data.endPoint.submitting) return
    commit('updateSubmitting', { endPoint, submitting: true })
    try {
      let _res = await this.$api.get(endPoint)
      let res = _res['data']
      commit('updateComment', {
        endPoint,
        comment: {
          hasComment: res.count > 0,
          commented: true,
          totalComments: res.count
        }
      })
    } catch (e) {
    } finally {
      commit('updateSubmitting', { endPoint, submitting: false })
    }
  }
}

export const mutations = {
  initComment(state, { endPoint, totalComments, hasComment, commented }) {
    state.data = {
      ...state.data,
      [endPoint]: { submitting: false, hasComment, totalComments },
      commented
    }
  },
  updateComment(state, { endPoint, comment }) {
    state.data = {
      ...state.data,
      [endPoint]: {
        ...state.data[endPoint],
        ...comment
      }
    }
  },
  updateSubmitting(state, { endPoint, submitting }) {
    state.data = {
      ...state.data,
      [endPoint]: {
        ...state.data[endPoint],
        submitting
      }
    }
  }
}
