<template>
  <div class="container">
    <div class="grid">
      <div
        class="grid__item"
        v-for="(image, index) in dog_breeds"
        :key="index"
        :class="getImageClassCategory()"
      >
        <img :src="image" class="grid__image" :alt="getDogName(image)" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BreedsList",
  computed: {
    ...mapGetters("dogs", ["dog_breeds"]),
  },
  created() {
    this.$store.dispatch("dogs/getDogs");
  },
  methods: {
    getImageClassCategory() {
      return ["grid__item--wide", "grid__item--big", "grid__item--tall"][
        Math.floor(Math.random() * 3)
      ];
    },
    getDogName(image) {
      return image.split("/")[4];
    },
  },
};
</script>

<style scoped>
.container {
  width: 100vw;
}

.grid {
  display: grid;
  padding: 0;
  margin: 0;
  grid-template-columns: repeat(2, 50vw);
  grid-auto-rows: 50vw;
  grid-auto-flow: dense;
  gap: 1rem;
}

.grid__item {
  list-style: none;
  height: 100%;
}

.grid__item--wide {
  grid-column: auto / span 2;
}

.grid__item--tall {
  grid-row: auto / span 2;
}

.grid__item--big {
  grid-column: auto / span 2;
  grid-row: auto / span 2;
}

.grid__image {
  object-fit: cover;
  display: block;
  width: 100%;
  height: 100%;
  transition: 0.1s;
  cursor: pointer;
}

.grid__image:hover {
  filter: sepia(100%);
}

@media (min-width: 416px) {
  .grid {
    grid-template-columns: repeat(3, 30vw);
    grid-auto-rows: 30vw;
  }
}

@media (min-width: 800px) {
  .grid {
    grid-template-columns: repeat(4, 25vw);
    grid-auto-rows: 25vw;
  }
}

@media (min-width: 960px) {
  .grid {
    grid-template-columns: repeat(5, 20vw);
    grid-auto-rows: 20vw;
  }
}

@media (min-width: 1280px) {
  .grid {
    grid-template-columns: repeat(6, 15vw);
    grid-auto-rows: 15vw;
  }
}
</style>
