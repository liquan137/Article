const showPopUpModule = {
    state: {
        // 定义一个变量，初始化给与true，让其显示，点击来回的切换显示隐藏效果
        isShowPopUp: true
    },
    getters: {
        countIsShowPopUp ( state ) {
            return state.isShowPopUp;
        }
    },
    mutations: {
        updateIsShowPopUp ( state, payload ) {
            state.isShowPopUp = payload.isShowPopUp;
        }
    },
    actions: {

    }
};

// 导出这些模块，在主store/home.js里导入这个模块即可使用
export default showPopUpModule;
