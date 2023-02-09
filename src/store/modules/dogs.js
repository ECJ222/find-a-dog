import { http } from "@/utils/axios";
import {
  getBreeds,
  getBreedsAndSubBreeds,
  searchBreedsAndSubBreeds,
} from "@/utils/fn";

const state = () => ({
  initial_dogs: [],
  dogs: [],
  breed_list: [],
  loading: false,
});

const getters = {
  dogs: (state) => state.dogs,
  loading: (state) => state.loading,
};

const actions = {
  async getBreedList({ commit }) {
    try {
      const response = await http.get("/breeds/list/all");
      const breeds = getBreedsAndSubBreeds(response.data.message);
      commit("SET_BREED_LIST", breeds);
    } catch (error) {
      console.error(error);
    }
  },
  async getDogs({ commit }) {
    try {
      commit("SET_LOADING", true);
      const dogs = await getBreeds([], 100);
      commit("SET_INITIAL_DOGS", dogs);
      commit("SET_DOGS", dogs);
      commit("SET_LOADING", false);
    } catch (error) {
      console.error(error);
    }
  },
  async loadMoreDogs({ state, commit }) {
    // After loading 100 dogs, subsequently only add 10 more dogs.
    try {
      commit("SET_LOADING", true);
      const dogs = await getBreeds(state.dogs, 10);
      commit("SET_INITIAL_DOGS", dogs);
      commit("SET_DOGS", dogs);
      commit("SET_LOADING", false);
    } catch (error) {
      console.error(error);
    }
  },
  async searchDog({ state, commit }, payload) {
    commit("SET_LOADING", true);

    if (payload === "") {
      commit("SET_DOGS", state.initial_dogs);
      commit("SET_LOADING", false);
      return;
    }

    let searchData = searchBreedsAndSubBreeds(state.breed_list, payload);

    try {
      const dogs = [];
      for (const searchText of searchData) {
        const response = await http.get(
          `/breed/${searchText.split("-").join("/")}/images/random`
        );

        dogs.push(response.data.message);
      }

      commit("SET_DOGS", dogs);

      commit("SET_LOADING", false);
    } catch (error) {
      console.error(error);
    }
  },
};

const mutations = {
  SET_INITIAL_DOGS(state, data) {
    state.initial_dogs = data;
  },
  SET_DOGS(state, data) {
    state.dogs = data;
  },
  SET_BREED_LIST(state, data) {
    state.breed_list = data;
  },
  SET_LOADING(state, data) {
    state.loading = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
