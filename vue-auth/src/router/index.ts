import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from "@/views/HomePage.vue";
import Login from "@/views/LoginPage.vue";
import Register from "@/views/RegisterPage.vue";
import Forgot from "@/views/ForgotPage.vue";
import Reset from "@/views/ResetPage.vue";

const routes: Array<RouteRecordRaw> = [
  {path: "/", component: Home},
  {path: "/login", component: Login},
  {path: "/register", component: Register},
  {path: "/forgot", component: Forgot},
  {path: "/reset/:token", component: Reset}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
