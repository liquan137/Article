const fileListModule = {
    state: {
        // 选择的文件列表
        fileList: []
    },
    getters: {
        countFileList ( state ) {
            return state.fileList;
        }
    },
    mutations: {
        updateFileList ( state, payload ) {
            state.fileList = payload.fileList;
        }
    },
    actions: {

    }
};

// 导出这些模块，在主store/home.js里导入这个模块即可使用
export default fileListModule;
