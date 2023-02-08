import "es6-promise/auto";
import { createStore } from "vuex";
import dogs from "./modules/dogs";

export default new createStore({
  modules: {
    dogs,
  },
});
