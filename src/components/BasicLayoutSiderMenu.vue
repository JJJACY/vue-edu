<template>
  <el-menu :default-active="path" :router="true" :collapse="collapse">
    <template v-for="route in filterRoutes">
      <el-submenu
        v-if="hasNavChildren(route)"
        :index="route.path"
        :key="route.path"
      >
        <template slot="title">
          <i v-if="route.meta.nav.icon" :class="route.meta.nav.icon"></i>
          <span slot="title">{{ route.meta.nav.title }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="route in route.children"
            :key="route.path"
            :index="route.path"
            :route="{ path: route.path }"
            :id="route.name"
          >
            <i v-if="route.meta.nav.icon" :class="route.meta.nav.icon"></i>
            <span slot="title">{{ route.meta.nav.title }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item
        v-else
        :key="route.path"
        :disabled="route.disabled"
        :index="route.path"
        :route="{ path: route.path }"
        :id="route.name"
      >
        <i v-if="route.meta.nav.icon" :class="route.meta.nav.icon"></i>
        <span slot="title">{{ route.meta.nav.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import routes from "@/router/routes";
import DataStore from "@/global/storage/index.js";
import managerService from "@/global/service/manager.js";

export default {
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      path: this.$route.path,
      filterRoutes: [],
      permission_slug: []
    };
  },
  created() {
    let Token = DataStore.getToken();
    managerService.authority({ Token }).then(res => {
      this.permission_slug = res.data[0].permission_slug.split(",");
      this.getRoutes();
    });

    // this.Authority();
  },
  watch: {
    $route(to) {
      this.path = to.path;
      this.Authority();
    }
  },
  methods: {
    getRoutes() {
      this.filterRoutes = this.filterNavigator(routes);
    },
    filterNavigator(node) {
      let result = [];
      node.forEach(data => {
        if (data.meta && data.meta.nav) {
          let item = {
            path: data.path,
            name: data.name,
            meta: data.meta
          };
          if (data.children) {
            item.children = this.filterNavigator(data.children);
          }
          this.permission_slug.some(newData => {
            if (newData == item.meta.slug) {
              result.push(item);
            }
          });
        } else if (data.children) {
          this.filterNavigator(data.children).forEach(item =>
            result.push(item)
          );
        }
      });
      return result;
    },
    hasNavChildren(route) {
      const children = route.children || [];
      return children.some(data => data.meta && data.meta.nav);
    },
    Authority() {
      let role_permission = this.$route.meta.slug;
      let Token = DataStore.getToken();
      managerService.authority({ Token }).then(res => {
        let permission_slug = res.data[0].permission_slug.split(",");
        let arr = permission_slug.some(data => data == role_permission);
        if (!arr) {
          this.$message({
            type: "warning",
            message: "您没有权限查看这个板块，请联络管理员授权"
          });
          this.$router.push({ name: "admin" });
        }
      });
    }
  }
};
</script>
