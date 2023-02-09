<template>
  <img :class="className" :src="source" :alt="altText" loading="lazy" />
</template>

<script>
export default {
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
}
</style>
