import { http } from "@/utils/axios";

const state = () => ({
  dog_breeds: [],
});

const getters = {
  dog_breeds: (state) => state.dog_breeds,
};

const actions = {
  async getDogs({ commit }) {
    try {
      const response = await http.get("https://dog.ceo/api/breeds/list/all");
      commit("SET_DOGS_BREEDS", response.data);
    } catch (error) {
      console.error(error);
    }
  },
};

const mutations = {
  SET_DOGS_BREEDS: (state, data) => {
    state.dog_breeds = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
