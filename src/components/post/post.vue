<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>编写文章</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 搜索于添加区域 -->
      <el-form
        :model="postForm"
        label-width="80px"
        :rules="postFormRules"
        ref="postFormRef"
      >
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label-width="0" prop="title">
              <el-input
                v-model="postForm.title"
                placeholder="请输入文章标题"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="0" prop="categoryId">
              <el-select
                v-model="postForm.categoryId"
                placeholder="请选择文章分类"
              >
                <el-option
                  v-for="(item, index) in categories"
                  :label="item.name"
                  :value="item.id"
                  :key="index"
                ></el-option>
              </el-select> </el-form-item
          ></el-col>
        </el-row>
        <el-form-item label-width="0" prop="subtitle">
          <el-input
            type="textarea"
            v-model="postForm.subtitle"
            placeholder="请输入文章副标题"
          ></el-input>
        </el-form-item>
        <el-form-item label-width="0" prop="body">
          <editor v-model="postForm.body" :init="init" :disabled="disabled">
          </editor>
        </el-form-item>
      </el-form>
      <div class="tinymce-button">
        <el-button type="primary" @click="savePost">保存</el-button>
        <el-button>取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.tinymce-button {
  //   text-align: center;
  margin-top: 16px;
}
</style>

<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver";
// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import "tinymce/plugins/image"; // 插入上传图片插件
import "tinymce/plugins/table"; // 插入表格插件
import "tinymce/plugins/lists"; // 列表插件
import "tinymce/plugins/autolink"; // 自动链接插件
import "tinymce/plugins/wordcount"; // 字数统计插件
import "tinymce/plugins/code"; // 编辑源码插件
import "tinymce/plugins/hr"; // 分割线插件
import "tinymce/plugins/codesample"; // 编辑源码插件
import "tinymce/plugins/fullscreen"; // 表情插件
import "tinymce/icons/default"; //默认图标
import "tinymce/plugins/help"; //帮助
export default {
  components: {
    Editor,
  },
  props: {
    // 基本路径，默认为空根目录，如果你的项目发布后的地址为目录形式，
    // 即abc.com/tinymce，baseUrl需要配置成tinymce，不然发布后资源会找不到
    baseUrl: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    plugins: {
      type: [String, Array],
      default:
        "lists image table wordcount autolink code codesample hr fullscreen help",
    },
    toolbar: {
      type: [String, Array],
      default:
        "undo redo | formatselect| bold italic forecolor strikethrough hr | bullist numlist outdent indent | alignleft aligncenter alignright alignjustify | image  table | removeformat  codesample  code fullscreen | help",
    },
  },
  data() {
    return {
      categories: [],
      postForm: {
        title: "",
        categoryId: "",
        subtitle: "",
        body: "",
      },
      init: {
        language_url: `${this.baseUrl}/tinymce/langs/zh_CN.js`,
        language: "zh_CN",
        skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide`,
        content_css: `${this.baseUrl}/tinymce/skins/content/default/content.css`,
        height: 500,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: false,
      },
      postFormRules: {
        title: [
          {
            required: true,
            message: "请输入文章标题",
            trigger: "blur",
          },
        ],
        categoryId: [
          {
            required: true,
            message: "请选择文章分类",
            trigger: "blur",
          },
        ],
        subtitle: [
          {
            required: true,
            message: "请输入文章副标题",
            trigger: "blur",
          },
        ],
        body: [{ required: true, message: "请输入文章内容", trigger: "blur" }],
      },
    };
  },
  mounted() {
    tinymce.init({});
  },
  created() {
    this.getCategories();
    // 编辑文章初始数据
    var postId = this.$route.query.id;
    // 编辑文章
    if (postId !== undefined) {
      this.getPost(postId);
    }
  },
  methods: {
    async getCategories() {
      const { data: res } = await this.$http.get("post/new/categories");
      // console.log(res);
      if (res.code !== 1) {
        return this.$message.error("获取分类列表失败");
      }
      this.categories = res.data;
      // console.log(this.categories);
    },

    savePost() {
      // console.log(this.postForm);
      //校验文章内容
      this.$refs.postFormRef.validate(async (valid) => {
        // console.log(valid);
        if (!valid) return;
        //发起请求
        const { data: res } = await this.$http.post("post", this.postForm);
        if (res.code == 0) {
          this.$message.error("保存失败");
        }
        this.$message.success("保存成功");
        this.$router.push("/posts");
      });
    },
    //初始化文章数据
    async getPost(postId) {
      const { data: res } = await this.$http.get("post/" + postId);
      if (res.code == 0) {
        this.$message.error("获取文章数据失败");
      }
      this.postForm.title = res.data.title;
      this.postForm.subtitle = res.data.subtitle;
      this.postForm.body = res.data.body;
      this.postForm.categoryId = res.data.categoryId;
    },
  },
};
</script>
