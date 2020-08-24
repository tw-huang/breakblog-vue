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
      <el-form ref="form" :model="postForm" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label-width="0">
              <el-input
                v-model="postForm.title"
                placeholder="请输入文章标题"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="0">
              <el-select
                v-model="postForm.categoty"
                placeholder="请选择文章分类"
              >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select> </el-form-item
          ></el-col>
        </el-row>
        <el-form-item label-width="0">
          <el-input
            type="textarea"
            v-model="postForm.subTitle"
            placeholder="请输入文章标题"
          ></el-input>
        </el-form-item>
        <el-form-item label-width="0">
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
      postForm: {
        title: "",
        category: "",
        subTitle: "",
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
    };
  },
  mounted() {
    tinymce.init({});
  },
  methods: {
    async savePost() {
      console.log(this.postForm);
      //校验文章内容

      // const { data: res } = await this.$http.post("post", this.addForm);
      // if (res.code == 0) {
      //   this.$message.error("添加失败");
      // }
      // this.$message.success("添加成功");
    },
  },
};
</script>
