import debounce from "lodash/debounce";
import keyBy from "lodash/keyBy";
import values from "lodash/values";

const findUser = debounce(
    ($api, state, commit, userPK, resolve, reject) => {
        const PKString = Array.from(state.queue).join(',');
        let str1 = '/api/workspace/members/'
        let str2 = '/api/users/'
        return $api
            .get(`${str1}?pk__in=${PKString}`)
            .then(resp => {
                let data = resp['data']
                let members = data.map(mb =>{
                  return {...mb, ...mb.user}
                })
                commit("appendUsers", members);
                resolve(members);
            })
            .catch(err => {
                reject(err);
            }).finally(() => {
                PKString.split(',').map(numStr => commit("deleteQueue", parseInt(numStr)));
            });
    },
    350
);

// initial state
export const state = () => {
    return {
        data: {},
        queue: []
    };
};

const getters = {
    getUserByPK: (state) => (pk) => {
        return state.data[pk]
    },
    members: (state) => values(state.data)
};

const actions = {
    fetchUser({state, commit}, userPK) {
        return new Promise((resolve, reject) => {
            if (userPK in state.data) {
                return resolve(state.data[userPK]);
            }
            if (!state.queue.includes(userPK)) {
                commit("addQueue", userPK);
            }
            findUser(this.$api, state, commit, userPK, resolve, reject);
        });
    },
};

const mutations = {
    appendUsers(state, users) {
        state.data = {...state.data, ...keyBy(users, "pk")};
    },
    addQueue(state, PK) {
        state.queue.push(PK);
    },
    deleteQueue(state, PK) {
        const s = new Set(state.queue);
        s.delete(PK);
        state.queue = Array.from(s);
    }
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
