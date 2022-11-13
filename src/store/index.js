import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    deleteDialog: {
      show: false,
      type: "",
      data: "",
      callback: undefined,
      loading: false
    },
    alert: {
      show: false,
      type: "",
      message: ""
    }
  },
  mutations: {
    setDeleteDialog(state, payload) {
      state.deleteDialog = { ...payload };
    },
    setAlert(state, payload) {
      state.alert = { ...payload };
    }
  },
  actions: {},
  modules: {}
});

export default store;
