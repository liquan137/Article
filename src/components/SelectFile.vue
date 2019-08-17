<template>
    <div id="selectFile">
        <!-- 添加各种类型文件 start -->
        <div class="addContent">
            <!-- 点击选择文件的按钮组件 start -->
            <select-file-button ></select-file-button>
            <!-- 点击选择文件的按钮组件 end -->
            <!-- 选择文件类型的框组件 start -->
            <select-file-type
                v-show="isShowPopUp"
            >
            </select-file-type>
            <!-- 选择文件类型的框组件 end -->
        </div>
        <!-- 添加各种类型文件 end -->
    </div>
</template>

<script type="text/ecmascript-6">
    // 引入vuex组件库
    import { mapGetters } from 'vuex';

    // 引入点击选择文件的按钮组件
    import SelectFileButton from './selectFile/SelectFileButton';

    // 引入选择文件类型的框组件
    import SelectFileType from './selectFile/SelectFileType';

    export default {
        name: "SelectFile",
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
            // 还是比较推荐用mapGetters的写法
            ...mapGetters ({
                "isShowPopUp": "countIsShowPopUp"
            })
        },
        // 组件注册
        components: {
            SelectFileButton,
            SelectFileType
        }
    };
</script>

<style lang="css" rel="stylesheet/css">
    @import '../../static/css/selectFile.css';
</style>
