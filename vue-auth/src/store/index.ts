import { ActionContext, createStore } from 'vuex'

export default createStore({
  state: {
    auth: false,
  },

  mutations: {
    handleAuth(state: {auth: boolean}, auth: boolean) {
      state.auth = auth;
    }
  },

  actions: {
    setAuth(context: ActionContext<any, any> , auth: boolean  ) {
      context.commit('handleAuth', auth);
    }
  },

  modules: {
  }
})
