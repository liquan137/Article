<template>
    <div id="preview">
        <div class="myHeader">
            <div class="center clearFix">
                <em class="fl">我是返回按钮</em>
                <h1 class="fl">预览</h1>
                <a
                    class="fr"
                    href="javascript:;"
                    @click="publishNewArticleHandle"
                >
                    完成
                </a>
            </div>
        </div>
        <div class="myContent">
            <div class="articleH">
                <h1>{{ articleTitle }}</h1>
                <div class="myCoreH clearFix">
                    <div class="left">
                        <a href="javascript:;">
                            <img
                                src="../../../static/images/user_avatar.png"
                                alt="文章发表人头像"
                                title="文章发表人头像"
                            />
                        </a>
                    </div>
                    <div class="right">
                        <h2>@小小游</h2>
                        <div class="details_r">
                            <strong>今天</strong>
                            <strong>阅读 0</strong>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 引入文章列表组件 start -->
            <article-list></article-list>
            <!-- 引入文章列表组件 end -->
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    // 引入vuex库
    import { mapGetters } from 'vuex';

    // Uploader、Toast组件
    import { Toast } from 'vant';

    // 引入文章列表组件
    import ArticleList from './articleList/ArticleList';

    export default {
        // 组件名称
        name: "Preview",
        // 数据中心
        data () {
            return {

            };
        },
        // 方法中心
        methods: {
            // 发布一篇新图文
            publishNewArticleHandle () {
                let myStr = JSON.stringify ( this.fileList );

                // console.log ( typeof myStr );

                // 发送给后端的接口参数
                let params = {
                    "title": this.articleTitle,
                    "cover": "我是封面1111",
                    "abstract": "我是摘要1111",
                    "content": myStr
                };

                // 发起请求
                this.$api.publishGoodThing.saveNewArticle ( params )
                    .then ( response => {
                        let res = response.data;
                        // 接口请求成功
                        if ( res.code == 0 ) {
                            // 打印看看结果对不对
                            console.log ( res.data );
                        }
                    })
                    .catch ( err => {
                        console.log ( `服务器异常${err}` );
                        Toast ( '图片保存失败，请刷新重试！' );
                    });
            }
        },
        // 计算属性
        computed: {
            // 还是比较推荐用mapGetters的写法
            ...mapGetters ({
                "fileList": "countFileList",
                "articleTitle": "countArticleTitle"
                // "articleContent": "countArticleContent"
            })
        },
        // 组件注册
        components: {
            // 按需加载，不用全局加载
            [Toast.name]: Toast,
            ArticleList
        }
    };
</script>

<style lang="css" rel="stylesheet/css">
    @import '../../../static/css/preview.css';
</style>
