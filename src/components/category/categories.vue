<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索于添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.keyword"
            clearable
            @clear="getCategoryList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getCategoryList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加分类</el-button
          >
        </el-col>
      </el-row>
      <!-- 分类列表区域 -->
      <el-table :data="categoryList" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="分类名称" prop="categoryName"></el-table-column>
        <el-table-column label="文章数量" prop="counts"></el-table-column>
        <el-table-column label="浏览次数" prop="views"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[10, 15, 25]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类" :visible.sync="addDialogVisible" width="50%">
      <!-- 内容主体区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="分类" prop="name">
          <el-input v-model="addForm.name"></el-input> </el-form-item
      ></el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //获取分类列表的参数对象
      queryInfo: {
        keyword: "",
        //当前页数
        pageNum: 1,
        //当前每页显示数据
        pageSize: 10,
      },
      categoryList: [],
      total: 0,
      //控制添加对话框的显示与隐藏
      addDialogVisible: false,
      //添加表单数据
      addForm: {
        name: "",
      },
      //添加表单验证规则对象
      addFormRules: {
        name: [
          {
            required: true,
            message: "请输入分类名称",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getCategoryList();
  },
  methods: {
    async getCategoryList() {
      const { data: res } = await this.$http.get("categories", {
        params: this.queryInfo,
      });
      if (res.code !== 1) {
        return this.$message.error("获取分类列表失败");
      }
      this.categoryList = res.data.list;
      this.total = res.data.total;
      // console.log(res.data.list);
    },
    //监听pagesize改变事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getCategoryList();
    },
    //监听页码值改变事件
    handleCurrentChange(newPage) {
      // console.log(newPage);
      this.queryInfo.pageNum = newPage;
      this.getCategoryList();
    },
  },
};
</script>

<style lang="less" scoped></style>
