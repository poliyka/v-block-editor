import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import mainStore from "./modules/MainStore";
import addMenuStore from "./modules/AddMenuStore";
import dragMenuStore from "./modules/DragMenuStore";

const store = new Vuex.Store({
  modules: {
    mainStore,
    addMenuStore,
    dragMenuStore,
  },
  // TODO: set true when development environment
  strict: false,
});

export default store;
