import Vue from "vue";
import "es6-promise/auto";
import Vuex from "vuex";
import dogs from "./modules/dogs";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    dogs,
  },
});
