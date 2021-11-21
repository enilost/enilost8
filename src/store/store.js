import Vue from 'vue'
import Vuex from 'vuex'
import ads from '@/store/ads.js'
import user from '@/store/user.js'
import errors from '@/store/errors.js'



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShowModal:false
  },
  mutations: {
    IS_SHOW_MODAL_MUT(state){
      state.isShowModal = !state.isShowModal
    }
  },
  actions: {
    IS_SHOW_MODAL_ACTION(ctx){
      ctx.commit('IS_SHOW_MODAL_MUT')
    }
  },
  getters: {
    IS_SHOW_MODAL_GETT(state) {
      return state.isShowModal
    },
  },
  modules: {
    user,
    ads,
    errors
  }
})
