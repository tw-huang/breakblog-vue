import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
// 导入全局样式表
import "./assets/css/global.css";

import axios from "axios";
Vue.prototype.$http = axios;
// axios.defaults.baseURL = "http://192.168.2.220:9001/api/v1/";
axios.defaults.baseURL = "http://localhost:9001/api/v1/";
// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    // config.headers["Content-Type"] = "application/x-www-from-urlencoded";
    var token = sessionStorage.getItem("token");
    if (token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Token = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
