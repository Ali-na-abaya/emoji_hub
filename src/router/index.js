import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../pages/home.vue";
import Catalog from "../pages/Catalog.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/catalog", component: Catalog },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
