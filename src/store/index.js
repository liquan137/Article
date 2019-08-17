// 引入vue模块
import Vue from 'vue';

// 引入vuex模块
import Vuex from 'vuex';

// 引入数据持久化的库
import createPersistedState from "vuex-persistedstate";

// 引入头部文章标题子模块，在modules选项配置里导入即可
import homeModule from './modules/home';

// 引入选择框显示隐藏子模块，在modules选项配置里导入即可
import showPopUpModule from './modules/showPopUp';

// 引入文件列表子模块，再modules选项配置里导入即可
import fileListModule from './modules/fileList';

import articleModule from './modules/home/home';

// 使用vuex
Vue.use(Vuex);

let store = new Vuex.Store({

    state: {
        // 请求超时或断网时的状态
        network: false,
        // 当前用户上传图片的进度
        uploadProgress: 0,
        home: {
            articleModule
        }
    },
    getters: {
        countNetwork(state) {
            return state.network;
        },
        countUploadProgress(state) {
            return state.uploadProgress;
        }
    },
    mutations: {
        updateNetwork(state, payload) {
            state.network = payload.network;
        },
        updateUploadProgress(state, payload) {
            state.uploadProgress = payload.uploadProgress;
        }
    },
    actions: {},
    // 这里可以引入n多个子模块
    modules: {
        // 头部标题模块
        homeModule,
        // 显示隐藏模块
        showPopUpModule,
        // 文件列表模块
        fileListModule
    },
    // localStorage持久化
    plugins: [createPersistedState({
        storage: window.localStorage,
        reducer(val) {
            return {
                // 文件列表模块
                fileListModule: val.fileListModule,
                // 文章的大标题模块
                homeModule: val.homeModule,
                // 网络监控那个字段
                network: val.network
            };
        }
    })]
});

// 导出store模块
export default store;
