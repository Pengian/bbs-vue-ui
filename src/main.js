import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/antd.css';

import router from './router';
import store from './store';
import '@/assets/css/main.css';
// 引入自定义全局字体样式表
import '@/assets/font/font.css';
// 引入iconfont的样式（iconfont的使用参照iconfont官网）
import '@/assets/icon/iconfont.css';
// 引入axios 初始化axios里面的配置
import '@/service/axios';
import moment from 'moment';
import './assets/css/main.less';
import * as utils from './utils';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import i18n from './i18n';

Vue.config.productionTip = false;

// 引入自定义工具模块
Vue.prototype.$utils = utils;
Vue.prototype.$moment = moment;

Vue.use(Antd);
Vue.use(mavonEditor);

export default new Vue({
  router,
  i18n,
  store,
  render: h => h(App),
}).$mount('#app');
