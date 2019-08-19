// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';


// 导入api接口
import api from './api';

// 引入一个计算html字体大小的js的文件
import '../static/js/html-size-calculation';

import "../static/font/iconfont.css";

// 将api挂载到vue的原型上
Vue.prototype.$api = api;

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App />'
});
