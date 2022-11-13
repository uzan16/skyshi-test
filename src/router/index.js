import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "AppActivity",
    component: () =>
      import(/* webpackChunkName: "activity" */ "@/views/activity")
  },
  {
    path: "/todo/:id",
    name: "AppTodo",
    component: () =>
      import(/* webpackChunkName: "todo" */ "@/views/todo")
  },
  {
    path: "*",
    redirect: { name: "AppActivity" }
  }
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes
});

export default router;
