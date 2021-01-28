<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header
      ><div>
        <img src="../assets/logo.png" alt="img" />
        <span>BreakBlog - 管理后台</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObject[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
            >
              <!-- 二级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-arrow-right"></i>
                <!-- 文本 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
    img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.home-container {
  height: 100%;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据
      menulist: [
        {
          id: 110,
          authName: "分类管理",
          path: "category",
          children: [
            {
              id: 111,
              authName: "分类列表",
              path: "categories",
              children: [],
              order: null
            }
          ],
          order: 1
        },
        {
          id: 120,
          authName: "文章管理",
          path: "post",
          children: [
            {
              id: 121,
              authName: "文章列表",
              path: "posts",
              children: [],
              order: null
            },
            {
              id: 122,
              authName: "编写文章",
              path: "post",
              children: [],
              order: null
            }
          ],
          order: 2
        },
        {
          id: 130,
          authName: "评论管理",
          path: "comment",
          children: [
            {
              id: 131,
              authName: "评论列表",
              path: "comments",
              children: [],
              order: 1
            }
          ],
          order: 3
        },
        {
          id: 140,
          authName: "友链管理",
          path: "link",
          children: [
            {
              id: 141,
              authName: "友链列表",
              path: "links",
              children: [],
              order: null
            }
          ],
          order: 4
        },
        {
          id: 150,
          authName: "数据统计",
          path: "report",
          children: [
            {
              id: 151,
              authName: "数据报告",
              path: "reports",
              children: [],
              order: null
            }
          ],
          order: 5
        }
      ],
      iconsObject: {
        110: "el-icon-collection",
        120: "el-icon-notebook-2",
        130: "el-icon-chat-line-square",
        140: "el-icon-link",
        150: "el-icon-data-analysis"
      },
      //是否折叠
      isCollapse: false,
      //被激活的链接地址
      activePath: ""
    };
  },
  created() {
    // this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 获取菜单
    // async getMenuList() {
    //   const { data: res } = await this.$http.get("menus");
    //   if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
    //   this.menulist = res.data;
    // },
    //点击按钮，菜单折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    //保存链接的激活状态
    saveNavState(activePath) {
      // console.log("saveNavState()调用了");
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    }
  },
  mounted() {
    let _this = this; //很重要把父路由的vue实例赋给_this
    _this.$root.$on("next", function(activePath) {
      //监听next事件，这里$root很重要，不懂去官网介绍
      _this.saveNavState(activePath); //调用父路由中的方法
    });
  }
};
</script>
