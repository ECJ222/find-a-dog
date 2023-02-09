import "es6-promise/auto";
import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import dogs from "./modules/dogs";

// Client-side caching.
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default new createStore({
  modules: {
    dogs,
  },
  plugins: [vuexLocal.plugin],
});
