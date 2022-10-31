import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      searchTerm:"",
    }
  },
  mutations: {
    updateSearchTerm (state,payload) {
      state.searchTerm = payload;
    }
  },
  actions:{
    updateSearchTerm(context,payload){
      context.commit('updateSearchTerm',payload);
    }
  }
})
export default store;