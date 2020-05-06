const eduLogin = () =>
  import(/* webpackChunkName: "account" */ "@/views/eduLogin.vue");
const Dashboard = () =>
  import(/* webpackChunkName: "Dashboard" */ "@/views/Dashboard.vue");
const eduLesson = () =>
  import(/* webpackChunkName: "account" */ "@/views/eduLesson.vue");

import BasicLayout from "@/components/BasicLayout.vue";

export default [
  {
    path: "/login",
    component: eduLogin,
    name: "eduLogin"
  },
  {
    path: "/admin",
    component: BasicLayout,
    name: "Root",
    redirect: { name: "Dashboard" },
    children: [
      {
        path: "/admin",
        component: Dashboard,
        name: "Dashboard"
      },
      {
        path: "/lesson",
        component: eduLesson,
        name: "eduLesson"
      }
    ]
  }
];
