const Dashboard = () =>
  import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue");
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

const Skill = () => import(/* webpackChunkName: "skill" */ "@/views/Skill.vue");
const Skillcreate = () =>
  import(/* webpackChunkName: "skillcreate" */ "@/views/Skillcreate.vue");
const Skilledit = () =>
  import(/* webpackChunkName: "skilledit" */ "@/views/Skilledit.vue");

const Manager = () =>
  import(/* webpackChunkName: "manager" */ "@/views/Manager.vue");
const Managercreate = () =>
  import(/* webpackChunkName: "managercreate" */ "@/views/Managercreate.vue");
const Manageredit = () =>
  import(/* webpackChunkName: "manageredit" */ "@/views/Manageredit.vue");

const Player = () =>
  import(/* webpackChunkName: "player" */ "@/views/Player.vue");
const Playercreate = () =>
  import(/* webpackChunkName: "playercreate" */ "@/views/Playercreate.vue");
const Playeredit = () =>
  import(/* webpackChunkName: "playeredit" */ "@/views/Playeredit.vue");

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
        path: "/dashboard",
        component: Dashboard,
        name: "Dashboard",
        meta: {
          nav: {
            icon: "el-icon-pie-chart",
            title: "概况"
          },
          breadcrumb: {
            title: "概况"
          },
          slug: "company"
        }
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
          },
          slug: "course"
        },
        children: [
          {
            path: "/admin/lesson",
            name: "eduLesson",
            component: eduLesson,
            meta: {
              slug: "course"
            }
          },
          {
            path: "/admin/lesson/create",
            name: "eduLessoncreate",
            component: eduLessoncreate,
            meta: {
              breadcrumb: {
                title: "创建"
              },
              slug: "course"
            }
          },
          {
            path: "/admin/lesson/edit/:id",
            name: "eduLessonedit",
            component: eduLessonedit,
            meta: {
              breadcrumb: {
                title: "编辑"
              },
              slug: "course"
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
          },
          slug: "path"
        },
        children: [
          {
            path: "/admin/zhiye",
            name: "zhiye",
            component: Zhiye,
            meta: {
              slug: "path"
            }
          },
          {
            path: "/admin/zhiye/create",
            name: "zhiyecreate",
            component: Zhiyecreate,
            meta: {
              breadcrumb: {
                title: "创建"
              },
              slug: "path"
            }
          },
          {
            path: "/admin/zhiye/edit/:id",
            name: "zhiyeedit",
            component: Zhiyeedit,
            meta: {
              breadcrumb: {
                title: "编辑"
              },
              slug: "path"
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
          },
          slug: "company"
        },
        children: [
          {
            path: "/admin/company",
            name: "company",
            component: Company,
            meta: {
              slug: "company"
            }
          },
          {
            path: "/admin/company/create",
            name: "companycreate",
            component: Companycreate,
            meta: {
              breadcrumb: {
                title: "创建"
              },
              slug: "company"
            }
          },
          {
            path: "/admin/company/edit/:id",
            name: "companyedit",
            component: Companyedit,
            meta: {
              breadcrumb: {
                title: "编辑"
              },
              slug: "company"
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
          },
          slug: "project"
        },
        children: [
          {
            path: "/admin/project",
            name: "project",
            component: Project,
            meta: {
              slug: "project"
            },
            slug: "project"
          },
          {
            path: "/admin/project/create",
            name: "projectcreate",
            component: Projectcreate,
            meta: {
              breadcrumb: {
                title: "创建"
              }
            },
            slug: "project"
          },
          {
            path: "/admin/project/detail/:id",
            name: "projectdetail",
            component: Projectdetail,
            meta: {
              breadcrumb: {
                title: "详情"
              }
            },
            slug: "project"
          },
          {
            path: "/admin/project/edit/:id",
            name: "projectedit",
            component: Projectedit,
            meta: {
              breadcrumb: {
                title: "编辑"
              }
            },
            slug: "project"
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
          },
          slug: "skill"
        },
        children: [
          {
            path: "/admin/stack",
            name: "stack",
            component: Stack,
            meta: {
              slug: "skill"
            }
          },
          {
            path: "/admin/stack/create",
            name: "stackcreate",
            component: Stackcreate,
            meta: {
              breadcrumb: {
                title: "创建"
              },
              slug: "skill"
            }
          },
          {
            path: "/admin/stack/edit/:id",
            name: "stackedit",
            component: Stackedit,
            meta: {
              breadcrumb: {
                title: "编辑"
              },
              slug: "skill"
            }
          }
        ]
      },
      {
        path: "/admin/skill",
        name: "skillRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "skill" },
        meta: {
          nav: {
            icon: "el-icon-collection-tag",
            title: "题库管理"
          },
          breadcrumb: {
            title: "题库管理"
          },
          slug: "question"
        },
        children: [
          {
            path: "/admin/skill",
            name: "skill",
            component: Skill,
            meta: {
              slug: "question"
            }
          },
          {
            path: "/admin/skill/create",
            name: "skillcreate",
            component: Skillcreate,
            meta: {
              breadcrumb: {
                title: "创建"
              },
              slug: "question"
            }
          },
          {
            path: "/admin/skill/edit/:id",
            name: "skilledit",
            component: Skilledit,
            meta: {
              breadcrumb: {
                title: "编辑"
              },
              slug: "question"
            }
          }
        ]
      },
      {
        path: "/admin/root",
        name: "Root",
        component: { render: h => h("router-view") },
        redirect: { name: "manageroot" },
        meta: {
          nav: {
            icon: "el-icon-setting",
            title: "管理设置"
          },
          breadcrumb: {
            title: "设置"
          },
          slug: "manage"
        },
        children: [
          {
            path: "/admin/root/manager",
            name: "manageroot",
            component: { render: h => h("router-view") },
            meta: {
              nav: {
                icon: "el-icon-user-solid",
                title: "管理员"
              },
              breadcrumb: {
                title: "管理员"
              },
              slug: "manage"
            },
            children: [
              {
                path: "/admin/root/manager",
                name: "manager",
                component: Manager,
                meta: {
                  slug: "manage"
                }
              },
              {
                path: "/admin/root/manager/create",
                name: "managercreate",
                component: Managercreate,
                meta: {
                  breadcrumb: {
                    title: "创建"
                  },
                  slug: "manage"
                }
              },
              {
                path: "/admin/root/manager/edit/:id",
                name: "manageredit",
                component: Manageredit,
                meta: {
                  breadcrumb: {
                    title: "编辑"
                  },
                  slug: "manage"
                }
              }
            ]
          },
          {
            path: "/admin/root/player",
            name: "playerroot",
            component: { render: h => h("router-view") },
            meta: {
              nav: {
                icon: "el-icon-user-solid",
                title: "角色"
              },
              breadcrumb: {
                title: "角色"
              },
              slug: "manage"
            },
            children: [
              {
                path: "/admin/root/player",
                name: "player",
                component: Player,
                meta: {
                  slug: "manage"
                }
              },
              {
                path: "/admin/root/player/create",
                name: "playercreate",
                component: Playercreate,
                meta: {
                  breadcrumb: {
                    title: "创建"
                  },
                  slug: "manage"
                }
              },
              {
                path: "/admin/root/player/edit/:id",
                name: "playeredit",
                component: Playeredit,
                meta: {
                  breadcrumb: {
                    title: "编辑"
                  },
                  slug: "manage"
                }
              }
            ]
          }
        ]
      }
    ]
  }
];
