import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "AppDashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "@/views/dashboard")
  },
  {
    path: "*",
    redirect: { name: "AppDashboard" }
  }
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes
});

export default router;
