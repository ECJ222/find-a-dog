import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/Dogs.vue"),
  },
  {
    path: "/:slug",
    component: () => import("../views/DogDetails.vue"),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
