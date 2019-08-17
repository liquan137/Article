// 引入vuex模块
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const module = {
    // 绑定的文章按钮标题
    title: '',
    // 绑定的图片、文字、视频按钮显示状态
    selectStatus: true,
    // 绑定的图片、文字、视频按钮默认的css样式
    selectShow: 'display: inline-block;',
    // 模拟编辑好的文章数据
    articleItem: {
        title: '王大锤冒险记',
        description: '这是文章的描述！！！！！！',
        content: []
    }
};
const store = new Vuex.Store({
    module
});

export default store;
