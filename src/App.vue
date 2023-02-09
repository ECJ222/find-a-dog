<template>
  <div class="container">
    <Logo />
    <router-view />
  </div>
</template>

<script>
import Logo from "@/components/Logo.vue";
export default {
  components: {
    Logo,
  },
  mounted() {
    window.addEventListener("load", this.lazyLoadImages);
    window.addEventListener("scroll", this.lazyLoadImages);
    window.addEventListener("resize", this.lazyLoadImages);
    window.addEventListener("orientationChange", this.lazyLoadImages);
    window.addEventListener("beforeunload", this.resetState());
  },
  beforeUnmount() {
    window.removeEventListener("load", this.lazyLoadImages);
    window.removeEventListener("scroll", this.lazyLoadImages);
    window.removeEventListener("resize", this.lazyLoadImages);
    window.removeEventListener("orientationChange", this.lazyLoadImages);
    window.removeEventListener("beforeunload", this.resetState());
  },
  methods: {
    preloadImages(image) {
      const src = image.getAttribute("data-src");
      if (!src) {
        return;
      }
      image.src = src;
      image.style.visibility = "visible";
    },
    lazyLoadImages() {
      const images = document.querySelectorAll("[data-src]");

      const options = {
        threshold: 1,
        rootMargin: "0px 0px 50px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const image = entry.target;
            this.preloadImages(image);
            observer.unobserve(image);
          } else {
            return;
          }
        });
      }, options);

      images.forEach((image) => {
        observer.observe(image);
      });
    },
    resetState() {
      this.$store.commit("SET_DOGS", this.$store.state.initial_data);
    },
  },
};
</script>

<style>
.container {
  width: 100vw;
  padding: 1rem;
}
</style>
