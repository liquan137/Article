<template>
    <header class="myHeader">
        <div class="center clearFix">
            <em class="fl">我是返回按钮</em>
            <h1 class="fl">编辑</h1>
            <a
                class="fr"
                href="javascript:;"
                @click="previewHandle"
            >
                预览
            </a>
        </div>
    </header>
</template>

<script type="text/ecmascript-6">
    // 引入vuex库
    import { mapGetters } from 'vuex';

    // 引入vant-toast UI组件库
    import { Toast } from 'vant';

    export default {
        name: "myHeader",
        // 初始化一些数据
        created () {

        },
        // 更新完成
        updated () {

        },
        // 实例挂载完成
        mounted () {

        },
        // 数据中心
        data () {
            return {

            };
        },
        // 方法中心
        methods: {
            // 点击预览按钮要做的事
            previewHandle () {
                if ( !this.articleTitle ) {
                    Toast ( '文章的大标题不允许为空！' );
                    return false;
                } else if ( !this.fileList.length ) {
                    Toast ( '请至少添加一篇文章才能预览！' );
                    return false;
                } else {
                    // Toast ( '恭喜，您输入了标题哈！' );
                    // 通过push跳转到预览组件
                    this.$router.push ({
                        name: "Preview"
                    });
                }
            }
        },
        // 计算属性
        computed: {
            // 还是比较推荐用mapGetters的写法
            ...mapGetters ({
                "fileList": "countFileList",
                "articleTitle": "countArticleTitle"
            })
        },
        // 组件注册
        components: {
            // 按需加载组件
            [Toast.name]: Toast
        }
    };
</script>

<style lang="css" rel="stylesheet/css">

</style>
