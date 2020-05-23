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

const Zhiye = () => import(/* webpackChunkName: "zhiye" */ "@/views/Zhiye.vue");
const Zhiyecreate = () =>
  import(/* webpackChunkName: "zhiyecreate" */ "@/views/Zhiyecreate.vue");
const Zhiyeedit = () =>
  import(/* webpackChunkName: "zhiyeedit" */ "@/views/Zhiyeedit.vue");

const Company = () =>
  import(/* webpackChunkName: "company" */ "@/views/Company.vue");
const Companycreate = () =>
  import(/* webpackChunkName: "companycreate" */ "@/views/Companycreate.vue");
const Companyedit = () =>
  import(/* webpackChunkName: "companyedit" */ "@/views/Companyedit.vue");

const Project = () =>
  import(/* webpackChunkName: "project" */ "@/views/Project.vue");
const Projectcreate = () =>
  import(/* webpackChunkName: "projectcreate" */ "@/views/Projectcreate.vue");
const Projectedit = () =>
  import(/* webpackChunkName: "projectedit" */ "@/views/Projectedit.vue");
const Projectdetail = () =>
  import(
    /* webpackChunkName: "projectdetailProjectdetail" */ "@/views/Projectdetail.vue"
  );

const Stack = () => import(/* webpackChunkName: "stack" */ "@/views/Stack.vue");
const Stackcreate = () =>
  import(/* webpackChunkName: "stackcreate" */ "@/views/Stackcreate.vue");
const Stackedit = () =>
  import(/* webpackChunkName: "stackedit" */ "@/views/Stackedit.vue");
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
        path: "/admin/zhiye",
        name: "zhiyeRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "zhiye" },
        meta: {
          nav: {
            icon: "el-icon-collection-tag",
            title: "职业路径"
          },
          breadcrumb: {
            title: "职业路径"
          }
        },
        children: [
          {
            path: "/admin/zhiye",
            name: "zhiye",
            component: Zhiye
          },
          {
            path: "/admin/zhiye/create",
            name: "zhiyecreate",
            component: Zhiyecreate
          },
          {
            path: "/admin/zhiye/edit",
            name: "zhiyeedit",
            component: Zhiyeedit,
            meta: {
              breadcrumb: {
                title: "职业编辑"
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
      },
      {
        path: "/admin/project",
        name: "projectRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "project" },
        meta: {
          nav: {
            icon: "el-icon-collection-tag",
            title: "项目管理"
          },
          breadcrumb: {
            title: "项目"
          }
        },
        children: [
          {
            path: "/admin/project",
            name: "project",
            component: Project
          },
          {
            path: "/admin/project/create",
            name: "projectcreate",
            component: Projectcreate,
            meta: {
              breadcrumb: {
                title: "创建"
              }
            }
          },
          {
            path: "/admin/project/detail",
            name: "projectdetail",
            component: Projectdetail,
            meta: {
              breadcrumb: {
                title: "详情"
              }
            }
          },
          {
            path: "/admin/project/edit",
            name: "projectedit",
            component: Projectedit,
            meta: {
              breadcrumb: {
                title: "编辑"
              }
            }
          }
        ]
      },
      {
        path: "/admin/stack",
        name: "stackRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "stack" },
        meta: {
          nav: {
            icon: "el-icon-collection-tag",
            title: "技能管理"
          },
          breadcrumb: {
            title: "技能"
          }
        },
        children: [
          {
            path: "/admin/stack",
            name: "stack",
            component: Stack
          },
          {
            path: "/admin/stack/create",
            name: "stackcreate",
            component: Stackcreate,
            meta: {
              breadcrumb: {
                title: "创建"
              }
            }
          },
          {
            path: "/admin/stack/edit",
            name: "stackedit",
            component: Stackedit,
            meta: {
              breadcrumb: {
                title: "技能编辑"
              }
            }
          }
        ]
      }
      // {
      //   path: "/admin/skill",
      //   name: "skillRoot",
      //   component: { render: h => h("router-view") },
      //   redirect: { name: "skill" },
      //   meta: {
      //     nav: {
      //       icon: "el-icon-collection-tag",
      //       title: "题库管理"
      //     },
      //     breadcrumb: {
      //       title: "题库管理"
      //     }
      //   },
      //   children: [
      //     {
      //       path: "/admin/skill",
      //       name: "skill",
      //       component: Skill
      //     },
      //     {
      //       path: "/admin/skill/create",
      //       name: "skillcreate",
      //       component: Skillcreate
      //     },
      //     {
      //       path: "/admin/skill/edit",
      //       name: "skilledit",
      //       component: Skilledit,
      //       meta: {
      //         breadcrumb: {
      //           title: "题库编辑"
      //         }
      //       }
      //     }
      //   ]
      // },
    ]
  }
];
