import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import Vant from 'vant'
import 'vant/lib/index.css'
import common from "./components/common";
Vue.use(Vant)

Vue.config.productionTip = false

// http request 拦截器
axios.interceptors.request.use(
    config => {
      if (localStorage.JWT_TOKEN) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = `${localStorage.JWT_TOKEN}`;
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response) {
        console.log('axios:' + error.response.status);
        switch (error.response.status) {
            case 403:
            // 返回 403 ,token失效，清除token信息并跳转到登录页面
            store.commit('logout');
            router.replace({
              path: '/login',
              query: {redirect: router.currentRoute.fullPath}
            });
        }
      }
      return Promise.reject(error.response.data);   // 返回接口返回的错误信息
    });


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
