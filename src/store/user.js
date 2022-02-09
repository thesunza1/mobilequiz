var state = {
  user: {
    id: -1,
    name: 'tran manh quynh',
    email: 'quynhtranza2',
  },
}

var getters = {
  user: (state ) => {
    return state.user
  },
}


var mutations = {
  update(state, payload ) {
    state.user = payload;
  },
  logout(state) {
    state.user.id = -1;
  }

}

var actions = {
  update({commit}, payload) {
    console.log(payload)
    commit('update', payload);
  },
  logout({commit}) {
    commit('logout');
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
