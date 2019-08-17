<template>
    <section class="myContent">
        <!-- 引入文章标题组件 start -->
        <input-title></input-title>
        <!-- 引入文章标题组件 end -->
        <!-- 引入列表组件 start -->
        <file-list></file-list>
        <!-- 引入列表组件 end -->
        <!-- 引入点击选择文件框组件 start -->
        <select-file></select-file>
        <!-- 引入点击选择文件框组件 end -->
    </section>
</template>

<script type="text/ecmascript-6">
    // 引入文章标题组件
    import InputTitle from '@/components/InputTitle';

    // 引入列表组件
    import FileList from '@/components/FileList';

    // 引入基于小小游封装的点击选择文件框组件
    import SelectFile from '@/components/SelectFile';

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

        },
        // 计算属性
        computed: {

        },
        // 组件注册
        components: {
            InputTitle,
            FileList,
            SelectFile
        }
    };
</script>

<style lang="css" rel="stylesheet/css">

</style>
