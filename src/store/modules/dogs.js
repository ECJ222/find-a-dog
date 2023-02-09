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
  dog_image: "",
});

const getters = {
  dogs: (state) => state.dogs,
  dog_name: (state) => state.dog_name,
  breed_list: (state) => state.breed_list,
  loading: (state) => state.loading,
};

const actions = {
  async getBreedList({ dispatch, commit }) {
    try {
      const response = await http.get("/breeds/list/all");
      const breeds = getBreedsAndSubBreeds(response.data.message);
      return dispatch("getDogs").then(() => {
        commit("SET_BREED_LIST", breeds);
      });
    } catch (error) {
      console.error(error);
    }
  },
  async getDogs({ commit }) {
    try {
      const dogs = await getBreeds([], 100);
      commit("SET_INITIAL_DOGS", dogs);
      commit("SET_DOGS", dogs);
      commit("SET_LOADING", false);
    } catch (error) {
      console.error(error);
    }
  },
  async loadMoreDogs({ state, commit }) {
    // load more dogs, subsequently only add 10 more dogs.
    try {
      const dogs = await getBreeds(state.dogs, 10);
      commit("SET_INITIAL_DOGS", dogs);
      commit("SET_DOGS", dogs);
    } catch (error) {
      console.error(error);
    }
  },
  async searchDog({ state, commit }, payload) {
    if (payload === "") {
      commit("SET_DOGS", state.initial_dogs);
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
    } catch (error) {
      console.error(error);
    }
  },

  // eslint-disable-next-line no-unused-vars
  async getDogDetails({ commit }, payload) {
    try {
      const response = await http.get(
        `/breed/${payload.split("-").join("/")}/images/random`
      );

      commit("SET_DOGS_IMAGE", response.data.message);
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
  SET_DOGS_IMAGE(state, data) {
    state.dog_name = data;
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
