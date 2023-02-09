<template>
  <div v-if="!loading" class="dog__detail">
    <div class="dog__detail-wrapper">
      <dog-image :source="dog_name" :alt-text="params" />
    </div>
    <section class="dog__detail-traits">
      <h3>{{ params }} Traits</h3>

      <ul>
        <li>{{ getRandomTraits() }}</li>
        <li>{{ getRandomTraits() }}</li>
        <li>{{ getRandomTraits() }}</li>
      </ul>
    </section>

    <router-link to="/" class="back"> Not the {{ params }}? </router-link>
  </div>
  <dog-loader v-else />
</template>

<script>
import DogImage from "../components/DogImage.vue";
import DogLoader from "../components/DogLoader.vue";
import { mapGetters } from "vuex";

export default {
  name: "DogDetails",
  components: {
    DogImage,
    DogLoader,
  },
  data() {
    return {
      loading: true,
    };
  },
  metaInfo: {
    title: "Details - Find the dog of your dreams",
  },
  computed: {
    params() {
      return this.$router.currentRoute.value.params.slug;
    },
    ...mapGetters("dogs", ["dog_name"]),
  },
  watch: {
    dog_name: {
      handler() {
        this.loading = false;
      },
    },
  },
  created() {
    this.$store.dispatch("dogs/getDogDetails", this.params);
  },
  methods: {
    checkTraitExists(trait) {
      const liElements = document.querySelectorAll("ul li");
      for (const liElement of liElements) {
        if (liElement.textContent === trait) {
          return true;
        }
      }
      return false;
    },
    getRandomTraits() {
      const traits = [
        "Enjoys eating food from Eden Life.",
        "Making noise.",
        "Tends to be restless.",
        "Hugs and kisses.",
        "Loves attention.",
        "Very protective (most dogs are .)",
        "Very energetic",
        "Friendly",
        "Intelligent",
        "Loyal",
        "Protective",
        "Playful",
        "Good-natured",
        "Confident",
        "Gentle",
        "Independent",
        "Brave",
        "Energetic",
        "Outgoing",
        "Affectionate",
        "Stubborn",
        "Sensitive",
        "Adaptable",
        "Agile",
        "Social",
        "Mellow",
      ];
      const randomNumber = Math.floor(Math.random() * traits.length);
      if (this.checkTraitExists(traits[randomNumber])) {
        return this.getRandomTraits();
      } else {
        return traits[randomNumber];
      }
    },
  },
};
</script>

<style scoped>
.dog__detail {
  margin: 0 auto;
  max-width: 1000px;
}
.dog__detail-wrapper {
  margin: 0 auto;
  width: 80%;
  position: relative;
  border-radius: 5px;
  padding-bottom: 80%;
}
.dog__detail img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  display: block;
  margin: 0 auto;
  border-radius: 5px;
}
.dog__detail-traits {
  margin-top: 3rem;
}
.dog__detail-traits h3 {
  text-transform: capitalize;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}
.dog__detail-traits ul {
  list-style-type: paws;
  padding-left: 2rem;
}
.dog__detail-traits li {
  font-size: 1.5rem;
}

.dog__detail .back {
  background-color: #484848;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 1.5rem;
  padding: 1rem 2rem;
  max-width: max-content;
  text-align: center;
  display: block;
  margin: 3rem auto;
  cursor: pointer;
  text-decoration: none;
}
</style>
