const homeModule = {
    state: {
        // 文章大标题
        articleTitle: '',
        // 每篇文章的具体内容
        articleContent: ''
    },
    getters: {
        countArticleTitle ( state ) {
            return state.articleTitle;
        },
        countArticleContent ( state ) {
            return state.articleContent;
        }
    },
    mutations: {
        updateArticleTitle ( state, payload ) {
            state.articleTitle = payload.articleTitle;
        },
        updateArticleContent ( state, payload ) {
            state.articleContent = payload.articleContent;
        }
    },
    actions: {

    }
};

// 导出这些模块，在主store/home.js里导入这个模块即可使用
export default homeModule;
