import { http } from "@/utils/axios";

const getUniqueDogBreeds = (current_breeds, data) => {
  const breedsSet = new Set(current_breeds);
  return data.filter((dogs_images) => !breedsSet.has(dogs_images));
};

const state = () => ({
  dog_breeds: [],
});

const getters = {
  dog_breeds: (state) => state.dog_breeds,
};

const actions = {
  async getDogs({ commit }) {
    try {
      const breeds = [];
      let count = 0;
      while (count < 100) {
        const response = await http.get("/breeds/image/random/50");
        const uniqueBreeds = getUniqueDogBreeds(breeds, response.data.message);
        const data = uniqueBreeds.slice(0, 100 - count);
        breeds.push(...data);
        count += data.length;
      }
      commit("SET_DOG_BREEDS", breeds);
    } catch (error) {
      console.error(error);
    }
  },
};

const mutations = {
  SET_DOG_BREEDS(state, data) {
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
