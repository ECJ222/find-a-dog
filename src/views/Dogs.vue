<template>
  <div class="wrapper">
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
      class="load-more-btn"
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
      loading: true,
    };
  },
  components: {
    DogGrid,
    DogLoader,
  },
  computed: {
    ...mapGetters("dogs", ["dogs", "breed_list"]),
  },
  watch: {
    dogs: {
      handler() {
        this.loading = false;
      },
    },
  },
  created() {
    this.debouncedSearch = debounce((search_text) => {
      this.$store.dispatch("dogs/searchDog", search_text);
    }, 2000);

    if (this.dogs.length < 1) {
      this.loading = true;
      this.$store.dispatch("dogs/getBreedList");
    } else {
      this.loading = false;
    }
  },
  methods: {
    loadMoreImages() {
      this.loading = true;
      this.$store.dispatch("dogs/loadMoreDogs");
    },
    search() {
      this.loading = true;
      this.debouncedSearch(this.search_text);
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
}
.wrapper .load-more-btn {
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
