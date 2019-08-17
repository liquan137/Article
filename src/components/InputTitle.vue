<template>
    <form
        id="myForm"
        action="#"
    >
        <div class="item_box">
            <input
                type="text"
                name="articleTitle"
                placeholder="点击输入文章标题"
                v-model="title"
            />
        </div>
    </form>
</template>

<script type="text/ecmascript-6">
    // 引入vuex库
    import { mapGetters, mapMutations } from 'vuex';

    export default {
        name: "myForm",
        // 监听属性的变化
        watch: {
            // 监视title的变化
            "title": function ( value ) {
                this.changeArticleTitle ({
                    "articleTitle": value
                });
            }
        },
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
                title: ''
            };
        },
        // 方法中心
        methods: {
            ...mapMutations ({
                "changeArticleTitle": "updateArticleTitle"
            })
        },
        // 计算属性
        computed: {
            /** ...mapGetters ({
                "articleTitle": "countArticleTitle"
            }) */
        },
        // 组件注册
        components: {

        }
    };
</script>

<style lang="css" rel="stylesheet/css">

</style>
