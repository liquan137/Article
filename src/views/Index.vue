<template>
    <div id="index">
        <!-- 首页头部组件 start -->
        <my-header></my-header>
        <!-- 首页头部组件 end -->
        <!-- 首页头部内容组件 start -->
        <my-section></my-section>
        <!-- 首页头部内容组件 end -->
        <!-- <van-progress
            :percentage="currentProgress"
            pivot-color="#7232dd"
            color="linear-gradient(to right, #be99ff, #7232dd)"
        >
        </van-progress> -->
    </div>
</template>

<script type="text/ecmascript-6">
    // Progress组件
    // import { Progress } from 'vant';

    // 引入vuex
    import { mapGetters } from 'vuex';

    // 引入首页头部组件
    import MyHeader from './index/MyHeader';

    // 引入首页内容组件
    import MySection from './index/MySection';

    export default {
        name: "index",
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

        },
        // 计算属性
        computed: {
            ...mapGetters ({
                "currentProgress": "countUploadProgress"
            })
        },
        // 组件注册
        components: {
            // 按需加载，不用全局加载
            // [Progress.name]: Progress,
            MyHeader,
            MySection
        }
    };
</script>

<style lang="css" rel="stylesheet/css">
    @import '../../static/css/index.css';
</style>
