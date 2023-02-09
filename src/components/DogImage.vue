<template>
  <img :class="className" :data-src="source" :alt="altText" />
</template>

<script>
export default {
  name: "DogImage",
  props: {
    className: {
      type: String,
      default: "",
    },
    source: {
      type: String,
      default: "",
    },
    altText: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
img {
  object-fit: cover;
  visibility: hidden;
}
</style>
