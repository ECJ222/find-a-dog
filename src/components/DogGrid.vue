<template>
  <div class="grid">
    <div class="grid__list">
      <div
        class="grid__wrapper"
        v-for="(image, index) in grid1"
        :key="`grid-1-${index}`"
      >
        <div class="grid__container" :style="getRandomSize()">
          <dog-image
            :source="image"
            :class-name="'grid__photo'"
            :alt-text="getDogName(image)"
          />
          <div class="grid__photo-hover"></div>
        </div>
      </div>
    </div>

    <div class="grid__list">
      <div
        class="grid__wrapper"
        v-for="(image, index) in grid2"
        :key="`grid-2-${index}`"
      >
        <div class="grid__container" :style="getRandomSize()">
          <dog-image
            :source="image"
            :class-name="'grid__photo'"
            :alt-text="getDogName(image)"
          />
          <div class="grid__photo-hover"></div>
        </div>
      </div>
    </div>

    <div class="grid__list">
      <div
        class="grid__wrapper"
        v-for="(image, index) in grid3"
        :key="`grid-3-${index}`"
      >
        <div class="grid__container" :style="getRandomSize()">
          <dog-image
            :source="image"
            :class-name="'grid__photo'"
            :alt-text="getDogName(image)"
          />

          <div class="grid__photo-hover"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DogImage from "@/components/DogImage";

export default {
  props: {
    dogBreeds: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    grid1() {
      return this.dogBreeds.filter((d, i) => i % 3 === 0);
    },
    grid2() {
      return this.dogBreeds.filter((d, i) => i % 3 === 1);
    },
    grid3() {
      return this.dogBreeds.filter((d, i) => i % 3 === 2);
    },
  },
  components: {
    DogImage,
  },
  methods: {
    getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    getRandomSize() {
      const width = 1080;
      // get random height between 720 - 1620.
      const randomHeight = this.getRandomNumber(720, 1620);
      return {
        "padding-bottom": (randomHeight / width) * 100 + "%",
      };
    },
    getDogName(image) {
      return image.split("/")[4];
    },
  },
};
</script>

<style scoped>
.grid {
  display: flex;
  justify-content: space-between;
  max-width: 1296px;
  margin: 0 auto;
}
.grid__list {
  width: 80%;
  display: flex;
  flex-direction: column;
}
.grid__wrapper {
  width: 99%;
  margin-bottom: min(10%, 30px);
  position: relative;
}
.grid__container {
  width: 99%;
  position: relative;
  background: #eee;
  border-radius: 5px;
}
.grid__photo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  object-fit: cover;
}
.grid__wrapper:hover .grid__photo-hover {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.25) 0,
    transparent 40%,
    transparent 60%,
    rgba(0, 0, 0, 0.3)
  );
}
</style>
