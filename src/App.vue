<template>
  <div class="container">
    <h1 class="header">Looking for a dog 🐾</h1>
    <div class="search">
      <input
        type="search"
        placeholder="Have one in mind?"
        v-model="search_text"
        @input.prevent="search"
      />
    </div>
    <dog-grid :dog-breeds="dogs" />
    <dog-loader v-show="loading" />
    <button
      v-show="!loading && dogs.length < 148 && search_text.trim().length < 1"
      class="load-more"
      @click="loadMoreImages"
    >
      Load more
    </button>
  </div>
</template>

<script>
import DogGrid from "@/components/DogGrid.vue";
import DogLoader from "@/components/DogLoader.vue";
import { debounce } from "@/utils/fn";
import { mapGetters } from "vuex";

export default {
  name: "DogList",
  data() {
    return {
      search_text: "",
    };
  },
  components: {
    DogGrid,
    DogLoader,
  },
  computed: {
    ...mapGetters("dogs", ["dogs", "loading"]),
  },
  created() {
    this.debouncedSearch = debounce((search_text) => {
      this.$store.dispatch("dogs/searchDog", search_text);
    }, 2000);
    this.$store.dispatch("dogs/getBreedList");
    this.$store.dispatch("dogs/getDogs");
  },
  methods: {
    loadMoreImages() {
      this.$store.dispatch("dogs/loadMoreDogs");
    },
    search() {
      this.debouncedSearch(this.search_text);
    },
  },
};
</script>

<style scoped>
.container {
  width: 100vw;
}
.container .header {
  text-align: center;
  font-size: 5rem;
  color: #484848;
  margin: 3rem 0 4rem;
}
.container button.load-more {
  background-color: #484848;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 1.5rem;
  padding: 1rem 2rem;
  text-align: center;
  display: block;
  margin: 3rem auto;
  cursor: pointer;
}
.search {
  margin: 0 auto 3rem;
  text-align: center;
}
.search input[type="search"] {
  width: 50%;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  border-radius: 10px;
  border: 1px solid #484848;
  outline: none;
  box-shadow: 0px 0px 10px 0px #ccc;
  transition: all 0.3s;
}

.search input[type="search"]:focus {
  width: 60%;
  box-shadow: 0px 0px 10px 0px #484848;
}
</style>
