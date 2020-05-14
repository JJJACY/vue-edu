const Dashboard = () =>
  import(/* webpackChunkName: "Dashboard" */ "@/views/Dashboard.vue");
const eduLogin = () =>
  import(/* webpackChunkName: "eduLogin" */ "@/views/eduLogin.vue");
const eduLesson = () =>
  import(/* webpackChunkName: "lesson" */ "@/views/eduLesson.vue");
const eduLessoncreate = () =>
  import(/* webpackChunkName: "lessoncreate" */ "@/views/eduLessoncreate.vue");
const eduLessonedit = () =>
  import(/* webpackChunkName: "lessonedit" */ "@/views/eduLessonedit.vue");

const Company = () =>
  import(/* webpackChunkName: "company" */ "@/views/Company.vue");
const Companycreate = () =>
  import(/* webpackChunkName: "companycreate" */ "@/views/Companycreate.vue");
const Companyedit = () =>
  import(/* webpackChunkName: "companyedit" */ "@/views/Companyedit.vue");

import BasicLayout from "@/components/BasicLayout.vue";

export default [
  {
    path: "/login",
    component: eduLogin,
    name: "eduLogin"
  },
  {
    path: "/",
    component: BasicLayout,
    name: "admin",
    redirect: { name: "Dashboard" },
    children: [
      {
        path: "/admin",
        component: { render: h => h("router-view") },
        name: "Dashboard",
        // meta: {
        //   nav: {
        //     icon: "el-icon-pie-chart",
        //     title: "概况"
        //   },
        //   breadcrumb: {
        //     title: "概况"
        //   }
        // },
        children: [
          {
            path: "/admin",
            name: "Dashboard",
            component: Dashboard
          }
        ]
      },
      {
        path: "/admin/lesson",
        name: "eduLessonRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "eduLesson" },
        meta: {
          nav: {
            icon: "el-icon-collection-tag",
            title: "课程管理"
          },
          breadcrumb: {
            title: "课程管理"
          }
        },
        children: [
          {
            path: "/admin/lesson",
            name: "eduLesson",
            component: eduLesson
          },
          {
            path: "/admin/lesson/create",
            name: "eduLessoncreate",
            component: eduLessoncreate,
            meta: {
              breadcrumb: {
                title: "课程创建"
              }
            }
          },
          {
            path: "/admin/lesson/edit",
            name: "eduLessonedit",
            component: eduLessonedit,
            meta: {
              breadcrumb: {
                title: "课程编辑"
              }
            }
          }
        ]
      },
      {
        path: "/admin/company",
        name: "companyRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "company" },
        meta: {
          nav: {
            icon: "el-icon-collection-tag",
            title: "企业管理"
          },
          breadcrumb: {
            title: "企业管理"
          }
        },
        children: [
          {
            path: "/admin/company",
            name: "company",
            component: Company
          },
          {
            path: "/admin/company/create",
            name: "companycreate",
            component: Companycreate
          },
          {
            path: "/admin/company/edit",
            name: "companyedit",
            component: Companyedit,
            meta: {
              breadcrumb: {
                title: "企业编辑"
              }
            }
          }
        ]
      }
    ]
  }
];
