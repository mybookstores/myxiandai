import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/gloable.css'
import request from "@/utils/request";
import axios from 'axios'
import VueAxios from 'vue-axios'
import QRCode from 'qrcodejs2'
// main.js全局注册
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(VueAxios, axios)
axios.defaults.baseURL = 'http://localhost:9090'

Vue.use(mavonEditor)

Vue.config.productionTip = false

Vue.use(ElementUI, { size: "mini" });

Vue.prototype.request=request

new Vue({
  router,
  store,

  render: h => h(App)
}).$mount('#app')

import { Message } from 'element-ui'

axios.interceptors.response.use((response) => {
  switch (response.status) {
    case 200:
      return response
    case 404:
      return false
    case 500:
      Message.error('服务器异常')
      return false
    default:
      Message.error(response.data.message)
      return false
  }
})
